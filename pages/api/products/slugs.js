import prisma from "@/prisma/client";

async function getProducts(req, res) {
	try {
		const productSlugs = await prisma.product.findMany({
			select: {
				slug: true
			},
		})

		// console.log(productSlugs)

		return res.status(200).json({message: 'good', products: productSlugs})
	} catch (e) {
		throw e
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				await getProducts(req, res);
				break;
			case 'POST':
				// await createProducts(req, res);
				break;
			default:
				// await getProducts(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}