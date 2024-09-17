import prisma from "@/prisma/client";
import {slugify} from "@/utils/slugify";

async function createPost(req, res) {
	try {
		const body = req.body;
		const slug = slugify(body.title)

		const isAlreadyExist = await prisma.post.findUnique({
			where: {
				slug
			}
		})

		if(!!isAlreadyExist) {
			return res.status(500).json({message: "Post already exist"})
		}
		const { id, image, subcategoryId, author, content, products, ...data } = body;

		// add anchor to section titles to create table of contents
		const anchoredContent = content.map(item => {
			if(item.type === "title") return {
				...item,
				anchor: slugify(item.title)
			}
			else return item
		})
		await prisma.post.create({
			data: {
				...data,
				Products: {
					create: products
				},
				slug,
				content: JSON.stringify(anchoredContent),
				image: JSON.stringify(image),
				subcategoryId: subcategoryId === "" ? undefined : subcategoryId,
				author: author === "" ? undefined : author
			}
		})

		return res.status(200).json({message: 'good'})
	} catch (e) {
		throw e;
	}
}

async function updatePost(req, res) {
	try {
		const body = req.body;
		const slug = slugify(body.title)

		const { id, image, subcategoryId, author, content, products, ...data } = body;

		// add anchor to section titles to create table of contents
		const anchoredContent = content.map(item => {
			if(item.type === "title") return {
				...item,
				anchor: slugify(item.title)
			}
			else return item
		})
		await prisma.post.update({
			where: {
				id
			},
			data: {
				...data,
				Products: {
					deleteMany: {},
					create: products
				},
				slug,
				content: JSON.stringify(anchoredContent),
				image: JSON.stringify(image),
				subcategoryId: subcategoryId === "" ? null : subcategoryId,
				author: author === "" ? null : author
			}
		})

		return res.status(200).json({message: 'good'})
	} catch (e) {
		throw e;
	}
}

async function deletePost(req, res) {
	try {
		const body = req.body;

		await prisma.post.delete({
			where: {
				id: body.id
			}
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
			// case 'GET':
			// 	await getProducts(req, res);
			// 	break;
			case 'POST':
				await createPost(req, res);
				break;
			case 'PUT':
				await updatePost(req, res);
				break;
			case 'DELETE':
				await deletePost(req, res);
				break;
			// default:
			// 	await getProducts(req, res);
			// 	break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}