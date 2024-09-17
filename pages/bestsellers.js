import MainLayout from "@/components/client/layouts/MainLayout";
import prisma from "@/prisma/client";
import Category from "@/components/client/pages/Category/Category";
import { getPageSeo } from "@/utils/getPageSeo";
import {getCategories} from "@/utils/getCategories";

export async function getStaticProps(context) {

	let products = await prisma.product.findMany({
		where: {
			onBestsellers: true
		},
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
			Criterions: {
				include: {
					CriterionItems: true
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
	})

	products = JSON.stringify(products);
	products = JSON.parse(products)
	// console.log(jsonData)
	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()
	const seo = await getPageSeo("/bestsellers")

	return {
		props: {
			products: products || null,
			offer: offer[0] || 'Помилка оферу',
			popup: popup[0] || 'Помилка Popup',
			seo,
			categoryData: await getCategories(),
			messages: (await import(`@/messages/${context.locale}.json`)).default,
		},
		revalidate: 120
	}
}

// export async function getServerSideProps(page) {
//
// 	const response = await fetch(`${API_URL}/api/products/${page.params.productSlug}`, {
// 		method: "GET"
// 	})
//
// 	const jsonData = await response.json()
// 	// console.log(jsonData)
// 	return {
// 		props: {
// 			product: jsonData.product
// 		},
// 	}
// }
const BestsellersPage = ({products, seo}) => {
	return (
		// <div>category</div>
		<Category seo={seo} products={products} categoryName="Bestsellers" />
	);
};


BestsellersPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default BestsellersPage;