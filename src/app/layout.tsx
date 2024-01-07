import type { Metadata } from 'next'
import { Noto_Sans_JP, Inter } from 'next/font/google'
import './globals.css'

const NotoJP = Noto_Sans_JP({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lex portfolio website',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/wkm4oqu.css"></link>
      </head>
      <body className={NotoJP.className}>{children}</body>
    </html>
  )
}
