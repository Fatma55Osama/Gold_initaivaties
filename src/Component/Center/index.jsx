import React, { useState } from 'react'
import './index.scss'
import map from '../../assets/Group 101.png'
import vector from '../../assets/Vector.png'
export default function Center() {
  const [activePoint, setActivePoint] = useState(null);

  const points = [
    {
      id: 1,
      className: "vector1",
          content: "محافظة القاهرة:"
          // massageClass: "msg-pos1",

    },
    {
      id: 2,
      className: "vector2",
      content: "محافظة الجيزة: 220 طفل المشورة:30",
      // massageClass: "msg-pos2",
    },
    // أضف المزيد من النقاط حسب الحاجة
  ];
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
              {
                points.map((el, index) => {
                  return (
                    <img
                      key={el.id}
                      src={vector}
                      width={10}
                      onClick={() =>
                        setActivePoint(activePoint === el.id ? null : el.id)
                      }
                      className={`position-absolute ${el.className}`}
                      alt=""
                    />
                  )
                })
              }
              {/* <img src={vector} width={10}  onClick={() => handleClick('محافظة القاهرة: 400 طفل المشورة:65')} className="position-absolute vector1" alt="" />
              <img src={vector} width={10} onClick={() => handleClick('محافظة الجيزة: 300 طفل  المشورة:55')} className="position-absolute vector2" alt="" /> */}
              {
                points.map((point) => activePoint === point.id ? (<div
                  key={point.id}
                  className={`col-4 bg-success text-end py-2 px-2 rounded position-absolute d-flex flex-column justify-content-end align-items-end message-box ${activePoint === point.id?"show":""}`}
                  data-aos="fade-right" data-aos-offset="10" data-aos-delay='200'
                >
                  <button
                    onClick={() => setActivePoint(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      top: "0",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                  <span>{point.content}</span>
                </div>
                ) : null)
              }

              {/* <div className={`col-3 mt-0 ms-5 bg-success h-25 position-absolute ${openalert == false ? " d-none" : "d-flex"}`}>
            {content}
              </div> */}
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
