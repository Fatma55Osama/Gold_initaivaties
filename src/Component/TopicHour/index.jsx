import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

import logohealth from '../../assets/log3.png'
import { useNews, usepathimg } from '../../Store'
import { Link } from 'react-router-dom'
export default function TopicHour() {
    const [filteredhour, setFilterhour] = useState([])
    const { pathimg } = usepathimg()

    const { allnews } = useNews()
    // console.log("allnews",allnews)
    useEffect(() => {
        const filteredhour = allnews.filter((el) => { return el.onClockTopic }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 1);

        setFilterhour(filteredhour)
        // console.log('filternews',filternews)
    }, [allnews])
    return (
        <div className={styles.TopicHour + " col-12 d-flex"}>
            {filteredhour.map((el, index) => {
                const shortText = el.newsText.split(/\s+/).slice(0, 80).join(' ') + '...';
                return (
                    <div
                        key={el.newsId ?? index}  // لازم تكون عندك key فريدة لكل عنصر
                        className="container col-9 d-flex justify-content-between text-end align-items-center"
                    >
                        <div id={styles.bglogo} className="d-flex justify-content-center align-items-center">
                            <img src={`${pathimg}/News/${el.smallPhoto}`} alt="" />
                        </div>
                        <Link to={`/mediacorner/detailsnews/${el.newsId}`} className="col-8 nav-link d-flex flex-column gap-3 py-5">
                            <h2>موضوع الساعة</h2>
                            <p>{shortText}</p>
                        </Link>
                    </div>
                )

            })}
        </div>

    )
}
