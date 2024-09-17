import styles from './navBanner.module.scss'
import Image from 'next/image'
import {HiChevronRight, HiChevronLeft} from 'react-icons/hi'

const NavBanner = ({ swiperRef, products, darker }) => {
  const isBeginning = swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.isBeginning;
  const isEnd = swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.isEnd;
  const handleClickPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleClickNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <div className={styles.navigation}>
      <div
        className={`${styles.btn} ${isBeginning ? styles.disabled : ''}`}
        onClick={handleClickPrev}
        onMouseEnter={(event) => event.currentTarget.classList.add(styles.hover)}
        onMouseLeave={(event) => event.currentTarget.classList.remove(styles.hover)}
      >
        <HiChevronLeft style={{ opacity: isBeginning ? 0.2 : 1, color: '#000' }} />
      </div>
      <div
        className={`${styles.btn} ${isEnd ? styles.disabled : ''}`}
        onClick={handleClickNext}
        onMouseEnter={(event) => event.currentTarget.classList.add(styles.hover)}
        onMouseLeave={(event) => event.currentTarget.classList.remove(styles.hover)}
      >
        <HiChevronRight style={{ opacity: isEnd ? 0.2 : 1 , color: '#000'}} color={'#000'} />
      </div>
      <style jsx>{`
        .${styles.navigation}:hover .${styles.btn} {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default NavBanner;
