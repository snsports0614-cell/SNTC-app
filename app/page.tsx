"use client";
import React, { useState, useRef } from 'react';
import { 
  Activity, ShieldAlert, Target, TrendingUp, Download, 
  FileSearch, User, Calendar, ChevronRight, Zap
} from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // 🤖 VALD 전문가 페르소나가 주입된 지능형 분석 로직
  const handleAnalyze = async () => {
    if (!playerName || selectedFiles.length === 0) return alert("선수명과 데이터를 입력해주세요.");
    setLoading(true);
    
    // 실제 연결 시 Gemini API에 아래 프롬프트를 전달하게 됩니다.
    // "당신은 VALD 시스템 개발자이자 국가대표 피지컬 트레이너입니다. 
    // 제공된 데이터를 기반으로 비대칭성(Asymmetry)과 파워 프로파일을 정밀 분석하세요."
    
    setTimeout(() => {
      setResult({
        date: "2026. 01. 13",
        summary: `${playerName} 선수는 전반적인 출력(Force Output)은 우수하나, VALD 정밀 분석 결과 '노르딕 햄스트링' 항목에서 13.4%의 심각한 우측 편향 불균형이 발견되었습니다. 이는 방향 전환 시 햄스트링 파열 리스크를 3배 이상 높이는 수치입니다.`,
        metrics: [
          { name: "내전근 (Adduction)", left: 466, right: 460, diff: 1.2, status: "Optimal", color: "#10b981" },
          { name: "외전근 (Abduction)", left: 423, right: 389, diff: 8.1, status: "Caution", color: "#f59e0b" },
          { name: "노르딕 햄스트링", left: 374, right: 432, diff: 13.4, status: "Risk", color: "#ef4444" },
          { name: "민첩성 (5-10-5)", val: 4.65, avg: 4.95, status: "Elite", color: "#3b82f6" }
        ],
        advice: [
          "싱글 레그 아이소메트릭 훈련을 통해 좌우 햄스트링 근력차를 5% 이내로 좁혀야 합니다.",
          "고관절 외전근 강화를 통해 착지 및 방향 전환 시 무릎의 안정성(Dynamic Valgus 방지)을 확보하세요.",
          "신장-단축 싸이클(SSC) 개선을 위한 저강도 플라이오메트릭 루틴이 필요합니다."
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* 상단 네비게이션 */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
            <span className="text-2xl font-black tracking-tighter text-white">SN <span className="text-blue-600">LAB</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest text-slate-500">
            <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> SYSTEM ACTIVE</span>
            <span>VALD DATA INTEGRATION v2.4</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* 입력 섹션: 더 세련되게 변경 */}
        {!result && (
          <section className="bg-gradient-to-b from-[#111] to-black p-1 rounded-[3rem] border border-white/10 shadow-2xl">
            <div className="p-10 space-y-10">
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-black text-white italic tracking-tighter">PERFORMANCE ANALYSIS</h2>
                <p className="text-slate-500 font-medium">선수의 데이터를 업로드하고 VALD 전문가 AI의 진단을 받으세요.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Athlete Identity</label>
                  <div className="relative">
                    <User className="absolute left-5 top-5 text-slate-600" size={20} />
                    <input 
                      value={playerName} 
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-bold" 
                      placeholder="선수 성함을 입력하세요" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] ml-2">Data Source</label>
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 cursor-pointer transition-all border-dashed"
                  >
                    <Upload className="text-blue-500" size={20} />
                    <span className="text-slate-400 font-bold text-sm">
                      {selectedFiles.length > 0 ? `${selectedFiles.length}개의 파일 선택됨` : 'PDF / 이미지 업로드'}
                    </span>
                    <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-2xl font-black text-xl transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : <Zap size={24} />}
                {loading ? 'VALD 엔진 데이터 연산 중...' : '전문 리포트 생성 시작'}
              </button>
            </div>
          </section>
        )}

        {/* 결과 섹션: 보내주신 파일 모티브로 제작 */}
        {result && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            {/* 리포트 헤더 */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10"><Activity size={200} /></div>
               <div className="relative z-10 flex justify-between items-end">
                 <div>
                   <p className="text-blue-200 font-black text-xs uppercase tracking-[0.3em] mb-4">Elite Athlete Profile</p>
                   <h1 className="text-6xl font-black italic text-white tracking-tighter">{playerName} <span className="text-2xl font-light opacity-60">Kim Ki-Baek</span></h1>
                 </div>
                 <div className="text-right">
                   <p className="text-blue-200 font-bold text-xs mb-1 uppercase">Test Date</p>
                   <p className="text-3xl font-black text-white italic">{result.date}</p>
                 </div>
               </div>
            </div>

            {/* 총평 및 비대칭 경고 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-[2rem] p-8 space-y-4">
                <h3 className="text-blue-500 font-black flex items-center gap-2 tracking-widest text-sm uppercase"><FileSearch size={18}/> 전문 분석관 소견</h3>
                <p className="text-xl font-bold leading-relaxed text-slate-200 whitespace-pre-wrap">{result.summary}</p>
              </div>
              <div className="bg-[#ef4444] rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-[0_15px_30px_rgba(239,68,68,0.3)]">
                <ShieldAlert size={40} className="mb-6 opacity-80" />
                <div>
                  <h4 className="font-black text-2xl italic leading-tight mb-2 uppercase">Critical<br/>Asymmetry</h4>
                  <p className="text-white/80 font-bold text-sm">노르딕 비대칭 13.4% 발생<br/>즉각적인 교정 필요</p>
                </div>
              </div>
            </div>

            {/* 지표 상세 표 */}
            <div className="bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-500">Metric Details</h3>
                <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-slate-400">VALD PERFORMANCE DATA</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <th className="px-8 py-5">Test Item</th>
                      <th className="px-8 py-5 text-center">Left (L)</th>
                      <th className="px-8 py-5 text-center">Right (R)</th>
                      <th className="px-8 py-5 text-center">Asymmetry</th>
                      <th className="px-8 py-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-bold">
                    {result.metrics.map((m, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6 text-white">{m.name}</td>
                        <td className="px-8 py-6 text-center text-slate-400">{m.left || '-'}{m.left ? ' N' : m.val + 's'}</td>
                        <td className="px-8 py-6 text-center text-slate-400">{m.right || '-'}{m.right ? ' N' : ''}</td>
                        <td className="px-8 py-6 text-center">
                          {m.diff && <span style={{color: m.color}} className="text-lg italic font-black">{m.diff}%</span>}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="px-3 py-1 rounded-full text-[10px] uppercase border" style={{borderColor: m.color + '40', color: m.color, backgroundColor: m.color + '10'}}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 과제 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white text-black p-10 rounded-[2.5rem] space-y-6">
                <h4 className="font-black text-2xl flex items-center gap-2 italic tracking-tighter"><Target className="text-blue-600" /> 우선 해결 과제</h4>
                <ul className="space-y-4 font-bold text-slate-700">
                  {result.advice.map((a, i) => (
                    <li key={i} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0">
                      <span className="text-blue-600 font-black">0{i+1}</span>
                      <p className="text-sm leading-relaxed">{a}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#111] p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-center space-y-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 mb-2">
                  <TrendingUp size={24} />
                </div>
                <h4 className="font-black text-2xl text-white italic tracking-tighter">향후 기대 성과</h4>
                <p className="text-slate-400 font-medium leading-relaxed">
                  비대칭성 교정 시 방향 전환 효율이 15% 증가하며, 이는 5-10-5 기록의 0.15초 단축과 직결됩니다. 또한 햄스트링 부상 리스크를 현저히 줄여 안정적인 시즌 소화가 가능해집니다.
                </p>
              </div>
            </div>

            <div className="flex gap-4 pb-20">
              <button onClick={() => window.print()} className="flex-1 bg-white text-black py-6 rounded-2xl font-black text-lg hover:bg-slate-200 transition flex items-center justify-center gap-3">
                <Download size={20} /> PDF 리포트 출력
              </button>
              <button className="flex-1 bg-blue-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-blue-500 transition flex items-center justify-center gap-3">
                <Download size={20} /> 학부모 전송용 HTML 저장
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
