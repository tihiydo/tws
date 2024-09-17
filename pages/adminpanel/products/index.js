import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import AllProducts from "@/components/adminpanel/pages/AllProducts/AllProducts";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import prisma from "@/prisma/client";

export async function getServerSideProps(page) {

	let products = await prisma.product.findMany({
		// where: {
		// 	category: {
		// 		some: {
		// 			categoryId: {
		// 				not: null
		// 			}
		// 		}
		// 	}
		// },
		orderBy: {
			createdAt: 'desc'
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
			Sales: true
		}
	})

	products = JSON.stringify(products);
	products = JSON.parse(products);
	// console.log(jsonData)
	return {
		props: {
			products: products || []
		},
	}
}
const ProductsPage = ({products}) => {
	return (
		<AllProducts products={products} />
	);
};


ProductsPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(ProductsPage);