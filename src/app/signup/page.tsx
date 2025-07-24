import Link from "next/link";

export const metadata = {
  title: "Apply – The Start Academy",
  description: "Submit your application for the upcoming TSA cohort.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen px-4 py-24 flex flex-col items-center bg-background text-foreground">
      <h1 className="text-4xl md:text-6xl font-semibold mb-8 text-center">Apply&nbsp;Now</h1>
      <p className="max-w-xl text-center text-lg md:text-xl mb-12">
        Our short form takes less than 5 minutes. Once submitted, you’ll receive an email with next steps and a link to request financial aid if needed.
      </p>
      <Link
        href="https://forms.gle/your-typeform-here"
        target="_blank"
        className="rounded-full bg-primary px-8 py-4 text-primary-foreground font-semibold text-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Open Application Form ↗
      </Link>
      <Link href="/" className="mt-6 text-sm underline hover:text-primary">
        ← Back to homepage
      </Link>
    </main>
  );
}
