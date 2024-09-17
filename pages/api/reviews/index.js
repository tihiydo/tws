import prisma from "@/prisma/client";

const addReview = async(req, res) => {
    try {
        const body = req.body
        const response = await prisma.Review.create({
            data: {
                idProduct: body.idProduct,
                name: body.name,
                surname: body.surname,
                text: body.text,
                phone: body.phone,
                images: body?.images,
                approved: "not_approve",
                rating: body.rating
            }
        })

        return res.status(200).json({message: 'good', data: response})
    } catch (error) {
        throw error
    }
}


const getData = async (req, res) => {
    try {
        const query = req.query;

        const Reviews = await prisma.Review.findMany({
			orderBy: {
				createAt: 'desc'
			},
			select: {
				id: true,
				name: true,
				surname: true,
				text: true,
				rating: true,
				approved: true,
				phone: true,
				Product: true,
                images: true,
				createAt: true
			},
            where: query.type == 'all' ? {} :  query.type == 'product' ? {idProduct: query.id, approved: query.approveType} : {status: query.status}
        })
    
    
        return res.status(200).json({message: 'good', data: Reviews})
    } catch (error) {
        throw error
    }
}

const PutData = async (req, res) => {
    const body = req.body;
	// console.log("BODY =========", body);
    const response = await prisma.review.update({
        where: {
            id: body.id
        },
        data: body.updateData
    })


    res.status(200).json({message: 'good', data: response})
}

export default async function handler(req, res) {
    // res.status(200).json({message: 'good', data: req.method})
	try {
		const method = req.method;
        
		switch (method) {
            case 'POST':
                await addReview(req, res)
            case 'GET':
			    await getData(req, res)
                break;
			case 'PUT':
				await PutData(req, res)
				break;
			default:
				res.status(200).json({message: 'good', reqMethod: method})
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}