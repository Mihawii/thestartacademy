import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const applicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  age: z.string().min(1, "Age is required"),
  location: z.string().min(1, "Location is required"),
  currentEducation: z.string().min(1, "Education level is required"),
  institution: z.string().min(1, "Institution is required"),
  major: z.string().optional(),
  graduationYear: z.string().optional(),
  workExperience: z.string().optional(),
  entrepreneurialExperience: z.string().optional(),
  technicalSkills: z.string().optional(),
  whyProgram: z.string().min(1, "Why program essay is required"),
  careerGoals: z.string().min(1, "Career goals essay is required"),
  biggestChallenge: z.string().optional(),
  uniqueContribution: z.string().optional(),
  programGoals: z.string().min(1, "Program goals are required"),
  financialAid: z.string().min(1, "Financial aid stance is required"),
  commitmentSerious: z.boolean().refine(val => val === true, "Commitment checkbox must be checked"),
  commitmentDedicated: z.boolean().refine(val => val === true, "Dedication checkbox must be checked"),
});

export async function POST(req: Request) {
  try {
    console.log("Starting application submission...");
    
    const json = await req.json();
    console.log("Request body received");
    
    const parsed = applicationSchema.safeParse(json);
    if (!parsed.success) {
      console.error("Validation failed:", parsed.error);
      return NextResponse.json({ 
        error: "Validation failed", 
        details: parsed.error.issues 
      }, { status: 400 });
    }
    
    const data = parsed.data;
    console.log("Application data validated for:", data.email);

    // Save to database and check for duplicates
    let applicationId = null;
    try {
      console.log("Attempting to connect to database...");
      
      // Check if email already exists
      const existingApplication = await prisma.application.findFirst({
        where: { email: data.email.toLowerCase() }
      });
      
      if (existingApplication) {
        return NextResponse.json({ 
          error: "An application with this email address has already been submitted. Each email can only be used once." 
        }, { status: 400 });
      }
      
      // Validate age conversion
      const ageNum = parseInt(data.age);
      if (isNaN(ageNum)) {
        throw new Error("Invalid age format");
      }
      
      console.log("Creating application record...");
      const application = await prisma.application.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          age: ageNum,
          location: data.location,
          currentEducation: data.currentEducation,
          institution: data.institution,
          major: data.major || null,
          graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
          workExperience: data.workExperience || null,
          entrepreneurialExperience: data.entrepreneurialExperience || null,
          technicalSkills: data.technicalSkills || null,
          whyProgram: data.whyProgram,
          careerGoals: data.careerGoals,
          biggestChallenge: data.biggestChallenge || null,
          uniqueContribution: data.uniqueContribution || null,
          programGoals: data.programGoals,
          financialAid: data.financialAid,
          commitmentSerious: data.commitmentSerious,
          commitmentDedicated: data.commitmentDedicated,
        }
      });
      
      applicationId = application.id;
      console.log("Application saved to database with ID:", applicationId);
    } catch (dbError) {
      console.error("Database error details:", dbError);
      console.error("Database error message:", (dbError as Error).message);
      console.error("Prisma client status:", typeof prisma);
      return NextResponse.json({ 
        error: "Failed to save application", 
        details: (dbError as Error).message 
      }, { status: 500 });
    }

    // Send email notification
    if (resend && process.env.FROM_EMAIL) {
      try {
        const emailContent = `
          <h2>New Application Submission - The Start Academy</h2>
          
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Age:</strong> ${data.age}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          
          <h3>Education</h3>
          <p><strong>Current Education:</strong> ${data.currentEducation}</p>
          <p><strong>Institution:</strong> ${data.institution}</p>
          ${data.major ? `<p><strong>Major:</strong> ${data.major}</p>` : ''}
          ${data.graduationYear ? `<p><strong>Graduation Year:</strong> ${data.graduationYear}</p>` : ''}
          
          <h3>Experience</h3>
          ${data.workExperience ? `<p><strong>Work Experience:</strong><br>${data.workExperience.replace(/\n/g, '<br>')}</p>` : ''}
          ${data.entrepreneurialExperience ? `<p><strong>Entrepreneurial Experience:</strong><br>${data.entrepreneurialExperience.replace(/\n/g, '<br>')}</p>` : ''}
          ${data.technicalSkills ? `<p><strong>Technical Skills:</strong><br>${data.technicalSkills.replace(/\n/g, '<br>')}</p>` : ''}
          
          <h3>Essays</h3>
          <p><strong>Why The Start Academy:</strong><br>${data.whyProgram.replace(/\n/g, '<br>')}</p>
          <p><strong>Career Goals:</strong><br>${data.careerGoals.replace(/\n/g, '<br>')}</p>
          ${data.biggestChallenge ? `<p><strong>Biggest Challenge:</strong><br>${data.biggestChallenge.replace(/\n/g, '<br>')}</p>` : ''}
          ${data.uniqueContribution ? `<p><strong>Unique Contribution:</strong><br>${data.uniqueContribution.replace(/\n/g, '<br>')}</p>` : ''}
          
          <h3>Program Expectations</h3>
          <p><strong>Program Goals:</strong><br>${data.programGoals.replace(/\n/g, '<br>')}</p>
          <p><strong>Financial Aid:</strong> ${data.financialAid}</p>
          
          <h3>Commitment</h3>
          <p><strong>Serious Commitment:</strong> ${data.commitmentSerious ? 'Yes' : 'No'}</p>
          <p><strong>Dedicated Commitment:</strong> ${data.commitmentDedicated ? 'Yes' : 'No'}</p>
          
          <hr>
          <p><em>Application submitted at: ${new Date().toISOString()}</em></p>
        `;

        // Send notification email to admin
        const adminResult = await resend.emails.send({
          from: process.env.FROM_EMAIL || 'noreply@thestartacademy.com',
          to: ['olzhas@thestartacademy.com'],
          subject: `🎓 New Application: ${data.fullName} - The Start Academy`,
          html: `
            <div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                <div style="color: white; font-size: 42px; font-weight: 700; margin-bottom: 10px;">🎓 TSa</div>
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Application Received</h1>
                <p style="color: #e8f4f8; margin: 10px 0 0 0; font-size: 16px;">Application ID: ${applicationId}</p>
              </div>

              <!-- Main Content -->
              <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Personal Information -->
                <div style="margin-bottom: 35px;">
                  <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #3498db;">
                    👤 Personal Information
                  </h2>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <div>
                      <strong style="color: #34495e;">Full Name:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.fullName}</span>
                    </div>
                    <div>
                      <strong style="color: #34495e;">Email:</strong><br>
                      <a href="mailto:${data.email}" style="color: #3498db; text-decoration: none;">${data.email}</a>
                    </div>
                    <div>
                      <strong style="color: #34495e;">Age:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.age}</span>
                    </div>
                    <div>
                      <strong style="color: #34495e;">Location:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.location}</span>
                    </div>
                  </div>
                </div>

                <!-- Education Background -->
                <div style="margin-bottom: 35px;">
                  <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #3498db;">
                    🎓 Education Background
                  </h2>
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <div style="margin-bottom: 15px;">
                      <strong style="color: #34495e;">Current Education Level:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.currentEducation}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                      <strong style="color: #34495e;">Institution:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.institution}</span>
                    </div>
                    ${data.major ? `
                    <div style="margin-bottom: 15px;">
                      <strong style="color: #34495e;">Major/Field of Study:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.major}</span>
                    </div>
                    ` : ''}
                    ${data.graduationYear ? `
                    <div style="margin-bottom: 15px;">
                      <strong style="color: #34495e;">Expected Graduation:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.graduationYear}</span>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Experience & Skills -->
                <div style="margin-bottom: 35px;">
                  <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #3498db;">
                    💼 Experience & Skills
                  </h2>
                  ${data.workExperience ? `
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: #34495e;">Work Experience:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.workExperience.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                  ${data.entrepreneurialExperience ? `
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: #34495e;">Entrepreneurial Experience:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.entrepreneurialExperience.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                  ${data.technicalSkills ? `
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <strong style="color: #34495e;">Technical Skills:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.technicalSkills.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                </div>

                <!-- Essays & Motivation -->
                <div style="margin-bottom: 35px;">
                  <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #3498db;">
                    📝 Essays & Motivation
                  </h2>
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: #34495e;">Why This Program:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.whyProgram.replace(/\n/g, '<br>')}</div>
                  </div>
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: #34495e;">Career Goals:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.careerGoals.replace(/\n/g, '<br>')}</div>
                  </div>
                  ${data.biggestChallenge ? `
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: #34495e;">Biggest Challenge:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.biggestChallenge.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                  ${data.uniqueContribution ? `
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                    <strong style="color: #34495e;">Unique Contribution:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.uniqueContribution.replace(/\n/g, '<br>')}</div>
                  </div>
                  ` : ''}
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <strong style="color: #34495e;">Program Goals:</strong><br>
                    <div style="margin-top: 10px; line-height: 1.6; color: #2c3e50;">${data.programGoals.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>

                <!-- Financial & Commitment -->
                <div style="margin-bottom: 35px;">
                  <h2 style="color: #2c3e50; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 3px solid #3498db;">
                    💰 Financial & Commitment
                  </h2>
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <div style="margin-bottom: 15px;">
                      <strong style="color: #34495e;">Financial Aid Stance:</strong><br>
                      <span style="font-size: 16px; color: #2c3e50;">${data.financialAid}</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                      <div>
                        <strong style="color: #34495e;">Serious Commitment:</strong><br>
                        <span style="font-size: 16px; color: ${data.commitmentSerious ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                          ${data.commitmentSerious ? '✅ Yes' : '❌ No'}
                        </span>
                      </div>
                      <div>
                        <strong style="color: #34495e;">Dedicated Commitment:</strong><br>
                        <span style="font-size: 16px; color: ${data.commitmentDedicated ? '#27ae60' : '#e74c3c'}; font-weight: 600;">
                          ${data.commitmentDedicated ? '✅ Yes' : '❌ No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding: 20px; background: #ecf0f1; border-radius: 8px;">
                  <p style="color: #7f8c8d; font-size: 14px; margin: 0;">
                    Application submitted on: <strong>${new Date().toLocaleString('en-US', { 
                      timeZone: 'Asia/Tashkent',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</strong>
                  </p>
                  <p style="color: #7f8c8d; font-size: 12px; margin: 10px 0 0 0;">
                    The Start Academy - Admissions Team
                  </p>
                </div>
              </div>
            </div>
          `
        });

        // Send confirmation email
        if (resend) {
          try {
            console.log("Sending confirmation email to:", data.email);
            const confirmationResult = await resend.emails.send({
              from: process.env.FROM_EMAIL,
              to: [data.email],
              subject: "Application Received - The Start Academy",
              html: `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                  <div style="background: #000000; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <div style="color: white; font-size: 36px; font-weight: 600; margin-bottom: 20px;">TSa</div>
                    <h1 style="color: white; margin: 0; font-size: 28px;">Application Received!</h1>
                  </div>
                  
                  <div style="background: white; padding: 40px 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333; margin-top: 0;">Dear ${data.fullName},</h2>
                    
                    <p style="color: #666; line-height: 1.6; font-size: 16px;">
                      Thank you for applying to The Start Academy! We've successfully received your application and are excited to review your submission.
                    </p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h3 style="color: #333; margin-top: 0;">What happens next?</h3>
                      <ul style="color: #666; line-height: 1.6;">
                        <li>Our admissions team will carefully review your application</li>
                        <li>We'll evaluate your background, experience, and goals</li>
                        <li>You can expect to hear back from us within <strong>2-3 weeks</strong></li>
                      </ul>
                    </div>
                    
                    <p style="color: #666; line-height: 1.6; font-size: 16px;">
                      If you have any questions in the meantime, please don't hesitate to reach out to our team at <a href="mailto:olzhas@thestartacademy.com" style="color: #000000; text-decoration: none; font-weight: 600;">olzhas@thestartacademy.com</a>.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <p style="color: #999; font-size: 14px;">
                        Best regards,<br>
                        <strong>The Start Academy Team</strong>
                      </p>
                    </div>
                  </div>
                </div>
              `
            });
            
            console.log("Admin email sent:", adminResult);
            console.log("Confirmation email sent:", confirmationResult);
          } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Continue anyway - application is saved
          }
        } else {
          console.warn("Resend not configured - application saved but email not sent");
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue anyway - application is saved
      }
    } else {
      console.warn("Resend not configured - application saved but email not sent");
    }

    return NextResponse.json({ 
      success: true, 
      message: "Application submitted successfully" 
    });
    
  } catch (err) {
    console.error("/api/submit-application error:", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
