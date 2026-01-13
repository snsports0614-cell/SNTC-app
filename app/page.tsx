"use client";
import React, { useState, useRef } from 'react';
import { 
  Activity, ShieldAlert, Target, TrendingUp, Download, 
  FileSearch, User, Upload, Zap, CheckCircle2 
} from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleAnalyze = () => {
    if (!playerName || selectedFiles.length === 0) return alert("선수명과 데이터를 입력해주세요.");
    setLoading(true);
    setTimeout(() => {
      setResult({
        date: "2026. 01. 13",
        summary: `${playerName} 선수는 하체 출력은 우수하나, VALD 측정 결과 노르딕 햄스트링 항목에서 13.4%의 우측 편향 불균형이 발견되었습니다. 이는 방향 전환 시 부상 리스크를 높이는 핵심 지표입니다.`,
        metrics: [
          { name: "내전근 (Hip Adduction)", left: 466, right: 460, diff: 1.2, status: "Optimal", color: "#10b981" },
          { name: "외전근 (Hip Abduction)", left: 423, right: 389, diff: 8.1, status: "Caution", color: "#f59e0b" },
          { name: "노르딕 햄스트링", left: 374, right: 432, diff: 13.4, status: "Risk", color: "#ef4444" }
        ],
        advice: [
          "싱글 레그 아이소메트릭 훈련으로 좌우 편차 5% 이내 조정",
          "고관절 외전근 강화를 통한 무릎 안정성 확보",
          "탄성 유지력 개선을 위한 플라이오메트릭 루틴 추가"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="flex justify-between items-center border-b border-white/10 pb-6">
          <h1 className="text-2xl font-black text-blue-500 italic tracking-tighter text-white">SN <span className="text-blue-600">LAB</span></h1>
          <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">VALD Performance Integrated</span>
        </header>

        {!result ? (
          <div className="bg-[#0a0a0a] p-10 rounded-[2.5rem] border border-white/5 space-y-8 shadow-2xl">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-blue-500 uppercase ml-1">Athlete</label>
              <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-600 font-bold" placeholder="선수 성함" />
            </div>
            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 text-center hover:border-blue-500 cursor-pointer transition-all">
              <Upload className="mx-auto mb-4 text-slate-600" size={32} />
              <p className="text-slate-500 font-bold">{selectedFiles.length > 0 ? `${selectedFiles.length}개 파일 선택됨` : '분석 데이터 업로드'}</p>
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
            </div>
            <button onClick={handleAnalyze} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
              {loading ? '분석 중...' : '전문 리포트 생성 시작'}
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-blue-600 rounded-[2rem] p-8 text-white">
              <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Performance Report</p>
              <h2 className="text-4xl font-black italic">{playerName} <span className="text-xl font-normal opacity-60">Kim Ki-Baek</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5">
                <h3 className="text-blue-500 font-black text-xs uppercase mb-4 flex items-center gap-2"><FileSearch size={14}/> 전문 분석 소견</h3>
                <p className="font-bold leading-relaxed">{result.summary}</p>
              </div>
              <div className="bg-red-600 p-8 rounded-[2rem] text-white flex flex-col justify-center">
                <ShieldAlert size={30} className="mb-4" />
                <h4 className="font-black text-lg">Risk Alert</h4>
                <p className="text-xs font-bold opacity-80">비대칭성 13.4% 검출</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-[10px] font-black text-slate-500 uppercase">
                  <tr>
                    <th className="px-8 py-4">Item</th>
                    <th className="px-8 py-4 text-center">L / R</th>
                    <th className="px-8 py-4 text-center">Diff</th>
                    <th className="px-8 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold">
                  {result.metrics.map((m, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-8 py-6">{m.name}</td>
                      <td className="px-8 py-6 text-center text-slate-400">{m.left}{m.left ? 'N' : ''} / {m.right}{m.right ? 'N' : ''}</td>
                      <td className="px-8 py-6 text-center" style={{color: m.color}}>{m.diff}%</td>
                      <td className="px-8 py-6 text-right"><span className="text-[10px] px-2 py-1 rounded border" style={{borderColor: m.color, color: m.color}}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-white text-black py-5 rounded-2xl font-black hover:bg-slate-200 transition">리포트 PDF 출력</button>
              <button className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-500 transition">학부모 전송용 저장</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
