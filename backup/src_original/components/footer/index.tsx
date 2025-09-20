import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer() {
	return (
		<footer>
			<ul className={styles.footerNav}>
				<li>
					<Link href='https://twitter.com/_Lex_icon'>Twitter &gt;</Link>
				</li>
				<li>
					<Link href='https://www.instagram.com/__lex__icon'>Instagram &gt;</Link>
				</li>
			</ul>
		</footer>
		)
}