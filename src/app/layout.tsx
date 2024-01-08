import React from 'react'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'

const Spacegrotesk = Space_Grotesk({ subsets: ['latin']})
const NotoJP = Noto_Sans_JP({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lex portfolio website',
  description: 'Lex is Japan based typograghy/DTP/web/UI designer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
      </head>
      <body className={Spacegrotesk.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
