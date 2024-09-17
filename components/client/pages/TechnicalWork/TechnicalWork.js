import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";

export const TechnicalWork = () => {
	return (
		<div className={styles.container}>
			<Image
				fill
				src="/assets/icons/TwinSann.svg"
				alt="not-foung"
			/>
			<div className={styles.contentWrapper}>
				<h1 className={styles.title}>Технічна перерва</h1>
				<h2 className={styles.subtitle}>
					На сайті ведуться технічні роботи<br />
					Перепрошуємо за незручності
				</h2>
				<Link href="https://www.instagram.com/twin_sann/" target="_blank" className={styles.homeBtn}>
					Наш Instagram
				</Link>
			</div>
		</div>
	)
}