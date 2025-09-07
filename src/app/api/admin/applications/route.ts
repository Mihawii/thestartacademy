import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Fetching all applications for admin...");
    
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50, // Limit to 50 most recent applications
      select: {
        id: true,
        fullName: true,
        email: true,
        age: true,
        location: true,
        currentEducation: true,
        institution: true,
        major: true,
        graduationYear: true,
        workExperience: true,
        entrepreneurialExperience: true,
        technicalSkills: true,
        whyProgram: true,
        careerGoals: true,
        biggestChallenge: true,
        uniqueContribution: true,
        programGoals: true,
        financialAid: true,
        commitmentSerious: true,
        commitmentDedicated: true,
        createdAt: true,
        status: true
      }
    });

    console.log(`Found ${applications.length} applications`);

    return NextResponse.json({
      success: true,
      applications: applications
    });

  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch applications", 
        details: (error as Error).message 
      }, 
      { status: 500 }
    );
  }
}
