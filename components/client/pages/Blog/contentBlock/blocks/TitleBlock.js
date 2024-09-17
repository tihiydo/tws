import styles from "../styles.module.scss";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";

export const TitleBlock = ( section ) => {
	const dbTranslate = useDynamicTranslate()
	return (
		<h2 id={section.anchor} className={styles.section__title}>
			{ dbTranslate(section, "title") }
		</h2>
	);
};