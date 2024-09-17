import SeoBlock from '@/components/client/SeoBlock/SeoBlock';
import classes from './warranty.module.scss'
import SchemaBlock from '@/components/client/SeoBlock/SchemaBlock';
import { useTranslations } from 'next-intl';
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import SeoText from "@/components/client/SeoBlock/SeoText";


const Warranty = ({ seo }) => {
	const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Гарантія, обмін, повернення",
          "item": `${process.env.NEXT_PUBLIC_API_URL}/info/warranty`
        }]
    }

	const t = useTranslations("Warranty");
	const dbTranslate = useDynamicTranslate();

	return (
		<>
			<SeoBlock
				title={!!seo && dbTranslate(seo, "title")}
				description={!!seo && dbTranslate(seo, "description")}
			/>
			<SchemaBlock schema={schema} />
			<div className={classes.pageInfo} style={{minHeight: '100vh'}}>
				<h1 className={classes.title}>
					{
						!!seo ?
							dbTranslate(seo, "h") : t("title")
					}
				</h1>
				<div className={classes.parts}>
					<div className={classes.part}>
						<div className={classes.upper}>
							<div className={classes.num}>
								1
							</div>
							<div className={classes.partTitle}>
								{
									t("stepOneTitle")
								}
							</div>
						</div>
						<div className={classes.lower}>
							{
								t("stepOneDescr")
							}
						</div>

					</div>
					<div className={classes.part}>
						<div className={classes.upper}>
							<div className={classes.num}>
								2
							</div>
							<div className={classes.partTitle}>
								{
									t("stepTwoTitle")
								}
							</div>
						</div>
						<div className={classes.lower}>
							{
								t("stepTwoDescr")
							}
						</div>

					</div>
				</div>

				<SeoText seo={seo} />

			</div>
		</>
	)
}
export default Warranty;