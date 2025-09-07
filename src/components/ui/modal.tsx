"use client";

import React from 'react';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border border-border rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

interface CustomEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (subject: string, message: string) => void;
  studentName: string;
}

export function CustomEmailModal({ isOpen, onClose, onSend, studentName }: CustomEmailModalProps) {
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (subject.trim() && message.trim()) {
      onSend(subject.trim(), message.trim());
      setSubject('');
      setMessage('');
      onClose();
    }
  };

  const handleClose = () => {
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Send Custom Email to ${studentName}`}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter email subject..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Enter your message..."
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSend}
            disabled={!subject.trim() || !message.trim()}
            className="flex-1"
          >
            Send Email
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export function NotificationModal({ isOpen, onClose, title, message, type = 'info' }: NotificationModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className={`text-2xl ${getIconColor()}`}>
            {getIcon()}
          </div>
          <p className="text-foreground text-sm leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="pt-4">
          <Button onClick={onClose} className="w-full">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
}
