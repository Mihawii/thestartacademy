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
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    // generate six-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // remove any previous codes for this email then insert new
    await prisma.verificationCode.deleteMany({ where: { email: normalizedEmail } });
    await prisma.verificationCode.create({ data: { email: normalizedEmail, code, expiresAt } });

    // send email via Resend
    if (resend && process.env.FROM_EMAIL) {
      try {
        const result = await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: [normalizedEmail],
          subject: "Your verification code",
          html: `<p>Your verification code is <strong style="font-size:24px">${code}</strong></p>`,
        });
        console.log("Email sent successfully:", result);
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Continue anyway - code is saved in DB
      }
    } else {
      console.warn("Resend not configured - code saved but email not sent");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/send-code error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
