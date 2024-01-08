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
      />
    	<ul className={styles.portalLink}>
        	<li>
				  <Thumb
					  url='/Blog/typesetting-with-reducionism'
					  date='2024-01-09'
					  title='還元主義的組版'
					  description='組版は文字を組むことであり、文字を書くときに文字を組むという行為からは逃れられず、それを組版という……が、僕のような異常者をのぞいて、一般的に組版なんてのはめんどくさいことこの上ない行為である。それはなぜか。組版は本質的に文字を“認める”行為に寄与していない（ように思える）からだ。'
				  />
        	</li>
		</ul>
    </main>
  )
}