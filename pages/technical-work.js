import { TechnicalWork } from "@/components/client/pages/TechnicalWork/TechnicalWork";

export async function getStaticProps(context) {
	return {
		props: {
			messages: (await import(`@/messages/${context.locale}.json`)).default,
		},
		revalidate: 120
	}
}

const TechnicalWorkPage = (props) => {
	return <TechnicalWork />
};

export default TechnicalWorkPage;