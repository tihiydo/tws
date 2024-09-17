import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import cookie from "js-cookie";
import {setAuth} from "@/store/userReducer";

const withAuth = (WrappedComponent) => {
	const WithAuth = ({ layout: Layout, ...props }) => {
		const router = useRouter();
		const dispatch = useDispatch();
		useEffect(() => {
			if (cookie.get('isAuth') === 'true') {
				dispatch(setAuth(true))
			} else {
				router.push('/adminpanel')
			}
		}, []);

		const getLayout = (page) => {
			return Layout ? <Layout>{page}</Layout> : page;
		};

		return getLayout(<WrappedComponent {...props} />);
	};

	if (WrappedComponent.getLayout) {
		WithAuth.getLayout = WrappedComponent.getLayout.bind(WrappedComponent);
	}

	return WithAuth;
};

export default withAuth;