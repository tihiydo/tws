import MainLayout from "@/components/client/layouts/MainLayout";
import Thanks from "@/components/client/pages/Thanks/Thanks";
import prisma from "@/prisma/client";
import {getCategories} from "@/utils/getCategories";
import Head from "next/head";

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
const ThanksPage = () => {
	return (
		<Thanks />
	);
};


ThanksPage.getLayout = function getLayout(page) {
	return (
		<MainLayout categories={page.props.categoryData}>
			<Head>
				<meta name="robots" content="noindex"/>
				<meta name="robots" content="nofollow"/>
            </Head>
			{page}
		</MainLayout>
	)
}

export default ThanksPage;