import React, { useEffect, useState } from 'react'
import './index.scss'
import { useNews, usepathimg } from '../../Store'
import new1 from '../../assets/president.png'
import new2 from '../../assets/image-19.png'
import new3 from '../../assets/plan.jpg'
import new4 from '../../assets/meet.jpg'
import { Link } from 'react-router-dom'
export default function News() {
    const [filternews, setFilternews] = useState([])
    const { allnews } = useNews()
    const {pathimg} = usepathimg()
    // console.log("allnews",allnews)
    useEffect(() => {
        const filteredNew = allnews.filter((el) => { return el.onMainPage }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 4);

        setFilternews(filteredNew)
        // console.log('filternews',filternews)
    }, [allnews])
    return (
        <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
            <div className="overlap-22  d-flex flex-column justify-content-between mt-5">
                <div className="text-wrapper-44">أخر الأخبار</div>
                <div className='all news col-12'>

                    <div className='part1 col-12 d-flex justify-content-between '>
                        {
                            filternews.slice(0, 2).map((el, index) => {
                                const formattedDate = new Date(el.publishDate).toLocaleDateString('ar-EG', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                });
                                return (
                                    <div key={el.newsId} className=' d-flex align-items-center newsId 'data-aos="fade-up"
                                        data-aos-offset="5" data-aos-delay={500} > 
                                        {/* <div className="overlap-224" /> */}
                                        <img src={`${pathimg}/News/${el.smallPhoto}`} width={258} height={264} alt="" />
                                        <div className=' col-5 d-flex flex-column justify-content-between px-4 gap-3 text-center '>
                                            <span className='date '>{formattedDate}</span>
                                            <Link to={`/detailsnews/${el.newsId}`} className="text-wrapper-47 nav-link">
                                                {el.title}
                                            </Link>
                                        </div>
                                    </div>)

                            })
                        }
                        {/* <div className=' d-flex align-items-center justify-content-between gap-5' data-aos="fade-up"
                            data-aos-offset="5" data-aos-delay={500}>
                            <img src={new2} width={258} height={264} alt="" />
                            <div className=' col-5 d-flex flex-column justify-content-between gap-3 text-center'>
                                <span className='date'>07:30 م الإربعاء 14 أغسطس 2024</span>
                                <p className="text-wrapper-47">
                                    الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في اغسطس ٢٠٢٣                            </p>
                            </div>
                        </div>
                        <div className=' d-flex align-items-center justify-content-between gap-5' data-aos="fade-up"
                            data-aos-offset="5" data-aos-delay={500}>
                            <img src={new1} width={258} height={264} alt="" />
                            <div className='d-flex flex-column justify-content-between gap-3 text-center'>
                                <span className='date'>07:30 م الإربعاء 14 أغسطس 2024</span>
                                <p className="text-wrapper-47">
                                    الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في اغسطس ٢٠٢٣                            </p>
                            </div>
                        </div> */}

                    </div>
                    <div className='part2 d-flex justify-content-between'>
                        {
                            filternews.slice(2, 4).map((el, index) => {
                                const formattedDate = new Date(el.publishDate).toLocaleDateString('ar-EG', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                });
                                return (
                                    <div className='d-flex align-items-center  ' data-aos="fade-up"
                                        data-aos-offset="5" data-aos-delay={600}>
                                        <div className='d-flex flex-column justify-content-between gap-3 px-2 text-center'>
                                            <span className='date'>{formattedDate}</span>

                                            <Link to={`/detailsnews/${el.newsId}`} className="text-wrapper-46 nav-link">
                                                {el.title}
                                            </Link>
                                        </div>


                                        <img src={`${pathimg}/News/${el.smallPhoto}`} width={258} height={264} alt="" />
                                    </div>
                                )

                            })
                        }
                        {/* <div className='d-flex align-items-center justify-content-between gap-3 ' data-aos="fade-up"
                            data-aos-offset="5" data-aos-delay={600}>
                            <div className='d-flex flex-column justify-content-between gap-3 text-center'>
                                <span className='date'>07:30 م الإربعاء 14 أغسطس 2024</span>

                                <p className="text-wrapper-46">
                                    الخطة العاجلة لتحسين الخصائص السكانية في المناطق ذات المؤشرات
                                    المنخفضة تعد نموذجاً رائداً لضمان الحقوق الإنجابية وتعزيز تكامل جهود
                                    الدولة
                                </p>
                            </div>


                            <img src={new3} width={258} height={264} alt="" />
                        </div>

                        <div className='d-flex align-items-center justify-content-between gap-3 ' data-aos="fade-up"
                            data-aos-offset="5" data-aos-delay={600}>
                            <div className='d-flex flex-column justify-content-between gap-3 text-center'>
                                <span className='date'>07:30 م الإربعاء 14 أغسطس 2024</span>

                                <p className="text-wrapper-46">
                                    إجتماع المجلس الاقليمي للسكان برئاسة محافظ المنوفية وبحضور الدكتورة/ عبلة الألفي

                                </p>
                            </div>


                            <img src={new4} width={258} height={264} alt="" />
                        </div> */}


                        {/* <div className='d-flex align-items-center justify-content-between gap-2' data-aos="fade-up"
                            data-aos-offset="5" data-aos-delay={700}>


                            <p className="text-wrapper-48">
                                إجتماع المجلس الاقليمي للسكان برئاسة محافظ المنوفية وبحضور الدكتورة/ عبلة الألفي
                            </p>
                            <div className="overlap-25" />


                        </div> */}
                    </div>

                </div>














            </div>
        </div>
    )
}
