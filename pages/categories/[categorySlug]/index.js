import MainLayout from "@/components/client/layouts/MainLayout";
import Category from "@/components/client/pages/Category/Category";
import prisma from "@/prisma/client";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import {getCategories} from "@/utils/getCategories";
import { getPageSeo } from "@/utils/getPageSeo";


export async function getStaticPaths(context) {
	const slugs = await prisma.category.findMany({
		select: {
			slug: true
		},
	})

	// Get the paths we want to pre-render based on posts
	const paths = slugs.map((slug) => ({
		params: { categorySlug: slug.slug },
	}))

	return { paths, fallback: 'blocking' }
}
export async function getStaticProps(page) {

	const isRoomCategory = page.params.categorySlug === "kimnaty"

	if(isRoomCategory) {
		return {
			notFound: true
		}
	}



	let products = await prisma.categoryOnProduct.findMany({
		where: {
			category: {
				slug: page.params.categorySlug
			}
		},
		select: {
			product: {
				include: {
					Colors: {
						include: {
							ProductImages: {
								orderBy: {
									order: 'asc'
								},
								include: {
									image: true
								}
							}
						}
					},
					Review: {
						where: {
							approved: 'approve'
						}
					},
					Sales: true,
					category: true,
					subcategory: true
				}
			}
		}
	})

	const category = await prisma.category.findUnique({
		where: {
			slug: page.params.categorySlug
		},
	})

	if(!category) {
		return {
			notFound: true
		}
	}

	products = JSON.stringify(products);
	products = JSON.parse(products)

	products = products.map(item => item.product)

	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()

	const seo = await getPageSeo("/categories/" + page.params.categorySlug)

	return {
		props: {
			category: category || null,
			products: products || [],
			offer: offer[0]|| 'Помилка оферу',
			popup: popup[0] || 'Помилка Popup',
			seo,
			messages: (await import(`@/messages/${page.locale}.json`)).default,
			categoryData: await getCategories(),
		},
		revalidate: 120
	}
}

const CategoryPage = ({products, category, seo}) => {
	const dbTranslate = useDynamicTranslate()

	return (
		<Category seo={seo} products={products} categoryName={dbTranslate(category, 'name')} isSubcategory={false} category={category}/>
	);
};


CategoryPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default CategoryPage;