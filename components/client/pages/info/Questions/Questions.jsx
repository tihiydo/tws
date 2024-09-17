import classes from './questions.module.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {MdExpandMore} from 'react-icons/md'
import SeoBlock from '@/components/client/SeoBlock/SeoBlock';
import SchemaBlock from '@/components/client/SeoBlock/SchemaBlock';
import { useTranslations } from 'next-intl';
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import SeoText from "@/components/client/SeoBlock/SeoText";



const Questions = ({ seo }) => {
	const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Популярні запитання",
          "item": `${process.env.NEXT_PUBLIC_API_URL}/info/questions`
        }]
    }

	const t = useTranslations("Questions");
	const dbTranslate = useDynamicTranslate();

	return (
		<>
			<SeoBlock 
				title={dbTranslate(seo, "title")}
                description={dbTranslate(seo, "description")}
			/>
			<SchemaBlock schema={schema} />
			<div className={classes.pageInfo}>
				<h1 className={classes.title}>
					{
						!!seo ?
							dbTranslate(seo, "h") : t("title")
					}
				</h1>
				<SimpleAccordion />
				<SeoText seo={seo} />
			</div>
		</>
	)
}
export default Questions;




const SimpleAccordion = () => {
	const t = useTranslations("Questions");
	return (
		<div>
			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<Typography>
						{
							t("question1")
						}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{
							t("answer1")
						}
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<Typography>
						{
							t("question2")
						}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{
							t("answer2")
						}
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<div>
						{
							t("question3")
						}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{
							t("answer3")
						}
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<div>
						{
							t("question4")
						}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						{
							t("answer4")
						}
					</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<div>
						{
							t("question5")
						}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{
							t("answer5")
						}
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<div>
						{
							t("question6")
						}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{
							t("answer6")
						}
					</div>
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary
					expandIcon={<MdExpandMore />}
				>
					<div>
						{
							t("question7")
						}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{
							t("answer7")
						}
					</div>
				</AccordionDetails>
			</Accordion>

		</div>
	);
}