import React, { useState } from 'react'
import styles from './index.module.css'
import SildeSwiper from '../../Component/SlideSwip'
import babywalk from '../../assets/wheelchair 2 (1).png'
import pr4 from '../../assets/wheelchair 2 (2).png'
import pr3 from '../../assets/wheelchair 2 (3).png'
import pr5 from '../../assets/wheelchair 2 (4).png'
import pr7 from '../../assets/wheelchair6.png'
import pr8 from '../../assets/wheelchair 2.png'
import pr9 from '../../assets/wheelchair 2 (5).png'
import News from '../../Component/News'
import About from '../../Component/About'
import Interlocuter from '../../Component/Interlocutor'
import Center from '../../Component/Center'
import Lightteam from '../../Component/Lightteam'
import NumberInitiative from '../../Component/NumberInitiative'
import NumberInitiative2 from '../../Component/NumberInitiative2'
import Video from '../../Component/Video'
import Infograph from '../../Component/Infograph'
import ImportentLink from '../../Component/ImportentLink'
import TopicHour from '../../Component/TopicHour'
import SectionContainHeader from '../../Component/SectionContainHeader'
import Header2 from '../../Component/Header2'
// import Center2 from '../../Component/Center2'

export default function HomePage() {
  const [Baby, setBaby] = useState([{ img: pr9, title: 'مشورة الإعاقة والدمج' },  { img: pr8, title: 'الألف يوم الذهبية التالية' },  { img: pr7, title: 'مشورة المباعدة بين الحمل' },  { img: babywalk, title: 'مشورة الأطفال' },  { img: pr4, title: 'مشورة الحامل' },{ img: pr3, title: 'مشورة ما قبل الزواج' },

  { img: pr5, title: 'المشورة الأسرية بالمستشفيات' },])
  return (
    <div className='parent  flex-grow-1 d-flex' id={styles.parent}>
      <div className='col-12'>
        <div className='' id={styles.imgparent}>

        <div>

        <SectionContainHeader/>
      </div>
      <div className='col-12  py-3' id={styles.sectionBaby}>
        <div className='container col-12 d-flex align-items-center mt-4  justify-content-between  '>
          {
            Baby.map((el, index) => (
              <div key={index} className=' text-white text-center d-flex flex-column align-items-center gap-3 justify-content-center' id={styles.cardbaby} >

                <img src={el.img} width={70} height={70} style={{ objectFit: "contain" }} alt="" />
                <h3>{el.title}</h3>
            
              </div>

            ))
          }


        </div>
      </div>
      <TopicHour/>
      <News/>
        </div>
        <About/>
      <Interlocuter/>
        <Center/>
        <Lightteam/>
        <NumberInitiative2/>
        <div className='col-12 container  d-flex justify-content-between align-items-center'>
        <Video/>
        <Infograph/>
        </div>
        <ImportentLink/>
        {/* <Center2/> */}
      </div>
    </div>
  )
}
