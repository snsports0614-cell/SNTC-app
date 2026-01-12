"use client";
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Activity } from 'lucide-react';

export default function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        playerName: "이선수",
        overallReview: "전반적인 근지구력은 우수하나, 왼쪽 하체 유연성이 오른쪽 대비 15% 부족합니다. 맞춤형 보강 훈련이 필요합니다.",
        score: 88
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col items-center">
      <header className="w-full max-w-md py-8">
        <h1 className="text-3xl font-black text-blue-500 italic">SN PERFORMANCE</h1>
        <p className="text-zinc-500 text-sm">AI-Powered Athletic Analysis</p>
      </header>

      <main className="w-full max-w-md">
        {!result ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="text-blue-500" size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-zinc-100">측정 결과 업로드</h2>
            <p className="text-zinc-500 text-sm mb-8">분석할 PDF 또는 사진을 선택하세요</p>
            
            <input type="file" id="file-input" onChange={handleFileUpload} className="hidden" />
            <label htmlFor="file-input" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl cursor-pointer transition-all mb-4">
              {file ? file.name : "파일 선택하기"}
            </label>

            {file && (
              <button onClick={startAnalysis} disabled={loading} className="w-full bg-zinc-100 text-black font-bold py-4 rounded-2xl hover:bg-white transition-all">
                {loading ? "AI 분석 중..." : "AI 분석 시작하기"}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-zinc-900 border-l-4 border-blue-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="text-blue-500" size={20} />
                <span className="text-blue-500 font-bold text-sm tracking-wider uppercase">AI 분석 총평</span>
              </div>
              <p className="text-zinc-200 leading-relaxed font-medium">{result.overallReview}</p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <div className="text-center mb-6">
                <p className="text-zinc-500 text-sm mb-1 font-bold">Performance Score</p>
                <div className="text-6xl font-black text-white">{result.score}</div>
              </div>
              <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${result.score}%` }}></div>
              </div>
            </div>

            <button onClick={() => setResult(null)} className="w-full py-4 text-zinc-500 font-bold hover:text-zinc-300 transition-colors">
              새로운 파일 분석하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
