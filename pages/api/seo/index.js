import prisma from "@/prisma/client";
async function createSeoRecord(req, res) {
	try {
		const body = req.body;
		const dbRecord = await prisma.seo.findUnique({
			where: {
				url: body.url
			}
		})
		if(dbRecord) {
			return res.status(400).json({ message: 'Запис з таким URL уже існує.' })
		}

		await prisma.seo.create({
			data: body
		})

		return res.status(200).json({message: 'Запис успішно створено.'})
	} catch (e) {
		throw e
	}
}

async function updateSeoRecord(req, res) {
	try {
		const body = req.body;
		const { id, url, ...data } = body

		await prisma.seo.update({
			where: { id },
			data
		})
		return res.status(200).json({message: 'Запис успішно оновлено.'})
	} catch (e) {
		throw e
	}
}

async function deleteSeoRecord(req, res) {
	try {
		const body = req.body;
		const { id } = body

		await prisma.seo.delete({
			where: { id }
		})
		return res.status(200).json({message: 'Запис успішно видалено.'})
	} catch (e) {
		throw e
	}
}

async function getSeoRecord(req, res) {
	return res.status(200).json()
}
export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'POST':
				await createSeoRecord(req, res);
				break;
			case 'PUT':
				await updateSeoRecord(req, res);
				break;
			case 'DELETE':
				await deleteSeoRecord(req, res);
				break;
			case 'GET':
				await getSeoRecord(req, res);
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}