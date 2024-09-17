import Image from "next/image";
import styles from "../styles.module.scss";

export const ImageBlock = ( section ) => {
	// console.log(section)
	return (
		<div className={styles.section__image}>
			<Image
				fill
				src={section.image?.url}
				title={section.image?.name ?? "Зображення секції"}
				alt={section.image?.name ?? "Зображення секції"}
			/>
		</div>
	);
};