import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import Reviews from "@/components/adminpanel/pages/Reviews/Reviews";
import withAuth from "@/components/adminpanel/shared/WithAuth";

const ReviewsPage = () => {
	return (
		<Reviews />
	);
};


ReviewsPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(ReviewsPage);