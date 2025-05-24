
import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Placeholder */}
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9]"></div>
            </div>
          </div>
        </div>
        
        {/* Company Name with Loading Animation */}
        <div className="text-4xl font-bold bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] bg-clip-text text-transparent mb-4">
          ANTLIA
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 h-2 mx-auto bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#e17a9] rounded-full animate-pulse loading-bar"></div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-4 text-gray-600 animate-pulse">
          Loading...
        </div>
      </div>
      
      <style jsx>{`
        .loading-bar {
          animation: loading 2s ease-in-out infinite;
        }
        
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
