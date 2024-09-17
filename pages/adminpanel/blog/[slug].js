import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import AllPosts from "@/components/adminpanel/pages/Blog/AllPosts/AllPosts";
import prisma from "@/prisma/client";
import EditPost from "@/components/adminpanel/pages/Blog/NewPost/EditPost";

export async function getServerSideProps(page) {
	let post = await prisma.post.findUnique({
		where: {
			slug: page.params.slug
		},
		include: {
			Products: true
		}
	})
	post = {
		...post,
		Products: post.Products.map(item => ({ productId: item.productId }))
	}
	post = JSON.stringify(post)
	post = JSON.parse(post)

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
			post,
			categories,
			products
		},
	}
}
const ArticlePage = ({ post, categories, products }) => {
	return <EditPost post={post} categories={categories} products={products} />
};


ArticlePage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(ArticlePage);