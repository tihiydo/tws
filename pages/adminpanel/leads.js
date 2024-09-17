import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import Leads from "@/components/adminpanel/pages/Leads/Leads";
import withAuth from "@/components/adminpanel/shared/WithAuth";
const LeadsPage = () => {
	return (
		<Leads />
	);
};


LeadsPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(LeadsPage);