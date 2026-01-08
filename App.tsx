import React from 'react';
import { useRunningAnalysis } from './hooks/useRunningAnalysis';
import { AppStatus } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { StatusDisplay } from './components/StatusDisplay';
import { AnalysisResultDisplay } from './components/AnalysisResultDisplay';

const App: React.FC = () => {
  const {
    selectedImage,
    status,
    error,
    analysis,
    isPlayingAudio,
    showCopySuccess,
    fileInputRef,
    handleFileChange,
    selectSample,
    runAnalysis,
    handleShare,
    playAnalysisAudio,
    samples
  } = useRunningAnalysis();

  return (
    <div className="min-h-screen bg-[#052e16] text-[#f1f5f9] selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Graphic */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#052e16]/80 to-[#052e16]"></div>
        <img 
          src="./miyabi_bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-[#052e16]/20 backdrop-blur-[2px]"></div>
      </div>

      <Header 
        status={status}
        analysis={analysis}
        isPlayingAudio={isPlayingAudio}
        showCopySuccess={showCopySuccess}
        handleShare={handleShare}
        playAnalysisAudio={playAnalysisAudio}
      />

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Input */}
        <section className="lg:col-span-5 space-y-8">
          <div className="space-y-2 mb-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
              MASTER YOUR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">RUNNING FORM.</span>
            </h2>
            <p className="text-emerald-200/40 font-bold tracking-widest uppercase text-sm">Artificial Intelligence Training Partner</p>
          </div>
          
          <ImageUploader 
            selectedImage={selectedImage}
            status={status}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            selectSample={selectSample}
            runAnalysis={runAnalysis}
            samples={samples}
          />
        </section>

        {/* Right Column: Analysis Output */}
        <section className="lg:col-span-7">
          {status === AppStatus.SUCCESS && analysis ? (
            <AnalysisResultDisplay 
              analysis={analysis}
              showCopySuccess={showCopySuccess}
              handleShare={handleShare}
            />
          ) : (
            <StatusDisplay 
              status={status}
              error={error}
              runAnalysis={runAnalysis}
            />
          )}
        </section>
      </main>

      <Footer />

      {/* Global Shimmer Animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default App;
