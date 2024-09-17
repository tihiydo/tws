import styles from './navCards.module.scss'
import {HiChevronRight, HiChevronLeft} from 'react-icons/hi'


const NavCards = ({ swiperRef, products }) => {
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
        style={{ opacity: isBeginning ? 0.7 : 1 }}
      >
         <HiChevronLeft />
      </div>

      <div
        className={`${styles.btn} ${isEnd ? styles.disabled : ''}`}
        onClick={handleClickNext}
        style={{ opacity: isEnd ? 0.7 : 1 }}
      >
        <HiChevronRight />
      </div>
    </div>
  );
};

export default NavCards;