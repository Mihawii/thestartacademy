-- CreateTable
CREATE TABLE "AllowedStudent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedBy" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "AllowedStudent_email_key" ON "AllowedStudent"("email");

-- CreateIndex
CREATE INDEX "AllowedStudent_email_idx" ON "AllowedStudent"("email");
