import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import prisma from "@/prisma/client";
import AllReviews from "@/components/adminpanel/pages/Blog/AllReviews/AllReviews";

export async function getServerSideProps(page) {
	let reviews = await prisma.postReview.findMany({
		orderBy: {
			createAt: "desc"
		},
		include: {
			Post: {
				select: {
					title: true,
					slug: true
				}
			}
		}
	})
	reviews = JSON.stringify(reviews)
	reviews = JSON.parse(reviews)

	return {
		props: {
			reviews
		},
	}
}
const ReviewsPage = ({ reviews }) => {
	return <AllReviews reviews={reviews} />
};


ReviewsPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(ReviewsPage);