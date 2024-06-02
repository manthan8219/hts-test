"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const secret = "your_jwt_secret"; // Use environment variable for production
const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "Email already in use or invalid data" });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ message: "Sign-in successful", token });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.signIn = signIn;
