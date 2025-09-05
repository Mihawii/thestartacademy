"use client";

// Large sign-in page with CanvasRevealEffect provided by user
// Wrapped in its own component to keep app/page clean.

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MiniNavbar } from "@/components/ui/mini-navbar";


// --- NOTE ---
// CanvasRevealEffect + DotMatrix + Shader code has been separated into
// src/components/auth/canvas-reveal-effect.tsx for readability.
// It is exactly the same as user supplied but modularised.
// ----------------

export const SignInPage: React.FC<{ className?: string }> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification code");
      }
      
      // Show development code in console only
      if (data.developmentCode) {
        console.log(`🔑 Development verification code: ${data.developmentCode}`);
      }
      
      setStep("code");
    } catch (error) {
      const err = error as { message?: string };
      setError(err.message || "Failed to send verification code. Please try again.");
      console.error("Email submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === "code") {
      setTimeout(() => codeInputRefs.current[0]?.focus(), 400);
    }
  }, [step]);

  const handleCodeChange = async (index: number, value: string) => {
    if (value.length > 1) return;
    
    // Update the code input
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }

    // Verify when full code is entered
    if (index === 5 && value && newCode.every((d) => d)) {
      setLoading(true);
      setError(null);
      
      try {
        const codeStr = newCode.join("");
        const res = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: codeStr }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || "Invalid or expired verification code");
        }
        
        // Show success state
        setReverseCanvasVisible(true);
        setTimeout(() => setInitialCanvasVisible(false), 50);
        setStep("success");
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          try {
            window.location.replace('https://tsa-platform-r129.vercel.app');
          } catch (error) {
            // Fallback if replace fails
            window.location.href = 'https://tsa-platform-r129.vercel.app';
          }
        }, 1500);
        
      } catch (error) {
      const err = error as { message?: string };
        // Show error and reset code input
        setError(err.message || "Verification failed. Please try again.");
        setCode(["", "", "", "", "", ""]);
        setTimeout(() => codeInputRefs.current[0]?.focus(), 100);
        console.error("Verification error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      codeInputRefs.current[i - 1]?.focus();
    }
  };

  const handleBack = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
    setInitialCanvasVisible(true);
    setReverseCanvasVisible(false);
  };

  return (
    <div className={cn("flex flex-col min-h-screen bg-black relative", className)}>
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,1)_0%,_transparent_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <MiniNavbar />
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          {/* Content Switcher */}
          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <EmailStep email={email} setEmail={setEmail} onSubmit={handleEmailSubmit} onGoogleSignIn={() => signIn('google')} />
              </motion.div>
            )}
            {step === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <CodeStep
                  code={code}
                  refs={codeInputRefs}
                  onChange={handleCodeChange}
                  onKeyDown={handleKeyDown}
                  onBack={handleBack}
                />
              </motion.div>
            )}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <SuccessStep />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

/* ---------------- sub components -------------- */
const EmailStep: React.FC<{
  onGoogleSignIn: () => void;
  email: string;
  setEmail: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({ email, setEmail, onSubmit, onGoogleSignIn }) => (
  <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6 text-center">
    <div className="space-y-1">
      <h1 className="text-4xl font-bold tracking-tight text-white">Welcome</h1>
      <p className="text-xl text-white/70 font-light">Sign in to continue</p>
    </div>
    <input
      type="email"
      placeholder="you@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full backdrop-blur text-white border border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border-white/30 text-center bg-white/5"
    />
    <button
      className="w-full rounded-full bg-brandGray text-white py-3 font-medium hover:bg-gray-700 transition-colors"
      type="submit"
    >
      Continue →
    </button>
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-white/20" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-black px-2 text-white/60">Or</span>
      </div>
    </div>
    <button
      type="button"
      onClick={onGoogleSignIn}
      className="w-full rounded-full border border-white/20 bg-transparent py-3 font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
    >
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.658-3.317-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C44.57,36.646,48,30.651,48,24C48,22.659,47.862,21.35,47.611,20.083z"></path>
</svg>
      Sign in with Google
    </button>
  </form>
);

const CodeStep: React.FC<{
  code: string[];
  refs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (i: number, v: string) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBack: () => void;
}> = ({ code, refs, onChange, onKeyDown, onBack }) => (
  <div className="w-full max-w-sm space-y-6 text-center">
    <h1 className="text-3xl font-bold text-white">Enter the code</h1>
    <div className="flex justify-center gap-2">
      {code.map((d, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          maxLength={1}
          value={d}
          onChange={(e) => onChange(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          className="w-10 h-12 text-center text-xl bg-transparent border-b border-white/30 text-white focus:outline-none"
        />
      ))}
    </div>
    <button
      onClick={onBack}
      className="text-sm text-white/60 underline-offset-4 hover:text-white"
    >
      ← Back
    </button>
  </div>
);

const SuccessStep: React.FC = () => (
  <div className="space-y-6 text-center">
    <h1 className="text-4xl font-bold text-white">You&apos;re in!</h1>
    <p className="text-lg text-white/60">Welcome to the dashboard</p>
    <Link
      href="/"
      className="rounded-full bg-brandGray text-white py-3 px-8 font-medium hover:bg-gray-700 transition-colors inline-block"
    >
      Home
    </Link>
  </div>
);
