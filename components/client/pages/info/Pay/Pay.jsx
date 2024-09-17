
import SeoBlock from '@/components/client/SeoBlock/SeoBlock';
import classes from './pay.module.scss'
import SchemaBlock from '@/components/client/SeoBlock/SchemaBlock';
import { useTranslations } from 'next-intl';
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import SeoText from "@/components/client/SeoBlock/SeoText";
const Pay = ({ seo }) => {
	const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Доставка та оплата",
          "item": `${process.env.NEXT_PUBLIC_API_URL}/info/pay`
        }]
    }

	const t = useTranslations("Pay");
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
							<h2 className={classes.partTitle}>
								{
									t("stepOneTitle")
								}
							</h2>
						</div>
						<div className={classes.lower}>
							<div>
								{
									t("stepOneDescr1")
								}
							</div>
							<div>
								{
									t("stepOneDescr2")
								}
							</div>
							<div>
								{
									t("stepOneDescr3")
								}
							</div>
						</div>

					</div>
					<div className={classes.part}>
						<div className={classes.upper}>
							<div className={classes.num}>
								2
							</div>
							<h2 className={classes.partTitle}>
								{
									t("stepTwoTitle")
								}
							</h2>
						</div>
						<div className={classes.lower}>
							<div>
								{
									t("stepTwoDescr1")
								}
							</div>
							<div>
								{
									t("stepTwoDescr2")
								}
							</div>
							<div>
								{
									t("stepTwoDescr3")
								}
							</div>
						</div>

					</div>
				</div>
				<p>
					{
						t("descr")
					}
				</p>

				<SeoText seo={seo} />

			</div>
		</>
	)
}
export default Pay;




