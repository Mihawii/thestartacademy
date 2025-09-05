import React from 'react';
import Image from 'next/image';

export const OurStorySection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The vision behind Central Asia's premier business accelerator for high schoolers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-black dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">In 2025, Olzhas Mukhtarov</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    recognized a critical gap in Central Asia's educational landscape. While traditional education focused on theory, ambitious high schoolers lacked practical business skills.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-black dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">Drawing from his business strategy background</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Olzhas founded The Start Academy to bridge the gap between academic learning and real-world entrepreneurship for the next generation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-black dark:bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">Today, The Start Academy</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    transforms ambitious high schoolers into confident business leaders with the tools and network needed for entrepreneurial success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-none border-4 border-black dark:border-white flex items-center justify-center bg-white dark:bg-black shadow-2xl">
                <div className="text-center">
                  <div className="text-6xl font-bold text-black dark:text-white mb-2">2025</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Founded</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-black dark:bg-white rounded-none"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
