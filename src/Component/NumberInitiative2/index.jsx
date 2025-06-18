import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import femal from '../../assets/family (3).png'
import child from '../../assets/family (2).png'
import family from '../../assets/family (1).png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useinitiativenumber } from '../../Store'
import 'swiper/css/navigation'
import 'swiper/css';
export default function NumberInitiative2() {
    const { allinitivenumber } = useinitiativenumber()
    const [filterednumber, setFilterednumber] = useState([])

    useEffect(() => {
        let copyfilterednumber = [...allinitivenumber]
            .filter((el) => el.onMainPage)
        
        setFilterednumber(copyfilterednumber)
    }, [allinitivenumber])

    return (
        <div className='col-12 d-flex align-items-center' id={styles.number}>
            <div className='container d-flex flex-column justify-content-between gap-4 mt-5 ' id={styles.numbercontainer}>
                <h2>المبادرة في أرقام</h2>

                <Swiper
                    data-aos="fade-up"
                    data-aos-offset="100"
                    data-aos-delay={50}
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Navigation, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    className={styles.mySwiperr + " mySwiper  col-12 d-flex justify-content-between align-items-center gap-5"}
                >
                    {
                        filterednumber?.map((el) => (
                            <SwiperSlide key={el.initId} className=' d-flex flex-column justify-content-center align-items-center'>
                                <h3>{el.indNumber}</h3>
                                <span>{el.indTitle}</span>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}
