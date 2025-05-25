
import React from 'react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo with 3D Animation */}
        <div className="mb-8 relative">
          <div className="animate-[spin_3s_ease-in-out_infinite] transform-gpu">
            <img 
              src="/assets/image/logo.png" 
              alt="Antlia Logo" 
              className="h-24 w-24 mx-auto drop-shadow-2xl animate-pulse"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#cb4848] flex items-center justify-center drop-shadow-2xl animate-pulse">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#cb4848]"></div>
              </div>
            </div>
          </div>
          
          {/* Floating particles around logo */}
          <div className="absolute inset-0 -m-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#38b6ff] rounded-full opacity-60 animate-ping"
                style={{
                  left: `${20 + Math.cos(i * Math.PI / 4) * 60}px`,
                  top: `${20 + Math.sin(i * Math.PI / 4) * 60}px`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Animated Company Name */}
        <div className="relative mb-8">
          <div className="text-5xl font-bold mb-4 overflow-hidden">
            {'ANTLIA'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block animate-bounce"
                style={{
                  color: '#38b6ff',
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1.5s',
                  textShadow: '0 0 20px rgba(56, 182, 255, 0.5)'
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* Flowing underline */}
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#cb4848] rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-white/30 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        
        {/* Enhanced Loading Bar */}
        <div className="w-80 h-3 mx-auto bg-gray-200 rounded-full overflow-hidden relative shadow-lg">
          <div className="h-full bg-gradient-to-r from-[#05b2fd] via-[#6f42c1] to-[#cb4848] rounded-full absolute animate-[loading_2.5s_ease-in-out_infinite] shadow-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
        </div>
        
        {/* Loading Text with Typewriter Effect */}
        <div className="mt-6 text-[#38b6ff] animate-pulse font-medium text-lg">
          <span className="animate-[typewriter_4s_ease-in-out_infinite]">
            Loading your workspace...
          </span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes typewriter {
          0%, 90%, 100% { width: 0; }
          30%, 60% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
