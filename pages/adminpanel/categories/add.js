import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import AddCategory from "@/components/adminpanel/pages/AddCategory/AddCategory";
import withAuth from "@/components/adminpanel/shared/WithAuth";

const AddCategoryPage = () => {
	return (
		<AddCategory />
	);
};


AddCategoryPage.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			{page}
		</MainLayout>
	)
}

export default withAuth(AddCategoryPage);