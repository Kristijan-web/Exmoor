import mongoose, { InferSchemaType, Query } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface IUserMethods {
  isPasswordOld(JwtIatAt: number): boolean;
  doPasswordsMatch(value: string): Promise<boolean>;
  setAndGetForgotPasswordToken(): string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ime i prezime je obavezno"],
    },
    email: {
      type: String,
      required: [true, "Email je obavezan"],
      unique: true,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Šifra je obavezna"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Morate da potvrdite šifru"],
      validate: {
        validator: function (this: any, value: string) {
          return value === this.password;
        },
      },
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpires: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (err) {
      throw err;
    }
  }

  if (this.isModified("password")) {
    // zbog cega oduzimam - 1000
    // Zato sto iat u jwt-u moze biti pre upisa passwordChangeAt u bazi, i time osiguravan da se to ne desi
    this.passwordChangedAt = new Date(Date.now() - 2000);
  }
  this.confirmPassword = undefined as any;
  next();
});

userSchema.pre<Query<UserType | UserType[], UserType>>(
  /^find/,
  function (this, next) {
    this.select("-__v -updatedAt -createdAt");

    next();
  }
);

// Ako je jwt.iat manji od passwordChangedAt
// Onda se pokusava pristupiti ukradenom jwt-u
userSchema.methods.isPasswordOld = function (JwtIatAt: number) {
  // pretvar jwt.iat u milisekunde
  const JWTMiliseconds = JwtIatAt * 1000;

  if (JWTMiliseconds < this.passwordChangedAt) {
    return true;
  }
  return false;
};

// instance metoda za proverevanja sifre iz baze sa poslatom sifrom
userSchema.methods.doPasswordsMatch = async function (
  frontendPassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(frontendPassword, this.password);
  } catch (err) {
    throw err;
  }
};

userSchema.methods.setAndGetForgotPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetToken = encryptedToken;
  this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minuta

  return resetToken;
};

export type UserType = InferSchemaType<typeof userSchema> & IUserMethods;

// ts misli da this pokazuje na document objekat zbog overload-a i zato mora rucno da mu kazem da je query objekat koji vraca UserType ili UserType[] i da se izvrsava nad query objektom tipa UserType

const User = mongoose.model<UserType>("User", userSchema);

export default User;
