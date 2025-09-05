import React from 'react';
import { Target, Star } from 'lucide-react';

export const MissionVision: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            Mission & Vision
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our commitment to transforming entrepreneurial education
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Mission Card */}
          <div className="relative">
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black dark:bg-white rounded-none">
                  <Target className="w-8 h-8 text-white dark:text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To democratize access to world-class entrepreneurship and project management education for high school students across Central Asia and beyond. We believe every ambitious young mind deserves the opportunity to transform their ideas into impactful ventures.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-none border border-black dark:border-white">
                  <div className="text-sm font-medium text-black dark:text-white">Empower the next generation of business leaders</div>
                </div>
                <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-none border border-black dark:border-white">
                  <div className="text-sm font-medium text-black dark:text-white">Bridge the gap between traditional education and real-world business skills</div>
                </div>
                <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-none border border-black dark:border-white">
                  <div className="text-sm font-medium text-black dark:text-white">Create a sustainable ecosystem of young entrepreneurs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative">
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black dark:bg-white rounded-none">
                  <Star className="w-8 h-8 text-white dark:text-black" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">Our Vision</h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                To become the global standard for youth entrepreneurship education, creating a world where every high school student has the tools, knowledge, and confidence to build the businesses and solutions of tomorrow.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-none border border-black dark:border-white">
                  <div className="text-sm font-medium text-black dark:text-white">Global leader in youth entrepreneurship</div>
                </div>
                <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-none border border-black dark:border-white">
                  <div className="text-sm font-medium text-black dark:text-white">Innovative educational methodologies</div>
                </div>
                <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-none border border-black dark:border-white">
                  <div className="text-sm font-medium text-black dark:text-white">Transformative impact on students worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
