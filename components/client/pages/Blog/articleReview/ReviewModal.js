import { useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import classes from "./styles.module.scss";
import { RxCross2 } from "react-icons/rx";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import ReviewForm from "@/components/client/pages/Blog/articleReview/ReviewForm";
import { useTranslations } from "next-intl";

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	maxWidth: 500,
	bgcolor: 'background.paper',
	boxShadow: 24,
};

const ReviewModal = ({ post }) => {
	const [isOpen, setIsOpen] = useState(false)
	const t = useTranslations("buttons")
	async function submitHandler(data) {
		try {
			const res = await fetch(`/api/blog/review`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					postId: post.id
				})
			})

			if (!res.ok) {
				throw new Error(res.statusText)
			}
			return setIsOpen(false);
		} catch (e) {
			throw e;
		}
	}

	return (
		<div>
			<Button
				onClick={() => setIsOpen(true)}
				text={t("feedback")}
			/>
			<Modal
				open={isOpen}
				onClose={() => setIsOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className={classes.modalTitle}>
						{ t("feedback") }
						<RxCross2 onClick={() => setIsOpen(false)}/>
					</div>
					<div className={classes.modalBody}>
						<ReviewForm submitHandler={submitHandler}/>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default ReviewModal;