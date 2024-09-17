import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import UpdateCategory from "@/components/adminpanel/pages/UpdateCategory/UpdateCategory";
import prisma from "@/prisma/client";
import withAuth from "@/components/adminpanel/shared/WithAuth";

export async function getServerSideProps(page) {
	const {categorySlug} = page.params;
	let category = await prisma.category.findUnique({
		where: {
			slug: categorySlug
		},
		include: {
			Subcategories: true
		}
	})

	category = JSON.stringify(category);
	category = JSON.parse(category);

	return {
		props: {
			category,
		},
	}
}
const UpdateCategoryPage = ({category}) => {
	return (
		<UpdateCategory category={category} />
	);
};


UpdateCategoryPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(UpdateCategoryPage);