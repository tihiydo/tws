import AnalyticsInit from "@/components/client/shared/Analytics/AnalyticsInit";
import ModalCart from "@/components/client/shared/ModalCart/ModalCart";
import PromoLine from "@/components/client/shared/PromoLine/PromoLine";
import ModalPromo from "@/components/client/shared/ModalPromo/modalPromo";
import Sidebar from "@/components/client/shared/Sidebar/Sidebar";
import Header from "@/components/client/shared/Header/Header";
import Footer from "@/components/client/shared/Footer/Footer";
import Head from "next/head";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";

const MainLayout = ({title= "Twinsann", categories, children}) => {

	const {isLoading} = useSelector(state => state.user)

	return (
		<>	
			{/* <Head><title>{title}</title></Head> */}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000000}}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<ModalCart />
			<PromoLine
				promo={children.props?.offer}
			/>
			<ModalPromo dataPopup={children.props?.popup}/>
			<div className="wrapper">
				<Sidebar categories={categories} />
				<Header />
				<main className="main">{children}</main>
				<Footer />
			</div>
		</>
	);
};

export default MainLayout;