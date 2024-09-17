import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import AllPosts from "@/components/adminpanel/pages/Blog/AllPosts/AllPosts";
import prisma from "@/prisma/client";

export async function getServerSideProps(page) {
	let posts = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc"
		}
	})
	posts = JSON.stringify(posts)
	posts = JSON.parse(posts)

	return {
		props: {
			posts
		},
	}
}
const BlogPage = ({ posts }) => {
	return <AllPosts posts={posts} />
};


BlogPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(BlogPage);