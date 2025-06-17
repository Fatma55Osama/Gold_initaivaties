import React, { useEffect, useState } from 'react'
import './index.scss'
import info from '../../assets/info-1.png'
import info1 from '../../assets/Upfiles/Infograph/Info1-1.png'
import info2 from '../../assets/Upfiles/Infograph/Info1-2.png'
import { useInfograph } from '../../Store'
import { Link } from 'react-router-dom'

export default function Infograph() {
  const { infograph, setInfograph } = useInfograph()
  const [filterinfo, setfilterinfo] = useState([])
  useEffect(() => {
    let copyfilterinfo = [...infograph].filter((el) => { return el.onMainPage && el.orderView != undefined }).sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)).slice(0, 2)
    setfilterinfo(copyfilterinfo)
  }, [infograph])
  return (
    <div className=''>
      <div className="overlap-27 d-flex flex-column justify-content-center align-items-end " 
      >
        <div className="text-wrapper-49">إنفوجراف</div>

        {/* <div className="rectangle-18" /> */}

        <div className='d-flex justify-content-between gap-4' data-aos="fade-up"
              data-aos-offset="10" data-aos-delay={50}>
          {
            filterinfo?.map((el, index) => {
              const shortText = el.infoTitle.split(/\s+/).slice(0, 10).join(' ') + '...';

              return (

                <div key={el.infoId}>
                  <Link to={`/detailsinfograph/${el.infoId}`} className='nav-link' >
                    <img className="info" alt="Info" src={`/src/assets/Upfiles/Infograph/${el.infoPhoto}`} />
                    <p className="text-wrapper-50 mt-3  ">
                      {shortText}
                    </p>
                  </Link>
                </div>
              )
            })
          }

          {/* <div>

            <img className="info" alt="Info" src={info2} />

            <p className="text-wrapper-50 mt-3">
              إطلاق مبادرة &#34;الألف يوم الذهبية&#34;
            </p>
          </div> */}
        </div>

        {/* <div className="group-14">
            <div className="group-8" />

            <div className="group-9" />

            <div className="group-10" />

            <div className="group-11" />

            <div className="group-12" />
          </div> */}

        {/* <div className="group-13 d-flex justify-content-around mt-3 col-12">
          <p className="text-wrapper-50  ">
            قدرات الانسان تحدد في أول 1000 يوم من حياته
          </p>

          <p className="text-wrapper-51">
            إطلاق مبادرة &#34;الألف يوم الذهبية&#34;
          </p>
        </div> */}

      </div>
    </div>
  )
}
