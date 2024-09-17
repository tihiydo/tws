import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import classes from './allProducts.module.scss';
import ProductItem from "@/components/client/shared/ProductItem/ProductItem";

const AllProducts = ({products, title = "Всі продукти"}) => {

	return (
		<>
			<TitlePage title={title} />
			<div className={classes.productsBox}>
				{
					products?.map((item) => (
						<ProductItem key={item.id} product={item} adminpanel={true} />
					))
				}
			</div>

		</>

	);
};

export default AllProducts;