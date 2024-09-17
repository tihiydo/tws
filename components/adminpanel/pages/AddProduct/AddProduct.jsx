import ProductForm from "@/components/adminpanel/shared/ProductForm/ProductForm";
import formProductData from "@/components/adminpanel/utils/formProductData";

const AddProduct = ({categories}) => {
	const submitRequest = async (data) => {
		try {
			const formData = await formProductData(data)
			const res = await fetch(`/api/products`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				// headers: {
				// 	"Content-type": "multipart/form-data",
				// },
				body: formData
			})

			if (!res.ok) {
				throw new Error('Помилка')
			}
			const json = await res.json();
			return json;
		} catch (e) {
			throw e;
		}

	}

	return (
		<ProductForm categories={categories} submitRequest={submitRequest} />
	);
};

export default AddProduct;