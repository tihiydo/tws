import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import Button from "@mui/material/Button";
import {setAuth} from "@/store/userReducer";
import cookie from "js-cookie";

const AdminpanelLoginPage = () => {
	const [password, setPassword] = useState('');
	const {isAuth} = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter()

	useEffect(() => {
		if (cookie.get('isAuth') === 'true') {
			dispatch(setAuth(true))
			router.push('/adminpanel/products')
		}
	}, [])

	const submitHandler = () => {
		if (password === 'twinsann_baza') {
			cookie.set('isAuth', JSON.stringify(true), {expires: 1/24})
			router.push('/adminpanel/products')
		}
	}

	return (
		<div style={{
			display: 'flex',
			height: '100vh',
			alignItems: 'center',
			justifyContent: 'center'
		}}>
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				background: '#fff',
				padding: 40,
				gap: 20,
				borderRadius: 10
			}}>
				<TextField label={'Пароль'} size={'small'} value={password} onChange={(e) => setPassword(e.target.value)} />
				<Button variant={'contained'} onClick={submitHandler}>Увійти</Button>
			</div>
		</div>
	);
};

export default AdminpanelLoginPage;