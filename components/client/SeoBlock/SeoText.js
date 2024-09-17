import styles from "./seoText.module.scss";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
export default function SeoText({ seo }) {
	const translate = useDynamicTranslate()

	if(seo && !seo.hideSeoText) return (
		<div className={styles.block}
			 dangerouslySetInnerHTML={{
				 __html: translate(seo, "text")
			 }}
		/>
	)
}