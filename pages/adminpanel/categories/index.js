import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import prisma from "@/prisma/client";
import AllCategories from "@/components/adminpanel/pages/AllCategories/AllCategories";
import withAuth from "@/components/adminpanel/shared/WithAuth";

export async function getServerSideProps(page) {

	let categories = await prisma.category.findMany({
		orderBy: {
			order: 'asc'
		},
		include: {
			Subcategories: true
		}
	})
	// console.log('CATEGORIES', categories)

	categories = JSON.stringify(categories);
	categories = JSON.parse(categories);

	// console.log(jsonData)
	return {
		props: {
			categories: categories || []
		},
	}
}
const CategoriesPage = ({categories}) => {
	return (
		<AllCategories categories={categories} />
	);
};


CategoriesPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(CategoriesPage);