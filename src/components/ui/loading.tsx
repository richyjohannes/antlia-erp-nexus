
import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Company Logo */}
        <div className="mb-8 animate-pulse">
          <div 
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-middle), var(--gradient-end))'
            }}
          >
            A
          </div>
        </div>
        
        {/* Company Name with Loading Animation */}
        <div className="mb-8">
          <h1 
            className="text-4xl font-bold bg-clip-text text-transparent mb-4"
            style={{
              background: 'linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))'
            }}
          >
            ANTLIA
          </h1>
          <p className="text-gray-600 text-lg">Enterprise Resource Planning</p>
        </div>
        
        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full animate-loading-bar"
              style={{
                background: 'linear-gradient(to right, var(--gradient-start), var(--gradient-middle), var(--gradient-end))'
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-4 animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
}
