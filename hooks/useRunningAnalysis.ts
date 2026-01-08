import { useState, useRef } from "react";
import { AppStatus, AnalysisResult } from "../types";
import {
  analyzeForm,
  generateSpeech,
  decodeBase64,
  decodeAudioData,
} from "../services/geminiService";

export const useRunningAnalysis = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStatus(AppStatus.IDLE);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (url: string) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          setStatus(AppStatus.IDLE);
          setAnalysis(null);
        };
        reader.readAsDataURL(blob);
      });
  };

  const runAnalysis = async () => {
    if (!selectedImage) return;

    setStatus(AppStatus.ANALYZING);
    setAnalysis(null);
    setError(null);

    try {
      const base64Data = selectedImage.split(",")[1];
      const result = await analyzeForm(base64Data);
      setAnalysis(result);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError(
        "分析中にエラーが発生しました。インターネット接続や画像形式を確認してください。"
      );
      setStatus(AppStatus.ERROR);
    }
  };

  const playAnalysisAudio = async () => {
    if (!analysis || isPlayingAudio) return;

    setIsPlayingAudio(true);
    try {
      const fullText = `まずはフォームの改善アドバイスです。${analysis.advice}。次に、おすすめの練習メニューです。${analysis.training}`;
      const base64Audio = await generateSpeech(fullText);
      const audioData = decodeBase64(base64Audio);

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      const buffer = await decodeAudioData(audioData, audioContextRef.current);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsPlayingAudio(false);
      source.start();
    } catch (err) {
      console.error(err);
      setIsPlayingAudio(false);
      alert("音声の生成に失敗しました。");
    }
  };

  const handleShare = async () => {
    if (!analysis) return;

    const shareText = `【フォームチェッカー診断結果】\n\n■アドバイス\n${analysis.advice}\n\n■特訓ドリル\n${analysis.training}\n\n#フォームチェッカー #ランニング #AIコーチ`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "フォームチェッカー診断結果",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Sharing failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      } catch (err) {
        alert("クリップボードへのコピーに失敗しました。");
      }
    }
  };

  const samples = [
    { id: '1', label: 'Road Running', url: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=800' },
    { id: '2', label: 'Trail Run', url: 'https://images.unsplash.com/photo-1452626212852-811d58933cae?auto=format&fit=crop&q=80&w=800' },
    { id: '3', label: 'Posture Check', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800' },
  ];

  return {
    status,
    selectedImage,
    analysis,
    error,
    isPlayingAudio,
    showCopySuccess,
    fileInputRef,
    handleFileChange,
    selectSample,
    runAnalysis,
    playAnalysisAudio,
    handleShare,
    samples,
  };
};
