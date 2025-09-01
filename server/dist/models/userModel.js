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
// ts misli da this pokazuje na document objekat zbog overload-a i zato mora rucno da mu kazem da je query objekat koji vraca UserType ili UserType[] i da se izvrsava nad query objektom tipa UserType
userSchema.pre(/^find/, function (next) {
    this.select("-__v");
    next();
});
// instance methoda koja proverava da li je sifra i dalje validna
// - Moze da se desi da je korisniku neko ukrao JWT i da je on odmah promenio sifru, onda kada nam se posalje JWT treba da proverimo da li je u pitanju stara ili nova sifra
// Zasto koristim JWT?
// Za autorizaciju, da odredjenim endpoint-ma moze da pristupi samo
// 1. Ako je tako sto onda samo ne prosledim role u (local storage ili cookie)
// - Ako bih tako radio onda svako moze da promeni iz role: 'user' u role: 'admin'
// 2. Ako je tako onda ne bih nigde na frontu slao role, vec bi poslao id usera, taj id bi se iskoristio da se dohvati user i vidi njegov role
// ODOGOVIR NA pitanja ispod, zasto umesto jwt-a ne bih slao id korisnika?
// 3. Sta ako neko ukrade korisnikog id?
// - Onda nastaje haos on ce imati pristup svim podacima usera, jos ako je taj user admin jos gore.
// 4. Sta ako neko ukrade jwt token?
// - Onda je isto kao u odgovoru iznad
userSchema.methods.isPasswordFresh = function () { };
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
