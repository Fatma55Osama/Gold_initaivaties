import React from 'react'
import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import logo1 from '../../assets/img/log1.png'
import logo2 from '../../assets/img/log2.png'
import logo3 from '../../assets/img/log3.png'
import logo4 from '../../assets/img/log4.png'
import logo5 from '../../assets/img/logo5.png'
import logo6 from '../../assets/img/logo6.png'

export default function ImportentLink() {
  return (

    <div className='col-12 d-flex flex-column flex justify-content-center align-items-center' id={styles.parent}>
      <div className=' container col-12 text-end'>
      <h2>روابط هامة</h2>
      <div className=' col-12 '>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className="mySwiper"


      >


        <SwiperSlide >
          <div className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
            <img src={logo1} alt="" />
          </div>
          
        </SwiperSlide>
        
        <SwiperSlide >
          <div className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
            <img src={logo2} alt="" />
          </div>
          
        </SwiperSlide>

        <SwiperSlide >
          <div className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
            <img src={logo3} alt="" />
          </div>
          
        </SwiperSlide>

        <SwiperSlide >
          <div className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
            <img src={logo4} alt="" />
          </div>
          
        </SwiperSlide>
        
        <SwiperSlide >
          <div className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
            <img src={logo5} alt="" />
          </div>
          
        </SwiperSlide>
        <SwiperSlide >
          <div className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
            <img src={logo6} alt="" />
          </div>
          
        </SwiperSlide>
      </Swiper>

      </div>
     
      </div>
    
    </div>
  )
}
