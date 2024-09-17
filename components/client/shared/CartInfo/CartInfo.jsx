import React, { useEffect, useMemo } from 'react';
import Button from "../../../shared/UI/Button/Button.jsx";
import classes from './cartInfo.module.scss';
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import { useTranslations } from 'next-intl';

const CartInfo = ({promocodeValue, handleSubmit, salesPrice = 0}) => {
    console.log(salesPrice)
    const router = useRouter()
    const products = useSelector(state => state.cart.products);
    const productsAmount = products.reduce((acc, product) => {
        return acc+= product.count;
    }, 0)
    const productsPrice = products.reduce((acc, product) => {
        return acc+= product.price * product.count;
    }, 0)
    useEffect(() => {
        if(products.length === 0) {
            router.push('/')
        }
    }, [products])

    const cart = useTranslations("Cart");
    const buttons = useTranslations("buttons")

    return (
        <div className={classes.cartInfo}>
            <div>
                <div className={classes.amount}>
                    {`${cart("products")}: ${productsAmount}`}
                </div>
                {
                    (salesPrice === undefined || salesPrice === 0) ?

                    <div className={classes.price}>
                        {`${productsPrice - (salesPrice || 0) - (promocodeValue || 0)}₴`}
                    </div>

                    :

                    <div className={classes.priceSale}>
                        <div className={classes.sale}>
                            {`${productsPrice}₴`}
                        </div>
                        <div className={classes.priceWithSale}>
                            {`${productsPrice - (salesPrice || 0) - (promocodeValue || 0)}₴`}
                        </div>
                    </div>
                }
                
                
            </div>
            <Button onClick={handleSubmit} text={buttons("order")} variant={'order'} disabled={productsPrice === 0} />
        </div>
    );
};

export default CartInfo;