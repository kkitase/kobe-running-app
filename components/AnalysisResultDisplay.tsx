import React from 'react';
import { Target, Dumbbell, Check, Share2, Sparkles } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultDisplayProps {
  analysis: AnalysisResult;
  showCopySuccess: boolean;
  handleShare: () => Promise<void>;
}

export const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({
  analysis,
  showCopySuccess,
  handleShare,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      {/* Result Card 1: Advice - Ivory Theme */}
      <div className="bg-[#fdfcf0] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#e5e7eb] transition-all hover:translate-y-[-8px] group">
        <div className="bg-gradient-to-r from-[#d9f99d] to-[#bef264] px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/40 p-2 rounded-xl backdrop-blur-md">
              <Target className="text-[#365314] w-7 h-7" />
            </div>
            <h3 className="text-[#365314] font-black text-2xl tracking-tight uppercase italic">Form Evolution</h3>
          </div>
          <span className="bg-[#365314]/10 text-[#365314] text-[10px] font-black px-4 py-1.5 rounded-full border border-[#365314]/10 uppercase tracking-[0.2em]">Coach Insight</span>
        </div>
        <div className="p-10">
          <p className="text-[#3f6212] leading-relaxed text-lg font-bold whitespace-pre-wrap opacity-90 first-letter:text-4xl first-letter:font-black first-letter:mr-1">
            {analysis.advice}
          </p>
        </div>
      </div>

      {/* Result Card 2: Training - Mint Theme */}
      <div className="bg-[#f0fdf4] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#d1fae5] transition-all hover:translate-y-[-8px] group">
        <div className="bg-gradient-to-r from-[#86efac] to-[#4ade80] px-10 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/40 p-2 rounded-xl backdrop-blur-md">
              <Dumbbell className="text-[#064e3b] w-7 h-7" />
            </div>
            <h3 className="text-[#064e3b] font-black text-2xl tracking-tight uppercase italic">Training Drill</h3>
          </div>
          <span className="bg-[#064e3b]/10 text-[#064e3b] text-[10px] font-black px-4 py-1.5 rounded-full border border-[#064e3b]/10 uppercase tracking-[0.2em]">Drill Plan</span>
        </div>
        <div className="p-10">
          <p className="text-[#065f46] leading-relaxed text-lg font-bold whitespace-pre-wrap opacity-90 first-letter:text-4xl first-letter:font-black first-letter:mr-1">
            {analysis.training}
          </p>
        </div>
      </div>
      
      {/* Premium Share Button */}
      <button 
        onClick={handleShare}
        className="w-full py-6 bg-emerald-950/40 border border-white/10 text-emerald-100 font-black rounded-[2rem] flex items-center justify-center gap-4 hover:bg-emerald-950/60 transition-all active:scale-95 shadow-2xl backdrop-blur-xl group mb-4 uppercase tracking-[0.1em]"
      >
        <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
          {showCopySuccess ? <Check className="w-6 h-6 text-emerald-400" /> : <Share2 className="w-6 h-6 text-emerald-400" />}
        </div>
        {showCopySuccess ? 'Analysis Copied to Clipboard' : 'Share Results with Coach'}
      </button>
    </div>
  );
};
