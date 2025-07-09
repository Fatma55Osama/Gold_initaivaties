import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import pr9hover from '../../assets/wheelchair 3.png'
import pr8hover from '../../assets/wheelchair 3 (5).png'
import pr7hover from '../../assets/familygold.png'
import babywalkhover from '../../assets/wheelchair 3 (1).png'
import pr4hover from '../../assets/wheelchair 3 (2).png'
import pr3hover from '../../assets/wheelchair 3 (3).png'
import pr5hover from '../../assets/wheelchair 3 (4).png'
import babywalk from '../../assets/wheelchair 2 (1).png'
import pr4 from '../../assets/wheelchair 2 (2).png'
import pr3 from '../../assets/wheelchair 2 (3).png'
import pr5 from '../../assets/wheelchair 2 (4).png'
import pr7 from '../../assets/wheelchair6.png'
import pr8 from '../../assets/wheelchair 2.png'
import pr9 from '../../assets/wheelchair 2 (5).png'
import { usepathimg, useServicemain } from '../../Store'
import { Link, useLocation } from 'react-router-dom'
export default function ServiceComponent() {

    const location = useLocation()
    const [hoverimgMouse, setHoverimgMouse] = useState(null)
    const { allservice, setservice } = useServicemain()

    const imageMap = {
        'مشورة الإعاقة والدمج': { img: pr9, hoverimg: pr9hover },
        'الألف يوم التالية': { img: pr8, hoverimg: pr8hover },
        'مشورة المباعدة بين الحمل': { img: pr7, hoverimg: pr7hover },
        'مشورة الأطفال': { img: babywalk, hoverimg: babywalkhover },
        'مشورة الحامل': { img: pr4, hoverimg: pr4hover },
        'مشورة ما قبل الزواج': { img: pr3, hoverimg: pr3hover },
        'المشورة الأسرية بالمستشفيات': { img: pr5, hoverimg: pr5hover },
    };

    const [Baby, setBaby] = useState([]);
    useEffect(() => {
        const merged = allservice
            .filter(item => imageMap[item.mashoraDesc])
            .map(item => ({
                ...item,
                img: imageMap[item.mashoraDesc].img,
                hoverimg: imageMap[item.mashoraDesc].hoverimg,
            }));

        setBaby(merged);
    }, [allservice]);
    return (

        <div className='col-12' id={styles.parentalldiv}>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>خدمات المبادرة</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p className={styles.justifyText}>لأن كل أم وكل طفل يستحق حياة صحية سعيدة، تُقدم مبادرة الألف يوم الذهبية لتنمية الأسرة المصرية مجموعة من الخدمات المتنوعة لخدمة الأسرة بوجه عام، والأم والطفل بشكل خاص. كما تُوفر المبادرة الدعم النفسي والصحي للأم والطفل مجانًا، من خلال فحوصات طبية ونصائح غذائية وصحية.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 text-center py-3 align-items-center justify-content-center' id={styles.sectionBaby}>
                <div className='container col-12 text-center d-flex align-items-center mt-4  justify-content-between gap-4 ' dir="rtl" id={styles.sectionBabywrap}>
                     {
                        Baby.map((el, index) => {
                            const isCurrent = location.pathname === `/Services/${el.mashoraId}`;
                            const isHovering = hoverimgMouse === index;
                            return (
                                <Link to={`/Services/${el.mashoraId}`} key={el.mashoraId} className=' text-white nav-link text-center d-flex flex-column align-items-center gap-3 justify-content-center' data-aos="fade-up"
                                    data-aos-offset="5" data-aos-delay={`${index * 100}`} id={styles.cardbaby} onMouseEnter={() => setHoverimgMouse(index)} onMouseLeave={() => setHoverimgMouse(null)} >

                                    <img src={isHovering || isCurrent ? el.hoverimg : el.img} width={70} height={70} style={{ objectFit: "contain" }} alt="" />
                                    <h3 className={`${isCurrent ? styles.active : null} text-center`} >{el.mashoraDesc}</h3>

                                </Link>
                            )


                        })
                    }

                </div>
            </div>
        </div>
    )
}
