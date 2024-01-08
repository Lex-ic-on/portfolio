import styles from './hero-t1.module.css'
import { ReactNode } from 'react'

interface Props{
	dir: ReactNode;
	title: ReactNode;
	stats: ReactNode;
}

export default function T1({ dir, title, stats }:Props) {
	return (
		<div className={styles.hero}>
			<h5 className={styles.dir}>{dir}</h5>
			<h1 className={styles.pageTitle}>{title}</h1>
			<p>{stats}</p>
		</div>
		)
}