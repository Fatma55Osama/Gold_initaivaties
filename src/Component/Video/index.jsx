import React, { useEffect, useState } from 'react'

import './index.scss'
import video from '../../assets/mask-group-2.png'
import regtangel from '../../assets/rectangle-206.svg'
import group1 from '../../assets/group-1.png'
import logovideo from '../../assets/Frame.png'
import { usepathimg, useVedio } from '../../Store'
import { Link } from 'react-router-dom'

export default function Video() {
  const { allvedio, setallvedio } = useVedio()
    const {pathimg} = usepathimg()

  const [filterVedio, setFilterVedio] = useState([])

  useEffect(() => {
    let copyfilterVedio = allvedio.filter((el) => { return el.onMainPage }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 1)
    setFilterVedio(copyfilterVedio)
  }, [allvedio])
  return (
    <div className='parentvideo'>
      {
        filterVedio.map((el, index) => {
          const shortText = el.vedioTitle.split(/\s+/).slice(0, 30).join(' ') + '...';

          return (
            <div key={el.vedioId} className="overlap-28 d-flex flex-column align-items-end" data-aos="fade-up"
              data-aos-offset="100" data-aos-delay={50}>
              <Link to={'/video'} className="text-wrapper-52 me-5">أحدث الفيديوهات</Link>

              <p className="element-6">
                {shortText}

              </p>
              {/* 
    <img
      className="rectangle-19"
      alt="Rectangle"
      src="/img/rectangle-206.svg"
    /> */}

              {/* <div className="rectangle-20" /> */}

              <img
                className="mask-group-2"
                alt=""
                id='imgvedio'
                src={`${pathimg}/Video/${el.vCoverPhoto}`}
              />

              <a
                className="overlap-wrapper"
                href={el.vedioURL}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="overlap-29">
                  <div className="ellipse-8" />

                  <img className="group-15" alt="Group" src={logovideo} />
                </div>
              </a>
            </div>

          )
        })
      }




    </div>
  )
}
