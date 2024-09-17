import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import Orders from "@/components/adminpanel/pages/Orders/Orders";
import withAuth from "@/components/adminpanel/shared/WithAuth";
const OrdersPage = () => {
	return (
		<Orders />
	);
};


OrdersPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(OrdersPage);