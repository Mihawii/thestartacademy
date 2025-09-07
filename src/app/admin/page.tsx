"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { CustomEmailModal, NotificationModal } from '@/components/ui/modal';
import { FinancialAidModal } from '@/components/ui/financial-aid-modal';

interface Application {
  id: string;
  fullName: string;
  email: string;
  age: number;
  location: string;
  currentEducation: string;
  institution: string;
  major?: string;
  graduationYear?: number;
  workExperience?: string;
  entrepreneurialExperience?: string;
  technicalSkills?: string;
  whyProgram: string;
  careerGoals: string;
  biggestChallenge?: string;
  uniqueContribution?: string;
  programGoals: string;
  financialAid: string;
  commitmentSerious: boolean;
  commitmentDedicated: boolean;
  createdAt: string;
  status?: 'pending' | 'accepted' | 'rejected' | 'deferred' | 'waitlisted';
}

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [customEmailModal, setCustomEmailModal] = useState<{ isOpen: boolean; application: Application | null }>({ isOpen: false, application: null });
  const [financialAidModal, setFinancialAidModal] = useState<{ isOpen: boolean; application: Application | null }>({ isOpen: false, application: null });
  const [notificationModal, setNotificationModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' }>({ isOpen: false, title: '', message: '', type: 'info' });
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/admin/login';
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/applications', {
        cache: 'no-store' // Ensure fresh data
      });
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        console.error('Failed to fetch applications:', response.status);
        setApplications([]);
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (application: Application, type: string, customData?: { subject: string; message: string; financialAidAmount?: string }) => {
    setSendingEmail(application.id);
    try {
      const endpoint = `/api/admin/send-${type}`;
      const body = {
        applicationId: application.id,
        studentEmail: application.email,
        studentName: application.fullName,
        ...customData
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Update application status locally
        const statusMap: { [key: string]: string } = {
          'acceptance': 'accepted',
          'acceptance-with-aid': 'accepted',
          'rejection': 'rejected',
          'deferral': 'deferred',
          'waitlist': 'waitlisted',
          'custom': application.status || 'pending'
        };
        
        setApplications(prev => 
          prev.map(app => 
            app.id === application.id 
              ? { ...app, status: statusMap[type] as any }
              : app
          )
        );
        setNotificationModal({
          isOpen: true,
          title: 'Email Sent Successfully',
          message: `${type.charAt(0).toUpperCase() + type.slice(1)} email sent to ${application.fullName}!`,
          type: 'success'
        });
      } else {
        setNotificationModal({
          isOpen: true,
          title: 'Email Failed',
          message: `Failed to send ${type} email`,
          type: 'error'
        });
      }
    } catch (error) {
      console.error(`Error sending ${type} email:`, error);
      setNotificationModal({
        isOpen: true,
        title: 'Email Error',
        message: `Error sending ${type} email`,
        type: 'error'
      });
    } finally {
      setSendingEmail(null);
    }
  };

  const sendCustomEmail = async (application: Application) => {
    setCustomEmailModal({ isOpen: true, application });
  };

  const sendAcceptanceWithAid = async (application: Application) => {
    setFinancialAidModal({ isOpen: true, application });
  };

  const handleFinancialAidSend = async (financialAidAmount: string) => {
    if (financialAidModal.application) {
      await sendEmail(financialAidModal.application, 'acceptance-with-aid', { subject: '', message: '', financialAidAmount });
    }
  };

  const handleCustomEmailSend = async (subject: string, message: string) => {
    if (customEmailModal.application) {
      await sendEmail(customEmailModal.application, 'custom', { subject, message });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage applications and send decision emails</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">
              Applications ({applications.length})
            </h2>
          </div>

          <div className="divide-y">
            {applications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No applications found
              </div>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {application.fullName}
                      </h3>
                      <p className="text-muted-foreground">{application.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {application.age} years old • {application.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {application.status && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          application.status === 'accepted' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : application.status === 'rejected'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : application.status === 'deferred'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : application.status === 'waitlisted'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {application.status}
                        </span>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => sendEmail(application, 'acceptance')}
                          disabled={sendingEmail === application.id}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5"
                          size="sm"
                        >
                          Accept (No Aid)
                        </Button>
                        <Button
                          onClick={() => sendAcceptanceWithAid(application)}
                          disabled={sendingEmail === application.id}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5"
                          size="sm"
                        >
                          Accept (With Aid)
                        </Button>
                        <Button
                          onClick={() => sendEmail(application, 'rejection')}
                          disabled={sendingEmail === application.id}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5"
                          size="sm"
                        >
                          Reject
                        </Button>
                        <Button
                          onClick={() => sendEmail(application, 'deferral')}
                          disabled={sendingEmail === application.id}
                          className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1.5"
                          size="sm"
                        >
                          Defer
                        </Button>
                        <Button
                          onClick={() => sendEmail(application, 'waitlist')}
                          disabled={sendingEmail === application.id}
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5"
                          size="sm"
                        >
                          Waitlist
                        </Button>
                        <Button
                          onClick={() => sendCustomEmail(application)}
                          disabled={sendingEmail === application.id}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5"
                          size="sm"
                        >
                          Custom
                        </Button>
                      </div>

                      {sendingEmail === application.id && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                          Sending...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Education:</strong> {application.currentEducation}</p>
                      <p><strong>Institution:</strong> {application.institution}</p>
                      {application.major && <p><strong>Major:</strong> {application.major}</p>}
                      {application.graduationYear && <p><strong>Graduation:</strong> {application.graduationYear}</p>}
                    </div>
                    <div>
                      <p><strong>Financial Aid:</strong> {application.financialAid}</p>
                      <p><strong>Serious Commitment:</strong> {application.commitmentSerious ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 ml-2">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : '❌'}</p>
                      <p><strong>Dedicated Commitment:</strong> {application.commitmentDedicated ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 ml-2">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      ) : '❌'}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <strong className="text-foreground">Why this program:</strong>
                      <p className="text-muted-foreground text-sm mt-1">{application.whyProgram}</p>
                    </div>
                    <div>
                      <strong className="text-foreground">Career goals:</strong>
                      <p className="text-muted-foreground text-sm mt-1">{application.careerGoals}</p>
                    </div>
                    <div>
                      <strong className="text-foreground">Program goals:</strong>
                      <p className="text-muted-foreground text-sm mt-1">{application.programGoals}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    Applied: {new Date(application.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Custom Email Modal */}
      <CustomEmailModal
        isOpen={customEmailModal.isOpen}
        onClose={() => setCustomEmailModal({ isOpen: false, application: null })}
        onSend={handleCustomEmailSend}
        studentName={customEmailModal.application?.fullName || ''}
      />

      {/* Financial Aid Modal */}
      <FinancialAidModal
        isOpen={financialAidModal.isOpen}
        onClose={() => setFinancialAidModal({ isOpen: false, application: null })}
        onSend={handleFinancialAidSend}
        studentName={financialAidModal.application?.fullName || ''}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false, title: '', message: '', type: 'info' })}
        title={notificationModal.title}
        message={notificationModal.message}
        type={notificationModal.type}
      />
    </div>
  );
}
