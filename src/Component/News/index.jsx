import React, { useEffect, useState } from 'react'
import './index.scss'
import { useNews, usepathimg } from '../../Store'

import { Link } from 'react-router-dom'
import { getPathImg } from '../../configLoader'
export default function News() {
    const [filternews, setFilternews] = useState([])
    const { allnews } = useNews()
    const  pathimg  = getPathImg()
    // console.log("allnews",allnews)
    useEffect(() => {
        const filteredNew = allnews?.filter((el) => { return el.onMainPage }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 4);

        setFilternews(filteredNew)
        // console.log('filternews',filternews)
    }, [allnews])
    return (
        <div className='col-12 d-flex flex-column justify-content-center align-items-center' id='newesdection'>
            <div className="overlap-22  d-flex flex-column justify-content-between mt-5 col-md-12">
                <div className="text-wrapper-44  mb-md-5 mb-lg-0">أخر الأخبار</div>
                <div className='all news mt-5 mt-md-0 col-12 d-flex justify-content-center flex-column align-items-center'>

                    <div className='part1 col-12 col-md-12 flex-column flex-md-row-reverse col-lg-9 d-flex justify-content-between '>
                        {
                            filternews.slice(0, 2).map((el, index) => {
                                const formattedDate = new Date(el.publishDate).toLocaleDateString('ar-EG', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                });
                                const shortText = el.title.split(/\s+/).slice(0, 18).join(' ');

                                return (
                                    <div key={el.newsId} className=' d-flex align-items-center newsId ' data-aos="fade-up"
                                        data-aos-offset="5" data-aos-delay={500} >
                                        {/* <div className="overlap-224" /> */}
                                        <img src={`${pathimg}/News/${el.smallPhoto}`} width={258} height={264} alt="" />
                                        <div className=' col-lg-6 d-flex flex-column justify-content-between px-lg-4  gap-3 text-center textwidth100 '>
                                            <span className='date '>{formattedDate}</span>
                                            <Link to={`/mediacorner/detailsnews/${el.newsId}`} className="text-wrapper-47 nav-link" dangerouslySetInnerHTML={{ __html: shortText }} />


                                        </div>
                                    </div>)

                            })
                        }


                    </div>
                    <div className='part2 col-12 col-md-12 flex-column flex-md-row-reverse col-lg-9 d-flex justify-content-between '>
                        {
                            filternews.slice(2, 4).map((el, index) => {
                                const formattedDate = new Date(el.publishDate).toLocaleDateString('ar-EG', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                });
                                const shortText = el.title.split(/\s+/).slice(0, 18).join(' ');

                                return (
                                    <div key={el.newsId} className='d-flex align-items-center  columnreverse ' data-aos="fade-up"
                                        data-aos-offset="5" data-aos-delay={600}>
                                        <div className='d-flex flex-column justify-content-between gap-3 px-lg-2 text-center textwidth100' id='textitems'>
                                            <span className='date'>{formattedDate}</span>

                                            <Link to={`/mediacorner/detailsnews/${el.newsId}`} className="text-wrapper-46 nav-link" dangerouslySetInnerHTML={{ __html: shortText }} />

                                        </div>


                                        <img src={`${pathimg}/News/${el.smallPhoto}`} width={258} height={264} alt="" />
                                    </div>
                                )

                            })
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}
