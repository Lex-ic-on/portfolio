import styles from './hero-t2.module.css'
import { ReactNode } from 'react'

interface Props{
	dir: ReactNode;
	title: ReactNode;
}

export default function T2({ dir , title }:Props) {
	return (
		<div className={styles.hero}>
			<h5 className={styles.dir}>{dir}</h5>
			<h1 className={styles.pageTitle}>{title}</h1>
		</div>
	)
}