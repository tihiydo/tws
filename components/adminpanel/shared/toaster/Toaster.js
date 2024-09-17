import { Alert, AlertTitle } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import cx from "classnames"
import { MdCancel } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { useToasterContext } from "@/components/adminpanel/shared/toaster/index";
const Toaster = () => {
	const { toast, setToast } = useToasterContext();

	if(!toast) return

	useEffect(() => {
		const handler = setTimeout(() => {
			setToast(null)
		}, 5000)
		return () => clearTimeout(handler)
	}, [toast]);

	const 	title = toast?.title ?? "",
			subtitle = toast?.subtitle ?? "",
			type = toast?.type ?? "success"
	const toastView = {
		success:
			<Alert icon={<FaCheck />} severity="success">
				<AlertTitle>{ title }</AlertTitle>
				{ subtitle }
			</Alert>,
		warning:
			<Alert icon={<FaCircleInfo />} severity="warning">
				<AlertTitle>{ title }</AlertTitle>
				{ subtitle }
			</Alert>,
		error:
			<Alert icon={<MdCancel />} severity="error">
				<AlertTitle>{ title }</AlertTitle>
				{ subtitle }
			</Alert>,
	}
	return (
		<div className={styles.wrapper}>
			<div className={cx(
				styles.toast,
				toast && styles.toast__active
			)}>
				{
					toastView[type]
				}
			</div>
		</div>
	)
}

export { Toaster };