import CategoryForm from "@/components/adminpanel/shared/CategoryForm/CategoryForm";
import {API_URL} from "@/config";

const AddCategory = ({category}) => {
	const submitRequest = async (data) => {
		const res = await fetch(`/api/categories/${data.slug}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
		const json = await res.json();
		return json;
	}

	return (
		<CategoryForm category={category} submitRequest={submitRequest} />
	);
};

export default AddCategory;