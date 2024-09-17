import prisma from "@/prisma/client";
async function updatePromocode(req, res) {
	try {
		const body = req.body;
		const {promoId} = req.query;
		const updatedPromocode = await prisma.promocode.update({
			where: {
				name: promoId
			},
			data: {
				value: body.value,
				type: body.type,
				name: body.name
			}
		})
		res.status(200).json({message: 'good', data: updatedPromocode})
	} catch (e) {
		throw e;
	}
}

async function deletePromocode(req, res) {
	try {
		const {promoId} = req.query;
		const deletedPromocode = await prisma.promocode.delete({
			where: {
				id: promoId
			}
		})
		res.status(200).json({message: 'good', data: deletedPromocode});
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'PUT':
				await updatePromocode(req, res);
				break;
			case 'DELETE':
				await deletePromocode(req, res);
				break;
			// case 'PUT':
			// 	await updateProduct(req, res);
			// 	break;
			default:
				await updatePromocode(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}