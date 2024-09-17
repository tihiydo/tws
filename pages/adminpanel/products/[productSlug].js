import {API_URL} from "@/config";
import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import UpdateProduct from "@/components/adminpanel/pages/UpdateProduct/UpdateProduct";
import prisma from "@/prisma/client";
import withAuth from "@/components/adminpanel/shared/WithAuth";

const getCategories = async () => {
	const categories = await prisma.category.findMany({
		include: {
			Subcategories: true
		}
	})
	return categories;
}
export async function getServerSideProps(page) {

	let product = await prisma.product.findUnique({
		where: {
			slug: page.params.productSlug
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
			Sales: true,
			category: true,
			subcategory: true,
		}
	})
	let categories = await getCategories();

	categories = JSON.stringify(categories);
	categories = JSON.parse(categories);

	product = JSON.stringify(product);
	product = JSON.parse(product);

	// console.log(jsonData)
	return {
		props: {
			product: product || null,
			categories
		},
	}
}
const ProductPage = ({product, categories}) => {
	return (
		<UpdateProduct product={product} categories={categories} />
	);
};



ProductPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(ProductPage);