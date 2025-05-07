import React from 'react'
import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import team1 from '../../assets/nusring (1).png'
import team2 from '../../assets/doctor.png'
import team3 from '../../assets/staff.png'

export default function Lightteam() {
    return (
        <div className={styles.lighteam}>
            <h3 className={styles.textWareber + " text-center"}>نماذج مضيئة</h3>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                FreeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className={styles.mySwiper + " mySwiper  container d-flex justify-content-between"}
            >
                
                <SwiperSlide className='  d-flex justify-content-center  align-items-center bg-white gap-2' id={styles.cardslid} >
                    <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                        <div className={styles.imgCard}>
                            <img src={team1} alt="" />
                        </div>
                        <span className={styles.Cardtitle}>د. كوثر محمود
                            نقيب التمريض</span>
                        <div className={styles.textCard + " text-end col-7 px-4 py-3"}>
                            <p>المحافظة: القاهرة</p>
                            <p>الوظيفة: نقيب التمريض</p>
                            <p>تاريخ التكريم: 2025/11/06</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='  d-flex justify-content-center  align-items-center bg-white'  id={styles.cardslid}>
                    <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                        <div className={styles.imgCard}>
                            <img src={team2} alt="" />
                        </div>
                        <span className={styles.Cardtitle}>د.  منى ابو الغار
                        أخصائي نساء وتوليد
                             </span>
                        <div className={styles.textCard + " text-end col-7 px-4 py-3"}>
                            <p>المحافظة: القاهرة</p>
                            <p>الوظيفة: دكتور نساء وتوليد </p>
                            <p>تاريخ التكريم: 2025/11/06</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='  d-flex justify-content-center  align-items-center bg-white'  id={styles.cardslid}>
                    <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                        <div className={styles.imgCard}>
                            <img src={team3} alt="" />
                        </div>
                        <span className={styles.Cardtitle}>د. علاء الغنام
                        اخصائي نساء وتوليد
                           </span>
                        <div className={styles.textCard + " text-end col-7 px-4 py-3 "}>
                            <p>المحافظة: القاهرة</p>
                            <p>الوظيفة: دكتور نساء وتوليد </p>
                            <p>تاريخ التكريم: 2025/11/06</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
