"use client";
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, Activity, BarChart3, PieChart } from 'lucide-react';

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
        score: 88,
        metrics: [
          { name: "순발력", value: 92, color: "#3b82f6" },
          { name: "근지구력", value: 85, color: "#10b981" },
          { name: "평형성", value: 78, color: "#f59e0b" }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans flex flex-col items-center">
      <header className="w-full max-w-md py-10 text-left">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="text-blue-500" size={24} />
          <h1 className="text-3xl font-black text-white tracking-tighter">SN PERFORMANCE</h1>
        </div>
        <p className="text-zinc-500 text-sm font-medium tracking-wide">AI ATHLETIC ANALYSIS SYSTEM</p>
      </header>

      <main className="w-full max-w-md space-y-6">
        {!result ? (
          <div className="bg-[#141414] border border-zinc-800 rounded-[2.5rem] p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
              <Upload className="text-blue-500" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">데이터 분석 시작</h2>
            <p className="text-zinc-500 text-sm mb-10 leading-relaxed">선수의 측정 결과지(PDF/이미지)를<br/>업로드하여 AI 분석을 진행하세요.</p>
            
            <input type="file" id="file-input" onChange={handleFileUpload} className="hidden" />
            <label htmlFor="file-input" className="group block w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-5 rounded-2xl cursor-pointer transition-all mb-4 border border-zinc-700">
              <span className="group-hover:scale-105 transition-transform inline-block">
                {file ? file.name : "파일 선택하기"}
              </span>
            </label>

            {file && (
              <button onClick={startAnalysis} disabled={loading} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                {loading ? "데이터 정밀 분석 중..." : "AI 분석 실행"}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 총평 카드 */}
            <div className="bg-[#141414] border-l-4 border-blue-500 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3 text-blue-500">
                <CheckCircle2 size={18} />
                <span className="font-black text-xs tracking-widest uppercase">AI 종합 진단</span>
              </div>
              <p className="text-zinc-200 leading-relaxed font-semibold">{result.overallReview}</p>
            </div>

            {/* 메인 스코어 그래프 */}
            <div className="bg-[#141414] rounded-[2rem] p-8 border border-zinc-800 shadow-xl">
               <div className="flex justify-between items-center mb-8">
                  <div>
                    <p className="text-zinc-500 text-xs font-bold mb-1 uppercase tracking-tighter">Performance</p>
                    <h3 className="text-xl font-bold">종합 스코어</h3>
                  </div>
                  <div className="text-5xl font-black text-blue-500 italic">{result.score}</div>
               </div>
               
               {/* 상세 데이터 바 그래프 */}
               <div className="space-y-6">
                 {result.metrics.map((m, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-xs font-bold px-1">
                       <span className="text-zinc-400">{m.name}</span>
                       <span style={{color: m.color}}>{m.value}%</span>
                     </div>
                     <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                       <div 
                         className="h-full rounded-full transition-all duration-1000 ease-out" 
                         style={{ width: `${m.value}%`, backgroundColor: m.color }}
                       ></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <button onClick={() => setResult(null)} className="w-full py-6 text-zinc-600 font-bold hover:text-blue-500 transition-colors text-sm uppercase tracking-widest">
              ← 다시 분석하기
            </button>
          </div>
        )}
      </main>
      
      <footer className="mt-10 py-6 text-zinc-700 text-[10px] font-bold tracking-widest">
        SN PERFORMANCE TECHNOLOGY © 2026
      </footer>
    </div>
  );
}
