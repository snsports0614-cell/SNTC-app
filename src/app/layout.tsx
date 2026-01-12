import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SN PERFORMANCE',
  description: 'AI Athletic Analysis System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, backgroundColor: 'black' }}>{children}</body>
    </html>
  )
}
