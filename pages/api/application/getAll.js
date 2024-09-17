import prisma from "@/prisma/client";


export default async function handler(req, res) {
	const body = req.body;
		
    try{
		const Applications = await prisma.Lead.findMany({
            where: {
                status: "active"
            }
        })


		res.status(200).json({message: 'good', applications: Applications})

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}