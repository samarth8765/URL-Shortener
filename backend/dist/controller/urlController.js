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
exports.createNewURL = exports.getAllUrls = void 0;
const prisma_1 = require("../model/prisma");
const shortId_1 = require("../utils/shortId");
const DB = prisma_1.DBClient.getInstance();
const getAllUrls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const user = req.user;
        const { id } = user;
        //fetch all url's from DB
        const urls = yield DB.url.findMany({
            where: {
                userId: id,
            },
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
});
exports.getAllUrls = getAllUrls;
const createNewURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const { id } = req.user;
        let { longURL, shortURL, title } = req.body;
        if (!longURL || !title || !shortURL) {
            return res.status(400).json({
                error: "Please send all required fields",
            });
        }
        if (!shortURL) {
            shortURL = yield (0, shortId_1.generateUniqueShortID)();
        }
        const generateURL = yield DB.url.create({
            data: {
                userId: id,
                longURL,
                shortURL,
                title,
            },
        });
        return generateURL;
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
exports.createNewURL = createNewURL;
