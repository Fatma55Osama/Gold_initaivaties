import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

import logohealth from '../../assets/log3.png'
import { useNews, usepathimg } from '../../Store'
import { Link } from 'react-router-dom'
import { getPathImg } from '../../configLoader'
export default function TopicHour() {
    const [filteredhour, setFilterhour] = useState([])
    const pathimg  = getPathImg()

    const { allnews } = useNews()
    // console.log("allnews",allnews)
    useEffect(() => {
        const filteredhour = allnews.filter((el) => { return el.onClockTopic }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 1);

        setFilterhour(filteredhour)
        // console.log('filternews',filternews)
    }, [allnews])
   return (
  <div className={styles.TopicHour + " col-12 d-flex flex-column align-items-center"}>
    <div className='  col-10 d-flex justify-content-end container'>

    <h2 className='mt-5 mb-4' >موضوع الساعة</h2>
    </div>

    {filteredhour.map((el, index) => {
      const shortText = el.newsTextOne?.split(/\s+/).slice(0, 80).join(' ') + '...';
      return (
        <div
          key={el.newsId ?? index}
          className="container col-lg-10 d-flex justify-content-between text-end align-items-center flex-column flex-lg-row"
          id={styles.ordersection}
        >
          <div id={styles.bglogo} className="d-flex justify-content-center align-items-center mb-3 mb-lg-0">
            <img src={`${pathimg}/News/${el.smallPhoto}`} alt="" />
          </div>

          <Link
            to={`/mediacorner/detailsnews/${el.newsId}`}
            className="col-12 col-lg-8 nav-link d-flex flex-column gap-3 py-4"
            id={styles.spaceparagraph}
          >
            <p className={styles.justifyText} dangerouslySetInnerHTML={{ __html: shortText }} />
          </Link>
        </div>
      );
    })}
  </div>
);

}
