"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBClient = void 0;
const client_1 = require("@prisma/client");
class DBClient {
    constructor() { }
    static getInstance() {
        if (DBClient.db === null) {
            DBClient.db = new client_1.PrismaClient();
        }
        return DBClient.db;
    }
}
exports.DBClient = DBClient;
DBClient.db = null;
