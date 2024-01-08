import styles from './thumb-work.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props{
	url: string;
	src: string;
	title: ReactNode;
	cl: ReactNode;
}

export default function Thumbnail({ url, src, title, cl }:Props) {
	return (
		<Link href={url} className={styles.thumb}>
			<Image src={src} layout="responsive" width={1920} height={1080} alt=""/>
			<h4 className={styles.pageTitle}>{title} &gt;&gt;&gt;</h4>
			<h5 className={styles.clientName}>{cl}</h5>
		</Link>
		)
}