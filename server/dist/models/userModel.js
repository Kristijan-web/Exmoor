"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.default.Schema({
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
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        try {
            this.password = await bcrypt_1.default.hash(this.password, 12);
        }
        catch (err) {
            throw err;
        }
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
    this.select("-__v -updatedAt -createdAt");
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
    try {
        return await bcrypt_1.default.compare(frontendPassword, this.password);
    }
    catch (err) {
        throw err;
    }
};
userSchema.methods.setAndGetForgotPasswordToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    const encryptedToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetToken = encryptedToken;
    this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minuta
    return resetToken;
};
// ts misli da this pokazuje na document objekat zbog overload-a i zato mora rucno da mu kazem da je query objekat koji vraca UserType ili UserType[] i da se izvrsava nad query objektom tipa UserType
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
