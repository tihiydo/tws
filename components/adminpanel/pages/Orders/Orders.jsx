import TitlePage from "@/components/adminpanel/shared/titlePage/titlePage";
import OrderMain from "@/components/adminpanel/pages/Orders/OrdersMain";

const Orders = () => {
	return (
		<>
			<TitlePage title="Список замовлень"/>
			<OrderMain />
		</>
	);
};

export default Orders;