import {addBitrixDeal} from "@/components/client/utils/bitrix";

const addOrder = async (data) => {
	try {
		console.log(data)
		await addBitrixDeal(true, data)
		const res = await fetch(`/api/order`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),

		})
		const json = await res.json();
		console.log(json)
		return json;
	} catch (e) {
		throw e
	}
}

export default addOrder;