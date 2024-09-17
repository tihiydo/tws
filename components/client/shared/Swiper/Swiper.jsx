import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./swiper.module.scss";
import { useRef, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import NavBanner from "./navBanner/navBanner";
import NavCards from "./navCards/navCards";
import BestReview from "./bestReview/bestReview";
import Link from "next/link";
import Image from "next/image";
import CooperationSlide from "../../pages/info/Сooperation/CooperationSlide";
SwiperCore.use([Navigation]);

const SwiperComponent = ({ children, type, settings }) => {
  const TypeNav = type === "banner" ? NavBanner : NavCards;
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);
  const handleSlideChange = () => {
    const swiper = swiperRef.current.swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Swiper
      {...settings}
      className={styles.swiperContainer}
      ref={swiperRef}
      onSlideChange={handleSlideChange}
    >
      {children.map((item, key) => {
        switch (type) {
          case "cooperation":
            return (
              <SwiperSlide className={styles.bannerContainer} key={item.src}>
                <CooperationSlide img={item.img} text={item.title}/>
              </SwiperSlide>
            );
          case "banner":
            return (
              <SwiperSlide className={styles.bannerContainer} key={item.src}>
                <Link href="/bestsellers">
                  <div className={styles.swiperBannerSlide}>
                    <Image
                      fill
                      src={item.src}
                      alt={item.src}
                      style={{objectFit: "cover"}}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          case "cards":
            return (
              <SwiperSlide key={item.id} className={styles.cardContainer}>
                <ProductItem product={item} key={children.id} />
              </SwiperSlide>
            );
          case "bestReviews":
            return (
              <SwiperSlide key={item.id} className={styles.cardContainer}>
                <BestReview
                    review={item}
                />
              </SwiperSlide>
            );
          case "instReviews":
            return (
              <SwiperSlide key={item.id} className={styles.cardContainer}>
                <ProductItem product={item} key={children.id} />
              </SwiperSlide>
            );
          default:
            return (
              <SwiperSlide className={styles.bannerContainer} key={item.src}>
                <Link
                  href={"/bestsellers"}
                  style={{
                    display: "block",
                    position: "relative",
                    paddingBottom: "25%",
                  }}
                >
                  <Image src={item.src} alt={item.src} fill />
                </Link>
              </SwiperSlide>
            );
        }
      })}
      <TypeNav swiperRef={swiperRef} />
    </Swiper>
  );
};

export default SwiperComponent;
