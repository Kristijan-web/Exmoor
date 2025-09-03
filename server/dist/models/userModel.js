"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
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
            validator: function (value) {
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
    this.confirmPassword = undefined;
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
userSchema.methods.doPasswordsMatch = function (frontendPassword) {
    return bcrypt_1.default.compare(frontendPassword, this.password);
};
// ts misli da this pokazuje na document objekat zbog overload-a i zato mora rucno da mu kazem da je query objekat koji vraca UserType ili UserType[] i da se izvrsava nad query objektom tipa UserType
userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
