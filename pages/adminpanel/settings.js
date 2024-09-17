import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import Settings from "@/components/adminpanel/pages/Settings/Settings";
import prisma from "@/prisma/client";
import withAuth from "@/components/adminpanel/shared/WithAuth";


export async function getServerSideProps(page) {

	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()

	// console.log(offer)
	return {
		props: {
			offer: offer || [],
			popup: popup || [],
		},
	}
}

const OrdersPage = ({offer, popup}) => {
	return (
		<Settings offer={offer} popup={popup}/>
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