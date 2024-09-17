import classes from './search.module.scss';
import Link from "next/link";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useRef} from "react";

const ProductItem = ({product, closePopup}) => {

    const productPrice = product.withDiscount ? product.price - product.discountValue : product.price;
    const discountPercent = ((product.discountValue * 100) / product.price).toFixed(0);

    const rating = product?.Review
            ?.reduce((acc, review) => {
                return acc += review?.rating
            }, 0)
        / product?.Review?.length;


    const dbTranslate = useDynamicTranslate()
    const router = useRouter();
    const linkRef = useRef(null)

    const handleClick = (e) => {
        e.stopPropagation()
        closePopup()
    }
    return (
        <Link
            ref={linkRef}
            onClick={handleClick}
            className={classes.search__option}
            style={{
                color: '#000',
                textDecoration: "none"
            }}
            href={`/products/${product.slug}`}
        >

            {/*{*/}
            {/*    (product?.Sales !== undefined && product?.Sales?.length != 0) ?*/}

            {/*        <div className={classes.sale}>*/}
            {/*            <span>{product?.Sales[0]?.buyedNum} + {product?.Sales[0]?.freeNum}</span>*/}
            {/*        </div>*/}

            {/*        :*/}

            {/*        product.withDiscount &&*/}
            {/*        <div className={classes.sale}>*/}
            {/*            <span>{discountPercent}%</span>*/}
            {/*        </div>*/}


            {/*}*/}
            <div style={{display: 'flex', gap: 20}}>
                <div className={classes.img}>
                    <Image
                        src={product?.ProductImages[0]?.image?.url} я
                        alt={product.name}
                        blurDataURL={'/assets/images/blur.jpg'}
                        placeholder="blur"
                        priority={true}
                        fill
                        sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                          33vw"
                    />
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
                </div>
                <h4 className={classes.title}>{dbTranslate(product, 'name')}</h4>

            </div>

            {/*<div className={classes.info}>*/}
            {/*    <div className={classes.stars}>*/}
            {/*        <img className={classes.star_img} src={'/assets/icons/star.png'} alt="star"/>*/}
            {/*        <span>{rating ? rating.toFixed(1) || 0 : 0}</span>*/}
            {/*    </div>*/}
            {/*    <div className={classes.comments}>*/}
            {/*        <img src={'/assets/icons/comment.png'} alt="comments"/>*/}
            {/*        {product?.Review?.length}*/}
            {/*        <span> відгуків</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

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
        </Link>
    );
};

export default ProductItem;