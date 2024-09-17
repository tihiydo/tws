import { useEffect, useState } from "react";

export default function useReview(post) {
	const [rating, setRating] = useState(0)

	useEffect(() => {
		const dbValue = post?.Review?.reduce((acc, item) => acc + item?.rating, 0) / post?.Review?.length
		setRating(Number(dbValue.toFixed(1)))
	}, [post]);

	const handleRatingChange = (value) => {
		setRating(value)
	}

	return {
		rating,
		handleRatingChange
	}
}