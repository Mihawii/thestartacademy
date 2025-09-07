import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const waitlistSchema = z.object({
  applicationId: z.string(),
  studentEmail: z.string().email(),
  studentName: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = waitlistSchema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: parsed.error.issues 
      }, { status: 400 });
    }

    const { applicationId, studentEmail, studentName } = parsed.data;

    // Update application status in database
    await prisma.application.update({
      where: { id: applicationId },
      data: { 
        status: 'waitlisted',
        updatedAt: new Date()
      }
    });

    // Send waitlist email
    if (resend && process.env.FROM_EMAIL) {
      const waitlistEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>The Start Academy - Admission Decision</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .letter { max-width: 700px; margin: 0 auto; background: #ffffff; border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            .header { padding: 30px 40px 20px; border-bottom: 2px solid #333; background: #fafafa; }
            .logo-section { text-align: center; margin-bottom: 20px; }
            .logo { display: inline-block; background: transparent; }
            .logo-text { color: #333; font-size: 32px; font-weight: 900; font-family: 'Times New Roman', serif; letter-spacing: 4px; }
            .header-info { text-align: center; color: #666; font-size: 12px; line-height: 1.4; }
            .body { padding: 40px 50px 50px; }
            .salutation { color: #333; font-size: 14px; margin-bottom: 20px; }
            .paragraph { color: #333; font-size: 14px; line-height: 1.6; margin-bottom: 16px; text-align: justify; }
            .signature-section { margin-top: 30px; }
            .signature-line { color: #333; font-size: 14px; margin-bottom: 20px; }
            .signature-name { color: #333; font-size: 12px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="letter">
            <div class="header">
              <div class="logo-section">
                <div class="logo">
                  <div class="logo-text">TSA</div>
                </div>
              </div>
              <div class="header-info">
                Office of Admissions and Financial Aid<br>
                The Start Academy<br>
                Astana, Kazakhstan<br>
                Phone: +77051028049<br>
                Application ID: ${applicationId}
              </div>
            </div>
            
            <div class="body">
              <p class="salutation">Dear ${studentName},</p>
              
              <p class="paragraph">
                Thank you for your application to The Start Academy's Entrepreneurship Program. After careful consideration of your application materials, we have placed you on our waitlist for the upcoming academic year.
              </p>
              
              <p class="paragraph">
                This decision reflects the highly competitive nature of our admissions process and the exceptional quality of applicants we received. While we cannot offer you admission at this time, your application demonstrates strong qualifications that warrant continued consideration.
              </p>
              
              <p class="paragraph">
                Being placed on our waitlist means that you may be offered admission should space become available in our program. We will notify you promptly of any changes to your application status and encourage you to maintain your interest in The Start Academy.
              </p>
              
              <p class="paragraph">
                We appreciate your patience during this process and your continued interest in our program. We will be in touch with updates as they become available.
              </p>
              
              <div class="signature-section">
                <p class="signature-line">Sincerely,</p>
                <div style="margin: 25px 0 15px 0;">
                  <svg width="180" height="60" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#4a4a4a;stop-opacity:0.8" />
                      </linearGradient>
                    </defs>
                    <path d="M15 45 Q 30 20, 50 35 Q 70 15, 95 30 Q 115 50, 140 25 Q 155 40, 170 30" stroke="url(#inkGradient)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 50 Q 40 25, 60 40 Q 80 20, 105 35 Q 125 55, 150 30 Q 165 45, 175 35" stroke="#2c3e50" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
                    <path d="M25 40 Q 45 30, 65 35 Q 85 25, 110 30 Q 130 45, 155 25 Q 170 35, 175 30" stroke="#34495e" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
                  </svg>
                </div>
                <p class="signature-name" style="margin-top: 10px;">Olzhas Muktharov<br>Founder and CEO</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const result = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@thestartacademy.com',
        to: [studentEmail],
        subject: `Waitlist Update - The Start Academy`,
        html: waitlistEmailHtml,
      });

      return NextResponse.json({ 
        success: true, 
        message: `Waitlist email sent to ${studentName}`,
        emailId: result.data?.id 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Application marked as waitlisted" 
    });

  } catch (error) {
    console.error("Error processing waitlist:", error);
    return NextResponse.json({ 
      error: "Failed to process waitlist", 
      details: (error as Error).message 
    }, { status: 500 });
  }
}
