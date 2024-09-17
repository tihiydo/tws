import classes from './modalCartItem.module.scss';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import {useDispatch} from "react-redux";
import {
    deleteProductFromCartAction,
    increaseProductCountAction,
    removeProductFromCartAction
} from "@/store/cartReducer";
import {IoMdTrash} from "react-icons/io";
import Image from "next/image";
import {removeFromCart} from "@/components/client/lib/gtm/events/removeFromCart";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import { useTranslations } from "next-intl";

const ModalCartItem = ({product, isInOrder}) => {
    const imageUrl = product?.color?.ProductImages[0]?.image?.url;
    const dispatch = useDispatch();
    const productPrice = product.count * product.price;
    const dbTranslate = useDynamicTranslate()
    const cart = useTranslations("Cart")
    const handleDelete = () => {
        dispatch(deleteProductFromCartAction(product.itemHash))
        removeFromCart(product)
    }

    return (
        <div className={classes.modalCartItem}>
            <div className={classes.image}>
                <Image src={imageUrl} alt={product.name} fill />
            </div>
            <div className={classes.content}>
                <div className={classes.title}>
                    {dbTranslate(product, 'name')}
                </div>
                <div className={classes.color}>
                    <span>
                    {cart("color")}
                    </span>
                    <div style={{backgroundColor: product.color.name}} className={classes.color_round} />
                </div>
                {product.Criterions.map(cr =>
                    <div key={cr.selected.id} className={classes.description}>
                    <span>
                        {dbTranslate(cr, 'name')}:
                    </span>
                        <span>
                        {dbTranslate(cr.selected, 'name')}
                    </span>
                    </div>
                )}
            </div>
            <div className={classes.controls}>
                <div className={classes.controls_count}>
                    <div className={classes.controls_btn} onClick={() => dispatch(removeProductFromCartAction(product.itemHash))}>
                        <AiOutlineMinus />
                    </div>
                    <span>{product.count}</span>
                    <div className={classes.controls_btn} onClick={() => dispatch(increaseProductCountAction(product.itemHash))}>
                        <AiOutlinePlus />
                    </div>
                </div>
                <IoMdTrash style={{cursor: 'pointer'}} onClick={handleDelete} size={'1.4em'}/>
            </div>
            <div className={classes.price}>
                {productPrice + '₴'}
            </div>
        </div>
    );
};

export default ModalCartItem;