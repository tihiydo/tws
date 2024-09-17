import SwiperComponent from '@/components/client/shared/Swiper/Swiper';
import classes from '@/components/client/pages/Main/CategorySlider/categorySlider.module.scss'
import {HiChevronRight} from 'react-icons/hi'
import Link from "next/link";
import { useTranslations } from 'next-intl';

const BestsellerSlider = ({bestsellers, settings}) => {
	const button = useTranslations("buttons")
	const t = useTranslations("Index")
	return (
		<div>
			<div className={classes.categoryTitleBox}>
				<h2 className={classes.title}>
					{
						t("popularProducts")
					}
				</h2>
				<Link href={`/bestsellers`} className={classes.link}>{button("toCategoy")}<HiChevronRight /></Link>
			</div>
			<SwiperComponent children={bestsellers} settings={settings} type="cards"/>
		</div>
	)
}

export default BestsellerSlider;