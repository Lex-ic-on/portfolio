import Image from 'next/image'
import Link from 'next/link'
import Hero from '../../components/hero-tier1'
import Thumb from '../../components/thumb-work'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero
        dir="1exicon.com/Works"
        title="Works"
        stats=""
      />
      <ul className={styles.portalLink}>
        <li>
          <Thumb url="./Works/built-my-own-page" src="/thumbnail-default/thumbnail.png" title="My own page" cl="private, 2024-01"/>
        </li>
		  </ul>
    </main>
  )
}