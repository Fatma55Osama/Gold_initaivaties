import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDomain, getPathImg } from '../../configLoader';
import { usedetailslight, usePlay } from '../../Store';
import styles from './index.module.css'
import doctor from '../../assets/doctor.png'
import iconvedio from '../../assets/Frame.png'
import { IoMdCloseCircle } from 'react-icons/io';

export default function DetailsLightTeam() {
    const domain = getDomain()
    const { lightTeam, setlightTeam } = usedetailslight()
    const pathimg = getPathImg()
    const { isplaying, setIsplaying } = usePlay()
    const params = useParams()
    let id = params.id;
    const [modalindex, setModalindex] = useState(false)
    function getYoutubeId(url) {
        if (!url || typeof url !== 'string') return null;

        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    return (
        <div className='col-12'>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-center ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-md-9 d-flex flex-column gap-3 pb-3'>
                            <h2>نماذج مضيئة </h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p className={styles.justifyText}>تهتم المبادرة بإعداد كوادر مدربة لتشغيل غرف المشورة بالوحدات والمستشفيات لنشر الوعي بأهمية الألف يوم الأولى من عمر الطفل. وفي هذا الصدد، فقد تم تدريب صفوة مختارة من أطباء الأسنان والصيادلة وأطباء العلاج الطبيعي والمثقفين الصحيين من وحدات الرعاية الصحية الأولية والمستشفيات. ويعرض هذا الجزء المتميزين من هذه الكوادر تكريماً لهم على الجهد المبذول.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-5  d-flex justify-content-between container'>
                <div className='col-5'>
                    <div className={styles.imgCard}>
                        <img src={doctor} alt="" />
                    </div>
                </div>

                <div className=' col-7 d-flex flex-column gap-5'>
                    <h6> الأسم / <span className='text-black'>سيبتيس</span></h6>
                    <h6> الوظيفة / <span className='text-black'>سيبتيس</span></h6>
                    <h6> تاريخ التكريم / <span className='text-black'>سيبتيس</span></h6>
                    <h6> نبذة عن المكرم / <span className='text-black'>سيبتيس</span></h6>

                </div>
            </div>
            <div className='d-flex justify-content-center'>
                {
                    !isplaying && (
                        <div className=' mt-3 mb-5 pb-5 col-8'>
                            <div className=' text-wrap flex-column d-flex justify-content-center align-items-center py-4' id={styles.phdiv} onClick={() => setModalindex(true)}>
                                <div className=' flex-column position-relative' id={styles.imgrayse} >
                                    <img src={doctor} className='object-fit-contain' alt="" />
                                </div>
                                <div className='  position-absolute  col-10 d-flex justify-content-center align-items-center' >

                                    <img src={iconvedio} width={50} className='object-fit-contain' id={styles.iconvedio} alt="" />
                                </div>

                            </div>
                        </div>
                    )

                }
            </div>
            {
                modalindex && (
                    <div className={styles.modalindex}>
                        <div className='d-flex justify-content-end align-items-end my-2 mx-4'>

                            {/* <button className={styles.button2 + ' bg-danger'} ><IoMdClose className={styles.iconclose} /></button> */}
                            <IoMdCloseCircle onClick={() => setModalindex(false)} id={styles.iconarrowclose} />

                        </div>
                        <div className='col-12 d-flex justify-content-center align-items-center  '>
                            <div onClick={(e) => e.stopPropagation()} className={styles.contentModal2 + " d-flex flex-row align-items-center col-8"}>
                                {(
                                    <iframe
                                        src={`https://www.youtube.com/embed/https://www.youtube.com/watch?v=JafM749Qolw&t=4s`}
                                        width='100%'
                                        height="550"
                                        className='rounded-3'
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                        </div>
                       
                    </div>
                )
            }
        </div>
    )
}
