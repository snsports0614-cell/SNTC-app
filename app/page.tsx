"use client";
import React, { useState } from 'react';
import { Upload, Activity, Library, Users, Menu, Save, Globe } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('analysis');
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [result, setResult] = useState(null);

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <aside className={`bg-[#0a0a0a] border-r border-[#1a1a1a] transition-all ${isMenuOpen ? 'w-64' : 'w-0'} overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-[#1a1a1a]"><h1 className="text-xl font-black text-blue-500 italic">SN</h1></div>
        <nav className="p-4 flex-1 space-y-2">
          <button onClick={() => setCurrentTab('analysis')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'analysis' ? 'bg-blue-600' : 'text-zinc-500 hover:bg-zinc-900'}`}><Activity size={18}/> 분석</button>
          <button onClick={() => setCurrentTab('search')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${currentTab === 'search' ? 'bg-blue-600' : 'text-zinc-500 hover:bg-zinc-900'}`}><Library size={18}/> 보관함</button>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col bg-black">
        <header className="p-4 border-b border-[#1a1a1a] flex items-center gap-4 bg-[#0a0a0a]">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-zinc-900 rounded-lg">☰</button>
          <h2 className="font-black text-zinc-100 uppercase tracking-widest text-sm">SN APP</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto bg-[#111] p-10 rounded-[2.5rem] border border-[#222] text-center shadow-2xl">
            <h1 className="text-3xl font-black mb-6">데이터 분석</h1>
            <input className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl mb-6 text-white outline-none" placeholder="선수 이름을 입력하세요" />
            <div className="border-2 border-dashed border-zinc-800 rounded-3xl p-10 mb-6 bg-black/50 hover:border-blue-500 transition cursor-pointer">📂 파일 선택</div>
            <button className="w-full bg-blue-600 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">분석 시작</button>
          </div>
        </div>
      </main>
    </div>
  );
}
