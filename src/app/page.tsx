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
      <div className={styles.description}>
        <p>Hello, I’m Lex.</p>
        <p>I mainly work DTP, typography (incl. on-screen design,) UI, and web design. I’m glad to see you, and if you would like, please follow my Twitter.</p>
        <p>If you want to create something new or good, want to prove some problems with design, I’m ready to cooperate with me and please send me a message.</p>
      </div>
    </main>
  )
}
