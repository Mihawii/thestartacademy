import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Access Restricted</h1>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Your email address is not on the list of authorized users. 
          If you believe this is a mistake, please contact your mentor or instructor 
          to request access to the Start Academy platform.
        </p>
        <div className="mt-8">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
