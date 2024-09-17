import classes from './productSwiper.module.scss';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import {forwardRef, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation';
import NavBanner from "@/components/client/shared/Swiper/navBanner/navBanner";
import ProductImage from "@/components/client/shared/Swiper/ProductSwiper/ProductImage";
SwiperCore.use([Navigation]);





const ProductSwiper = ({ productImage }) => {
    const [slides, setSlides] = useState(productImage || [])
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(swiperRef.current?.swiper?.isBeginning || true);
    const [isEnd, setIsEnd] = useState(swiperRef.current?.swiper?.isBeginning || false);
    const handleSlideChange = () => {
        const swiper = swiperRef.current.swiper;
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleSlidePrev = () => {
        const swiper = swiperRef.current.swiper;
        swiper.slidePrev()
    }

    const handleSlideNext = () => {
        const swiper = swiperRef.current.swiper;
        swiper.slideNext()
    }


    useEffect(() => {
        setSlides(productImage)
        const swiper = swiperRef.current.swiper;
        swiper?.slideTo(0)
    }, [productImage])
  
    return (
              slides?.length
                  ?
                  <>
                      <div className={classes.navigation}>
                          <BackButton onClick={handleSlidePrev}/>
                          <NextButton onClick={handleSlideNext} />
                      </div>
                      <Swiper
                          slidesPerView={1}
                          speed={400}
                          style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              // flexShrink: 0,
                          }}
                          ref={swiperRef}
                          onSlideChange={handleSlideChange}
                          onSwiper={(swiper) => console.log(swiper)}
                      >
                          {slides?.map(image =>
                              <SwiperSlide>
                                <ProductImage url={image?.image?.url} alt={'product image'} />
                              </SwiperSlide>
                          )}
                      </Swiper>
                  </>
                  : null
    )
}

const BackButton = forwardRef(({ onClick }, ref) => {
  return (
    <div ref={ref} onClick={onClick}>
      <HiChevronLeft color={'#000'} fill={'#000'} />
    </div>
  )
})

const NextButton = forwardRef(({ onClick }, ref) => {
  return (
    <div  ref={ref} onClick={onClick}>
      <HiChevronRight fill={"#000"} />
    </div>
  )
})

export default ProductSwiper;
