export default async function handler(req, res) {
	try {
		const method = req.method;
		if (method === 'POST') {
			const body = req.body;
			const updatedOrder = await prisma.order.update({
				where: {
					id: body.id,
				},
				data: {
					approved: body.approved
				},
				include: {
					OrderProducts: {
						include: {
							product: true
						}
					}
				}
			})
			res.status(200).json({message: 'good', data: updatedOrder})
		} else {
			res.status(500).json({message: 'Unsupported method'})
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}