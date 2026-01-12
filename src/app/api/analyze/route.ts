import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyD_AqArJ1Imy1ve0EB3uXUqOpMkQ1IZ1iE';

    if (!apiKey) return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' });

    const body = await req.json();
    const { pdfList, textData, agilityScore, manualComment } = body;

    const parts: any[] = [];
    const systemPrompt = `
      당신은 'SN 트레이닝 센터'의 수석 코치입니다.
      제공된 데이터를 분석하여 모바일 앱에서 보기 편한 초간단 리포트(JSON)를 작성하세요.
      [응답 형식 (JSON)]
      {
        "overallReview": "3줄 이내의 총평",
        "testResults": [
          { "testName": "항목명", "left": 0, "right": 0, "unit": "N", "analysis": "요약 피드백" }
        ]
      }
    `;

    parts.push({ text: systemPrompt });

    if (pdfList && Array.isArray(pdfList)) {
      pdfList.forEach((pdfBase64: string) => {
        parts.push({
          inline_data: { mime_type: 'application/pdf', data: pdfBase64 },
        });
      });
    }

    let extraInfo = "[추가 데이터]\n";
    if (agilityScore) extraInfo += "- 민첩성: ${agilityScore}초\n";
    if (manualComment) extraInfo += "- 코치 코멘트: ${manualComment}\n";
    if (textData) extraInfo += "- 메모: ${textData}\n";
    parts.push({ text: extraInfo });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: parts }] }),
      }
    );

    const data = await response.json();
    let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '');
    const firstOpen = rawText.indexOf('{');
    const lastClose = rawText.lastIndexOf('}');
    if (firstOpen !== -1 && lastClose !== -1) {
      rawText = rawText.substring(firstOpen, lastClose + 1);
    }

    return NextResponse.json(JSON.parse(rawText));
  } catch (error: any) {
    return NextResponse.json({ error: "서버 에러: " + error.message });
  }
}
