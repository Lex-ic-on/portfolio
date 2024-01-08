import Image from 'next/image'
import Link from 'next/link'
import Hero from '../../components/hero-tier1'
import Thumb from '../../components/thumb-blog'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero
        dir="1exicon.com/Blog"
		title="Blog"
		stats=""
      />
    	<ul className={styles.portalLink}>
        	<li>
				  <Thumb
					  url='/Blog/first-entry'
					  date='2024-01-09'
					  title='サイトを作った'
					  description='やろうやろうと言っていて結局後回しになってしまっていた自分のサイトをようやく作り上げた。といってもローンチまでの第一宇宙速度を得るのにいたったのは別にケロシンでも液体酸素のおかげでも、スペースXの創業者の気まぐれに危機感を覚えたからでもなく、たんに僕が成人の日のことを完全に忘れてしまっていたことによる。'
				  />
        	</li>
		</ul>
    </main>
  )
}