import MainLayout from "@/components/client/layouts/MainLayout";
import Product from "@/components/client/pages/Product/Product";
import prisma from "@/prisma/client";
import { getPageSeo } from "@/utils/getPageSeo";
import {getCategories} from "@/utils/getCategories";


export async function getStaticPaths() {
	const slugs = await prisma.product.findMany({
		select: {
			slug: true
		},
	})

	// Get the paths we want to pre-render based on posts
	const paths = slugs.map((slug) => ({
		params: { productSlug: slug.slug },
	}))

	return { paths, fallback: 'blocking' }
}

export const fullProductIncludeArgs = {
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
		orderBy: {
			createAt: 'desc'
		},
		where: {
			approved: 'approve'
		}
	},
	Sales: true,
	category: {
		select: {
			category: true,
		}
	},
	subcategory: {
		select: {
			subcategory: true
		}
	}
}
export async function getStaticProps(page) {
	const productId = page.params.productSlug.split('-').slice(-5).join('-')

	const product = await prisma.product.findUnique({
		where: {
			id: productId
		},
		include: fullProductIncludeArgs
	})

	if (!product) {
		return {
			notFound: true,
		}
	}

	const category = product.category[0].category
	const subcategory = product.subcategory[0]?.subcategory

	if(!category) {
		return {
			notFound: true,
		}
	}


	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()
	const seo = await getPageSeo("/products/" + page.params.productSlug)

	// const { category } = await prisma.categoryOnProduct.findUnique({
	// 	where: {
	// 		productId: productId
	// 	},
	// 	select: {
	// 		category: true
	// 	}
	// })



	// const { subcategory } = await prisma.subcategoryOnProduct.findUnique({
	// 	where: {
	// 		productId: productId
	// 	},
	// 	select: {
	// 		subcategory: true
	// 	}
	// })

	// console.log("-------", product)

	let similarProducts = await prisma.categoryOnProduct.findMany({
		take: 15,
		where: {
			categoryId: category.id
		},
		select: {
			product: {
				include: fullProductIncludeArgs
			}
		}
	})

	similarProducts = JSON.stringify(similarProducts);
	similarProducts = JSON.parse(similarProducts);

	similarProducts = similarProducts.map(item => item.product);

	const productsCount = await prisma.product.count();
	const skip = Math.floor(Math.random() * productsCount);
	let relatedProducts = await prisma.product.findMany({
		take: 15,
		skip,
		orderBy: {
			discountValue: 'desc'
		},
		include: fullProductIncludeArgs
	})

	relatedProducts = JSON.stringify(relatedProducts);
	relatedProducts = JSON.parse(relatedProducts)

	let productData = {...product, category: {name: category?.name, name_ru: category?.name_ru, slug: category?.slug} || null, subcategory: {name: subcategory?.name, name_ru: subcategory?.name_ru, slug: subcategory?.slug,} || null}
	productData = JSON.stringify(productData);
	productData = JSON.parse(productData)

	return {
		props: {
			product: productData || null,
			offer: offer[0] || null,
			popup: popup[0] || 'Помилка Popup',
			similarProducts,
			relatedProducts,
			seo,
			messages: (await import(`@/messages/${page.locale}.json`)).default,
			categoryData: await getCategories(),
		},
		revalidate: 120
	}
}
const ProductPage = ({ product, similarProducts, relatedProducts, seo }) => {
	return (
		<>
			<Product
				seo={seo}
				product={product}
				similarProducts={similarProducts}
				relatedProducts={relatedProducts}
			/>
		</>
	);
};


ProductPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default ProductPage;