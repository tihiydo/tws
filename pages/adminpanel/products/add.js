import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import AddProduct from "@/components/adminpanel/pages/AddProduct/AddProduct";
import prisma from "@/prisma/client";
import withAuth from "@/components/adminpanel/shared/WithAuth";

const getData = async () => {
	const categories = await prisma.category.findMany({
		include: {
			Subcategories: true
		}
	})
	return categories;
}

export async function getServerSideProps() {
	const jsonData = await getData();
	// console.log(jsonData)
	return {
		props: {
			categories: jsonData
		}
	}
}
const AddProductPage = ({categories}) => {
	return (
		<AddProduct categories={categories} />
	);
};


AddProductPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(AddProductPage);