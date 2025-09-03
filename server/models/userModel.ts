import mongoose, { InferSchemaType, Query } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserMethods {
  isPasswordOld(JwtIatAt: number): boolean;
  doPasswordsMatch(value: string): boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "You must confirm your password"],
      validate: {
        validator: function (this: any, value: string) {
          return value === this.password;
        },
      },
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    role: {
      type: String,
      default: "user",
    },
    passwordChangedAt: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

// NAPRAVI PRE-DOCUMENT Middleware sifrovanjekriki korisnikovog password-a i brisanje confirmPassword-a

// sta ce raditi middleware
// - Hashovace korisnikovu sifru
// Kada treba da se izvrsi hashkovanje sifre?
// - Pri pravljenju naloga i update-u sifre
// Kada treba da se izvrsi provera da li je password isti kao i passwordConfirm
// Pri pravljenju naloga i update-u sifre

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.confirmPassword = undefined as any;
  next();
});

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
userSchema.methods.doPasswordsMatch = function (frontendPassword: string) {
  return bcrypt.compare(frontendPassword, this.password);
};

export type UserType = InferSchemaType<typeof userSchema> & IUserMethods;

// ts misli da this pokazuje na document objekat zbog overload-a i zato mora rucno da mu kazem da je query objekat koji vraca UserType ili UserType[] i da se izvrsava nad query objektom tipa UserType
userSchema.pre<Query<UserType | UserType[], UserType>>(
  /^find/,
  function (this, next) {
    this.select("-__v");

    next();
  }
);

const User = mongoose.model<UserType>("User", userSchema);

export default User;
