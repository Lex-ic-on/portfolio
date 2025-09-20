import Image from 'next/image'
import Link from 'next/link'
import Hero from '../../../components/hero-tier2'
import styles from './page.module.css'
import React from 'react'

export default function Home() {
  return (
    <main className={styles.main}>
    	<Hero
    	    dir="1exicon.com/Works/built-my-own-page"
			title="Lex website"
		  />
		<div className={styles.demo}>
			<Image src='/(Works)/built-my-own-page/demo.png' width={1920} height={1080} alt='' className={styles.image} />
		</div>
		<div className={styles.contents}>
			<p>I built my own page.</p>
			<p>自らのサイトを設計しました。</p>
		</div>
    </main>
  )
}