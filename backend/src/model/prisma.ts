import { PrismaClient } from "@prisma/client";

export class DBClient {
  private static db: PrismaClient | null = null;
  private constructor() {}

  public static getInstance() {
    if (DBClient.db === null) {
      DBClient.db = new PrismaClient();
    }
    return DBClient.db;
  }
}
