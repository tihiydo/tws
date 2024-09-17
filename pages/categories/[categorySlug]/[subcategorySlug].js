import {API_URL} from "@/config";
import MainLayout from "@/components/client/layouts/MainLayout";
import Category from "@/components/client/pages/Category/Category";
import prisma from "@/prisma/client";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import { getPageSeo } from "@/utils/getPageSeo";
import {getCategories} from "@/utils/getCategories";


export async function getStaticPaths() {
	const subcategories = await prisma.subcategory.findMany({
		select: {
			slug: true,
			category: {
				select: {
					slug: true
				}
			}
		},
	})

	// Get the paths we want to pre-render based on posts
	const paths = subcategories.map((subcat) => ({
		params: { categorySlug: subcat.category.slug , subcategorySlug: subcat.slug},
	}))

	return { paths, fallback: 'blocking' }
}
export async function getStaticProps(page) {


	let products = await prisma.subcategoryOnProduct.findMany({
		where: {
			subcategory: {
				slug: page.params.subcategorySlug
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

	let subcategory = await prisma.subcategory.findUnique({
		where: {
			slug: page.params.subcategorySlug
		}
	})

	let category = await prisma.category.findUnique({
		where: {
			slug: page.params.categorySlug
		}
	})


	products = JSON.stringify(products);
	products = JSON.parse(products)

	products = products.map(item => item.product)

	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()

	const seo = await getPageSeo(`/categories/${page.params.categorySlug}/${page.params.subcategorySlug}`)
	
	return {
		props: {
			subcategory,
			category,
			products: products || [],
			offer: offer[0] || 'Помилка оферу',
			popup: popup[0] || 'Помилка Popup',
			seo,
			messages: (await import(`@/messages/${page.locale}.json`)).default,
			categoryData: await getCategories(),
		},
		revalidate: 120
	}
}
// export async function getServerSideProps(page) {
//
// 	const response = await fetch(`${API_URL}/api/products?category=${page.params.categorySlug}`, {
// 		method: "GET"
// 	})
//
// 	const jsonData = await response.json()
// 	// console.log(jsonData)
// 	return {
// 		props: {
// 			products: jsonData.products || []
// 		},
// 	}
// }
const SubcategoryPage = ({products, subcategory, category, seo}) => {
	const dbTranslate = useDynamicTranslate()
	return (
		// <div>category</div>
		<Category seo={seo} products={products} categoryName={dbTranslate(subcategory, 'name')} isSubcategory={true} category={category} subcategory={subcategory} />
	);
};


SubcategoryPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default SubcategoryPage;