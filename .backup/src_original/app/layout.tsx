import React from 'react'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'

const Spacegrotesk = Space_Grotesk({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Lex portfolio website',
  description: 'Lex is Japan based DTP/typograghy/UI/web designer.',
  openGraph: {
    type: "website",
    images: {
      url: "",
      type: "image/png"
    }
  }
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
