import AllRecords from "@/components/adminpanel/pages/Seo/AllRecords";
import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import prisma from "@/prisma/client";


export async function getServerSideProps(page) {
	let seo = await prisma.seo.findMany({
		orderBy: {
			createdAt: "desc"
		}
	})
	seo = JSON.stringify(seo)
	seo = JSON.parse(seo)

	return {
		props: {
			seo
		},
	}
}

const SeoPage = ({ seo }) => {
	return <AllRecords records={seo} />
}

SeoPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{ page }
		</MainLayout>
	)
}

export default withAuth(SeoPage);