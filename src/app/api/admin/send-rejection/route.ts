import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const rejectionSchema = z.object({
  applicationId: z.string(),
  studentEmail: z.string().email(),
  studentName: z.string(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = rejectionSchema.safeParse(json);
    
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
        status: 'rejected',
        updatedAt: new Date()
      }
    });

    // Send rejection email
    if (resend && process.env.FROM_EMAIL) {
      const rejectionEmailHtml = `
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
                Thank you for your application to The Start Academy's Entrepreneurship Program. We have completed our review of your application materials and regret to inform you that we are unable to offer you admission at this time.
              </p>
              
              <p class="paragraph">
                This year we received an exceptionally strong pool of candidates, making our selection process highly competitive. While your application demonstrated many positive qualities, we were unable to offer admission to all qualified applicants due to the limited number of spaces available in our program.
              </p>
              
              <p class="paragraph">
                We encourage you to continue pursuing your entrepreneurial goals and to consider reapplying to our program in the future. We wish you success in your academic and professional endeavors.
              </p>
              
              <div class="signature-section">
                <p class="signature-line">Sincerely,</p>
                <div style="margin: 25px 0 15px 0;">
                  <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #333; transform: rotate(-2deg);">
                    Olzhas Muktharov
                  </div>
                </div>
                <p class="signature-name" style="margin-top: 10px;">Olzhas Muktharov<br>Founder and CEO</p>
              </div>
            </div>
          </div>
      `;

      const result = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@thestartacademy.com',
        to: [studentEmail],
        subject: `Application Update - The Start Academy`,
        html: rejectionEmailHtml,
      });

      return NextResponse.json({ 
        success: true, 
        message: `Rejection email sent to ${studentName}`,
        emailId: result.data?.id 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Application marked as rejected" 
    });

  } catch (error) {
    console.error("Error processing rejection:", error);
    return NextResponse.json({ 
      error: "Failed to process rejection", 
      details: (error as Error).message 
    }, { status: 500 });
  }
}
