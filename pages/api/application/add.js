import prisma from "@/prisma/client";


export default async function handler(req, res) {
	const body = req.body;

		
    try{
		if(req.method == 'POST'){
			const newApplication = await prisma.Lead.create({
				data: {
					name: body.name,
					phone: body.phone,
					status: body.status
				},
			})
	
	
			res.status(200).json({message: 'good', product: newApplication})
		}

		

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}