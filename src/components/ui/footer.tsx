import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 relative bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6">
        
        {/* Big TSA Text */}
        <div className="mb-12 relative z-10">
          <h2 className="text-8xl md:text-9xl font-bold tracking-tight text-black dark:text-white">
            TSA
          </h2>
        </div>
        
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <div className="md:col-span-1">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Empowering the next generation of entrepreneurs with cutting-edge AI tools 
              and proven startup methodologies.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Program
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#overview" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Overview
                </a>
              </li>
              <li>
                <a href="#dates" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Important Dates
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm border-gray-200 text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <p>&copy; 2024 The Start Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
