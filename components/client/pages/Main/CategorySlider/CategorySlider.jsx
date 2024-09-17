import SwiperComponent from '../../../shared/Swiper/Swiper';
import classes from './categorySlider.module.scss'
import {HiChevronRight} from 'react-icons/hi'
import Link from "next/link";
import {useDynamicTranslate} from "@/components/client/hooks/useDynamicTranslate";
import { useTranslations } from 'next-intl';

const CategorySlider = ({category, settings, style}) => {
    const button = useTranslations("buttons")
    const dbTranslate = useDynamicTranslate()

    const customData = category.Products.map(item => item.product)

    return (
        <div>
            <div className={classes.categoryTitleBox}>
                <h2 style={style} className={classes.title} >{dbTranslate(category, 'name')}</h2>
                <Link href={`/categories/${category.slug}`} className={classes.link}>{button("toCategoy")}<HiChevronRight /></Link>
            </div>
            <SwiperComponent children={customData} settings={settings} type="cards"/>
        </div>
    )
}

export default CategorySlider;
