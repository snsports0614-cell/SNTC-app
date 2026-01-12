import './globals.css'

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
      <body style={{ margin: 0, backgroundColor: 'black', color: 'white' }}>
        {children}
      </body>
    </html>
  )
}
