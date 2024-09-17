import MainLayout from "@/components/client/layouts/MainLayout";
import Cooperation from "@/components/client/pages/info/Сooperation/Cooperation";
import prisma from "@/prisma/client";
import { getPageSeo } from "@/utils/getPageSeo";
import {getCategories} from "@/utils/getCategories";


export async function getStaticProps(context) {
	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()
	const seo = await getPageSeo("/info/cooperation");
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



const FailedPage = ({ seo }) => {
	return (
		<Cooperation seo={seo} />
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