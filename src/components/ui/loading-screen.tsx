'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Target, Lightbulb, Trophy } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  const educationIcons = [
    { Icon: BookOpen, delay: 0 },
    { Icon: GraduationCap, delay: 0.2 },
    { Icon: Users, delay: 0.4 },
    { Icon: Target, delay: 0.6 },
    { Icon: Lightbulb, delay: 0.8 },
    { Icon: Trophy, delay: 1.0 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    },
    visible: { 
      scale: [0, 1.2, 1], 
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.6, 1],
      } as any,
    },
  };

  const pulseVariants: Variants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      } as any,
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.2,
      },
    },
  };

  const progressVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2.5,
        delay: 1.5,
        ease: "easeInOut",
      } as any,
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-black" />
          </div>
        </motion.div>

        {/* Animated education icons in a circle */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {educationIcons.map(({ Icon, delay }, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={index}
                className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x - 24}px, ${y - 24}px)`,
                }}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay }}
              >
                <motion.div variants={pulseVariants} animate="pulse">
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center rotating element */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.div variants={textVariants} className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Preparing Your Learning Journey
          </h2>
          <p className="text-gray-400">
            Loading the best project management program in central Asia
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              variants={progressVariants}
            />
          </div>
          <motion.p
            className="text-sm text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            Almost ready...
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
