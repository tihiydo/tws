import prisma from "@/prisma/client";
export default async function handler(req, res) {

	await prisma.productOnSubcategory.deleteMany({})

	res.status(200).json({ msg: "Successfully deleted product" });
}