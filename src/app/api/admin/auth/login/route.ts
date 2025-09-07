import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// Admin credentials - in production, store these securely in database
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "Olzhas",
  passwordHash: process.env.ADMIN_PASSWORD_HASH || "$2b$12$uoFP1LeXKRFYYoHx0DaESOdhWrPIgbY6E90FuPM./hLqGPNngJmJy", // "1323345tzxc"
};

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = loginSchema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: "Invalid credentials format" 
      }, { status: 400 });
    }

    const { username, password } = parsed.data;

    // Rate limiting check (basic implementation)
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    console.log('Login attempt:', { username, password: password.substring(0, 3) + '***' });
    console.log('Expected username:', ADMIN_CREDENTIALS.username);
    console.log('Expected hash:', ADMIN_CREDENTIALS.passwordHash);

    // Verify username
    if (username !== ADMIN_CREDENTIALS.username) {
      console.log('Username mismatch');
      // Add delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ 
        error: "Invalid credentials" 
      }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Password mismatch');
      // Add delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ 
        error: "Invalid credentials" 
      }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username: username,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
      },
      JWT_SECRET,
      { 
        expiresIn: '24h',
        issuer: 'thestartacademy',
        audience: 'admin'
      }
    );

    // Log successful login
    console.log(`Admin login successful from IP: ${clientIP} at ${new Date().toISOString()}`);

    return NextResponse.json({ 
      success: true,
      token: token,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}
