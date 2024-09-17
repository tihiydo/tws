import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import UpdateRecord from "@/components/adminpanel/pages/Seo/NewRecord/UpdateRecord";
import prisma from "@/prisma/client";

export async function getServerSideProps(page) {
	let seo = await prisma.seo.findUnique({
		where: {
			id: page.params.id
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
	return <UpdateRecord record={seo} />
}

SeoPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{ page }
		</MainLayout>
	)
}

export default withAuth(SeoPage);