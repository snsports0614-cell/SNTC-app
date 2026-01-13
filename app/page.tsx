"use client";
import React, { useState, useRef } from 'react';
import { Upload, Activity, Library, Users, Menu, Save, Globe, CheckCircle2, FileText } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('analysis');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAnalyze = () => {
    if (!playerName) return alert("선수 이름을 입력하세요");
    if (selectedFiles.length === 0) return alert("파일을 최소 1개 이상 선택하세요");
    
    setLoading(true);
    setTimeout(() => {
      setResult({
        overallReview: "전반적인 데이터 분석 결과, 좌우 밸런스 개선이 시급합니다.",
        testResults: [
          { name: "근지구력", val: 85, color: "#3b82f6" },
          { name: "유연성", val: 65, color: "#10b981" },
          { name: "순발력", val: 92, color: "#f59e0b" },
          { name: "민첩성", val: 78, color: "#8b5cf6" }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <aside className={`bg-[#0a0a0a] border-r border-[#1a1a1a] transition-all ${isMenuOpen ? 'w-64' : 'w-0'} overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-[#1a1a1a] font-black text-blue-500 italic text-xl">SN PERFORMANCE</div>
        <nav className="p-4 flex-1 space-y-2">
          <button onClick={() => setCurrentTab('analysis')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'analysis' ? 'bg-blue-600' : 'text-zinc-500'}`}><Activity size={18}/> 분석</button>
          <button onClick={() => setCurrentTab('search')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'search' ? 'bg-blue-600' : 'text-zinc-500'}`}><Library size={18}/> 보관함</button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-black overflow-hidden">
        <header className="p-4 border-b border-[#1a1a1a] flex items-center gap-4 bg-[#0a0a0a]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-zinc-900 rounded-lg">☰</button>
          <h2 className="font-black text-zinc-100 uppercase tracking-widest text-xs">Analysis Center</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-[#111] p-10 rounded-[2.5rem] border border-[#222] shadow-2xl space-y-6">
              <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-white outline-none focus:border-blue-600 font-bold" placeholder="선수 이름을 입력하세요" />
              
              {/* 다중 파일 선택 기능 (multiple 추가) */}
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
              <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-zinc-800 rounded-3xl p-10 bg-black/50 hover:border-blue-500 transition cursor-pointer text-center group">
                <Upload className="mx-auto mb-4 text-zinc-600 group-hover:text-blue-500" size={32} />
                <p className="text-zinc-500 font-bold">
                  {selectedFiles.length > 0 ? `총 ${selectedFiles.length}개의 파일 선택됨` : '측정 데이터 여러 장 선택 가능 (PDF/사진)'}
                </p>
              </div>

              <button onClick={handleAnalyze} disabled={loading} className="w-full bg-blue-600 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
                {loading ? 'AI 엔진 가동 중...' : '데이터 분석 시작'}
              </button>
            </div>

            {result && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#111] p-8 rounded-3xl border border-zinc-800 shadow-xl">
                  <h3 className="text-lg font-bold mb-8 text-blue-400 flex items-center gap-2 underline underline-offset-8">📊 지표 분석 그래프</h3>
                  <div className="space-y-10">
                    {result.testResults.map((r, i) => (
                      <div key={i} className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div><span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-zinc-400 bg-zinc-900">{r.name}</span></div>
                          <div className="text-right"><span className="text-xs font-black inline-block text-blue-500">{r.val}%</span></div>
                        </div>
                        <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-zinc-900">
                          <div style={{ width: `${r.val}%`, backgroundColor: r.color }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-zinc-100 text-black py-5 rounded-2xl font-black text-xl hover:bg-white transition flex items-center justify-center gap-2"><Globe size={20}/> HTML 리포트 저장</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
