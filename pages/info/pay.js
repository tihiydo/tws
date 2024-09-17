import MainLayout from "@/components/client/layouts/MainLayout";
import Pay from "@/components/client/pages/info/Pay/Pay";
import prisma from "@/prisma/client";
import {getCategories} from "@/utils/getCategories";
import { getPageSeo } from "@/utils/getPageSeo";

export async function getStaticProps(context) {
	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()
	const seo = await getPageSeo("/info/pay")
	return {
		props: {
			offer: offer[0]|| 'Помилка оферу',
			popup: popup[0] || 'Помилка Popup',
			seo,
			messages: (await import(`@/messages/${context.locale}.json`)).default,
			categoryData: await getCategories(),
		},
		revalidate: 120
	}
}
const PayPage = ({ seo }) => {
	return (
		<Pay seo={seo} />
	);
};


PayPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default PayPage;