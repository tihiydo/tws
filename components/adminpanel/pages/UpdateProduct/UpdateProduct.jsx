import ProductForm from "@/components/adminpanel/shared/ProductForm/ProductForm";
import formProductData from "@/components/adminpanel/utils/formProductData";

const UpdateProduct = ({categories, product }) => {
	const submitRequest = async (data) => {
		const formData = await formProductData({...data, id: product.id})
		const res = await fetch(`/api/products`, {
			method: 'PUT',
			body: formData,
			headers: {
				"Content-Type": "application/json",
			}
		})
		return await res.json();
	}

	return (
		<ProductForm product={product} categories={categories} submitRequest={submitRequest} />
	);
};

export default UpdateProduct;