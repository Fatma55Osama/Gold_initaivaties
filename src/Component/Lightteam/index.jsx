import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import team1 from '../../assets/nusring (1).png'
import team2 from '../../assets/doctor.png'
import team3 from '../../assets/staff.png'
import { useallActiveEmployees } from '../../Store';

export default function Lightteam() {
    const { Employees } = useallActiveEmployees()
    const [filteremployess, setFilteremployess] = useState([])
    useEffect(() => {
        let copyfilteremploy = Employees.filter((el) => { return el.onMainPage }).sort((a, b) => new Date(b.honorDate) - new Date(a.honorDate))
        setFilteremployess(copyfilteremploy)

    }, [Employees])
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
                {
                    filteremployess.slice(0, 3).map((el, index) => {
                        const formattedDate = el.honorDate?.split("T")[0].replace(/-/g, "/");
                        return (
                            <SwiperSlide key={el.govId} className='d-flex justify-content-center align-items-center bg-white gap-2' id={styles.cardslid} data-aos="fade-up"
                                data-aos-offset="30" data-aos-delay={100}>
                                <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                                    <div className={styles.imgCard}>
                                        <img src={`/src/assets/Upfiles/Photo/${el.empImage}`} alt="" />
                                    </div>
                                    <span className={styles.Cardtitle}>
                                        {el.empName}
                                    </span>
                                    <div className={styles.textCard + " text-end col-7 px-4 py-3"}>
                                        <p>المحافظة: {el.govName}</p>
                                        <p>الوظيفة: {el.empJob}</p>
                                        <p>تاريخ التكريم: {formattedDate}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })
                }



                {/* <SwiperSlide data-aos="fade-up"
                    data-aos-offset="40" data-aos-delay={120} className='  d-flex justify-content-center  align-items-center bg-white' id={styles.cardslid}>
                    <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                        <div className={styles.imgCard}>
                            <img src={team2} alt="" />
                        </div>
                        <span className={styles.Cardtitle}>د.  منى سعيد

                        </span>
                        <div className={styles.textCard + " text-end col-7 px-4 py-3"}>
                            <p>المحافظة: البحيرة</p>
                            <p>الوظيفة: أخصائي أطفال </p>
                            <p>تاريخ التكريم: 2025/06/06</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide data-aos="fade-up"
                    data-aos-offset="50" data-aos-delay={130} className='  d-flex justify-content-center  align-items-center bg-white' id={styles.cardslid}>
                    <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                        <div className={styles.imgCard}>
                            <img src={team3} alt="" />
                        </div>
                        <span className={styles.Cardtitle}>د. محمود السيد

                        </span>
                        <div className={styles.textCard + " text-end col-7 px-4 py-3 "}>
                            <p>المحافظة: الاسكندرية</p>
                            <p>الوظيفة: أخصائي نساء وتوليد </p>
                            <p>تاريخ التكريم: 2025/06/06</p>
                        </div>
                    </div>
                </SwiperSlide> */}
            </Swiper>
        </div>
    )
}
