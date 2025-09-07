"use client";

import React, { useState } from 'react';
import { Button } from './button';

interface FinancialAidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (amount: string) => void;
  studentName: string;
}

export function FinancialAidModal({ isOpen, onClose, onSend, studentName }: FinancialAidModalProps) {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount.trim()) return;

    setIsSubmitting(true);
    try {
      await onSend(amount);
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Error sending financial aid:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Financial Aid Award
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Enter the financial aid amount for <strong>{studentName}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Financial Aid Amount (USD)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                  autoFocus
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter the amount in US Dollars (e.g., 5000 for $5,000 USD)
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !amount.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Acceptance with Financial Aid'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
