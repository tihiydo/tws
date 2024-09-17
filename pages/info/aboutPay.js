import MainLayout from "@/components/client/layouts/MainLayout";
import AboutPay from "@/components/client/pages/info/AboutPay/AboutPay";
import prisma from "@/prisma/client";
import { getPageSeo } from "@/utils/getPageSeo";
import { defaultSeo } from "@/components/client/SeoBlock/defaultSeo";
import {getCategories} from "@/utils/getCategories";

export async function getStaticProps(context) {
	const offer = await prisma.Offer.findMany()
	const popup = await prisma.Popup.findMany()
	const seo = await getPageSeo("/info/aboutPay")
	return {
		props: {
			offer: offer[0] || 'Помилка оферу',
			popup: popup[0] || 'Помилка Popup',
			seo,
			messages: (await import(`@/messages/${context.locale}.json`)).default,
			categoryData: await getCategories(),

		},
		revalidate: 120
	}
}

const AboutPayPage = ({ seo }) => {
	return (
		<AboutPay seo={seo} />
	);
};


AboutPayPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			{page}
		</MainLayout>
	)
}

export default AboutPayPage;