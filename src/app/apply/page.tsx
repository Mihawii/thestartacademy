"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import { Footer } from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, X, AlertCircle } from "lucide-react";

export default function ApplyPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark' || theme === undefined;

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    age: "",
    location: "",
    
    // Education
    currentEducation: "",
    institution: "",
    major: "",
    graduationYear: "",
    
    // Experience
    workExperience: "",
    entrepreneurialExperience: "",
    technicalSkills: "",
    
    // Essays
    whyProgram: "",
    careerGoals: "",
    biggestChallenge: "",
    uniqueContribution: "",
    
    
    // Program Specific
    programGoals: "",
    financialAid: "",
    
    // Commitment
    commitmentSerious: false,
    commitmentDedicated: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    setIsSubmitting(true);
    
    try {
      console.log('Sending form data:', formData);
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }
      
      // Show success animation
      setShowSuccess(true);
      
      // Reset form and redirect after delay
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          age: "",
          location: "",
          currentEducation: "",
          institution: "",
          major: "",
          graduationYear: "",
          workExperience: "",
          entrepreneurialExperience: "",
          technicalSkills: "",
          whyProgram: "",
          careerGoals: "",
          biggestChallenge: "",
          uniqueContribution: "",
          programGoals: "",
          financialAid: "",
          commitmentSerious: false,
          commitmentDedicated: false
        });
        setShowSuccess(false);
        // Redirect to homepage
        window.location.href = '/';
      }, 4000);
      
    } catch (error) {
      console.error('Submission error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      
      // Show user-friendly error message
      if (errorMsg.includes('email address has already been submitted')) {
        setErrorMessage('This email address has already been used to submit an application. Each email can only be used once.');
      } else {
        setErrorMessage(`Failed to submit application: ${errorMsg}`);
      }
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.commitmentSerious && formData.commitmentDedicated && 
    formData.fullName && formData.email && formData.whyProgram && formData.careerGoals &&
    formData.age && formData.location && formData.currentEducation && formData.institution &&
    formData.programGoals && formData.financialAid;

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <MiniNavbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={20} />
              Back to Homepage
            </Link>
            
            <div className="text-center">
              <div className="mb-8 flex justify-center">
                <div className="h-24 md:h-32 w-auto flex items-center justify-center">
                  <div className={`text-4xl md:text-5xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                    TSa
                  </div>
                </div>
              </div>
              <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Take the first step towards building the next generation of startups. 
                Tell us about yourself and your entrepreneurial journey.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className={`rounded-3xl p-10 backdrop-blur-sm border shadow-2xl ${
              isDark 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="16"
                    max="35"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="25"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Location (City, Country) *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="San Francisco, USA"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Education</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Current Education Level *
                  </label>
                  <select
                    name="currentEducation"
                    value={formData.currentEducation}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Institution *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Stanford University"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Major/Field of Study
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Computer Science"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Expected Graduation Year
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    min="2024"
                    max="2030"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="2025"
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Experience</h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Work Experience (if any)
                  </label>
                  <textarea
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Describe your work experience, internships, or relevant jobs..."
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Entrepreneurial Experience
                  </label>
                  <textarea
                    name="entrepreneurialExperience"
                    value={formData.entrepreneurialExperience}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Any startups, side projects, or entrepreneurial ventures you've been involved in..."
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Technical Skills
                  </label>
                  <textarea
                    name="technicalSkills"
                    value={formData.technicalSkills}
                    onChange={handleInputChange}
                    rows={2}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Programming languages, frameworks, tools, etc..."
                  />
                </div>
              </div>
            </div>

            {/* Essays */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Essay Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Why do you want to join The Start Academy? * (150-250 words)
                  </label>
                  <textarea
                    name="whyProgram"
                    value={formData.whyProgram}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Explain your motivation, what draws you to entrepreneurship, and why this program specifically..."
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    What are your career goals and how will this program help you achieve them? * (100-200 words)
                  </label>
                  <textarea
                    name="careerGoals"
                    value={formData.careerGoals}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Describe your short-term and long-term career aspirations..."
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    What's the biggest challenge you've overcome? (100-150 words)
                  </label>
                  <textarea
                    name="biggestChallenge"
                    value={formData.biggestChallenge}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Tell us about a significant challenge and how you handled it..."
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    What unique perspective or contribution will you bring to the cohort? (75-125 words)
                  </label>
                  <textarea
                    name="uniqueContribution"
                    value={formData.uniqueContribution}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="What makes you different? What can you offer to your peers?"
                  />
                </div>
              </div>
            </div>


            {/* Program Specific */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Program Expectations</h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    What specific outcomes do you hope to achieve from this program? *
                  </label>
                  <textarea
                    name="programGoals"
                    value={formData.programGoals}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Skills, network, startup idea validation, funding, etc..."
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Financial Aid Consideration *
                  </label>
                  <select
                    name="financialAid"
                    value={formData.financialAid}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select your stance</option>
                    <option value="no-aid-needed">I can participate without financial aid</option>
                    <option value="aid-preferred">I would prefer financial aid but can participate without it</option>
                    <option value="aid-required">I require financial aid to participate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="mb-8">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Commitment Declaration</h2>
              
              <div className={`p-6 rounded-lg border-2 ${
                isDark 
                  ? 'bg-red-900/20 border-red-500/50' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-red-200' : 'text-red-800'
                }`}>
                  <strong>Important:</strong> The Start Academy is an intensive, highly selective program that requires significant time commitment and dedication. Please read carefully and check both boxes below to confirm your understanding and commitment.
                </p>
                
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="commitmentSerious"
                      checked={formData.commitmentSerious}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500"
                    />
                    <span className={`text-sm ${
                      isDark ? 'text-red-200' : 'text-red-800'
                    }`}>
                      I understand that The Start Academy is a serious, intensive program requiring 15-20 hours per week of dedicated work. I commit to prioritizing this program and attending all required sessions, workshops, and meetings. I understand that missing more than 2 sessions may result in removal from the program.
                    </span>
                  </label>
                  
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="commitmentDedicated"
                      checked={formData.commitmentDedicated}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500"
                    />
                    <span className={`text-sm ${
                      isDark ? 'text-red-200' : 'text-red-800'
                    }`}>
                      By checking this box, I hereby commit to fully participating in The Start Academy program if admitted. I understand this is a binding commitment and that my spot may be given to another candidate if I withdraw after acceptance. I am prepared to dedicate the necessary time and effort to succeed in this program.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`relative px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden backdrop-blur-sm border ${
                  isFormValid && !isSubmitting
                    ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 shadow-2xl'
                    : 'bg-gray-400/50 border-gray-500/50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting Application...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </span>
              </button>
              
              {!isFormValid && (
                <p className={`mt-4 text-sm ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  Please fill in all required fields and check both commitment boxes to submit your application.
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
      
      {/* Success Animation Screen */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50"
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  scale: 0 
                }}
                animate={{ 
                  y: -100,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center z-10 max-w-2xl mx-4"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="text-3xl md:text-4xl font-semibold text-white mx-auto">
                TSa
              </div>
            </motion.div>

            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              className="w-24 h-24 mx-auto mb-8 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
            >
              <motion.svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Application Submitted!
            </motion.h1>
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xl text-white/90 mb-8 leading-relaxed"
            >
              Thank you for applying to The Start Academy. We've received your application and are excited to review your submission.
            </motion.p>
            
            {/* Info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">✉️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Check Your Email</h3>
                <p className="text-white/80 text-sm">Confirmation sent to your inbox</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-lg font-semibold text-white mb-2">Response Timeline</h3>
                <p className="text-white/80 text-sm">Expect to hear back within 2-3 weeks</p>
              </div>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="text-white/60 text-sm"
            >
              <p>Redirecting you back to the homepage...</p>
              <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-white/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowErrorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`max-w-md w-full p-6 rounded-2xl shadow-2xl ${
                isDark 
                  ? 'bg-gray-900 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Application Error
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {errorMessage}
                  </p>
                </div>
                
                <button
                  onClick={() => setShowErrorModal(false)}
                  className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
                    isDark 
                      ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDark
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}
