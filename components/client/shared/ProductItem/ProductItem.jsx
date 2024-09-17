import {useEffect, useMemo, useRef, useState} from 'react';
import classes from './productItem.module.scss';
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {productClick} from "@/components/client/lib/gtm/events/productClick";
import {productViewGTM} from "@/components/client/lib/gtm/events/productView";
import {useDispatch} from "react-redux";
import {setIsModalCartVisibleAction} from "@/store/cartReducer";
import Link from "next/link";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import translit from "@/utils/translit";
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import { useTranslations } from "next-intl";

const ProductItem = ({product, adminpanel}) => {

    const dispatch = useDispatch();
    const activeClasses = [classes.palette_item, classes.active].join(' ');
    const setActive = () => {

    }
    const t = useTranslations('Product')

    const router = useRouter();
    const [img, setImg] = useState(product?.Colors[0]?.ProductImages[0]?.image.url);
    const [activeColor, setActiveColor] = useState(product?.Colors?.[0]?.name);
    const productPrice = product.withDiscount ? product.price - product.discountValue : product.price;
    const discountPercent = ((product.discountValue * 100) / product.price).toFixed(0);
    const ref = useRef(null);
    const paletteClickHandler = (e, item) => {
        e.stopPropagation()
        e.preventDefault()
        // e.stopImmediatePropagation();
        setImg(item?.ProductImages[0]?.image?.url);
        setActiveColor(item?.name);
    }
    const clickHandler = () => {
        productClick(product)
        dispatch(setIsModalCartVisibleAction(false))
        // router.refresh()
    }

    const rating = product?.Review
            ?.reduce((acc, review) => {
                return acc += review?.rating
            }, 0)
        / product?.Review?.length;


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], observer) => {
                if (entry.isIntersecting) {
                    productViewGTM(product)
                    console.log('view')
                    observer.disconnect()
                }
            },
            {
                threshold: 1,
                once: true // trigger only once
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
    }, []);

    const dbTranslate = useDynamicTranslate()

    return (
        <Link
            onClick={(e) => clickHandler(e)}
            style={{
                color: '#000',
                textDecoration: "none"
            }}
            href={adminpanel ? `/adminpanel/products/${product.slug}` : `/products/${product.slug}`}
        >
            <motion.div
                ref={ref}
                // onClick={clickHandler}
                className={classes.productItem}
                whileHover={{scale: 1.015}}
                transition={{type: 'spring', duration: 0.15}}
            >
                {
                    (product?.Sales !== undefined && product?.Sales?.length != 0) ?

                        <div className={classes.sale}>
                            <span>{product?.Sales[0]?.buyedNum} + {product?.Sales[0]?.freeNum}</span>
                        </div>

                        :

                        product.withDiscount &&
                        <div className={classes.sale}>
                            <span>{discountPercent}%</span>
                        </div>


                }
                <div className={classes.img}>
                    <Image
                        src={img}
                        alt={product.name}
                        blurDataURL={'/assets/images/blur.jpg'}
                        placeholder="blur"
                        priority={true}
                        fill
                        sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                          33vw"
                    />
                </div>
                <h4 className={classes.title}>{dbTranslate(product, 'name')}</h4>
                <div className={classes.palette}>
                    {product.Colors?.map((item, index) =>
                        index < 5 ?
                            <div key={item.id} className={classes.palette_item}>
                                <motion.div
                                    whileHover={{scale: 1.2}}
                                    transition={{type: 'spring', duration: 0.15}}
                                    key={item?.name}
                                    style={{backgroundColor: item?.name}}
                                    onClick={(e) => paletteClickHandler(e, item)}
                                    className={classes.palette_round}
                                >
                                    {activeColor === item?.name
                                        ? <motion.div
                                            style={{backgroundColor: activeColor}}
                                            initial={{scale: 0}}
                                            animate={{scale: 1, x: '-50%'}}
                                            transition={{type: 'just'}}
                                            className={classes.activeDot}
                                        />
                                        : null
                                    }
                                </motion.div>
                            </div>
                            : null
                    )}
                </div>
                <div className={classes.info}>
                    <div className={classes.stars}>
                        {/* <img className={classes.star_img} src={'/assets/icons/star.png'} alt="star"/> */}
                        <FaStar style={{fontSize: "16px", color: "#FFC107"}} />
                        <span>{rating ? rating.toFixed(1) || 0 : 0}</span>
                    </div>
                    <div className={classes.comments} >
                        {/* <img src={'/assets/icons/comment.png'} alt="comments"/> */}
                        <FaRegCommentDots />
                        {product?.Review?.length}
                        <span>{t('reviews')}</span>
                    </div>
                </div>
                {product?.hint ?
                    <div style={{fontSize: 12, alignSelf: 'self-start', marginTop: 8, height: "36px", overflow: "hidden"}}>
                        {dbTranslate(product, 'hint')}
                    </div>
                    : <div style={{height: 18.27, marginTop: 8}}>
                    </div>
                }

                <div className={classes.price}>
                    {product.withDiscount
                        ?
                        <>
                            <div className={classes.old} style={{minWidth: '50px'}}>
                                {product.price + ' ₴'}
                            </div>
                            <div className={classes.new}>
                                {productPrice + ' ₴'}
                            </div>
                        </>
                        :
                        <div className={classes.new}>
                            {product.price + ' ₴'}
                        </div>
                    }
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductItem;