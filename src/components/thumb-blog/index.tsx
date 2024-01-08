import styles from './thumb-blog.module.css'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props{
	url: ReactNode;
	date: ReactNode;
	title: ReactNode;
	description: ReactNode;
}

export default function Thumbnail({ url, date, title, description }:Props) {
	return (
		<Link href={url} className={styles.thumb}>
			<h5 className={styles.date}>{date}</h5>
			<h3 className={styles.pageTitle}>{title}</h3>
			<p className={styles.description}>{description}</p>
			<h5>read more &gt;&gt;&gt;</h5>
		</Link>
		)
}