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
exports.generateUniqueShortID = void 0;
const nanoid_1 = require("nanoid");
const prisma_1 = require("../model/prisma");
const DB = prisma_1.DBClient.getInstance();
const checkForShortURL = (shortURL) => __awaiter(void 0, void 0, void 0, function* () {
    const url = yield DB.url.findFirst({
        where: {
            shortURL,
        },
    });
    return url ? true : false;
});
const generateUniqueShortID = () => __awaiter(void 0, void 0, void 0, function* () {
    let count = 10;
    let shortURL = "";
    while (count--) {
        shortURL = (0, nanoid_1.nanoid)();
        if (!(yield checkForShortURL(shortURL))) {
            return shortURL;
        }
    }
    return new Error("Soory, Cannot generate shortURL");
});
exports.generateUniqueShortID = generateUniqueShortID;
