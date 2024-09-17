import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import withAuth from "@/components/adminpanel/shared/WithAuth";
import CreateRecord from "@/components/adminpanel/pages/Seo/NewRecord/CreateRecord";


const SeoPage = () => {
	return <CreateRecord />
}

SeoPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{ page }
		</MainLayout>
	)
}

export default withAuth(SeoPage);