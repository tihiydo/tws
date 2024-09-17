import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import NewPost from "@/components/adminpanel/pages/Blog/NewPost/NewPost";
import prisma from "@/prisma/client";

export async function getServerSideProps(page) {
	const categories = await prisma.category.findMany({
		include: {
			Subcategories: true
		}
	})
	let products = await prisma.product.findMany({
		select: {
			id: true,
			name: true
		}
	})
	products = products.map(item => ({
		label: item.name,
		value: item.id
	}))

	return {
		props: {
			categories,
			products
		},
	}
}
const NewPostPage = ({ categories, products }) => {
	return <NewPost categories={categories} products={products} />
};


NewPostPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(NewPostPage);