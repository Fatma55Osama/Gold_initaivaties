import React, { useState } from 'react'
import './index.scss'
import map from '../../assets/Group 101.png'
import vector from '../../assets/Vector.png'
import { useGovs } from '../../Store';


export default function Center2() {
  const [activePoint, setActivePoint] = useState(null);
  const { allgovs, setgovs } = useGovs()

  const points = [
    {
      id: 26,
      className: "vector1",
      content1: "محافظة الوادي الجديد:",
      content2: "عدد غرف المشورة بالوحدات = 59",
      content3: "عدد غرف المشورة بالمستسفيات = 3",
      content4: "عدد مُقدمي المشورة = 114",
      // massageClass: "msg-pos1",

    },
    {
      id: 21,
      className: "vector2",
      content1: "محافظة الجيزة:",
      content2: "عدد غرف المشورة بالوحدات = 176",
      content3: "عدد غرف المشورة بالمستسفيات = 13",
      content4: "عدد مُقدمي المشورة = 336",
      // massageClass: "msg-pos2",
    },
    {
      id: 27,
      className: "vector3",
      content1: "محافظة مرسى مطروح:",
      content2: "عدد غرف المشورة بالوحدات = 35",
      content3: "عدد غرف المشورة بالمستسفيات = 6",
      content4: "عدد مُقدمي المشورة = 40",
      // massageClass: "msg-pos2",
    },
    {
      id: 23,
      className: "vector4",
      content1: "محافظة أسوان:",
      content2: "عدد غرف المشورة بالوحدات = 106",
      content3: "عدد غرف المشورة بالمستسفيات = 1",
      content4: "عدد مُقدمي المشورة = 205",
      // massageClass: "msg-pos2",
    },
    {
      id: 4,
      className: "vector5",
      content1: "محافظة القاهرة:",
      content2: "عدد غرف المشورة بالوحدات = 119",
      content3: "عدد غرف المشورة بالمستسفيات = 6",
      content4: "عدد مُقدمي المشورة = 309",
      // massageClass: "msg-pos2",
    },
    {
      id: 5,
      className: "vector6",
      content1: "محافظة المنيا:",
      content2: "عدد غرف المشورة بالوحدات = 236",
      content3: "عدد غرف المشورة بالمستسفيات = 3",
      content4: "عدد مُقدمي المشورة = 398",
      // massageClass: "msg-pos2",
    }, {
      id: 17,
      className: "vector7",
      content1: "محافظة بني سويف:",
      content2: "عدد غرف المشورة بالوحدات = 164",
      content3: "عدد غرف المشورة بالمستسفيات = 5",
      content4: "عدد مُقدمي المشورة = 503",
      // massageClass: "msg-pos2",
    }, {
      id: 25,
      className: "vector8",
      content1: "محافظةالبحر الأحمر:",
      content2: "عدد غرف المشورة بالوحدات = 16",
      content3: "عدد غرف المشورة بالمستسفيات = 6",
      content4: "عدد مُقدمي المشورة = 59",
      // massageClass: "msg-pos2",
    }, {
      id: 22,
      className: "vector9",
      content1: "محافظة قنا:",
      content2: "عدد غرف المشورة بالوحدات = 181",
      content3: "عدد غرف المشورة بالمستسفيات = 6",
      content4: "عدد مُقدمي المشورة = 355",
      // massageClass: "msg-pos2",
    }, {
      id: 19,
      className: "vector10",
      content1: "محافظة سوهاج:",
      content2: "عدد غرف المشورة بالوحدات = 236",
      content3: "عدد غرف المشورة بالمستسفيات = 11",
      content4: "عدد مُقدمي المشورة = 573",
      // massageClass: "msg-pos2",
    }, {
      id: 16,
      className: "vector11",
      content1: "محافظة الفيوم:",
      content2: "عدد غرف المشورة بالوحدات = 110",
      content3: "عدد غرف المشورة بالمستسفيات = 5",
      content4: "عدد مُقدمي المشورة = 420",
      // massageClass: "msg-pos2",
    }, {
      id: 9,
      className: "vector12",
      content1: "محافظة الاسكندرية:",
      content2: "عدد غرف المشورة بالوحدات = 112",
      content3: "عدد غرف المشورة بالمستسفيات = 12",
      content4: "عدد مُقدمي المشورة = 727",
      // massageClass: "msg-pos2",
    }, {
      id: 28,
      className: "vector13",
      content1: "محافظة شمال سيناء:",
      content2: "عدد غرف المشورة بالوحدات = 11",
      content3: "عدد غرف المشورة بالمستسفيات = 3",
      content4: "عدد مُقدمي المشورة = 150",
      // massageClass: "msg-pos2",
    }, {
      id: 18,
      className: "vector14",
      content1: "محافظة البحيرة:",
      content2: "عدد غرف المشورة بالوحدات = 155:",
      content3: "عدد غرف المشورة بالمستسفيات = 14",
      content4: "عدد مُقدمي المشورة = 1181",
      // massageClass: "msg-pos2",
    }, {
      id: 20,
      className: "vector15",
      content1: "محافظة  أسيوط:",
      content2: "عدد غرف المشورة بالوحدات = 161",
      content3: "عدد غرف المشورة بالمستسفيات = 11",
      content4: "عدد مُقدمي المشورة = 416",
      // massageClass: "msg-pos2",
    }, {
      id: 8,
      className: "vector16",
      content1: "محافظة دمياط :",
      content2: "عدد غرف المشورة بالوحدات = 72",
      content3: "عدد غرف المشورة بالمستسفيات = 9",
      content4: "عدد مُقدمي المشورة = 196",
      // massageClass: "msg-pos2",
    }, {
      id: 3,
      className: "vector17",
      content1: "محافظة الشرقية:",
      content2: "عدد غرف المشورة بالوحدات = 430",
      content3: "عدد غرف المشورة بالمستسفيات = 13",
      content4: "عدد مُقدمي المشورة = 838",
      // massageClass: "msg-pos2",
    }, {
      id: 14,
      className: "vector18",
      content1: "محافظة المنوفية:",
      content2: "عدد غرف المشورة بالوحدات = 250",
      content3: "عدد غرف المشورة بالمستسفيات = 11",
      content4: "عدد مُقدمي المشورة = 636",
      // massageClass: "msg-pos2",
    }, {
      id: 13,
      className: "vector19",
      content1: "محافظة  الغربية:",
      content2: "عدد غرف المشورة بالوحدات = 181",
      content3: "عدد غرف المشورة بالمستسفيات = 3",
      content4: "عدد مُقدمي المشورة = 650",
      // massageClass: "msg-pos2",
    }, {
      id: 10,
      className: "vector20",
      content1: "محافظة كفر الشيخ:",
      content2: "عدد غرف المشورة بالوحدات = 101",
      content3: "عدد غرف المشورة بالمستسفيات = 7",
      content4: "عدد مُقدمي المشورة = 592",
      // massageClass: "msg-pos2",
    }, {
      id: 11,
      className: "vector21",
      content1: "محافظة  القليوبية:",
      content2: "عدد غرف المشورة بالوحدات = 90",
      content3: "عدد غرف المشورة بالمستسفيات = 3",
      content4: "عدد مُقدمي المشورة = 460",
      // massageClass: "msg-pos2",
    }, {
      id: 7,
      className: "vector22",
      content1: "محافظة الدقهلية:",
      content2: "عدد غرف المشورة بالوحدات = 396",
      content3: "عدد غرف المشورة بالمستسفيات = 19",
      content4: "عدد مُقدمي المشورة = 887",
      // massageClass: "msg-pos2",
    },

  ];

  // الدمج: نربط كل عنصر static ببيانات الـ backend
  const mergedData = points.map((point) => {
    const backendItem = allgovs.find((gov) => gov.govId === point.id);

    if (!backendItem) return point; // لو مش لاقي بيانات، رجّع الاستاتيك بس

    return {
      ...point,
      govName: backendItem.govName,
      roomsNumUnits: backendItem.roomsNumUnits,
      roomsNumHospitals: backendItem.roomsNumHospitals,
      workersNum: backendItem.workersNum,
    };
  });

  return (
    <div>
      <div className="overlap d-flex">


        <div className="overlap-group  container d-flex justify-content-between ">
          <div className='divmap '>

            <img
              className="isolation-mode  position-relative"
              alt=" moIsolationde "
              src={map}
            />
            <div >
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
                mergedData.map((point) =>
                  activePoint === point.id ? (
                    <div
                      key={point.id}
                      className={`col-6 py-2 px-2 rounded position-absolute message-box ${activePoint === point.id ? " show " : ""}`}
                      data-aos="fade-right"
                      data-aos-offset="10"
                      data-aos-delay="200"
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

                      <h5 className='m-0'><span>محافظة {point.govName}:</span></h5>
                      <span>عدد غرف المشورة بالوحدات = {point.roomsNumUnits}</span>
                      <span>عدد غرف المشورة بالمستشفيات = {point.roomsNumHospitals}</span>
                      <span>عدد مُقدمي المشورة = {point.workersNum}</span>
                    </div>
                  ) : null
                )
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
                " تم تغطية ٨٥% من محافظات الجمهورية
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
