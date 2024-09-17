import CreateForm from "./createForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/adminpanel/shared/toaster";

const CreateRecord = () => {
	const { success, error } = useToast()
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	async function submitHandler(data) {
		try {
			setLoading(true)
			const res = await fetch(`/api/seo`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})

			const json = await res.json()
			setLoading(false);

			if (!res.ok) {
				error("Помилка", json.message)
			} else {
				success("Готово", json.message)
				return router.push("/adminpanel/seo")
			}

		} catch (e) {
			setLoading(false)
			error("Помилка", "Сталася невідома помилка")
			console.log(e)
		}
	}
	return <CreateForm
		loading={loading}
		submitHandler={submitHandler}
	/>
}

export default CreateRecord;