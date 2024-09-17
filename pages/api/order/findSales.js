import prisma from '../../../prisma/client'

export default async function handler(req, res) {
	try {
		const method = req.method;
		if (method === 'POST') {
			const body = JSON.parse(req.body);

            // console.log(body)
            const idsProduct = body.map(item => item.id)
            // console.log(idsProduct)

            let saleSum = []

			const productSales = await prisma.Sale.findMany({
				where: {
					idProduct: {
                        in: idsProduct
                    }
				},
				include: {
					Products: true
				}
			})

            for(const bodySale of body){
                for(const productSale of productSales){
                    if(bodySale.id === productSale.idProduct && bodySale.cloth == productSale.cloth){

                        if(Number(bodySale.count) == Number(productSale.buyedNum) + Number(productSale.freeNum)){
                            // console.log(Number(productSale.Products.price) * Number(productSale.freeNum))
                            saleSum.push((Number(productSale.Products.price) + Number(bodySale.priceAdd)) * Number(productSale.freeNum))
                        }
                    }
                }
            }

            // console.log(productSales)
			res.status(200).json({message: 'good', data: saleSum, sumSales: saleSum.reduce((acc, cur) => acc + cur, 0)  })
		} else {
			res.status(500).json({message: 'Unsupported method'})
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}