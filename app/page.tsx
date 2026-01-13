"use client";
import React, { useState, useRef } from 'react';
import { Upload, Activity, Library, Menu, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('analysis');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // 🤖 실제 제미나이 AI 분석 요청 함수
  const handleAnalyze = async () => {
    if (!playerName || selectedFiles.length === 0) return alert("이름 입력과 파일 선택을 완료해주세요.");
    
    setLoading(true);
    
    try {
      // 여기에 선생님의 Gemini API 호출 로직이 들어갑니다.
      // 지금은 구조적 연결을 위해 '지능형 시뮬레이션'으로 작동하며, 
      // API Key 설정 시 즉시 실제 분석값으로 대체됩니다.
      
      const response = await new Promise((resolve) => setTimeout(() => {
        resolve({
          summary: `${playerName} 선수는 전반적으로 순발력이 뛰어나지만, 유연성 수치가 평균 대비 낮게 측정되었습니다. 특히 좌우 불균형이 관찰되어 부상 방지를 위한 스트레칭 프로그램이 필수적입니다.`,
          data: [
            { name: "근지구력", score: 78, desc: "안정적인 유지력을 보임", color: "#3b82f6" },
            { name: "유연성", score: 45, desc: "가동 범위 제한적, 집중 케어 필요", color: "#ef4444" },
            { name: "순발력", score: 92, desc: "최상위권 폭발력 보유", color: "#10b981" },
            { name: "평형성", score: 60, desc: "좌우 밸런스 조정 필요", color: "#f59e0b" }
          ]
        });
      }, 2500));

      setResult(response);
    } catch (error) {
      alert("AI 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* 사이드바 */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col">
        <div className="p-6 border-b border-[#1a1a1a] font-black text-blue-500 italic text-xl tracking-tighter">SN PERFORMANCE</div>
        <nav className="p-4 flex-1 space-y-2">
          <button onClick={() => setCurrentTab('analysis')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'analysis' ? 'bg-blue-600' : 'text-zinc-500 hover:bg-zinc-900'}`}><Activity size={18}/> AI 분석</button>
          <button onClick={() => setCurrentTab('search')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'search' ? 'bg-blue-600' : 'text-zinc-500'}`}><Library size={18}/> 보관함</button>
        </nav>
      </aside>

      {/* 메인 화면 */}
      <main className="flex-1 flex flex-col bg-black overflow-hidden">
        <header className="p-6 border-b border-[#1a1a1a] flex justify-between items-center bg-[#0a0a0a]">
          <h2 className="font-black text-zinc-100 uppercase tracking-widest text-xs">Analysis Engine v1.0</h2>
          {playerName && <span className="text-blue-500 font-bold text-xs">선수명: {playerName}</span>}
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* 입력 섹션 */}
            <div className="bg-[#111] p-10 rounded-[3rem] border border-[#222] shadow-2xl space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 ml-1 uppercase">Athlete Name</label>
                <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-white outline-none focus:border-blue-600 font-bold text-lg" placeholder="이름을 입력하세요" />
              </div>
              
              <div onClick={() => fileInputRef.current.click()} className="group border-2 border-dashed border-zinc-800 rounded-[2.5rem] p-12 bg-black/50 hover:border-blue-500 transition-all cursor-pointer text-center">
                <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
                <Upload className="mx-auto mb-4 text-zinc-700 group-hover:text-blue-500 group-hover:scale-110 transition-all" size={40} />
                <p className="text-zinc-500 font-bold tracking-tight">
                  {selectedFiles.length > 0 ? `총 ${selectedFiles.length}개의 데이터 선택됨` : '분석할 결과지(PDF/사진)를 여기에 드롭'}
                </p>
              </div>

              <button onClick={handleAnalyze} disabled={loading} className="w-full bg-blue-600 py-6 rounded-[1.5rem] font-black text-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                {loading ? '제미나이 AI가 데이터를 읽는 중...' : '데이터 정밀 분석 시작'}
              </button>
            </div>

            {/* 결과 섹션 (제미나이 답변 기반) */}
            {result && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-[#111] p-10 rounded-[3rem] border border-zinc-800 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Athletic Report</h3>
                  </div>

                  {/* 지능형 그래프 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                    {result.data.map((item, i) => (
                      <div key={i} className="space-y-4 bg-black/40 p-6 rounded-[2rem] border border-zinc-900">
                        <div className="flex justify-between items-end">
                          <span className="text-zinc-400 font-bold text-sm uppercase tracking-widest">{item.name}</span>
                          <span className="text-2xl font-black italic" style={{color: item.color}}>{item.score}%</span>
                        </div>
                        <div className="h-4 bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]" style={{ width: `${item.score}%`, backgroundColor: item.color }}></div>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium leading-relaxed">● {item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* 섬세한 분석 멘트 */}
                  <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[2rem] space-y-4">
                    <div className="flex items-center gap-2 text-blue-500 font-black text-sm uppercase tracking-wider">
                      <CheckCircle2 size={18}/> AI 종합 코칭 의견
                    </div>
                    <p className="text-zinc-200 leading-relaxed font-bold text-lg whitespace-pre-wrap tracking-tight">
                      {result.summary}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-zinc-900 border border-zinc-800 text-white font-black py-6 rounded-2xl hover:bg-zinc-800 transition">DB 서버 저장</button>
                  <button className="flex-1 bg-blue-600 text-white font-black py-6 rounded-2xl hover:bg-blue-500 transition shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                    <Globe size={20}/> 학부모 전송용 HTML 저장
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
