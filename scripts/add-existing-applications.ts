import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

// Sample applications - replace with your actual data
const existingApplications = [
  {
    fullName: "John Doe",
    email: "john@example.com",
    age: 17,
    location: "Tashkent, Uzbekistan",
    currentEducation: "High School",
    institution: "International School",
    whyProgram: "I want to learn entrepreneurship",
    careerGoals: "Start my own tech company",
    programGoals: "Gain business skills",
    financialAid: "Yes, I need financial assistance",
    commitmentSerious: true,
    commitmentDedicated: true,
    createdAt: new Date("2024-12-01"), // Adjust dates as needed
  },
  // Add more applications here...
];

async function addExistingApplications() {
  console.log("Adding existing applications to database...");
  
  for (const app of existingApplications) {
    try {
      const created = await prisma.application.create({
        data: app
      });
      console.log(`✅ Added application: ${created.fullName} (${created.email})`);
    } catch (error) {
      console.error(`❌ Failed to add ${app.fullName}:`, error);
    }
  }
  
  console.log("Finished adding applications");
  await prisma.$disconnect();
}

addExistingApplications().catch(console.error);
