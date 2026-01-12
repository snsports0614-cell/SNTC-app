"use client";
import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { Upload, Activity, Library, Users, Menu, Save, Download, CheckCircle2, Globe } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('analysis');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');

  const handleAnalyze = async () => {
    if (!playerName) return alert("선수 이름을 입력하세요");
    setLoading(true);
    setTimeout(() => {
      setResult({
        overallReview: "전반적인 근지구력은 우수하나, 왼쪽 하체 유연성이 오른쪽 대비 15% 부족합니다.\n맞춤형 보강 훈련이 필요합니다.",
        testResults: [
          { testName: "근지구력", left: 85, right: 82, unit: "점", analysis: "좌우 균형이 아주 좋습니다." },
          { testName: "유연성", left: 15, right: 12, unit: "cm", analysis: "우측 유연성이 다소 떨어집니다." },
          { testName: "순발력", left: 95, right: 0, unit: "점", analysis: "폭발적인 힘을 보유하고 있습니다." }
        ]
      });
      setLoading(false);
    }, 1000);
  };

  // 🌐 [핵심] HTML 파일 생성 및 다운로드 기능
  const handleDownloadHTML = () => {
    if (!result) return;
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>${playerName} 선수 리포트</title>
        <style>
          body { background: #000; color: #fff; font-family: sans-serif; padding: 20px; }
          .card { background: #111; border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid #222; }
          .title { color: #3b82f6; font-size: 24px; font-weight: 900; }
          .bar { height: 10px; background: #222; border-radius: 5px; margin: 10px 0; display: flex; overflow: hidden; }
          .val { font-size: 18px; font-weight: bold; color: #3b82f6; }
          .comment { background: #050505; padding: 15px; border-radius: 10px; font-size: 13px; color: #aaa; }
        </style>
      </head>
      <body>
        <div style="max-width: 500px; margin: 0 auto;">
          <h1 class="title font-black">SN PERFORMANCE</h1>
          <p>${playerName} 선수 리포트 | ${new Date().toLocaleDateString()}</p>
          <div class="card">
            <h3 style="color:#f59e0b">⚡ COACH'S SUMMARY</h3>
            <p>${result.overallReview.replace(/\n/g, '<br>')}</p>
          </div>
          ${result.testResults.map(t => `
            <div class="card">
              <div style="display:flex; justify-content:space-between">
                <span>${t.testName}</span>
                <span class="val">${t.left}${t.unit} / ${t.right}${t.unit}</span>
              </div>
              <div class="bar">
                <div style="width:50%; background:#3b82f6"></div>
                <div style="width:50%; background:#10b981; margin-left:2px"></div>
              </div>
              <div class="comment">${t.analysis}</div>
            </div>
          `).join('')}
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SN_Report_${playerName}.html`;
    a.click();
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
      <aside className={`bg-[#0a0a0a] border-r border-[#1a1a1a] transition-all ${isMenuOpen ? 'w-64' : 'w-0'} overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-[#1a1a1a]"><h1 className="text-xl font-black text-blue-500 italic">SN</h1></div>
        <nav className="p-4 space-y-2">
          <button onClick={() => setCurrentTab('analysis')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'analysis' ? 'bg-blue-600' : 'text-zinc-500'}`}><Activity size={18}/> 분석</button>
          <button onClick={() => setCurrentTab('search')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'search' ? 'bg-blue-600' : 'text-zinc-500'}`}><Library size={18}/> 보관함</button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b border-[#1a1a1a] flex items-center gap-4 bg-[#0a0a0a]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-zinc-900 rounded-lg"><Menu size={20}/></button>
          <h2 className="font-black text-zinc-100 uppercase tracking-widest text-sm">New Report</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222] space-y-6 shadow-2xl">
              <input value={playerName} onChange={e => setPlayerName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl outline-none font-bold text-white" placeholder="선수 이름을 입력하세요"/>
              <button onClick={handleAnalyze} className="w-full bg-blue-600 py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-500/20">
                {loading ? '분석 중...' : '데이터 분석 시작'}
              </button>
            </div>

            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                <div className="bg-[#111] p-6 rounded-2xl border-l-4 border-blue-500">
                  <p className="text-zinc-200 leading-relaxed font-semibold">{result.overallReview}</p>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={() => alert('DB 저장 기능은 다음 단계에서 연결합니다!')} className="flex-1 bg-zinc-800 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"><Save size={18}/> DB 저장</button>
                  <button onClick={handleDownloadHTML} className="flex-1 bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"><Globe size={18}/> HTML 리포트 저장</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
