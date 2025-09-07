/*
  Warnings:

  - You are about to drop the `VerificationCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationCode";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "verification_codes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "currentEducation" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "major" TEXT,
    "graduationYear" INTEGER,
    "workExperience" TEXT,
    "entrepreneurialExperience" TEXT,
    "technicalSkills" TEXT,
    "whyProgram" TEXT NOT NULL,
    "careerGoals" TEXT NOT NULL,
    "biggestChallenge" TEXT,
    "uniqueContribution" TEXT,
    "programGoals" TEXT NOT NULL,
    "financialAid" TEXT NOT NULL,
    "commitmentSerious" BOOLEAN NOT NULL,
    "commitmentDedicated" BOOLEAN NOT NULL,
    "status" TEXT DEFAULT 'pending',
    "acceptedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
