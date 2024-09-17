import prisma from "@/prisma/client";

const getCategoriesOnMain = async (req, res) => {
	try {
		const categoriesOnMain = await prisma.category.findMany({
			where: {
				onMain: true
			},
			include: {
				Products: {
					select: {
						product: {
							where: {
								onMain: true
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
								Review: {
									where: {
										approved: 'approve'
									}
								}
							}
						}
					}
				},
			}
		})

		if (!categoriesOnMain?.length) {
			return res.status(404).json({message: 'Not Found'})
		}

		// console.log(categoriesOnMain)

		return res.status(200).json({message: 'good', categories: categoriesOnMain})
	} catch (e) {
		throw e
	}
}


export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				await getCategoriesOnMain(req, res);
				break;
			case 'POST':
				// await createOrder(req, res);
				break;
			default:
				res.status(200).json({message: 'good', method: method})
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}