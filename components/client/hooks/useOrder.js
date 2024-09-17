import HmacMD5 from 'crypto-js/hmac-md5';
import addOrder from "../actions/addOrder";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setLoading} from "@/store/userReducer";
import {API_URL} from "@/config";

const useWFP = () => {
    const router = useRouter();

    const pay = async (data, orderId) => {
        try {
            const {customerName, products} = data;
            const productNameArr = products.map(product => product.name);
            const productCountArr = products.map(product => product.count);
            const productPriceArr = products.map(product => product.price);
            const orderReference = orderId;
            const orderDate = String(Date.now());
            const currency = 'UAH';
            const merchantAccount = 'twinsann_com';
            const merchantDomainName = 'twinsann.com';
            const merchantSecretKey = 'de3bf13534b202390d99b013583b57db7cecc2ce';
            const productName = productNameArr.join(';');
            const productCount = productCountArr.join(';');
            const productPrice = productPriceArr.join(';');

            const str = `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${data.price};${currency};${productName};${productCount};${productPrice}`;

            // console.log(str);

            const signature = HmacMD5(str, merchantSecretKey).toString();
            const wayforpayConfig = {
                merchantAccount,
                merchantDomainName,
                merchantSecretKey,
                merchantSignature: signature,
                orderReference,
                orderDate,
                defaultPaymentSystem: 'card',
                paymentSystems: 'card;applePay;googlePay',
                amount: data.price,
                currency,
                merchantTransactionSecureType: 'AUTO',
                productName: productNameArr,
                productPrice: productPriceArr,
                productCount: productCountArr,
                clientFirstName: customerName,
                apiVersion: 2,
                merchantAuthType: 'SimpleSignature',
                returnUrl: `${API_URL}/thanks`,
                serviceUrl: `https://twinsann.com/api/order/confirmPayment`,
                language: 'UA',
            };

            // const url = wayforpay.getPayUrl(wayforpayConfig)
            // const formData = new FormData()

            // for (let key in wayforpayConfig) {
            //     formData.append(key, wayforpayConfig[key])
            // }


            const form = document.createElement('form');
            form.style.display = 'none'; // Make the form invisible

            form.method = 'post';
            form.action = 'https://secure.wayforpay.com/pay';
            form.acceptCharset = 'utf-8';

            for (const key in wayforpayConfig) {
                if (wayforpayConfig.hasOwnProperty(key)) {
                    if (Array.isArray(wayforpayConfig[key])) {
                        wayforpayConfig[key].forEach(value => {
                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = key;
                            input.value = value;
                            form.appendChild(input);
                        });
                    } else {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = wayforpayConfig[key];
                        form.appendChild(input);
                    }
                }
            }

            document.body.appendChild(form);

            form.submit();

            // const response = await fetch('https://secure.wayforpay.com/pay?behavior=offline', {
            //     method: 'POST',
            //     body: formData,
            // })
            // const decoded = await response.json()
            // window.open(decoded.url, '_blank')
            // console.log('rews========', decoded)
        } catch (e) {
            console.log(e)
        }

    };

    return pay;
}
export const useOrder = () => {
    const router = useRouter();
    const pay = useWFP();
    const dispatch = useDispatch();

    const placeOrder = async (data) => {
        try {
            if (data.payment_type === 'now_buy') {
                const newOrder = await addOrder(data)
                await pay(data, newOrder.order.id);
            } else {
                dispatch(setLoading(true))
                await addOrder(data)
                router.push('/thanks')
            }
        } catch (e) {
            dispatch(setLoading(false))
            console.log(e)
        } finally {
            dispatch(setLoading(false))
        }

    }

    return placeOrder;
}