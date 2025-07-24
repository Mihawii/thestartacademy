import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const adminEmail = 'contact@thestartacademy.com';

export async function POST(req: NextRequest) {
  if (!fromEmail) {
    console.error('FROM_EMAIL environment variable is not set.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. Send a welcome email to the new subscriber
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to The Start Academy!',
      html: `<h1>Welcome!</h1><p>Thank you for subscribing to The Start Academy's announcements. We'll keep you updated with the latest news and program dates.</p>`,
    });

    // 2. Send a notification email to the admin
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: 'New Subscriber Alert',
      html: `<p>A new user has subscribed for announcements: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });

  } catch (error) {
    const err = error as { name?: string; message?: string };
    console.error('Subscription API error:', err);

    // Handle cases where the user might already be subscribed or other email sending issues
    if (err.name === 'validation_error') {
      return NextResponse.json({ error: 'Invalid email address format.' }, { status: 400 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
