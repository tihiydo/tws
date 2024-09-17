import prisma from "@/prisma/client";
import translit from "@/utils/translit";
// import axios from "axios";

const createCategory = async (req, res) => {
	try {
		const body = req.body;
		const subcategories = body?.Subcategories.map(sub => ({name: sub.name, name_ru: sub?.name_ru, slug: translit(sub.name)}))
		const newCategory = await prisma.category.create({
			data: {
				name: body.name,
				name_ru: body?.name_ru,
				slug: translit(body.name),
				onMain: body.onMain,
				order: Number(body.order),
				iconSrc: body.iconSrc,
				Subcategories: {
					create: subcategories
				}
			}
		})
		// console.log('start revalidate')
		// axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/revalidate`).then(() => console.log('end revalidate'));
		res.status(200).json({message: 'good', data: newCategory});
	} catch (e) {
		throw e;
	}
}

async function getCategories(req, res) {
	try {
		const categories = await prisma.category.findMany({
			orderBy: {
				order: 'asc'
			},
			include: {
				Subcategories: true
			}
		})

		// console.log(categoriesSlugs)

		return res.status(200).json({message: 'good', categories: categories})
	} catch (e) {
		throw e
	}
}

export default async function handler(req, res) {
	try {
		// console.log('REQUEST ++++++++++++++++')
		const method = req.method;
		switch (method) {
			case 'GET':
				await getCategories(req, res);
				break;
			case 'POST':
				await createCategory(req, res);
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