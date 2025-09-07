import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PrismaClient } from "@/generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const acceptanceSchema = z.object({
  applicationId: z.string(),
  studentEmail: z.string().email(),
  studentName: z.string(),
});

export async function POST(req: Request) {
  try {
    console.log("Processing acceptance email request...");
    
    const json = await req.json();
    const parsed = acceptanceSchema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: parsed.error.issues 
      }, { status: 400 });
    }

    const { applicationId, studentEmail, studentName } = parsed.data;

    // Update application status in database
    try {
      await prisma.application.update({
        where: { id: applicationId },
        data: { 
          status: 'accepted',
          acceptedAt: new Date()
        }
      });
      console.log(`Updated application ${applicationId} status to accepted`);
    } catch (dbError) {
      console.error("Database update error:", dbError);
      return NextResponse.json({ 
        error: "Failed to update application status" 
      }, { status: 500 });
    }

    // Send acceptance email
    if (resend && process.env.FROM_EMAIL) {
      try {
        console.log(`Sending acceptance email to ${studentEmail}...`);
        
        const acceptanceEmailHtml = `
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
              .paragraph { color: #333; font-size: 14px; line-height: 1.6; margin-bottom: 16px; text-align: justify; word-wrap: break-word; }
              .signature-section { margin-top: 40px; padding-top: 20px; }
              .signature-line { color: #333; font-size: 14px; margin-bottom: 20px; }
              .signature-image { max-width: 120px; height: auto; margin-bottom: 5px; }
              .signature-name { color: #333; font-size: 12px; margin: 0; }
              @media only screen and (max-width: 600px) {
                .letter { max-width: 100%; margin: 0; }
                .body { padding: 20px; }
                .header { padding: 20px; }
              }
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
                  On behalf of The Start Academy I am pleased to congratulate you on your acceptance into our program for the upcoming cohort. We were very impressed by your entrepreneurial skills and vision as well as your commitment to innovation and leadership.
                </p>
                
                <p class="paragraph">
                  Enclosed with this letter, please find the necessary enrollment form for you to fill out and return by two weeks from today. A timely response can increase your chances of securing accommodations and resources. You will be contacted upon receipt of the form by our student advisor, who will give you further information regarding scheduling. If you have any questions regarding this letter, please feel free to contact us at the admissions office by phone or email at olzhas@thestartacademy.com. We look forward to hearing back from you.
                </p>
                
                <p class="paragraph">
                  We at The Start Academy are pleased to welcome you and feel that you will make a great addition to our student body. We wish you the very best in success in your future and hope that you will find all of your needs satisfactorily met here. Thank you for your prompt attention and for choosing The Start Academy.
                </p>
                
                <p class="paragraph" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                  <strong>Financial Aid Status:</strong> Based on your application, you will be participating in the program without financial assistance. The full program fee will be required as outlined in our enrollment materials.
                </p>
                
                <div class="signature-section">
                  <p class="signature-line">Yours sincerely,</p>
                  <div style="margin: 25px 0 15px 0;">
                    <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #333; transform: rotate(-2deg);">
                      Olzhas Muktharov
                    </div>
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
          subject: `Welcome to The Start Academy - You're Accepted!`,
          html: acceptanceEmailHtml,
        });

        console.log("Acceptance email sent successfully:", result);

        return NextResponse.json({ 
          success: true, 
          message: `Acceptance email sent to ${studentName}`,
          emailId: result.data?.id 
        });

      } catch (emailError) {
        console.error("Email sending error:", emailError);
        return NextResponse.json({ 
          error: "Failed to send acceptance email", 
          details: (emailError as Error).message 
        }, { status: 500 });
      }
    } else {
      console.warn("Resend not configured - skipping email");
      return NextResponse.json({ 
        success: true, 
        message: "Application marked as accepted (email service not configured)" 
      });
    }

  } catch (error) {
    console.error("Error processing acceptance:", error);
    return NextResponse.json({ 
      error: "Failed to process acceptance", 
      details: (error as Error).message 
    }, { status: 500 });
  }
}
