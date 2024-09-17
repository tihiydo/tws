import classes from './bestReview.module.scss';
import Image from "next/image";
import { FaRegCommentDots, FaStar } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";

const BestReview = ({ review }) => {
    const t = useTranslations("Product");
    return (
        <div className={classes.card}>
            <Link
                href={`/products/${review?.Product.slug}`}
                className={classes.product}
            >
                <div className={classes.product__img}>
                        <Image
                            fill
                            src={review?.Product?.Colors[0]?.ProductImages[0]?.image?.url}
                            alt={review.Product.name}
                        />
                    </div>
                <div className={classes.product__info}>
                        <h4 className={classes.product__productTitle}>
                            { review.Product.name }
                        </h4>
                        <div className={classes.product__statistic}>
                            <div className={classes.product__stars}>
                                <FaStar style={{fontSize: "16px", color: "#FFC107"}} />
                                <span>{review.rating ? review.rating.toFixed(1) : 0}</span>
                            </div>
                            <div className={classes.product__reviews}>
                                <FaRegCommentDots />
                                <span>{review.Product?.Review?.length} {t("reviews")}</span>
                            </div>
                        </div>
                    </div>
            </Link>

            <div className={classes.card__review}>
                <div className={"four-line-text"}>
                    { review.text }
                </div>
            </div>
        </div>
    )
}

export default BestReview;
