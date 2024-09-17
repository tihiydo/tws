import classes from './order.module.scss';
import {
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	TextField
} from "@mui/material";
import InputMask from 'react-input-mask';
import {useSelector} from "react-redux";
import data from './cities.json';
import ModalCartItem from "../../shared/ModalCart/ModalCartItem/ModalCartItem.jsx";
import CartInfo from "../../shared/CartInfo/CartInfo.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {orderSchema} from "@/components/client/validation/orderSchema";
import {Controller, useForm} from "react-hook-form";
import Select from "@mui/material/Select";
import {useOrder} from "@/components/client/hooks/useOrder";
import {useEffect, useMemo, useState} from "react";
import Button from "@/components/shared/UI/Button/Button";
import {setLoading} from "@/store/userReducer";
import findSale from '@/utils/findSale';
import DeliveryFields from "@/components/client/pages/Order/DeliveryFields";
import { useTranslations } from 'next-intl';


const FindSales = async (products, setSalePrice) => {
	const dataSend = findSale(products)
	// console.log(dataSend)
  
	const resSales = await fetch('/api/order/findSales', {
		method: "POST",
		body: JSON.stringify(dataSend)
	})
  
	const resSalesData = await resSales.json()
  
	// console.log(resSalesData)
  
	setSalePrice(resSalesData.sumSales)
  }

const Order = () => {
	const products = useSelector(state => state.cart.products);
	// const [departments, setDepartments] = useState([])
	const [promocode, setPromocode] = useState(null);
	const [promoStatus, setPromoStatus] = useState('')
	const [salePrice, setSalePrice] = useState(0)


	const productsAmount = products.reduce((acc, product) => {
		return acc+= product.count;
	}, 0)
	const productsPrice = products.reduce((acc, product) => {
		return acc+= product.price * product.count;
	}, 0)



	useEffect(() => {
		(async () => {
		  await FindSales(products, setSalePrice)
		})()
		
	  }, [products])

	const promocodeValue = useMemo(() => {
		if (!promocode) return 0;
		if (promocode.type === 'UAH') {
			if (promocode.value > productsPrice) return productsPrice - 1;
			return Number(promocode.value)
		}
		if (promocode.type === '%') {
			return (productsPrice / 100) * promocode.value
		}
	}, [promocode, productsPrice])

	// const fetchDepartments = async (cityName) => {
	// 	try {
	// 		const body = JSON.stringify({
	// 			apiKey: "70777796f48426ba29433dda6266b43d",
	// 			modelName: "Address",
	// 			calledMethod: "getWarehouses",
	// 			methodProperties: {
	// 			CityName : cityName,
	// 				Language : "UA",
	// 				Limit : "50",
	// 				TypeOfWarehouseRef: "9a68df70-0267-42a8-bb5c-37f427e36ee4"
	// 			}
	// 		})
	// 		const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
	// 			method: 'POST',
	// 			body: body
	// 		})
	// 		const json = await res.json();
	// 		// console.log(json)
	// 		return json?.data?.map(depart => depart.Description);
	// 	} catch (e) {
	// 		console.error(e)
	// 		alert('Error')
	// 	}
	//
	// }
	const fetchPromo = async (promocode) => {
		try {
			setLoading(true)
			const res = await fetch(`/api/promocodes?name=${promocode}`, {
				method: 'GET'
			})

			const promo = await res.json();

			if (!res.ok) {
				throw new Error(promo.message)
			}
			setLoading(false)
			return promo.data;
		} catch (e) {
			setLoading(false)
			throw e;
		} finally {
			setLoading(false)
		}
	}
	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(orderSchema),
		defaultValues: {
			shipping_type: "department",
			payment_type: "now_buy",
			department: "",
		}
	})

	const cart = useTranslations("Cart");
	const form = useTranslations("form");
	const validation = useTranslations("validation");

	const applyPromo = async () => {
		try {
			setPromoStatus('')
			setPromocode(null);
			const promo = await fetchPromo(methods.getValues('promocode'));
			// console.log('promo ===', promo)
			setPromocode(promo);
			if (!promo) {
				setPromoStatus(validation("promoNotSeted"))
				return;
			}
			setPromoStatus(validation("promoSeted"))
		} catch (e) {
			console.error(e.message)
		}
	}

	// useEffect(() => {
	// 	(async () => {
	// 		const departs = await fetchDepartments(methods.getValues('city') || 'Київ');
	// 		setDepartments(departs);
	// 	})()
	// }, [])
	//
	//
	// useEffect(() => {
	// 	(async () => {
	// 		methods.setValue('department', '')
	// 		const departs = await fetchDepartments(methods.getValues('city'));
	// 		setDepartments(departs);
	// 	})()
	// }, [methods.watch('city')])

	useEffect(() => {
		setPromoStatus('')
		setPromocode(null)
	}, [methods.watch('promocode')])

	console.log(methods.watch())
	const placeOrder = useOrder();
	const submitHandler = async (data) => {
		const formData = {
			...data,
			products,
			promocode,
			price: productsPrice - promocodeValue - salePrice
		}
		console.log(formData)
		await placeOrder(formData)
	}

	function handleChangeGetting(e) {
		methods.setValue('payment_type', e.target.value)
	}



	return (
		<div className={classes.orderPage}>
			<form className={classes.orderBody} onSubmit={methods.handleSubmit(submitHandler)}>
				<h1 className={classes.title__big}>
					{
						cart("ordering")
					}
				</h1>
				<p>
                	{
						cart("descrIngo")
					}
            	</p>
				<div className={classes.title}>
					{cart("privateInfo")}:
				</div>
				<div className={classes.inputGroup}>
					<TextField
						color={'primary'}
						size={'small'}
						label={form("surname")}
						error={!!methods.formState.errors['surname']}
						helperText={methods.formState.errors['surname']?.message ?? ''}
						InputProps={{
							style: {borderRadius: 10, width: '100%'},
						}}
						{...methods.register('surname')}
					/>
					<TextField
						color={'primary'}
						size={'small'}
						label={form("name")}
						error={!!methods.formState.errors['name']}
						helperText={methods.formState.errors['name']?.message ?? ''}
						InputProps={{
							style: {borderRadius: 10, width: '100%'},
						}}
						{...methods.register('name')}
					/>

				</div>
				<Controller
					name="phone"
					control={methods.control}
					placeholder={'+380 (99) 999-99-99'}
					defaultValue=""
					render={({ field }) => (
						<InputMask
							mask="+380 (99) 999-99-99"
							maskChar={null}
							value={field.value}
							onChange={field.onChange}
						>
							{(inputProps) => (
								<TextField
									{...inputProps}
									color={'primary'}
									size={'small'}
									className={classes.input}
									error={!!methods.formState.errors['phone']}
									helperText={methods.formState.errors['phone']?.message ?? ''}
									label={form("phone")}
									InputProps={{
										style: {borderRadius: 10},
									}}
								/>
							)}
						</InputMask>
					)}
				/>
				<div className={classes.title}>
					{cart("allProduct")}:
				</div>
				<div className={classes.items}>
					{products?.map(product =>
						<ModalCartItem key={product.itemHash} product={product}/>
					)}
				</div>
				<div className={classes.title}>
					{cart("deliver")}:
				</div>
				<FormControl fullWidth>
					{/*<InputLabel>Тип доставки</InputLabel>*/}
					<InputLabel id="demo-select-small">{form('deliveryType')}</InputLabel>
					<Select
						labelId="demo-select-small"
						id="demo-select-small"
						label={'Тип доставки'}
						// className={classes.Input}
						color={'primary'}
						size={'small'}
						sx={{borderRadius: 3, marginBottom: 3}}
						defaultValue={'department'}
						{...methods.register('shipping_type')}
					>
						<MenuItem value={'department'}>
							{
								form("newPostDelver")
							}
						</MenuItem>
						<MenuItem value={'address'}>
							{
								form("deliver")
							}
						</MenuItem>
					</Select>
				</FormControl>
				{methods.watch('shipping_type') === 'department'
					?
					<>
						<DeliveryFields methods={methods} />

					</>
					:
					<>
						<TextField
							color={'primary'}
							size={'small'}
							placeholder={form("address")}
							label={form("address")}
							error={!!methods.formState.errors['address']}
							helperText={methods.formState.errors['address']?.message ?? ''}
							sx={{borderRadius: 13, width: '100%', marginBottom: 2}}
							InputProps={{
								style: {borderRadius: 10},
							}}
							{...methods.register('address')}
						/>
					</>
				}
				<div style={{display: 'flex', alignItems: 'center'}}>
					<TextField
						color={'primary'}
						size={'small'}
						placeholder={form("promo")}
						label={form("promo")}
						error={!!methods.formState.errors['promocode']}
						helperText={methods.formState.errors['promocode']?.message ?? ''}
						// sx={{borderRadius: 13}}
						InputProps={{
							style: {
								borderRadius: 10,
								width: 200
							},
						}}
						{...methods.register('promocode')}
					/>
					<Button text={form('apply')} onClick={applyPromo} style={{transform: 'scale(0.8)'}} />
				</div>
				<div>{promoStatus}</div>
				<div className={classes.title}>
					{cart("payment")}:
				</div>
				<FormControl>
					<RadioGroup
						defaultValue={'now_buy'}
						onChange={handleChangeGetting}
					>
						<FormControlLabel value={'now_buy'} control={<Radio color={'secondary'} />} label={form("cardPay")} />
						{/* <FormControlLabel value={'manager_buy'} control={<Radio color={'secondary'} />} label={'Зв\'язатись з менеджером'} /> */}

						{/* Зв'язатись з менеджером вони попросили прибрати, надіюсь все буде ок */}
						
						<FormControlLabel value={'prepayment_buy'} control={<Radio color={'secondary'} />} label={form("cashPay")} />
					</RadioGroup>
				</FormControl>



				{/*<div>*/}
				{/*	<pre>*/}
				{/*		<code>{JSON.stringify(methods.watch(), null, 4)}</code>*/}
				{/*	</pre>*/}
				{/*</div>*/}

				<CartInfo promocodeValue={promocodeValue} salesPrice={salePrice} handleSubmit={methods.handleSubmit(submitHandler)} />
			</form>
		</div>
	);
};

export default Order;