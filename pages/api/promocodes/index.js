import prisma from "@/prisma/client";
async function getPromocodes(req, res) {
	try {
		const {name} = req.query;
		// console.log('name ====', name)
		if (name !== undefined) {
			const promocode = await prisma.promocode.findFirst({
				where: {
					name: name
				}
			});
			res.status(200).json({message: 'good', data: promocode})
		}
		const promocodes = await prisma.promocode.findMany();
		res.status(200).json({message: 'good', data: promocodes})
	} catch (e) {
		throw e;
	}
}

async function createPromocode(req, res) {
	try {
		const body = req.body;
		const newPromocode = await prisma.promocode.create({
			data: {
				value: body.value,
				type: body.type,
				name: body.name
			}
		})
		res.status(200).json({message: 'good', data: newPromocode})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				await getPromocodes(req, res);
				break;
			case 'POST':
				await createPromocode(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await getPromocodes(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}