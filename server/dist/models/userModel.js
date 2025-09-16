"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
// city
// postalCode
// adress
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
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
        required: [true, "Password is required"],
    },
    confirmPassword: {
        type: String,
        required: [true, "You must confirm your password"],
        validate: {
            validator: function (value) {
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
}, {
    timestamps: true,
});
// NAPRAVI PRE-DOCUMENT Middleware sifrovanjekriki korisnikovog password-a i brisanje confirmPassword-a
// sta ce raditi middleware
// - Hashovace korisnikovu sifru
// Kada treba da se izvrsi hashkovanje sifre?
// - Pri pravljenju naloga i update-u sifre
// Kada treba da se izvrsi provera da li je password isti kao i passwordConfirm
// Pri pravljenju naloga i update-u sifre
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        this.password = await bcrypt_1.default.hash(this.password, 12);
    }
    if (this.isModified("password")) {
        // zbog cega oduzimam - 1000
        // Zato sto iat u jwt-u moze biti pre upisa passwordChangeAt u bazi, i time osiguravan da se to ne desi
        this.passwordChangedAt = new Date(Date.now() - 2000);
    }
    this.confirmPassword = undefined;
    next();
});
userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});
// Ako je jwt.iat manji od passwordChangedAt
// Onda se pokusava pristupiti ukradenom jwt-u
userSchema.methods.isPasswordOld = function (JwtIatAt) {
    // pretvar jwt.iat u milisekunde
    const JWTMiliseconds = JwtIatAt * 1000;
    if (JWTMiliseconds < this.passwordChangedAt) {
        return true;
    }
    return false;
};
// instance metoda za proverevanja sifre iz baze sa poslatom sifrom
userSchema.methods.doPasswordsMatch = async function (frontendPassword) {
    // poredi se sifra sa frontned-a sa sifrom iz baze
    // KAKO BRE OVO VRATI TRUE KAKO BRE
    console.log(`Sifra sa frontend-a je ${frontendPassword}, sifra u bazi je ${this.password}`);
    return await bcrypt_1.default.compare(frontendPassword, this.password);
};
userSchema.methods.setAndGetForgotPasswordToken = function () {
    // napravi reset token i encryptovanog ga upisi u bazuu
    // koristi se crypt build in biblioteka
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    const encryptedToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetToken = encryptedToken;
    this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
// ts misli da this pokazuje na document objekat zbog overload-a i zato mora rucno da mu kazem da je query objekat koji vraca UserType ili UserType[] i da se izvrsava nad query objektom tipa UserType
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
