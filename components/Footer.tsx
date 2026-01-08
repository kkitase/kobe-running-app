import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 text-center mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent opacity-50"></div>
      <div className="relative z-10">
        <div className="w-12 h-1 bg-emerald-500/30 mx-auto mb-8 rounded-full"></div>
        <p className="text-emerald-500/40 font-black text-xs tracking-[0.4em] uppercase">
          © 2024 FORM CHECKER | POWERED BY GEMINI AI
        </p>
        <div className="mt-4 text-[10px] text-emerald-900 font-bold tracking-[0.2em]">
          MIYABI PREMIUM DESIGN SYSTEM
        </div>
      </div>
    </footer>
  );
};
