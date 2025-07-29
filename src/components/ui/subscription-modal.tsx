// 'use client';
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './button';
import { Input } from './input';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
    // Delay state reset to allow for exit animation
    setTimeout(() => {
      setEmail('');
      setIsLoading(false);
      setError(null);
      setSuccess(false);
    }, 300);
  }, [onClose]);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setSuccess(true);
      setTimeout(handleClose, 2000); // Auto-close on success

    } catch (error) {
      const err = error as { message?: string };
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-black border border-neutral-800 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl shadow-white/5 text-white"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {success ? (
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                <p className="text-neutral-400">You&apos;re on the list. We&apos;ll be in touch.</p>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
                <p className="text-neutral-400 mb-6">Enter your email to receive the latest announcements.</p>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSubscribe()}
                  className="bg-black border-neutral-700 text-white placeholder:text-neutral-600 focus:ring-white focus:border-white focus:ring-offset-black"
                  disabled={isLoading}
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="text-neutral-400 hover:bg-neutral-900 hover:text-white disabled:opacity-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    className="bg-brandGray text-white hover:bg-gray-700 disabled:bg-gray-500 disabled:text-gray-300"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
