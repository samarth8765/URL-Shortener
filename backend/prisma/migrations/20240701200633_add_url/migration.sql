-- CreateTable
CREATE TABLE "URL" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "longURL" TEXT NOT NULL,
    "numberOfLinks" INTEGER NOT NULL,
    "TotalClicks" INTEGER NOT NULL,
    "TotalForAllLinks" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "URL" ADD CONSTRAINT "URL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
