import {useEffect, useMemo, useRef, useState} from 'react';
import classes from './productPage.module.scss';
import {useIsMobile} from "@/components/client/hooks/useIsMobile.js";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {
    addProductToCartAction, addRelatedProducts,
    deleteProductFromCartAction,
    setIsModalCartVisibleAction
} from "@/store/cartReducer.js";
import Button from "@/components/shared/UI/Button/Button";
import ReviewItem from "@/components/client/shared/ReviewItem/reviewItem";
import ProductSwiper from "@/components/client/shared/Swiper/ProductSwiper/ProductSwiper";
import {Badge, Box, FormControl, Modal, Rating, TextField, Tooltip} from '@mui/material';
import {RxCross2} from 'react-icons/rx';
import {FiInfo} from 'react-icons/fi';
import SwiperComponent from '@/components/client/shared/Swiper/Swiper';
import {addToCartGTM} from "@/components/client/lib/gtm/events/addToCart";
import {setRecentProducts} from "@/store/recentProductsReducer";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import CustomTabs from "@/components/shared/UI/CustomTabs/CustomTabs";
import {MdPhoto} from 'react-icons/md'
import {FaPlay} from 'react-icons/fa'
import {v4 as uuidv4} from "uuid";
import supabaseFileService from "@/components/adminpanel/services/SupabaseFileService";
import {PHOTO_STORAGE_URL} from "@/config";
import {PhotoProvider, PhotoView} from "react-photo-view";
import PhotoUploader from "@/components/adminpanel/shared/ProductForm/Cropper/PhotoUploader";
import SchemaBlock from '../../SeoBlock/SchemaBlock';
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import SeoBlock from '../../SeoBlock/SeoBlock';
import Breadcrumbs from "@/components/client/shared/Breadcrumbs/Breadcrumbs";
import { useTranslations } from 'next-intl';
import { FaStar, FaRegCommentDots } from "react-icons/fa";
import data from "@/components/client/pages/Main/data";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi";
import categoryStyles from "@/components/client/pages/Main/CategorySlider/categorySlider.module.scss"
import { useCartRelatedProducts } from "@/hooks/useCartRelatedProducts";
import SeoText from "@/components/client/SeoBlock/SeoText";

const variants = {
    open: {
        maxHeight: '100%'
    },
    hidden: {
        maxHeight: '100px'
    }
}
export const CardsSettings = {
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
            slidesPerView: 5,
            slidesPerGroup: 4,
        },
        1500: {
            slidesPerView: 6,
            slidesPerGroup: 6,
        },
    },
};


const saleCriterion = (product) => {
    if (product?.Sales !== undefined && product?.Sales?.length !== 0) {

    }
}


const Product = ({product, similarProducts, relatedProducts, seo}) => {
    const activeOptionClasses = [classes.optionButton, classes.optionButton_active].join(' ');
    const info = useTranslations('info')
    const button = useTranslations("buttons")
    const isMobile = useIsMobile();
    const dispatch = useDispatch();
    const pathname = usePathname();

    const related = useCartRelatedProducts(similarProducts, product.categoryId);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const cartProducts = useSelector(state => state.cart.products)
    const recentProducts = useSelector(state => state.recentProducts.products)

    const filteredRecentProducts = recentProducts?.filter(pr => pr?.id !== product?.id);
    // const newProduct = product.withDiscount ? product.price - product.discountValue : product.price;

    const [activeColor, setActiveColor] = useState(product.Colors[0]);
    const [img, setImg] = useState(product?.Colors[0]?.ProductImages[0]?.image?.url);

    const [selectedCriterions, setSelectedCriterions] =
        useState(
            product?.Criterions?.map(criterion => ({name: criterion.name, selected: criterion.CriterionItems[0]}))
        )
    const newProductPrice = useMemo(() => {
        const criterionsSum = selectedCriterions?.reduce((acc, criterion) => {
            return acc += criterion?.selected?.price
        }, 0);
        if (product.withDiscount) {
            return product.price - product.discountValue + criterionsSum;
        } else {
            return product.price + criterionsSum;
        }
    }, [selectedCriterions, pathname])

    const rating = useMemo(() => {
        const ratingSum = product?.Review?.reduce((acc, review) => {
            return acc += review?.rating
        }, 0);
        return ratingSum / product?.Review?.length
    }, [pathname])

    const oldProductPrice = useMemo(() => {
        const criterionsSum = selectedCriterions?.reduce((acc, criterion) => {
            return acc += criterion?.selected?.price
        }, 0);
        return product.price + criterionsSum;
    }, [selectedCriterions, pathname])

    const getCriterionItemStyles = (criterion, criterionItem) => {
        const criter = selectedCriterions?.find(cr => cr?.name === criterion?.name);
        if (criter?.selected?.id === criterionItem?.id) {
            return activeOptionClasses;
        } else {
            return classes.optionButton;
        }
    }

    const handleCriterionClick = (criterion, criterionItem) => {
        const newSelectedCriterions = selectedCriterions?.map(cr => {
            if (cr.name === criterion.name) {
                return ({...cr, selected: criterionItem})
            } else {
                return cr;
            }
        })
        setSelectedCriterions(newSelectedCriterions)
    }
    const addToCart = () => {
        const itemHash = Date.now();
        dispatch(addProductToCartAction({
            ...product,
            itemHash,
            Criterions: selectedCriterions,
            price: product.withDiscount ? newProductPrice : oldProductPrice,
            // colorOption: colorOptions.find(item => item.id === activeColorOption),
            // categoryOption: categoriesOptions.find(item => item.id === activeCategoryOption),
            color: activeColor
        }))
        dispatch(setIsModalCartVisibleAction(true));
        dispatch(addRelatedProducts(related))
        addToCartGTM({
            ...product,
            itemHash,
            Criterions: selectedCriterions,
            price: product.withDiscount ? newProductPrice : oldProductPrice,
            // colorOption: colorOptions.find(item => item.id === activeColorOption),
            // categoryOption: categoriesOptions.find(item => item.id === activeCategoryOption),
            color: activeColor
        })
        setActiveColor(product.Colors[0]);
        // setActiveColorOption(1);
        // setActiveCategoryOption(1);
        setImg(product.Colors[0]?.ProductImages[0]?.image?.url)
    }

    const removeFromCart = () => {
        dispatch(deleteProductFromCartAction(product?.id))
    }


    const paletteClickHandler = (e, item) => {
        setImg(item?.ProductImages[0]?.image?.url);
        setActiveColor(item);
    }

    useEffect(() => {
        if (!recentProducts.find(prod => prod.id === product.id)) {
            dispatch(setRecentProducts([product, ...recentProducts]))
        }
    }, [])

    useEffect(() => {
        setActiveColor(product.Colors[0])
        setSelectedCriterions(product?.Criterions?.map(criterion => ({
            name: criterion.name,
            name_ru: criterion?.name_ru,
            selected: criterion.CriterionItems[0]
        })))
        setTab('photo')
    }, [pathname])

    const [tab, setTab] = useState('photo');
    const videoUrl = product?.videos?.url;
    const videoName = product?.videos?.name;
    const isWithVideo = !!videoUrl;
    const schema = [
        {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product?.name,
            "description": `${product?.description.slice(0, 50)}...`,
            "name": product?.name,
            "image": product?.Colors[0]?.ProductImages[0]?.image.url,
            "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": product?.price,
            "priceCurrency": "UAH"
            },

            "review": {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": product.Review[0]?.rating,
                    "bestRating": 5,
                    "worstRating": 1
                },
                "author": {
                    "@type": "Person",
                    "name": product.Review[0]?.name,
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": rating ? rating.toFixed(1) : 0,
                "reviewCount": product.Review?.length
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": product.category.name,
                "item": `${process.env.NEXT_PUBLIC_API_URL}/categories/${product.category.slug}`
            }, {
                "@type": "ListItem",
                "position": 2,
                "name": product.subcategory.name,
                "item": `${process.env.NEXT_PUBLIC_API_URL}/categories/${product.subcategory.slug}`
            }, {
                "@type": "ListItem",
                "position": 3,
                "name": product.name
            }]
        }
    ]

    const dbTranslate = useDynamicTranslate()
    const t = useTranslations("Product");
    const buttons = useTranslations("buttons");
    const subcategoryBreadCrumb = product.subcategory?.name
        ?
        [{
            text: dbTranslate(product.subcategory, 'name'),
            href: `/categories/${product.category.slug}/${product.subcategory.slug}`
        }]
        : []

    const reviewBlockRef = useRef(null)


    const scrollToReview = () => {
        if (reviewBlockRef.current) {
            reviewBlockRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }


    return (
        <>
            <SchemaBlock schema={schema}/>
            <SeoBlock
                title={
                    seo ? dbTranslate(seo, "title") :
                        product?.name
                }
                titleTemplate={seo && "%s"}
                ogTitle={
                    seo ? dbTranslate(seo, "title") :
                        `${product?.name} всього за ${product?.price}₴`
                }
                description={
                    seo ? dbTranslate(seo, "description") :
                        product?.description.length > 300 ?
                            `${product?.description.slice(0, 300)}...` :
                            product?.description
                }
                ogImageUrl={product?.Colors[0]?.ProductImages[0]?.image.url}
            />
            <div className={classes.productPage}>
                <div style={{marginBottom: 15}}>
                    <Breadcrumbs links={[
                        {text: info('home'), href: '/'},
                        {text: dbTranslate(product.category, 'name'), href: `/categories/${product.category.slug}`},
                        ...subcategoryBreadCrumb,
                        {text: dbTranslate(product, 'name'), href: `/products/${product.slug}`}
                    ]}/>
                </div>

                {isWithVideo &&
                    <CustomTabs value={tab} setValue={setTab} options={[
                        {label: 'Фото', value: 'photo', picture: <MdPhoto size={20}/>},
                        {label: 'Відео', value: 'video', picture: <FaPlay size={15}/>}
                    ]}/>
                }
                <div className={classes.sides}>
                    <div className={classes.imageSide}>

                        <div className={classes.image}
                             style={{aspectRatio: tab == 'photo' ? '1/1' : 'auto', position: 'relative'}}>
                            {/*<Image src={img} alt={product.name} fill />*/}
                            {
                                tab === 'photo' ?
                                    <ProductSwiper productImage={activeColor?.ProductImages}/>
                                    :
                                    <video style={{width: '100%', height: 'auto'}} controls>
                                        <source src={product?.videos?.url}
                                                type={`video/${product?.videos?.name?.split('.')?.pop()}`}/>
                                    </video>
                            }
                        </div>
                        {
                            dbTranslate(product, 'description') ?
                                <>
                                    {!isMobile
                                        ?
                                        <>
                                            <h2 style={{
                                                fontSize: 20,
                                                fontWeight: 500,
                                                marginBottom: 15,
                                                paddingBottom: 10,
                                                borderBottom: '1px solid rgba(112, 112, 112, 0.58)'
                                            }}>
                                                {
                                                    t("description")
                                                }
                                            </h2>
                                            <motion.div
                                                className={classes.description}
                                                variants={variants}
                                                animate={isCollapsed ? 'open' : 'hidden'}
                                            >
                                                {dbTranslate(product, 'description')}
                                            </motion.div>
                                        </>
                                        : null
                                    }
                                    {!isMobile
                                        ?
                                        <Button onClick={() => setIsCollapsed(!isCollapsed)}
                                                text={isCollapsed ? buttons("hide") : buttons("readMore")}/>
                                        : null
                                    }
                                </>
                                : null
                        }

                    </div>
                    <div className={classes.infoSide}>
                        <h1 className={classes.title}>
                            {
                                seo ? dbTranslate(seo, "h") :
                                    dbTranslate(product, 'name')
                            }
                        </h1>
                        <div style={{cursor: 'pointer'}} onClick={scrollToReview} className={classes.info}>
                            <div className={classes.stars}>
                                {/* <img className={classes.star_img} src={'/assets/icons/star.png'} alt="star"/> */}
                                <FaStar style={{fontSize: "16px", color: "#FFC107"}} />
                                <span>{rating ? rating.toFixed(1) : 0}</span>
                            </div>

                            <div className={classes.comments}>
                                {/* <img src={'/assets/icons/comment.png'} alt="comments"/> */}
                                <FaRegCommentDots />
                                {product?.Review?.length}
                                <span>{t("reviews")}</span>
                            </div>
                        </div>
                        <div className={classes.palette}>
                            {product?.Colors?.map(item =>
                                <div key={item.name} className={classes.palette_item}>
                                    <motion.div
                                        whileHover={{scale: 1.15}}
                                        transition={{type: 'spring', duration: 0.15}}
                                        key={item?.id}
                                        style={{backgroundColor: item?.name}}
                                        onClick={(e) => paletteClickHandler(e, item)}
                                        className={classes.palette_round}
                                    >
                                        {activeColor.name === item?.name
                                            ? <motion.div
                                                style={{backgroundColor: activeColor.name}}
                                                initial={{scale: 0}}
                                                animate={{scale: 1, x: '-50%'}}
                                                transition={{type: 'just'}}
                                                className={classes.activeDot}
                                            ></motion.div>
                                            : null
                                        }
                                    </motion.div>

                                </div>
                            )}
                        </div>
                        {product?.Criterions?.map(item =>
                            <div key={item.id} className={classes.optionsBlock}>
                                <div className={classes.options_title}>
                                    {dbTranslate(item, 'name')}
                                    <>
                                        {
                                            item.description ? (
                                                <Tooltip title={dbTranslate(item, 'description')}
                                                         placement="bottom-start" enterTouchDelay={0}>
                                                    <div>
                                                        <FiInfo style={{display: 'block'}} size="1em"/>
                                                    </div>
                                                </Tooltip>
                                            ) : null
                                        }
                                    </>
                                </div>

                                <div className={classes.options}>
                                    {item?.CriterionItems?.map(option =>

                                        ((item?.name == 'Категорія тканини' || item?.name == 'Катигорія тканини') && product?.Sales?.some(obj => obj.cloth === option.name)) ?
                                            <Tooltip key={option.id} title={dbTranslate(option, 'description')}
                                                     placement="bottom-start" enterTouchDelay={0}>
                                                <Badge
                                                    badgeContent={`${product?.Sales[0]?.buyedNum} + ${product?.Sales[0]?.freeNum}`}
                                                    color="error">
                                                    <button
                                                        className={getCriterionItemStyles(item, option)}
                                                        onClick={() => {
                                                            handleCriterionClick(item, option)
                                                        }}
                                                        key={option.id}
                                                    >
                                                        {dbTranslate(option, 'name')}
                                                    </button>
                                                </Badge>
                                            </Tooltip>
                                            :
                                            <Tooltip key={option.id} title={dbTranslate(option, 'description')}
                                                     placement="bottom-start"
                                                     enterTouchDelay={0}>
                                                <button
                                                    className={getCriterionItemStyles(item, option)}
                                                    onClick={() => {
                                                        handleCriterionClick(item, option)
                                                    }}
                                                    key={option.id}
                                                >
                                                    {dbTranslate(option, 'name')}
                                                </button>
                                            </Tooltip>
                                    )}

                                </div>
                            </div>
                        )}
                        {
                            dbTranslate(product, 'description') ?
                                <>
                                    {isMobile
                                        ?
                                        <>
                                            <h2 style={{
                                                fontSize: 20,
                                                fontWeight: 500,
                                                marginBottom: 15,
                                                paddingBottom: 10,
                                                borderBottom: '1px solid rgba(112, 112, 112, 0.58)'
                                            }}>
                                                Опис
                                            </h2>
                                            <motion.div
                                                className={classes.description}
                                                variants={variants}
                                                animate={isCollapsed ? 'open' : 'hidden'}
                                            >
                                                {dbTranslate(product, 'description')}
                                            </motion.div>
                                        </>
                                        : null
                                    }
                                    {isMobile
                                        ?
                                        <Button onClick={() => setIsCollapsed(!isCollapsed)}
                                                text={isCollapsed ? 'Сховати' : 'Читати більше'}/>
                                        : null
                                    }
                                </>
                                : null
                        }
                        <div className={classes.price}>
                            {product.withDiscount
                                ?
                                <>
                                    <div className={classes.old}>
                                        {oldProductPrice + ' ₴'}
                                    </div>
                                    <div className={classes.new}>
                                        {newProductPrice + ' ₴'}
                                    </div>
                                </>
                                :
                                <div className={classes.new}>
                                    {oldProductPrice + ' ₴'}
                                </div>
                            }
                        </div>
                        <Button
                            onClick={addToCart}
                            variant={'buy'}
                            text={buttons("order")}
                        >
                            {buttons("order")}
                        </Button>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.categoryTitleBox}>
                        <h2
                            className={categoryStyles.title}
                            style={{
                                color: "#000",
                                fontSize: 20,
                                fontWeight: 500,
                            }}
                        >
                            {
                                t("relatedProducts")
                            }
                        </h2>
                        {/*<Link href={`/categories/${product.category.slug}`} className={categoryStyles.link}>{button("toCategoy")}<HiChevronRight /></Link>*/}
                    </div>
                    <SwiperComponent settings={data.swiper.settings.cards} children={relatedProducts} type="cards"/>
                </div>
                <div>
                    <div className={categoryStyles.categoryTitleBox}>
                        <h2
                            className={categoryStyles.title}
                            style={{
                                color: "#000",
                                fontSize: 20,
                                fontWeight: 500,
                            }}
                        >
                            {
                                t("similarProducts")
                            }
                        </h2>
                        {/*<Link href={`/categories/${product.category.slug}`} className={categoryStyles.link}>{button("toCategoy")}<HiChevronRight /></Link>*/}
                    </div>
                    <SwiperComponent settings={data.swiper.settings.cards} children={similarProducts} type="cards"/>
                </div>
                {filteredRecentProducts?.length
                    ?
                    <div className={classes.lastViewed}>
                        <div className={classes.title}>
                            {
                                t("lastViewed")
                            }
                        </div>
                        <SwiperComponent settings={CardsSettings} children={filteredRecentProducts} type="cards"/>
                    </div>
                    : null
                }
                {product?.Review?.length ?
                    <div ref={reviewBlockRef} className={classes.reviews}>
                        <h2 className={classes.title}>
                            {
                                t("bestReviews")
                            }
                        </h2>

                        {product?.Review?.map((item =>
                                <ReviewItem key={item.id} user={item.name} starsRate={item.rating}
                                            reviewText={item.text} images={item.images}/>
                        ))}

                    </div>
                    : null
                }
                <ModalAddReview productId={product.id}/>
                <SeoText seo={seo} />
            </div>
        </>
    );
};
export default Product;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const ModalAddReview = ({productId}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [text, setText] = useState('');
    const [stars, setStars] = useState(0);
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [sendApplication, setSendApplication] = useState(false);

    const buttons = useTranslations("buttons");
    const form = useTranslations("form");
    const validation = useTranslations("validation")

    const getBlobUrl = (file) => {
        return URL.createObjectURL(file)
    }

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const addedImagesArr = [image1, image2, image3].filter(image => !!image)
    const addedImagesUrl = addedImagesArr?.map(blob => getBlobUrl(blob))

    const handleOpen = () => {
        setOpen(true);
        setName('');
        setPhone('');
        setText('');
        setStars(0);
        setNameError(false);
        setPhoneError(false);
        setTextError(false);
    };
    const handleClose = () => setOpen(false);

    const handleNameChange = (event) => {
        const value = event.target.value;
        const maxLength = 10; // Set the maximum allowed length here

        if (value.length <= maxLength) {
            setName(value);
            setNameError(false);
        }


        // Name length validation
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        // const value = event.target.value;
        setPhoneError(false);

    };

    const handleTextChange = (event) => {
        // const value = event.target.value;
        setText(event.target.value);
        setTextError(false);

    };
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = async () => {
        if (!name) {
            setNameError(true);
        }
        if (!phone) {
            setPhoneError(true);
        }
        if (!text) {
            setTextError(true);
        }
        if (name && phone && text) {
            // submit form
            console.log(name)

            const url = '/api/reviews/';
            let images = [image1, image2, image3]
            images = images?.filter(image => !!image);
            images = await Promise.all(images?.map(async (image) => {
                const ext = image?.name.split('.').pop();
                const fileName = `${uuidv4()}.${ext}`;
                const newImage = await supabaseFileService.uploadFile(image, 'images', fileName, '/reviews')
                return ({name: fileName, url: `${PHOTO_STORAGE_URL}/${newImage.path}`})
            }))

            const data = {
                idProduct: productId,
                name: name,
                surname: "Італьянець",
                text: text,
                phone: phone,
                approved: "not_approve",
                rating: stars,
                images: {items: images}
            };

            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .then(() => setSendApplication(true))
                .catch(error => console.error(error));
            setSubmitted(true);

        }
    };

    return (
        <div>
            <Button onClick={handleOpen} text={buttons("feedback")} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={classes.modalTitle}>
                        {
                            buttons("feedback")
                        }
                        <RxCross2 onClick={handleClose}/>
                    </div>
                    {!submitted ? (
                        <div>
                            <div className={classes.modalBody}>
                                <Rating
                                    size="large" onChange={(event, newValue) => {
                                    setStars(newValue);
                                }}
                                />
                                <FormControl variant="standard">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label={form("name")}
                                        value={name}
                                        onChange={handleNameChange}
                                        error={nameError}
                                        required
                                    />
                                    {nameError &&
                                        <span className={classes.errorText}>{validation("required")}</span>}
                                </FormControl>
                                <FormControl variant="standard">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label={form("phone")}
                                        placeholder="+380"
                                        type="number"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        error={phoneError}
                                        required
                                    />
                                    {phoneError &&
                                        <span className={classes.errorText}>{validation("required")}</span>}
                                </FormControl>
                                <FormControl variant="standard">
                                    <TextField
                                        fullWidth
                                        multiline
                                        size="small"
                                        label={form("review")}
                                        placeholder=""
                                        value={text}
                                        onChange={handleTextChange}
                                        error={textError}
                                        required
                                    />
                                    {textError &&
                                        <span className={classes.errorText}>{validation("required")}</span>}
                                </FormControl>
                                <div>
                                    <div style={{fontSize: 18, fontWeight: 600}}>
                                        {
                                            form("photo")
                                        }
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        marginTop: 15,
                                        gap: 20,
                                        flexWrap: 'wrap',
                                        color: '#d3d3da'
                                    }}>
                                        <PhotoUploader file={image1} setFile={setImage1} width={100} height={100}/>
                                        <PhotoUploader file={image2} setFile={setImage2} width={100} height={100}/>
                                        <PhotoUploader file={image3} setFile={setImage3} width={100} height={100}/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.modalBtn}>
                                <Button variant="contained" onClick={handleSubmit} type="submit">
                                    {
                                        buttons("feedback")
                                    }
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className={classes.modalBody}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    padding: '20px 0px'
                                }}>
                                    <Image src='/assets/icons/checkmark.png' width={100} height={100}
                                           alt={'promo photo'}/>
                                    <div style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        fontSize: '22px',
                                        marginTop: '20px'
                                    }}>
                                        Дякуємо за ваш відгук
                                    </div>
                                </div>

                            </div>
                            <div className={classes.modalBtn}>
                                <Button variant="contained" onClick={handleClose}>Закрити</Button>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}
