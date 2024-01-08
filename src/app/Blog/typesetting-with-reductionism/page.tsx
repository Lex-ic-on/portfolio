import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Hero from '../../../components/hero-tier2'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
    	<Hero
    	    dir="1exicon.com/Blog/typesetting-with-reductionism"
        	title="還元主義的組版"
    	/>
		<div className={styles.contents}>
			<p>組版は文字を組むことであり、文字を書くときに文字を組むという行為からは逃れられず、それを組版という……が、僕のような異常者をのぞいて、一般的に組版なんてのはめんどくさいことこの上ない行為である。それはなぜか。組版は本質的に文字を“認める”行為に寄与していない（ように思える）からだ。</p>
			<p>もちろんこの直感にいますぐ反例をあげて異を唱えることもできてしまうが、今から僕が話したいこととはだいぶ脱線してしまうので避けようと思う。じっさい組版なんてのはほとんどすべての人にとってめんどくさい行為でしかないのだ。じゃなかったら文書作成がいまだにWordでなされていることもないだろう。</p>
		</div>
    </main>
  )
}