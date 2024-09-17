import prisma from "@/prisma/client";

async function createReview(req, res) {
	try {
		const body = req.body;

		const {postId, ...data} = body
		await prisma.post.update({
			where: {
				id: postId
			},
			data: {
				Review: {
					create: [data]
				}
			}

		})

		return res.status(200).json({message: 'good'})
	} catch (e) {
		throw e;
	}
}

async function updateReview(req, res) {
	try {
		const body = req.body;

		const {id, Post, createAt, ...data} = body

		await prisma.postReview.update({
			where: {
				id
			},
			data
		})

		return res.status(200).json({message: 'good'})
	} catch (e) {
		throw e;
	}
}

export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'POST':
				await createReview(req, res);
				break;
			case 'PUT':
				await updateReview(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}