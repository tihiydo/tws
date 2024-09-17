import prisma from "@/prisma/client";

export default async function handler(req, res) {
	try {
		const method = req.method;
		const {categoryId} = req.query;
		if (method === "GET") {
			const relatedProducts = await prisma.product.findMany({
				take: 15,
				where: {
					categoryId: categoryId,
				},
				orderBy: {
					discountValue: "desc"
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
						orderBy: {
							createAt: 'desc'
						},
						where: {
							approved: 'approve'
						}
					},
					Sales: true,
					category: true,
					subcategory: true
				}
			})

			res.status(200).json({message: 'good', relatedProducts: relatedProducts})
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}