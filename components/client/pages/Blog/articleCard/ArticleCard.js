import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import RatingButton from "@/components/client/pages/Blog/rating/RatingButton";
import styles from "./articleCard.module.scss";
import { useDynamicTranslate } from "@/components/client/hooks/useDynamicTranslate";
import { useTranslations } from "next-intl";

const ArticleCard = ({ post, variant = "default" }) => {
	const image = JSON.parse(post.image);
	const dbTranslate = useDynamicTranslate()
	const t = useTranslations("buttons")
	return (
		<div
			className={styles.card}
			style={{ gridTemplateRows: variant !== "default" && "200px" }}
		>
			{
				variant === "default" &&
					<Link href={`/blog/${post.slug}`} className={styles.card__link} />
			}

			<div className={styles.card__date}>
				{
					post.withDate ?
						dayjs(post.createdAt).format("DD.MM.YYYY") : null
				}
			</div>

			<div className={styles.card__image}>
				<Image
					fill
					src={image?.url}
					title={image?.name}
					alt={image?.name}
				/>
			</div>
			<div className={styles.card__contentWrapper}>
				<div className={styles.card__content}>
					<div className={styles.card__title}>
						{
							dbTranslate(post, "title")
						}
					</div>
					<div className={styles.card__author}>
						{
							post.author
						}
					</div>
					{
						variant === "default" &&
							<p className={styles.card__description}>
								{
									dbTranslate(post, "description")
								}
							</p>
					}

					<RatingButton post={post} readOnly/>

				</div>
				{
					variant === "default" ?
						<Link href={`/blog/${post.slug}`} className={styles.readBtn}>
							<span>{t("read")}</span>
						</Link> :
						<Link href={`/adminpanel/blog/${post.slug}`} className={styles.readBtn}>
							<span>Редагувати</span>
						</Link>
				}
			</div>
		</div>
	);
};

export default ArticleCard;