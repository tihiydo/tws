import prisma from "@/prisma/client";

import data from "seed.json";


export default async function handler(req, res) {

	res.status(200).json({ msg: "success" })
}