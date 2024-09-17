import classes from './modalCart.module.scss';
import Modal from "../../../shared/UI/Modal/Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCartAction, setIsModalCartVisibleAction} from "@/store/cartReducer";
import {GrClose} from "react-icons/gr";
import ModalCartItem from "./ModalCartItem/ModalCartItem.jsx";
import CartInfo from "../CartInfo/CartInfo.jsx";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import SwiperComponent from '../Swiper/Swiper';
import {checkOutStepOne, checkOutStepTwo} from "@/components/client/lib/gtm/events/checkoutSteps";
import {setRecentProducts} from "@/store/recentProductsReducer";
import findSale from '@/utils/findSale';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const CardsSettings = {
    speed: 500,
    spaceBetween: 10,
    breakpoints: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      150: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      428: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      600: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      991: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1140: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1500: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
    },
  };


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


const ModalCart = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    const isVisible = useSelector(state => state.cart.isModalCartVisible)
    const { products, relatedProducts } = useSelector(state => state.cart);

    const [salePrice, setSalePrice] = useState(0)
    

    useEffect(() => {
      (async () => {
        await FindSales(products, setSalePrice)
      })()
      
    }, [products])

    useEffect(() => {
        if (isVisible) {
            checkOutStepOne(products)
        }
    }, [isVisible])

    const handleClose = () => {
        dispatch(setIsModalCartVisibleAction(false))
    }
    const handleSubmit = () => {
        checkOutStepTwo(products)
        dispatch(setIsModalCartVisibleAction(false));
        router.push('/order')
    }

    useEffect(() => {
        const localStorageCart = JSON.parse(window?.sessionStorage.getItem('persistantCart'))?.products;
        const localStorageRecentProducts = JSON.parse(window?.sessionStorage.getItem('recentProducts'))?.products;

        if (localStorageCart?.length) {
            dispatch(setCartAction(localStorageCart));
        }
        if (localStorageRecentProducts?.length) {
            dispatch(setRecentProducts(localStorageRecentProducts));
        }

    }, [])

    const cart = useTranslations("Cart")

    return (
        <Modal isVisible={isVisible} handleClose={handleClose}>
            <div className={classes.modalCart}>
                <div className={classes.header}>
                    <div className={classes.title}>
                      {
                        cart("cart")
                      }
                    </div>
                    <GrClose size={'1.2em'} onClick={handleClose}/>
                </div>
                <div className={classes.items}>
                  {products && products.length > 0 ?
                    <>
                        {products.map(product =>
                            <ModalCartItem key={product.itemHash} product={product} />
                        )}
                        <CartInfo handleSubmit={handleSubmit} salesPrice={salePrice} /> 
                        </>
                      :
                      <p>
                        {
                          cart("empty")
                        }
                      </p>
                  }
                </div>

                {
                    relatedProducts?.length > 0 ?
                        <div className={classes.lastViewed}>
                            <div className={classes.title}>
                            {cart("relatedProducts")}
                            </div>
                            <SwiperComponent settings={CardsSettings} children={relatedProducts} type="cards"/>
                        </div> : null
                }
            </div>
        </Modal>
    );

};

export default ModalCart;