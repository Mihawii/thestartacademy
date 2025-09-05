"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { PluraLogo } from "@/components/ui/plura-logo";

export const PluraAISection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || theme === undefined;

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-black to-gray-900' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block rounded-full px-6 py-2 mb-6 border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className={`font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Starting from next cohort</span>
          </div>
          <div className="flex items-center justify-center mb-6">
            <h2 className={`text-4xl md:text-5xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Introducing <span className="plura-gradient-text">Plura AI</span>
            </h2>
            <PluraLogo className="ml-0.5" />
          </div>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Product and feature validation through AI-powered community simulation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Product Launch Simulation
            </h3>
            <p className={`text-lg leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Before you launch that product or feature, validate it with our AI community simulation. 
              Plura AI creates realistic user personas and tracks their engagement and willingness to pay.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark ? 'bg-red-400' : 'bg-red-500'
                }`}></div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>AI Persona Communities</h4>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Simulate realistic user communities with diverse personas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark ? 'bg-orange-400' : 'bg-orange-500'
                }`}></div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Influence Score Tracking</h4>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Track how different individuals influence community decisions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Willingness to Pay</h4>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Measure community interest and payment likelihood</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark ? 'bg-blue-400' : 'bg-blue-500'
                }`}></div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Feature Validation</h4>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Test product features before development investment</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl p-8 backdrop-blur-sm border border-white/10 bg-white/5">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    isDark ? 'bg-blue-400' : 'bg-blue-500'
                  }`}></div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Product Validation Running</span>
                </div>
                
                <div className={`rounded-lg p-4 font-mono text-sm ${
                  isDark ? 'bg-black/40' : 'bg-white/60'
                }`}>
                  <div className={`mb-2 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>🚀 Simulating: Premium feature launch</div>
                  <div className={`mb-1 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`}>👥 AI personas: 247 active</div>
                  <div className={`mb-1 ${
                    isDark ? 'text-orange-400' : 'text-orange-600'
                  }`}>💰 Willingness to pay: 68% positive</div>
                  <div className={`mb-1 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>⭐ Influence leaders: 12 identified</div>
                  <div className={isDark ? 'text-blue-400' : 'text-blue-600'}>📊 Validation score: 8.4/10</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>247</div>
                    <div className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>AI Personas</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}>8.4</div>
                    <div className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>Validation Score</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="max-w-2xl mx-auto mb-8">
            <p className={`text-lg mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join the next cohort and get exclusive access to Plura AI's validation platform. 
              Test your products and features before launch with confidence.
            </p>
          </div>
          <Link href="/apply" className={`group relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 inline-block overflow-hidden ${
            isDark 
              ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20' 
              : 'bg-white/10 backdrop-blur-sm border border-gray-300 text-gray-900 hover:bg-white/20'
          }`}>
            <span className="relative z-10 whitespace-nowrap">Apply</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
