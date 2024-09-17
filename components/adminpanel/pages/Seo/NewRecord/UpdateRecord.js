import CreateForm from "@/components/adminpanel/pages/Seo/NewRecord/createForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/adminpanel/shared/toaster";

const UpdateRecord = ({ record }) => {
	const { success, error } = useToast()
	const [loading, setLoading] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const router = useRouter();
	async function submitHandler(data) {
		try {
			setLoading(true)
			const res = await fetch(`/api/seo`, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})

			const json = await res.json()
			setLoading(false);

			if (!res.ok) {
				error("Попилка", json.message)
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

	async function deleteHandler(id) {
		try {
			setIsDelete(true);
			const res = await fetch(`/api/seo`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id })
			})

			const json = await res.json()
			setIsDelete(false)

			if (!res.ok) {
				error("Попилка", json.message)
			} else {
				success("Готово", json.message)
				return router.push("/adminpanel/seo")
			}

		} catch (e) {
			setIsDelete(false)
			error("Помилка", "Сталася невідома помилка")
			console.log(e)
		}
	}

	return <CreateForm
		loading={loading}
		isDelete={isDelete}
		record={record}
		deleteHandler={deleteHandler}
		submitHandler={submitHandler}
	/>
}

export default UpdateRecord;