import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";
import LinkMaterial from "@mui/material/Link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

const ReviewItem = ({ review }) => {

	const router = useRouter();

	const status = useMemo(() => {
		switch (review.status) {
			case "APPROVED":
				return "Підтвердежний";
			case "DECLINED":
				return "Видалений";
			default:
				return "Не перевірений"
		}
	}, [review])

	async function handleStatusChange(status) {
		try {
			const res = await fetch(`/api/blog/review`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...review,
					status
				})
			})

			if (!res.ok) {
				throw new Error(res.statusText)
			}
			return router.refresh();
		} catch (e) {
			throw e;
		}
	}

	return (
		<Card sx={{ minWidth: 275 }} style={{marginTop: 15}}>
			<CardContent>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>

					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{
							dayjs(review.createAt).format("DD.MM.YYYY")
						} - { review.phone }
					</Typography>

					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Статус - { status }
					</Typography>
				</div>

				<LinkMaterial href={`/blog/${review.Post.slug}`}>
					{ review.Post.title }
				</LinkMaterial>

				<Typography variant="h5" component="div">
					{ review.name }
				</Typography>

				<Rating name="read-only" value={0} readOnly />

				<Typography variant="body2">
					{ review.comment }
				</Typography>

			</CardContent>
			<CardActions>
				<Button
					variant="outlined"
					color="error"
					onClick={() => handleStatusChange("DECLINED")}
				>
					Видалити
				</Button>
				<Button
					variant="contained"
					color="success"
					onClick={() => handleStatusChange("APPROVED")}
				>
					Підтвердити
				</Button>
			</CardActions>
		</Card>
	);
};

export default ReviewItem;