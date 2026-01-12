import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SN PERFORMANCE',
  description: 'AI Analysis System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className} style={{ margin: 0, backgroundColor: 'black' }}>
        {children}
      </body>
    </html>
  )
}
