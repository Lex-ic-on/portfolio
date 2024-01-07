import styles from './hero-t1.module.css'

export default function T1({ dir, title, statsOn=false }) {
	return (
		<div className={styles.hero}>
			<h5 className={styles.dir}>{dir}</h5>
			<h1 className={styles.pageTitle}>{title}</h1>
			{statsOn && <p>Designer, Developer</p>}
		</div>
		)
}