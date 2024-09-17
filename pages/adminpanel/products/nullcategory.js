import MainLayout from "@/components/adminpanel/layouts/MainLayout";
import AllProducts from "@/components/adminpanel/pages/AllProducts/AllProducts";
import {API_URL} from "@/config";
import withAuth from "@/components/adminpanel/shared/WithAuth";

export async function getServerSideProps(page) {

    let products = []

    products = JSON.stringify(products);
    products = JSON.parse(products);
    // console.log(jsonData)
    return {
        props: {
            products: products || []
        },
    }
}
const ProductsPage = ({products}) => {
    return (
        <AllProducts products={products} title={"Товари без категорії"} />
    );
};


ProductsPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}

export default withAuth(ProductsPage);