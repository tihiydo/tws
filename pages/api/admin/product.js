import SupabaseFileService from "@/components/adminpanel/services/SupabaseFileService";
import fs from 'fs';
import multiparty from "multiparty";
import translit from "@/utils/translit";
const createProduct = async (req, res) => {
	try {

	} catch (e) {
		throw e
	}
}
export default async function handler(req, res) {
	try {
		const method = req.method;
		switch (method) {
			case 'GET':
				// await getProducts(req, res);
				break;
			case 'POST':
				await createProduct(req, res);
				break;
			default:
				await createProduct(req, res);
				break;
		}

	} catch (e) {
		console.log(e);
		res.status(500).json({message: e.message})
	}
}