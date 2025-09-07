'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      console.log('Login response:', response.status, data);
      
      if (response.ok) {
        console.log('Setting token:', data.token);
        localStorage.setItem('admin_token', data.token);
        // Set cookie for middleware
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Strict; Secure=false`;
        console.log('Login successful, redirecting to /admin');
        
        // Add a small delay to ensure cookie is set
        setTimeout(() => {
          window.location.href = '/admin';
        }, 100);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg border p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">The Start Academy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme:</span>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-sm px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          {error && (
            <div className="text-destructive text-sm text-center p-2 bg-destructive/10 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors ${
              theme === 'dark' 
                ? 'bg-white text-black hover:bg-gray-100' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
