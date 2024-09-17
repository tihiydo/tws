import MainLayout from "@/components/client/layouts/MainLayout";
import Failed from "@/components/client/pages/Failed/Failed";
import prisma from "@/prisma/client";
import {getCategories} from "@/utils/getCategories";

export async function getStaticProps(context) {
	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()
	return {
		props: {
			offer: offer[0]|| 'Помилка оферу',
			popup: popup[0] || 'Помилка Popup',
			messages: (await import(`@/messages/${context.locale}.json`)).default,
			categoryData: await getCategories(),
		},
		revalidate: 120
	}
}
const FailedPage = () => {
	return (
		<Failed />
	);
};


FailedPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default FailedPage;