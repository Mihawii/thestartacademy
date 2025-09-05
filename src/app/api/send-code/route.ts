import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { z } from "zod";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    console.log("Starting send-code API request");
    
    const json = await req.json();
    console.log("Request body:", json);
    
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      console.error("Email validation failed:", parsed.error);
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase();
    console.log("Processing email:", normalizedEmail);

    // generate six-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    console.log("Generated code:", code);

    try {
      console.log("Attempting database connection...");
      await prisma.$connect();
      console.log("Database connected successfully");
      
      // remove any previous codes for this email then insert new
      console.log("Deleting previous codes...");
      await prisma.verificationCode.deleteMany({ where: { email: normalizedEmail } });
      console.log("Creating new verification code...");
      await prisma.verificationCode.create({ data: { email: normalizedEmail, code, expiresAt } });
      console.log("Verification code saved to database");
    } catch (dbError) {
      console.error("Database error:", dbError);
      console.error("Database error details:", JSON.stringify(dbError, null, 2));
      console.error("DATABASE_URL:", process.env.DATABASE_URL);
      return NextResponse.json({ error: "Failed to generate verification code" }, { status: 500 });
    }

    // send email via Resend if configured
    let emailSent = false;
    if (resend && process.env.FROM_EMAIL) {
      try {
        const result = await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: [normalizedEmail],
          subject: "Your verification code",
          html: `<p>Your verification code is <strong style="font-size:24px">${code}</strong></p>`,
        });
        console.log("Email sent successfully:", result);
        emailSent = true;
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Continue anyway - code is saved in DB
      }
    } else {
      console.warn("Resend not configured - code saved but email not sent");
      console.log(`Development mode - Verification code for ${normalizedEmail}: ${code}`);
      emailSent = true; // In dev mode, treat as sent since code is logged
    }

    return NextResponse.json({ 
      ok: true, 
      message: emailSent ? "Verification code sent to your email" : "Verification code generated (check console in dev mode)",
      developmentCode: process.env.NODE_ENV === 'development' ? code : undefined
    });
  } catch (err) {
    console.error("/api/send-code error", err);
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 });
  }
}
