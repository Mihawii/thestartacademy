import React from 'react';

const AccessInfoPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="max-w-md text-center p-8 border border-gray-700 rounded-lg bg-gray-900/50 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Account Access</h1>
        <p className="text-gray-300">
          To access your account, please contact your designated mentor or instructor.
        </p>
        <p className="text-gray-400 mt-2 text-sm">
          They will provide you with the necessary credentials and instructions.
        </p>
      </div>
    </div>
  );
};

export default AccessInfoPage;
