import React, { useEffect, useState } from 'react'
import './index.scss'
import { useNews } from '../../Store'
export default function News() {
    const [filternews, setFilternews] = useState([])
    const { allnews } = useNews()
    useEffect(() => {
        const filteredNew = allnews.filter((el) => { return el.onMainPage && el.isActive })
        setFilternews(filteredNew)

    }, [allnews])
    return (
        <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
            <div className="overlap-22  d-flex flex-column justify-content-between mt-5">
                <div className="text-wrapper-44">أخر الأخبار</div>
                <div className='all news col-12'>
                    <div className='part1 col-12 d-flex justify-content-between'>
                    <div className=' d-flex align-items-center justify-content-between '>
                            <div className="overlap-23" />
                            <p className="text-wrapper-45">
                            تحت رعاية السيد الدكتور/ ..." إلى "عرضت الدكتورة/ عبلة الألفي تجربة مصر في تحسين الخصائص السكانية بحضور ٦٠ ممثل من الدول العربية
                            </p>

                    </div>
                        <div className=' d-flex align-items-center justify-content-between gap-5'>
                            <div className="overlap-24" />
                             <div className='d-flex flex-column justify-content-between gap-5 text-center'> 
                                {/* <span>07:30 م الإربعاء 14 أغسطس 2024</span>  */}
                                <p className="text-wrapper-47">
                                الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في اغسطس ٢٠٢٣                            </p>
                             </div>
                        </div>
                     
                    </div>
                    <div className='part2 d-flex justify-content-between'>
                        <div className='d-flex align-items-center justify-content-between gap-3 '>
                            <p className="text-wrapper-46">
                                الخطة العاجلة لتحسين الخصائص السكانية في المناطق ذات المؤشرات
                                المنخفضة تعد نموذجا رائدا لضمان الحقوق الإنجابية وتعزيز تكامل جهود
                                الدولة لتحقيق الأهداف الوطنية
                            </p>
                           
                            <div className="overlap-26" />
                        </div>
                        <div className='d-flex align-items-center justify-content-between gap-2'>


                            <p className="text-wrapper-48">
                            إجتماع المجلس الاقليمي للسكان برئاسة محافظ المنوفية
                            </p>
                            <div className="overlap-25" />
                          

                        </div>
                    </div>

                </div>














            </div>
        </div>
    )
}
