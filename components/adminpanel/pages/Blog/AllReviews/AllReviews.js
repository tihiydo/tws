import ReviewItem from "@/components/adminpanel/pages/Blog/AllReviews/ReviewItem";

const AllReviews = ({ reviews }) => {
	return (
		<div>
			{
				reviews.map(item => (
					<ReviewItem key={item.id} review={item} />
				))
			}
		</div>
	);
};

export default AllReviews;