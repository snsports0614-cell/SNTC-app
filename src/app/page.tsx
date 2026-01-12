"use client";
import React, { useState } from 'react';

export default function App() {
  const [result, setResult] = useState(false);
  return (
    <div style={{backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif'}}>
      <h1 style={{color: '#3b82f6', fontSize: '2.5rem', fontWeight: '900'}}>SN PERFORMANCE</h1>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>AI 선수 분석 시스템</p>
      {!result ? (
        <button onClick={() => setResult(true)} style={{backgroundColor: 'white', color: 'black', padding: '1rem 2rem', borderRadius: '1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>분석 시작하기</button>
      ) : (
        <div style={{padding: '2rem', border: '1px solid #3b82f6', borderRadius: '1rem', textAlign: 'center'}}>
          <h2 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>분석 결과: 우수</h2>
          <p>선수의 순발력이 상위 5%에 해당합니다.</p>
          <button onClick={() => setResult(false)} style={{marginTop: '1rem', color: '#3b82f6', background: 'none', border: 'none', textDecoration: 'underline'}}>다시 하기</button>
        </div>
      )}
    </div>
  );
}
