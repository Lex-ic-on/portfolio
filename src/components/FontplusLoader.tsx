"use client"

import Script from 'next/script'

export default function FontplusLoader() {
  return (
    <Script
      src="https://webfont.fontplus.jp/accessor/script/fontplus.js?a6bDcSJ6p9I%3D&box=xNxAowHrias%3D&delay=2&timeout=5&pm=1&aa=1&ab=2"
      strategy="afterInteractive"
      onLoad={() => {
        if (FONTPLUS) {
          FONTPLUS.reload(false);
        }
      }}
    />
  )
}