"use client";

import { useState, useRef, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell
} from 'recharts';
import { Upload, FileText, CheckCircle2, Activity, Library, Users, Menu, Save, Download, Trash2, X } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('analysis');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('기본 그룹');
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  // 가상의 데이터 (DB 연결 전 테스트용)
  const [savedReports, setSavedReports] = useState<any[]>([]);

  const handleAnalyze = () => {
    if (!playerName) return alert("선수 이름을 입력하세요");
    setLoading(true);
    // 실제 API 호출 대신 시뮬레이션
    setTimeout(() => {
      setResult({
        overallReview: "전반적인 피지컬 밸런스가 우수합니다.\n왼쪽 발목의 유연성 보강이 필요하며, 순발력은 상위 5% 수준입니다.",
        testResults: [
          { testName: "근지구력", left: 85, right: 82, unit: "점", analysis: "좌우 균형이 아주 좋습니다." },
          { testName: "유연성", left: 15, right: 12, unit: "cm", analysis: "우측 유연성이 다소 떨어집니다." },
          { testName: "순발력", left: 95, right: 0, unit: "점", analysis: "폭발적인 힘을 보유하고 있습니다." }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  const ReportPreview = ({ data, player }: { data: any; player: string }) => (
    <div className="w-full max-w-md bg-black text-white font-sans mx-auto rounded-[30px] border border-[#333] shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-[#222] bg-[#111]">
        <h1 className="text-xl font-black tracking-tighter">SN PERFORMANCE REPORT</h1>
        <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase">{player} | {new Date().toLocaleDateString()}</p>
      </div>
      <div className="p-6 space-y-6 bg-black">
        <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
          <h2 className="text-[10px] font-bold text-yellow-500 mb-2 uppercase tracking-wider">⚡ Coach's Summary</h2>
          <p className="text-sm text-gray-300 leading-6 whitespace-pre-wrap">{data.overallReview}</p>
        </div>
        <div className="space-y-6">
          {data.testResults.map((test: any, idx: number) => {
            const isSingle = !test.right || test.right === 0;
            return (
              <div key={idx} className="space-y-3">
                <h3 className="font-bold text-sm text-zinc-100">{test.testName}</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] mb-1 text-zinc-500 font-bold uppercase">
                      <span>L: {test.left}{test.unit}</span>
                      {!isSingle && <span>R: {test.right}{test.unit}</span>}
                    </div>
                    <div className="h-2 bg-zinc-900 rounded-full overflow-hidden flex gap-0.5">
                      <div className="h-full bg-blue-500" style={{ width: isSingle ? '100%' : '50%' }}></div>
                      {!isSingle && <div className="h-full bg-emerald-500" style={{ width: '50%' }}></div>}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">{test.analysis}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* 사이드바 */}
      <aside className={`bg-[#0a0a0a] border-r border-[#1a1a1a] transition-all ${isMenuOpen ? 'w-64' : 'w-0'} overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-[#1a1a1a]">
          <h1 className="text-xl font-black tracking-widest text-blue-500">SN APP</h1>
        </div>
        <nav className="p-4 flex-1 space-y-2">
          {[
            { id: 'analysis', icon: <Activity size={18}/>, label: '분석' },
            { id: 'search', icon: <Library size={18}/>, label: '보관함' },
            { id: 'groups', icon: <Users size={18}/>, label: '그룹' }
          ].map(item => (
            <button key={item.id} onClick={() => setCurrentTab(item.id)} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition ${currentTab === item.id ? 'bg-blue-600' : 'hover:bg-zinc-900 text-zinc-500'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* 메인 영역 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b border-[#1a1a1a] flex items-center gap-4 bg-[#0a0a0a]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-zinc-900 rounded-lg"><Menu size={20}/></button>
          <h2 className="font-bold text-zinc-100 uppercase tracking-widest">
            {currentTab === 'analysis' ? 'New Report' : currentTab === 'search' ? 'Library' : 'Groups'}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          {currentTab === 'analysis' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-[#111] p-8 rounded-[2rem] border border-[#222] space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input value={playerName} onChange={e => setPlayerName(e.target.value)} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-blue-500 transition" placeholder="선수 이름 입력"/>
                  <select className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none">
                    <option>엘리트 반</option>
                    <option>주말 반</option>
                  </select>
                </div>
                <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 text-center hover:border-blue-500/50 transition cursor-pointer">
                  <p className="text-zinc-500 font-medium">📂 PDF 또는 측정 기록 파일 업로드</p>
                </div>
                <button onClick={handleAnalyze} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-500/20">
                  {loading ? '데이터 분석 중...' : '데이터 분석 실행'}
                </button>
              </div>

              {result && (
                <div className="animate-in fade-in slide-in-from-bottom-4 text-center space-y-6">
                  <ReportPreview data={result} player={playerName} />
                  <div className="flex gap-4 max-w-md mx-auto">
                    <button className="flex-1 bg-zinc-100 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2"><Save size={18}/> 저장하기</button>
                    <button className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"><Download size={18}/> 리포트 다운</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentTab === 'search' && (
             <div className="max-w-4xl mx-auto text-center py-20">
                <Library size={48} className="mx-auto text-zinc-800 mb-4"/>
                <p className="text-zinc-500 font-bold">저장된 리포트가 없습니다.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
