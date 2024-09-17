import NotFound from "@/components/client/pages/NotFound/NotFound";

export async function getStaticProps(context) {
	return {
		props: {
			messages: (await import(`@/messages/${context.locale}.json`)).default,
		},
		revalidate: 120
	}
}

const NotFoundPage = (props) => {
    return <NotFound />
};

export default NotFoundPage;