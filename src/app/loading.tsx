export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
        <p className="mt-4 text-white text-lg">Loading The Start Academy...</p>
      </div>
    </div>
  );
}
