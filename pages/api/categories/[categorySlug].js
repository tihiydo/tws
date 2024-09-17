import prisma from "@/prisma/client";
const createCategory = async (req, res) => {
	try {
		const body = req.body;
		const newCategory = await prisma.category.create({
			data: {
				name: body.name,
				name_ru: body?.name_ru,
				Subcategories: {
					create: body.Subcategories
				}
			}
		})
		res.status(200).json({message: 'good', data: newCategory});
	} catch (e) {
		throw e;
	}
}
const getCategory = async (req, res) => {
	try {
		const {categorySlug} = req.query;
		const category = await prisma.category.findUnique({
			where: {
				slug: categorySlug
			}
		})
		// console.log(category)
		res.status(200).json({message: 'good', data: category})

	} catch (e) {
		throw e;
	}
}
const updateCategory = async (req, res) => {
	try {
		const {categorySlug} = req.query;
		const body = req.body;
		const dbCategory = await prisma.category.findUnique({
			where: {
				slug: categorySlug
			},
			include: {
				Subcategories: true
			}
		})

		const updatedCategory = await prisma.category.update({
			where: {
				id: dbCategory.id
			},
			data: {
				name: body.name,
				name_ru: body?.name_ru,
				order: body?.order ? Number(body.order) : null,
				onMain: body.onMain,
				iconSrc: body.iconSrc
			}
		})

		// const existingSubcategories = await prisma.subcategory.findMany({
		// 	where: { categoryId: updatedCategory.id },
		// });

		await Promise.all(
			body.Subcategories.map(async (subcategory) => {
				const existingSubcategory = dbCategory?.Subcategories?.find(
					(s) => s.id === subcategory.id
				);
				if (existingSubcategory) {
					await prisma.subcategory.update({
						where: { id: existingSubcategory.id },
						data: {
							slug: subcategory.slug,
							name: subcategory.name,
							name_ru: subcategory?.name_ru,
						},
					});
				} else {
					await prisma.subcategory.create({
						data: {
							slug: subcategory.slug,
							name: subcategory.name,
							name_ru: subcategory?.name_ru,
							category: { connect: { id: updatedCategory.id } },
						},
					});
				}
			})
		);

		const subcategoriesToDelete = dbCategory?.Subcategories?.filter(
			(s) =>
				!body.Subcategories.find((subcategory) => subcategory.id === s.id)
		);

		await Promise.all(
			subcategoriesToDelete.map(async (subcategory) => {
				await prisma.subcategory.delete({ where: { id: subcategory.id } });
			})
		);

		res.status(200).json({message: 'good', data: updatedCategory})
		// prisma.sub

	} catch (e) {
		throw e;
	}
}

const deleteCategory = async (req, res) => {
	try {
		// console.log('DELETE')
		const {categorySlug} = req.query;
		await prisma.category.delete({
			where: { slug: categorySlug },
		})

		res.status(200).json({message: 'good'})

	} catch (e) {
		throw e;
	}
}
export default async function handler(req, res) {
	try {
		// console.log('REQUEST ++++++++++++++++')
		const method = req.method;
		switch (method) {
			case 'PUT':
				await updateCategory(req, res);
				break;
			case 'DELETE':
				await deleteCategory(req, res);
				break;
			default:
				res.status(400).json({message: 'Unknown method', method: method})
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}