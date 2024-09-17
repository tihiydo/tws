import Pagination from '@mui/material/Pagination';
import ArticleCard from "@/components/client/pages/Blog/articleCard/ArticleCard";
import styles from "./blogPage.module.scss";
import usePagination from "@/components/client/pages/Blog/hooks/usePagination";
import { useTranslations } from "next-intl";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import SchemaBlock from "@/components/client/SeoBlock/SchemaBlock";
import SeoBlock from "@/components/client/SeoBlock/SeoBlock";
import SeoText from "@/components/client/SeoBlock/SeoText";

const PER_PAGE = 10;

const Blog = ({ posts, seo }) => {
	const t = useTranslations("Blog");
	const { currentPage, count, renderData, jump } = usePagination(
		posts,
		PER_PAGE
	)

	const dbTranslate = useDynamicTranslate()

	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": posts.map((item, i) => ({
			"@type": "ListItem",
			"position": i + 1,
			"name": dbTranslate(item, 'title'),
			"item": `https://www.twinsann.com/blog/${item.slug}`
		}))
	}

	return (
		<>
			<SeoBlock
				title={dbTranslate(seo, "title")}
				description={dbTranslate(seo, "description")}
				ogImageUrl={JSON.parse(posts[0].image).url}
				ogImageWidth={400}
				ogImageHeight={500}
				ogImageAlt={posts[0].title}
			/>
			<SchemaBlock schema={schema}/>
			<div className={styles.blog__wrapper}>
				<div className={styles.blog}>
					<h1 className={styles.blog__title}>
						{
							dbTranslate(seo, "h") ?? Блог
						}
					</h1>
					<p className={styles.blog__subtitle}>
						{ t("subtitle") }
					</p>

					<div className={styles.blog__articles}>
						{
							renderData.map(item => (
								<ArticleCard key={item.id} post={item} />
							))
						}
					</div>
				</div>
				{
					count > 1 ?
						<div className={styles.blog__pagination}>
							<Pagination
								page={currentPage}
								count={count}
								onChange={(_, page) => jump(page)}
							/>
						</div> : null
				}

				<SeoText seo={seo} />
			</div>
		</>
	)
}

export default Blog;