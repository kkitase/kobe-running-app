import React from 'react';
import { Sparkles, RefreshCcw, Loader2 } from 'lucide-react';
import { AppStatus } from '../types';

interface StatusDisplayProps {
  status: AppStatus;
  error: string | null;
  runAnalysis: () => Promise<void>;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, error, runAnalysis }) => {
  if (status === AppStatus.ERROR) {
    return (
      <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 p-10 rounded-[2.5rem] text-red-200 flex flex-col items-center gap-8 shadow-2xl min-h-[500px] justify-center text-center">
        <div className="bg-red-500/20 p-6 rounded-full border border-red-500/30 shadow-2xl shadow-red-500/20">
          <RefreshCcw className="w-10 h-10 text-red-400" />
        </div>
        <div>
          <h3 className="text-2xl font-black mb-3 tracking-tight text-white uppercase">Analysis Failed</h3>
          <p className="font-medium text-red-300/80 leading-relaxed max-w-sm">{error}</p>
        </div>
        <button 
          onClick={runAnalysis}
          className="px-10 py-4 bg-red-500 text-white font-black rounded-[2rem] hover:bg-red-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest border border-red-400/20"
        >
          RETRY ANALYSIS
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-12 shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center h-full min-h-[500px]">
      <div className="relative group">
        <div className="absolute -inset-8 bg-emerald-500/20 rounded-full animate-pulse blur-2xl group-hover:bg-emerald-400/30 transition-all duration-1000"></div>
        <div className="relative bg-emerald-500/10 p-10 rounded-full border border-emerald-500/20 shadow-inner">
          {status === AppStatus.ANALYZING ? (
            <Loader2 className="w-20 h-20 text-emerald-400 animate-spin" />
          ) : (
            <Sparkles className="w-20 h-20 text-emerald-300 animate-pulse" />
          )}
        </div>
      </div>
      <h3 className="text-3xl font-black text-white mt-12 mb-4 tracking-tighter uppercase italic">
        {status === AppStatus.ANALYZING ? "Coach Analyzing" : "Coach Standing By"}
      </h3>
      <p className="text-emerald-100/40 max-w-sm font-medium leading-relaxed tracking-wide">
        {status === AppStatus.ANALYZING 
          ? "Calculating pose, joint angles, and balance points via Sport-Science AI." 
          : "Upload your running form image and let AI analyze your mechanics with scientific precision."}
      </p>
    </div>
  );
};
