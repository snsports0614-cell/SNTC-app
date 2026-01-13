"use client";
import React, { useState, useRef } from 'react';
import { Upload, Activity, Library, Users, Menu, Save, Globe, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('analysis');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // 분석 실행 함수
  const handleAnalyze = () => {
    if (!playerName) return alert("선수 이름을 입력하세요");
    setLoading(true);
    setTimeout(() => {
      setResult({
        overallReview: "전반적인 근지구력은 우수하나, 왼쪽 하체 유연성이 오른쪽 대비 15% 부족합니다.\n노르딕 컬 및 스트레칭 보강이 필요합니다.",
        testResults: [
          { testName: "근지구력", left: 85, right: 82, unit: "점", analysis: "좌우 균형이 아주 좋습니다." },
          { testName: "순발력", left: 95, right: 90, unit: "점", analysis: "폭발적인 힘을 보유하고 있습니다." }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  // HTML 다운로드 함수
  const handleDownloadHTML = () => {
    const htmlContent = `<html><body style="background:#000;color:#fff;padding:20px;font-family:sans-serif;">
      <h1>SN PERFORMANCE REPORT</h1>
      <p>선수명: ${playerName}</p>
      <div style="background:#111;padding:20px;border-radius:15px;border:1px solid #333;">
        <h3 style="color:#3b82f6">COACH SUMMARY</h3>
        <p>${result.overallReview}</p>
      </div>
    </body></html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SN_Report_${playerName}.html`;
    a.click();
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* 사이드바 메뉴 이동 기능 복구 */}
      <aside className={`bg-[#0a0a0a] border-r border-[#1a1a1a] transition-all ${isMenuOpen ? 'w-64' : 'w-0'} overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-[#1a1a1a]"><h1 className="text-xl font-black text-blue-500 italic">SN</h1></div>
        <nav className="p-4 flex-1 space-y-2">
          <button onClick={() => {setCurrentTab('analysis'); setResult(null);}} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition ${currentTab === 'analysis' ? 'bg-blue-600' : 'text-zinc-500 hover:bg-zinc-900'}`}><Activity size={18}/> 분석</button>
          <button onClick={() => setCurrentTab('search')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition ${currentTab === 'search' ? 'bg-blue-600' : 'text-zinc-500 hover:bg-zinc-900'}`}><Library size={18}/> 보관함</button>
          <button onClick={() => setCurrentTab('groups')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition ${currentTab === 'groups' ? 'bg-blue-600' : 'text-zinc-500 hover:bg-zinc-900'}`}><Users size={18}/> 그룹</button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-black overflow-hidden">
        <header className="p-4 border-b border-[#1a1a1a] flex items-center gap-4 bg-[#0a0a0a]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-400">☰</button>
          <h2 className="font-black text-zinc-100 uppercase tracking-widest text-xs">
            {currentTab === 'analysis' ? 'New Report' : currentTab === 'search' ? 'Library' : 'Groups'}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          {currentTab === 'analysis' && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-[#111] p-10 rounded-[2.5rem] border border-[#222] shadow-2xl space-y-6">
                <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-white outline-none focus:border-blue-600 font-bold" placeholder="선수 이름을 입력하세요" />
                
                {/* 파일 선택 기능 복구 */}
                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-zinc-800 rounded-3xl p-10 bg-black/50 hover:border-blue-500 transition cursor-pointer text-center group">
                  <Upload className="mx-auto mb-4 text-zinc-600 group-hover:text-blue-500" size={32} />
                  <p className="text-zinc-500 font-bold">{selectedFile ? selectedFile.name : '측정 결과 파일(PDF/사진) 선택'}</p>
                </div>

                <button onClick={handleAnalyze} disabled={loading} className="w-full bg-blue-600 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
                  {loading ? 'AI 분석 중...' : '데이터 분석 시작'}
                </button>
              </div>

              {/* 결과 화면 및 다운로드 버튼 복구 */}
              {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                  <div className="bg-[#111] p-6 rounded-2xl border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-2 text-blue-500 font-black text-xs uppercase tracking-widest"><CheckCircle2 size={16}/> AI 분석 결과</div>
                    <p className="text-zinc-200 leading-relaxed font-semibold whitespace-pre-wrap">{result.overallReview}</p>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-zinc-800 text-white font-black py-4 rounded-2xl hover:bg-zinc-700 transition">💾 저장</button>
                    <button onClick={handleDownloadHTML} className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-500 transition flex items-center justify-center gap-2"><Globe size={18}/> HTML 리포트 저장</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentTab === 'search' && (
            <div className="text-center py-20 text-zinc-600 font-bold">보관함이 비어있습니다.</div>
          )}
          {currentTab === 'groups' && (
            <div className="text-center py-20 text-zinc-600 font-bold">관리 중인 그룹이 없습니다.</div>
          )}
        </div>
      </main>
    </div>
  );
}
