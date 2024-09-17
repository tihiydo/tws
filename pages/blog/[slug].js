import MainLayout from "@/components/client/layouts/MainLayout";
import Article from "@/components/client/pages/Blog/Article/Article";
import prisma from "@/prisma/client";
import { fullProductIncludeArgs } from "@/pages/products/[productSlug]";
import {getCategories} from "@/utils/getCategories";

export async function getStaticPaths() {
	const slugs = await prisma.post.findMany({
		select: {
			slug: true
		}
	})

	const paths = slugs.map((slug) => ({
		params: { slug: slug.slug },
	}))

	return { paths, fallback: "blocking" }
}

export async function getStaticProps(page) {

	let post = await prisma.post.findUnique({
		where: {
			slug: page.params.slug,
		},
		include: {
			Products: {
				include: {
					product: {
						include: {
							...fullProductIncludeArgs
						}
					}
				}
			},
			Category: {
				select: {
					Products: {
						select: {
							product: {
								include: fullProductIncludeArgs
							}
						}
					}
				}
			},
			Subcategory: {
				select: {
					Products: {
						select: {
							product: {
								include: fullProductIncludeArgs
							}
						}
					}
				}
			},
			Review: {
				where: {
					status: "APPROVED"
				}
			},
		}
	})
	post = JSON.stringify(post)
	post = JSON.parse(post)

	const offer = await prisma.Offer.findMany()

	return {
		props: {
			post,
			offer: offer[0] || 'Помилка оферу',
			messages: (await import(`@/messages/${page.locale}.json`)).default,
			categoryData: await getCategories(),
		},
	}
}


const ArticlePage = ({ post }) => {
	return <Article post={post} />
};

ArticlePage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default ArticlePage;