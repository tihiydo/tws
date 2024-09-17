import prisma from "@/prisma/client";

async function createOrder(req, res) {
	try {
		// console.log("BODY", req.body)
		const body = req.body;
		// console.log('BACKEND ===========', body)

		const OrderProductsQuery = body.products.map(prod => {
			return ({productId: prod.id, count: prod.count, price: prod.price, color: prod.color.name, imageUrl: prod?.color?.ProductImages[0]?.image?.url, Criterions: prod.Criterions})
		})

		const newOrder = await prisma.order.create({
			data: {
				price: body.price,
				name: body.name,
				surname: body.surname,
				phone: body.phone,
				city: body.city,
				address: body.address,
				department: body.department,
				promocodeId: body.promocode?.id,
				shipping_type: body.shipping_type,
				payment_type: body.payment_type,
				status: 'new_order',
				OrderProducts: {
					create: OrderProductsQuery
				}
			}
		})
		// await addBitrixDeal(true, body)
		return res.status(200).json({message: 'good', order: newOrder})
	} catch (e) {
		console.log(e)
		throw e;
	}
}

async function getOrders(req, res) {
	try {
		const body = req.query;
		console.log(body)

		const orders = await prisma.Order.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			take: 10,
			skip: (body.pageNumber - 1) * 10,
			where: body.type == 'all' ? {} : {status: body.status},
			include: {
				OrderProducts: {
					include: {
						product: true
					}
				}
			}
		})
		return res.status(200).json({message: 'good', data: orders})
	} catch (e) {
		console.log(e)
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				await getOrders(req, res);
				break;
			case 'POST':
				await createOrder(req, res);
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