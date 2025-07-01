import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import logo1 from '../../assets/img/log1.png'
import logo2 from '../../assets/img/log2.png'
import logo3 from '../../assets/img/log3.png'
import logo4 from '../../assets/img/log4.png'
import logo5 from '../../assets/img/logo5.png'
import logo6 from '../../assets/img/logo6.png'
import { useImportantlink, usepathimg } from '../../Store';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './index.scss'
export default function ImportentLink() {
  const { importantlink } = useImportantlink()
  const { pathimg } = usepathimg()
  const [filterImportant, setfilterImportant] = useState([])
  useEffect(() => {
    let copyfilterImportant = importantlink.sort((a, b) => (a.linkOrder ?? Infinity) - (b.linkOrder ?? Infinity));
    setfilterImportant(copyfilterImportant)
  }, [importantlink])
  return (

    <div className='col-12 d-flex flex-column flex justify-content-center align-items-center' data-aos="fade-up"
      data-aos-offset="200" data-aos-delay={50} id={styles.parent}>
      <div className=' container col-12 text-end'>
        <h2>روابط هامة</h2>
        <div className=' col-12 '>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              }
            }}
            className={styles.mySwipeerr + " mySwiper"}


          >

            {
              filterImportant.map((el, index) => {
                return (
                  <SwiperSlide key={el.linkId}>

                    <a rel="noopener noreferrer" href={el.linkURL} target='_blank' className={styles.carddiv + " d-flex justify-content-center align-items-center"}>
                      <img src={`${pathimg}/Links/${el.linkImage}`}  alt="" />
                    </a>
                  </SwiperSlide>
                )
              })
            }

          </Swiper>

        </div>

      </div>

    </div>
  )
}
