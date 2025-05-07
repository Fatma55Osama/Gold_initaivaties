import React from 'react'
import './index.scss'
import map from '../../assets/Group 101.png'
import vector from '../../assets/Vector.png'
export default function Center() {
  return (
    <div className='container'>
      <div className="overlap d-flex">


        <div className="overlap-group flex-grow-1   container d-flex justify-content-between ">
          <div className='divmap '>

            <img
              className="isolation-mode position-relative"
              alt=" moIsolationde "
              src={map}
            />
            <div>
              <img src={vector} width={10} className="position-absolute vector1"alt="" />
              <img src={vector} width={10} className="position-absolute vector2"alt="" />

            </div>
          </div>

          <div className='d-flex flex-column justify-content-start gap-3 mt-5'>
            <h2 className='text-wrapper-53'>مراكز المبادرة</h2>
            {/* <p className="p">
              محافظات المرحلة الأولي (من 23 أغسطس 2023-31 مارس 2024):
            </p> */}
            <div className='col-12 d-flex justify-content-end  '>
              <p className="p ">
                " تم وتغطية ٨٥% من محافظات الجمهورية
                وجاري الاستكمال"
              </p>
            </div>

            {/* <div className='d-flex justify-content-end divcenter'>
              <div  className='text-wrapper-centre d-flex flex-column text-end '>
                <span>محافظة قنا</span>
                <span>محافظة البحيرة</span>
                <span>محافظة الشرقية</span>
                <span>محافظة البحر الأحمر</span>
              </div>
              <div className='text-wrapper-centre d-flex flex-column text-end '>
                <span>محافظة الإسكندرية</span>
                <span>محافظة مرسي مطروح</span>
                <span>محافظة سوهاج</span>
                <span>محافظة أسيوط</span>
              </div>
            </div> */}
          </div>


        </div>
        <div className='egyptlogo'>

        </div>

      </div>
    </div>
  )
}
