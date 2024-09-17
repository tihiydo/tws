import styles from "../styles.module.scss";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";

export const TextBlock = ( section ) => {
	const dbTranslate = useDynamicTranslate()
	return (
		<div
			className={styles.section__text}
			dangerouslySetInnerHTML={{
				__html: dbTranslate(section, 'text')
			}}
		/>
	);
};