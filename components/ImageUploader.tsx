import React from 'react';
import { Camera, Upload, Target, Loader2 } from 'lucide-react';
import { AppStatus } from '../types';

interface ImageUploaderProps {
  selectedImage: string | null;
  status: AppStatus;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectSample: (url: string) => void;
  runAnalysis: () => Promise<void>;
  samples: { id: string; label: string; url: string }[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedImage,
  status,
  fileInputRef,
  handleFileChange,
  selectSample,
  runAnalysis,
  samples,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
      
      <h2 className="text-xl font-black mb-8 flex items-center gap-3 text-white tracking-tight uppercase">
        <Camera className="w-6 h-6 text-emerald-400" />
        Input Your Form
      </h2>

      <div className="relative aspect-video bg-emerald-950/40 rounded-3xl overflow-hidden border border-white/5 flex flex-col items-center justify-center transition-all duration-500 group-hover:border-emerald-500/30 group-hover:bg-emerald-950/20 shadow-inner">
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className="w-full h-full object-contain" />
        ) : (
          <div className="text-center p-8">
            <div className="bg-emerald-500/10 p-6 rounded-full inline-block mb-6 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
              <Upload className="w-10 h-10 text-emerald-400" />
            </div>
            <p className="text-white font-bold text-xl tracking-wide">UPLOAD IMAGE</p>
            <p className="text-sm text-emerald-400/60 mt-2 font-medium">Cameras or Files are supported</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          capture="environment"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/30"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/30"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/30"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/30"></div>
      </div>

      <div className="mt-8">
        <p className="text-[10px] font-black text-emerald-500/70 mb-4 ml-1 uppercase tracking-[0.3em]">Quick Samples</p>
        <div className="flex flex-wrap gap-2">
          {samples.map(sample => (
            <button
              key={sample.id}
              onClick={() => selectSample(sample.url)}
              className="px-5 py-2.5 bg-white/5 hover:bg-emerald-500/20 text-emerald-100 rounded-2xl text-xs font-black transition-all border border-white/5 hover:border-emerald-500/30 uppercase tracking-widest active:scale-95"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={runAnalysis}
        disabled={!selectedImage || status === AppStatus.ANALYZING}
        className={`w-full mt-10 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all duration-300 shadow-2xl tracking-tighter uppercase relative overflow-hidden group/btn ${
          !selectedImage || status === AppStatus.ANALYZING
            ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
            : 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
        {status === AppStatus.ANALYZING ? (
          <>
            <Loader2 className="w-7 h-7 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Target className="w-7 h-7" />
            AI RUN ANALYSIS
          </>
        )}
      </button>
    </div>
  );
};
