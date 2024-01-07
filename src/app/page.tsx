import Image from 'next/image'
import Link from 'next/link'
import Hero from '../components/hero-tier1'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero
        dir="1exicon.com"
        title="Lex"
        statsOn
      />
      <ul className={styles.portalLink}>
        <li>
          <Link href='./Works'><h3 className={styles.bold}>See my works &gt;&gt;&gt;</h3></Link>
        </li>
        <li>
          <Link href='mailto:contact.4194304@gmail.com'><h3 className={styles.bold}>Contact me &gt;&gt;&gt;</h3></Link>
        </li>
      </ul>
    </main>
  )
}
