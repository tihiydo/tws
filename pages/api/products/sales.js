import prisma from "@/prisma/client";

const addSale = async (req, res) => {
	try {
		const body = JSON.parse(req.body);


		const newSale = await prisma.Sale.create({
			data: {
                idProduct: body.idProduct,
                buyedNum: Number(body.buyedNum),
                freeNum: Number(body.freeNum),
                cloth: body.cloth,
			},
		})



		return res.status(200).json({message: 'good', data: newSale})
			// console.log(files.file[0])

	} catch (e) {
		throw e
	}
}

const removeSale= async (req, res) => {
	try {
		const body = JSON.parse(req.body);


		const newSale = await prisma.Sale.delete({
			where: {
                id: body.idSale
            }
		})



		return res.status(200).json({message: 'good', data: newSale})
			// console.log(files.file[0])

	} catch (e) {
		throw e
	}
}


export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'DELETE':
				await removeSale(req, res);
				break;
			case 'POST':
				await addSale(req, res);
				break;
			default:
				res.status(500).json({message: 'error'})
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}