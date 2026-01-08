import React from 'react';
import { Trophy, Share2, Check, Loader2, Volume2 } from 'lucide-react';
import { AppStatus, AnalysisResult } from '../types';

interface HeaderProps {
  status: AppStatus;
  analysis: AnalysisResult | null;
  isPlayingAudio: boolean;
  showCopySuccess: boolean;
  handleShare: () => Promise<void>;
  playAnalysisAudio: () => Promise<void>;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  analysis,
  isPlayingAudio,
  showCopySuccess,
  handleShare,
  playAnalysisAudio,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 flex justify-between items-center transition-all duration-300 bg-emerald-950/30 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20">
          <Trophy className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-black text-white tracking-tight leading-none">FORM CHECKER</h1>
          <span className="text-[10px] font-bold text-emerald-400 tracking-[0.2em] mt-1">AI SPORTS COACH</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {status === AppStatus.SUCCESS && analysis && (
          <>
            <button 
              onClick={handleShare}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all font-bold shadow-xl active:scale-95 border border-white/10 ${
                showCopySuccess 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              {showCopySuccess ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5 text-emerald-400" />}
              <span className="hidden sm:inline">{showCopySuccess ? 'COPIED' : 'SHARE'}</span>
            </button>
            <button 
              onClick={playAnalysisAudio}
              disabled={isPlayingAudio}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all font-bold shadow-xl active:scale-95 border border-white/10 ${
                isPlayingAudio 
                  ? 'bg-amber-500/20 text-amber-500/50 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-amber-500/40 hover:scale-105'
              }`}
            >
              {isPlayingAudio ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />}
              <span className="hidden md:inline">LISTEN ADVICE</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};
