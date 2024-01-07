import Link from 'next/link'
import styles from './nav.module.css'

export default function Nav() {
	return (
		<nav>
			<ul className={styles.navigation}>
				<li>
					<Link href="/">
						Home
					</Link>
				</li>
				<li>
					<Link href="/Works">
						Works
					</Link>
				</li>
				<li>
					<Link href="/Blog">
						Blog
					</Link>
				</li>
			</ul>
		</nav>
		)
}