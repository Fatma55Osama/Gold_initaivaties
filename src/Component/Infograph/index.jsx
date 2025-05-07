import React from 'react'
import './index.scss'
import info from '../../assets/info-1.png'
export default function Infograph() {
  return (
    <div className=''>
          <div className="overlap-27 d-flex flex-column justify-content-center align-items-end ">
          <div className="text-wrapper-49">إنفوجراف</div>

          {/* <div className="rectangle-18" /> */}

          <img className="info" alt="Info" src={info} />

          {/* <div className="group-14">
            <div className="group-8" />

            <div className="group-9" />

            <div className="group-10" />

            <div className="group-11" />

            <div className="group-12" />
          </div> */}
          
          <div className="group-13 d-flex justify-content-around mt-3 col-12">
            <p className="text-wrapper-50  ">
              قدرات الانسان تحدد في أول 1000 يوم من حياته
            </p>

            <p className="text-wrapper-51">
              إطلاق مبادرة &#34;الألف يوم الذهبية&#34;
            </p>
          </div>

        </div>
    </div>
  )
}
