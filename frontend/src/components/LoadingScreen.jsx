import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg mb-2">Loading Components...</p>
        <p className="text-gray-500 text-sm">
          Please wait while we prepare your interface
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
