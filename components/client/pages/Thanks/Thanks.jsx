import {useEffect} from "react";
import classes from './thanks.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setCartAction} from "@/store/cartReducer";
import {checkOutStepFour} from "@/components/client/lib/gtm/events/checkoutSteps";
import Button from '@/components/shared/UI/Button/Button'
import {useRouter} from "next/navigation";
import { useTranslations } from "next-intl";

const Thanks = () => {
	const router = useRouter()
	const dispatch = useDispatch();
	const products = useSelector(state => state.cart.products);

	useEffect(() => {
		checkOutStepFour(products)
		dispatch(setCartAction([]))
	}, [])

	const t = useTranslations("Thanks");
	const buttons = useTranslations("buttons")
	return (
		<div className={classes.box}>
			<div className={classes.text}>
				<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="50px" height="50px"><linearGradient id="HoiJCu43QtshzIrYCxOfCa" x1="21.241" x2="3.541" y1="39.241" y2="21.541" gradientUnits="userSpaceOnUse"><stop offset=".108" stop-color="#0d7044"/><stop offset=".433" stop-color="#11945a"/></linearGradient><path fill="url(#HoiJCu43QtshzIrYCxOfCa)" d="M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z"/><linearGradient id="HoiJCu43QtshzIrYCxOfCb" x1="-15.77" x2="26.403" y1="43.228" y2="43.228" gradientTransform="rotate(134.999 21.287 38.873)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2ac782"/><stop offset="1" stop-color="#21b876"/></linearGradient><path fill="url(#HoiJCu43QtshzIrYCxOfCb)" d="M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z"/></svg>
				<h1 className={classes.title}>
					{
						t("title")
					}
				</h1>
				{/* <div className={classes.descr}>Ми вам зателефонуємо<br/>для уточнення деталей замовлення</div> */}
				<Button text={buttons("toHome")}  onClick={() => router.push(`/`)}/>
			</div>
		</div>
	);
};

export default Thanks;