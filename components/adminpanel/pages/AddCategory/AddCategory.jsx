import CategoryForm from "@/components/adminpanel/shared/CategoryForm/CategoryForm";

const AddCategory = () => {
	const submitRequest = async (data) => {
		const res = await fetch(`/api/categories`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
		const json = await res.json();
		return json;
	}

	return (
		<CategoryForm submitRequest={submitRequest} />
	);
};

export default AddCategory;