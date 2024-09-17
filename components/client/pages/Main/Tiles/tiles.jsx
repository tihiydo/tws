import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./tiles.module.scss";
import NavCards from './navCards/navCards';
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
SwiperCore.use([Navigation]);

const Tiles = ({settings}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);
  const handleSlideChange = () => {
    const swiper = swiperRef.current.swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const category = useTranslations("сategories")

  return (
    <Swiper
      {...settings}
      className={styles.swiperContainer}
      spaceBetween={20}
      ref={swiperRef}
      onSlideChange={handleSlideChange}
    >
      <SwiperSlide className={styles.slide}>
      <Link className={styles.tile} href="/categories/pufy">
          <Image src="/assets/images/tileImage_Puf.jpeg" alt="Пуфи" fill />
          <div className={styles.topText}>
            <h1>{category("catalog")}</h1>
            <h2>{category("pufy")}</h2>
            <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70.3536 4.35355C70.5488 4.15829 70.5488 3.84171 70.3536 3.64645L67.1716 0.464466C66.9763 0.269204 66.6597 0.269204 66.4645 0.464466C66.2692 0.659728 66.2692 0.976311 66.4645 1.17157L69.2929 4L66.4645 6.82843C66.2692 7.02369 66.2692 7.34027 66.4645 7.53553C66.6597 7.7308 66.9763 7.7308 67.1716 7.53553L70.3536 4.35355ZM0 4.5H70V3.5H0V4.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
        <Link className={styles.tile} href="/categories/banketky">
          <Image src="/assets/images/tileImage_Banketka.jpeg" alt="Банкетки" fill />
          <div className={styles.rightText}>
            {category("catalog")}
            <h2>{category("banketky")}</h2>
            <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70.3536 4.35355C70.5488 4.15829 70.5488 3.84171 70.3536 3.64645L67.1716 0.464466C66.9763 0.269204 66.6597 0.269204 66.4645 0.464466C66.2692 0.659728 66.2692 0.976311 66.4645 1.17157L69.2929 4L66.4645 6.82843C66.2692 7.02369 66.2692 7.34027 66.4645 7.53553C66.6597 7.7308 66.9763 7.7308 67.1716 7.53553L70.3536 4.35355ZM0 4.5H70V3.5H0V4.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
        <Link className={styles.tile} href="/categories/stiltsi">
          <Image src="/assets/images/tileImage_Chair.jpeg" alt="Стільці" fill />
          <div className={styles.topText}>
            {category("catalog")}
            <h2>{category("stiltsi")}</h2>
            <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70.3536 4.35355C70.5488 4.15829 70.5488 3.84171 70.3536 3.64645L67.1716 0.464466C66.9763 0.269204 66.6597 0.269204 66.4645 0.464466C66.2692 0.659728 66.2692 0.976311 66.4645 1.17157L69.2929 4L66.4645 6.82843C66.2692 7.02369 66.2692 7.34027 66.4645 7.53553C66.6597 7.7308 66.9763 7.7308 67.1716 7.53553L70.3536 4.35355ZM0 4.5H70V3.5H0V4.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
      </SwiperSlide>

      <SwiperSlide className={styles.slide}>
        <Link className={styles.tile} href="/categories/miaka_stinka">
          <Image src="/assets/images/tileimage_Kit.jpeg" alt="Комплекти для дому" fill />
          <div className={styles.topText}>
            {category("catalog")}
            <h2>{category("complekty")}</h2>
            <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70.3536 4.35355C70.5488 4.15829 70.5488 3.84171 70.3536 3.64645L67.1716 0.464466C66.9763 0.269204 66.6597 0.269204 66.4645 0.464466C66.2692 0.659728 66.2692 0.976311 66.4645 1.17157L69.2929 4L66.4645 6.82843C66.2692 7.02369 66.2692 7.34027 66.4645 7.53553C66.6597 7.7308 66.9763 7.7308 67.1716 7.53553L70.3536 4.35355ZM0 4.5H70V3.5H0V4.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
        <Link className={styles.tile} href="/categories/dyvany">
          <Image src="/assets/images/tileImage_Sofa.jpeg" alt="Дивани" fill/>
          <div className={styles.rightText}>
            {category("catalog")}
            <h2>{category("dyvany")}</h2>
            <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70.3536 4.35355C70.5488 4.15829 70.5488 3.84171 70.3536 3.64645L67.1716 0.464466C66.9763 0.269204 66.6597 0.269204 66.4645 0.464466C66.2692 0.659728 66.2692 0.976311 66.4645 1.17157L69.2929 4L66.4645 6.82843C66.2692 7.02369 66.2692 7.34027 66.4645 7.53553C66.6597 7.7308 66.9763 7.7308 67.1716 7.53553L70.3536 4.35355ZM0 4.5H70V3.5H0V4.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
        <Link className={styles.tile} href="/categories/stoly">
          <Image src="/assets/images/tileImage_Table.webp" alt="Столи" fill />
          <div className={styles.rightText}>
            {category("catalog")}
            <h2>{category("stoly")}</h2>
            <svg width="71" height="8" viewBox="0 0 71 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70.3536 4.35355C70.5488 4.15829 70.5488 3.84171 70.3536 3.64645L67.1716 0.464466C66.9763 0.269204 66.6597 0.269204 66.4645 0.464466C66.2692 0.659728 66.2692 0.976311 66.4645 1.17157L69.2929 4L66.4645 6.82843C66.2692 7.02369 66.2692 7.34027 66.4645 7.53553C66.6597 7.7308 66.9763 7.7308 67.1716 7.53553L70.3536 4.35355ZM0 4.5H70V3.5H0V4.5Z" fill="white"/>
            </svg>
          </div>
        </Link>
      </SwiperSlide>
      <NavCards swiperRef={swiperRef} products={1}/>
    </Swiper>
  );
};

export default Tiles;


