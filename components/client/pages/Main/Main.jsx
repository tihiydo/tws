import SwiperComponent from "@/components/client/shared/Swiper/Swiper";
import Tiles from "@/components/client/pages/Main/Tiles/tiles";
import data from './data';
import CategorySlider from "@/components/client/pages/Main/CategorySlider/CategorySlider";
import InstagramPosts from "@/components/client/pages/Main/instaPosts/instaPosts";
import {useSelector} from "react-redux";
import { useTranslations } from "next-intl";
import SeoBlock from "../../SeoBlock/SeoBlock";
import BestsellersSlider from "@/components/client/pages/Main/BestsellersSlider/BestsellersSlider";
import DiscountSlider from "@/components/client/pages/Main/DiscountSlider/DiscountSlider";

export default function Main({ categories, reviews, bestsellers, discounts }) {
	const recentProducts = useSelector(state => state.recentProducts.products)?.slice(0, 5);
	const page = useTranslations("Index")

	return (
		<>
			<SeoBlock
				ogTitle="Twin Sann - меблі для дому та офісу"
				description='Twin Sann − найбільший онлайн-магазин з власним виробництвом меблів в Україні. З 2020 року ми втілюємо маленькі мрії та грандіозні плани тисяч людей. У нас можна замовити стільчики та пуфи будь-якого дизайну. Ми продаємо за справедливою ціною та надаємо гарантію, бо вважаємо, що онлайн-шопінг має бути максимально зручним і безпечним.'
                ogImageUrl={`${process.env.NEXT_PUBLIC_API_URL}/assets/icons/TwinSann.svg`}
			/>
			<div className="mainPageBox">
				<div className="mobileBanner">
					<SwiperComponent children={data.swiper.data.mobile} settings={data.swiper.settings.banner} type="banner"/>
				</div>
				<div className="desktopBanner">
					<SwiperComponent children={data.swiper.data.desktop} settings={data.swiper.settings.banner} type="banner"/>
				</div>
				<Tiles settings={data.swiper.settings.banner}/>

				<DiscountSlider discounts={discounts} settings={data.swiper.settings.cards} />

				<BestsellersSlider bestsellers={bestsellers} settings={data.swiper.settings.cards} />

				{categories?.length ?
					categories?.map(category =>
						category?.Products?.length ?
						<CategorySlider key={category.id} category={category} settings={data.swiper.settings.cards} />
							: null
					)
					: null
				}
				{recentProducts?.length ?
					<div className="lastViewed">
						<h3 className="lastViewedTitle">
							{
								page("lastViewed")
							}
						</h3>
						<SwiperComponent settings={data.swiper.settings.cards} children={recentProducts} type="cards"/>
					</div>
					: null
				}
				<InstagramPosts posts={data.instagram.data}/>

				<div className="lastViewed">
					<h3 className="lastViewedTitle">
						{
							page("bestReviews")
						}
					</h3>
					<SwiperComponent settings={data.swiper.settings.bestReviews} children={reviews} type="bestReviews"/>
				</div>
			</div>
			{/* <Advantages /> */}
		</>
	);

}
