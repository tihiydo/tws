import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/client/shared/Breadcrumbs/Breadcrumbs";
import { useTranslations } from "next-intl";

import styles from "./article.module.scss";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import RatingButton from "@/components/client/pages/Blog/rating/RatingButton";
import dayjs from "dayjs";
import ContentBlock from "@/components/client/pages/Blog/contentBlock";
import ReviewModal from "@/components/client/pages/Blog/articleReview/ReviewModal";
import classes from "@/components/client/pages/Product/productPage.module.scss";
import ReviewItem from "@/components/client/shared/ReviewItem/reviewItem";
import SwiperComponent from "@/components/client/shared/Swiper/Swiper";
import data from "@/components/client/pages/Main/data";
import CategorySlider from "@/components/client/pages/Main/CategorySlider/CategorySlider";
import SchemaBlock from "@/components/client/SeoBlock/SchemaBlock";
import breadcrumbsStyles from "@/components/client/shared/Breadcrumbs/breadcrumbs.module.scss"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SeoBlock from "@/components/client/SeoBlock/SeoBlock";

const Article = ({ post }) => {

	const image = JSON.parse(post?.image);
	const content = JSON.parse(post?.content);

	const relatedProduct = post.Products.map(item => (item.product))

	const tableOfContent = content
			.filter(item => item.type === "title")

	const info = useTranslations('info');
	const t = useTranslations("Blog");
	const button = useTranslations("buttons");
	const dbTranslate = useDynamicTranslate()

	const schema = {
		"@context": "https://schema.org/",
		"@type": "Product",
		"name": dbTranslate(post, 'title'),
		"description": dbTranslate(post, 'description'),
		"review": {
			"@type": "Review",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": post?.Review[0]?.rating.toFixed(0),
				"bestRating": 5
			},
			"author": {
				"@type": "Person",
				"name": post?.Review[0]?.name
			}
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": (post?.Review?.reduce((acc, item) => acc + item?.rating, 0) / post?.Review?.length).toFixed(1),
			"reviewCount": post?.Review?.length
		}
	}

	console.log(post)

	return (
		<>
			<SchemaBlock schema={schema}/>
			<SeoBlock
				title={dbTranslate(post, "title")}
				ogTitle={dbTranslate(post, "title")}
				description={
					dbTranslate(post, "description").length > 300 ?
						`${dbTranslate(post, "description").slice(0, 300)}` :
						dbTranslate(post, "description")
				}
				ogImageUrl={image?.url}
			/>
			<div className={styles.container}>
				<div style={{marginBottom: 35}}>
					<Breadcrumbs links={[
						{text: info('home'), href: '/'},
						{text: "Блог", href: "/blog"},
						{text: dbTranslate(post, "title"), href: `/blog/${post.slug}`}
					]}/>
				</div>
				<div style={{display: "flex", alignItems: "center", marginBottom: 16, gap: "0.7rem"}}>
					<FiChevronLeft size={16} className={breadcrumbsStyles['breadcrumb-icon']}/>
					<Link href={"/blog"} className={breadcrumbsStyles['breadcrumb-link']}>
						{ button("toArticles") }
					</Link>
				</div>
				{/*<Button*/}
				{/*	href={"/blog"}*/}
				{/*	startIcon={<HiChevronLeft />}*/}
				{/*	variant="outlined"*/}
				{/*	style={{marginBottom: 20}}*/}
				{/*>*/}
				{/*	{ button("toArticles") }*/}
				{/*</Button>*/}
				<div className={styles.layout}>
					<div className={styles.article}>
						<div className={styles.article__header}>
							<h1 className={styles.article__title}>
								{
									dbTranslate(post, "title")
								}
							</h1>

							<div className={styles.article__infoRow}>
								<div className={styles.article__author}>
									<span className={styles.article__infoRow_mark}>Автор</span>
									<div className={styles.article__author_row}>
										{
											post.author
										}
									</div>
								</div>
								{
									post.withDate &&
									<>
										<div className={styles.article__separator}></div>
										<div className={styles.article__date}>
											<span className={styles.article__infoRow_mark}>{ t("date") }</span>
											<div className={styles.article__date_row}>
												{
													dayjs(post.createdAt).format("DD.MM.YYYY")
												}
											</div>
										</div>
									</>
								}
							</div>
							<RatingButton post={post} readOnly />

							<div className={styles.article__image}>
								<Image
									fill
									src={image?.url}
									title={image?.name}
									alt={image?.name}
								/>
							</div>

							<p className={styles.article__descr}>
								{ dbTranslate(post, "description") }
							</p>
						</div>
						<div className={styles.tableOfContentWrapperMobile}>
							<aside className={styles.tableOfContent}>
								<div className={styles.tableOfContent__title}>{ t("contents") }</div>
								<ul className={styles.tableOfContent__list}>
									{
										tableOfContent.map(item => (
											<Link href={`#${item.anchor}`} className={styles.tableOfContent__item}>
												{
													dbTranslate(item, "title")
												}
											</Link>
										))
									}
								</ul>
							</aside>
						</div>

						<div className={styles.article__content}>
							{
								content.map(item => (
									<ContentBlock {...item} />
								))
							}
						</div>
						<CategorySlider
							category={{
								...post.Category,
								name: "Пов'язані категорії",
								name_ru: "Связанные категории"
							}}
							style={{color: "#000"}}
							settings={data.swiper.settings.BlogCards}
							type="cards"
						/>

						<div className={classes.lastViewed}>
							<div className={classes.title}>
								{ t("relatedProducts") }
							</div>
							<SwiperComponent children={relatedProduct} settings={data.swiper.settings.BlogCards} type="cards"/>
						</div>

						<div className={classes.reviews}>
							<h2 className={classes.title}>
								{ t("reviews") }
							</h2>

							{
								post?.Review?.map(item => (
									<ReviewItem
										key={item.id}
										user={item.name}
										starsRate={item.rating}
										reviewText={item.comment}
									/>
								))
							}
						</div>

						<div className={styles.article__form}>
							<ReviewModal post={post} />
						</div>
					</div>
					<div className={styles.tableOfContentWrapperDesktop}>
						<aside className={styles.tableOfContent}>
							<div className={styles.tableOfContent__title}>{ t("contents") }</div>
							<ul className={styles.tableOfContent__list}>
								{
									tableOfContent.map(item => (
										<Link href={`#${item.anchor}`} className={styles.tableOfContent__item}>
											{
												dbTranslate(item, "title")
											}
										</Link>
									))
								}
							</ul>
						</aside>
					</div>
				</div>
			</div>
		</>
	);
};

export default Article;