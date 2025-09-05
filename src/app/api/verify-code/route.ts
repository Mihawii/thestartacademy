import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const bodySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export async function POST(req: Request) {
  try {
    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data format. Please check your input." }, 
        { status: 400 }
      );
    }
    
    const { email, code } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    // 1. Find the verification code for this email
    const records = await prisma.verificationCode.findMany({
      where: { email: normalizedEmail },
      orderBy: { createdAt: 'desc' },
      take: 1
    });
    
    const record = records[0];

    if (!record) {
      return NextResponse.json(
        { error: "No verification code found. Please request a new one." }, 
        { status: 404 }
      );
    }

    if (record.code !== code) {
      return NextResponse.json(
        { error: "Incorrect verification code. Please try again." }, 
        { status: 401 }
      );
    }

    if (record.expiresAt < new Date()) {
      // Clean up expired code using the ID
      await prisma.verificationCode.delete({ where: { id: record.id } });
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." }, 
        { status: 410 }
      );
    }

    // 2. Check if the user exists
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Create a new user if they don't exist
      try {
        user = await prisma.user.create({
          data: {
            email: normalizedEmail,
            password: '', // Required field, will be set during first login
            // Add any other required fields from your User model here
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
          { error: "Failed to create user account. Please try again." }, 
          { status: 500 }
        );
      }
    }

    // 3. Clean up verification code using the ID
    try {
      await prisma.verificationCode.delete({ 
        where: { id: record.id } 
      });
    } catch (error) {
      console.error("Error deleting verification code:", error);
      // Continue even if deletion fails
    }

    return NextResponse.json({ 
      success: true,
      message: "Verification successful" 
    });

  } catch (error) {
    console.error("Verification error:", error);
    
    // Handle Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { 
          error: "A database error occurred. Please try again.",
          code: error.code
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
