import Sidebar from "@/components/adminpanel/shared/Sidebar/Sidebar";
import classes from './mainLayout.module.scss';
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import { ToasterProvider, Toaster } from "components/adminpanel/shared/toaster";
const MainLayout = ({children}) => {
	const {isLoading} = useSelector(state => state.user);

	return (
		<>
			{/*LOADER*/}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000000}}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<ToasterProvider>
				<Toaster />
				<div className={classes.wrapper}>
					<Sidebar />
					<main className={classes.main}>
						{children}
					</main>
				</div>
			</ToasterProvider>
		</>
	);
};

export default MainLayout;