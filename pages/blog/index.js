import MainLayout from "@/components/client/layouts/MainLayout";
import Blog from "@/components/client/pages/Blog/Blog";
import prisma from "@/prisma/client";
import { getPageSeo } from "@/utils/getPageSeo";
import { defaultSeo } from "@/components/client/SeoBlock/defaultSeo";
import {getCategories} from "@/utils/getCategories";

export async function getStaticProps(context) {
	let posts = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc"
		},
		include: {
			Review: true
		}
	})
	const seo = await getPageSeo("/blog")
	posts = JSON.stringify(posts)
	posts = JSON.parse(posts)

	const offer = await prisma.Offer.findMany()

	return {
		props: {
			posts,
			seo: seo ?? defaultSeo,
			offer: offer[0] || 'Помилка оферу',
			messages: (await import(`@/messages/${context.locale}.json`)).default,
			categoryData: await getCategories(),
		},
	}
}


const BlogPage = ({ posts, seo }) => {
	return <Blog seo={seo} posts={posts} />
};

BlogPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default BlogPage;