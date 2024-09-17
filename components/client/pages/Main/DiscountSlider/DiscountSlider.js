import SwiperComponent from '@/components/client/shared/Swiper/Swiper';
import classes from '@/components/client/pages/Main/CategorySlider/categorySlider.module.scss'
import { useTranslations } from 'next-intl';

const DiscountSlider = ({discounts, settings}) => {
	const t = useTranslations("Index")
	return (
		<div>
			<div className={classes.categoryTitleBox}>
				<h2 className={classes.title}>
					{
						t("discountProducts")
					}
				</h2>
			</div>
			<SwiperComponent children={discounts} settings={settings} type="cards"/>
		</div>
	)
}

export default DiscountSlider;
