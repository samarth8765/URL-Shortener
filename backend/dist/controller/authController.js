"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prisma_1 = require("../model/prisma");
const bcrypt_1 = require("bcrypt");
const generateToken_1 = require("../utils/generateToken");
const DB = prisma_1.DBClient.getInstance();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email or Password not found" });
    }
    const userExists = yield DB.user.findUnique({
        where: {
            email,
        },
    });
    if (userExists) {
        return res.status(400).json({
            error: "Email already exists",
        });
    }
    const hashPassword = yield (0, bcrypt_1.hash)(password, 10);
    const user = yield DB.user.create({
        data: {
            email,
            username,
            password: hashPassword,
        },
    });
    return res.status(201).json({
        message: "User created successfully",
    });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email or Password not found" });
    }
    const user = yield DB.user.findFirst({
        where: {
            email,
        },
    });
    if (user && (yield (0, bcrypt_1.compare)(password, user.password))) {
        res.json({
            email,
            token: (0, generateToken_1.generateToken)(user.id),
        });
    }
    else {
        res.status(401).json("Invalid email or password");
    }
});
exports.loginUser = loginUser;
