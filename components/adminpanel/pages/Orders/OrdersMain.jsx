import OrderItem from './OrderItem';
import { useState, useEffect } from 'react';
import {API_URL} from "@/config";
import classes from "@/components/client/shared/ModalCart/modalCart.module.scss";
import styles from "@/components/client/shared/ModalCart/ModalCartItem/modalCartItem.module.scss";
import {GrClose} from "react-icons/gr";
import ModalCartItem from "@/components/client/shared/ModalCart/ModalCartItem/ModalCartItem";
// import CartInfo from "@/components/client/shared/CartInfo/CartInfo";
// import SwiperComponent from "@/components/client/shared/Swiper/Swiper";
import Modal from "@/components/shared/UI/Modal/Modal";
import Image from "next/image";
import {increaseProductCountAction, removeProductFromCartAction} from "@/store/cartReducer";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {IoMdTrash} from "react-icons/io";
import OrderModalItem from "@/components/adminpanel/pages/Orders/OrderModalItem";
import Button from '@/components/shared/UI/Button/Button';




const OrderMain = () => {
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(false)
    const [products, setProducts] = useState(null);
    const [more, setMore] = useState(1)

    async function fetchData() {
        const res = await fetch(`/api/order/?type=all&pageNumber=${more}`, {
            method: "GET"
        })
        const categoryData = await res.json();
        setData([...data, ...categoryData.data]);
    }
    const handleClose = () => {
        setProducts([])
        setIsVisible(false)
    }
 

    useEffect(() => {
        fetchData();
    }, [more]);

    return (
        
      <div>
          <Modal isVisible={isVisible} handleClose={handleClose}>
              <div className={classes.modalCart}>
                  <div className={classes.header}>
                      <div className={classes.title}>Кошик</div>
                      <GrClose size={'1.2em'} onClick={handleClose}/>
                  </div>
                  <div className={classes.items}>
                      {products && products.length > 0 ?
                          <>
                              {products.map(product =>
                                    <OrderModalItem key={product.id} product={product} />
                              )}
                          </>
                          :
                          <p>Кошик порожній</p>
                      }
                  </div>
              </div>
          </Modal>
        {
          data.map((item) => (
            <OrderItem
                setIsVisible={setIsVisible}
                products={products}
                setProducts={setProducts}
                key={item.id}
                orders={data}
                setOrders={setData}
                data={item}
            />
          ))
          
        }

        <div style={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
            <Button variant="outlined" onClick={() => {setMore(more+1)}}>
                Переглянути ще
            </Button>
        </div>
      </div>
    )
}

export default OrderMain;