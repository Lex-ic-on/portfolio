import styles from './hero-t2.module.css'

export default function T2({ dir, title }) {
	return (
		<div className={styles.hero}>
			<h5 className={styles.dir}>{dir}</h5>
			<h1 className={styles.pageTitle}>{title}</h1>
		</div>
		)
}