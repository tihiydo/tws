import styles from './SwiperNavigationButtons.module.scss'
import Image from 'next/image'

const SwiperNavigationButtons = ({ swiperRef, products }) => {
  const lastSlideIndex = children.length - 1;
const activeSlideIndex = swiperRef.current.swiper.activeIndex;

// перевірка, чи активний слайд є останнім
const isLastSlide = activeSlideIndex === lastSlideIndex;

// перевірка, чи активний слайд є першим
const isFirstSlide = activeSlideIndex === 0;

return (
  <div className={styles.navigation}>
    <div
      className={`${styles.btn} ${isFirstSlide ? styles.disabled : ''}`}
      onClick={handleClickPrev}
      style={{ opacity: isFirstSlide ? 0.7 : 1 }}
    >
      <Image src={'/icon_arrow.svg'} alt="icon arrow" className={styles.rotate} width={10} height={10} />
    </div>

    <div
      className={`${styles.btn} ${isLastSlide ? styles.disabled : ''}`}
      onClick={handleClickNext}
      style={{ opacity: isLastSlide ? 0.7 : 1 }}
    >
      <Image src={'/icon_arrow.svg'} alt="icon arrow" width={10} height={10} />
    </div>
  </div>
);


}

export default SwiperNavigationButtons;
