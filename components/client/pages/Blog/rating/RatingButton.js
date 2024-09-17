import Rating from '@mui/material/Rating';
import useReview from "@/components/client/pages/Blog/hooks/useReview";

import styles from "./ratingButton.module.scss";
import { useTranslations } from "next-intl";
const RatingButton = ({ post, readOnly, style }) => {
	const { rating, handleRatingChange } = useReview(post)
	const t = useTranslations("Blog")
	return (
		<div className={styles.rating} style={style}>
			<Rating
				name="half-rating"
				value={rating}
				precision={0.5}
				readOnly={ readOnly }
				onChange={(event, newValue) => {
					handleRatingChange(newValue)
				}}
			/>
			<span>{post?.Review?.length} { t("rating") }</span>
		</div>
	);

}

export default RatingButton;