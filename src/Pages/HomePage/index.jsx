import React, { useEffect, useState } from 'react'
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
import Center2 from '../../Component/Center2'
import pr9hover from '../../assets/wheelchair 3.png'
import pr8hover from '../../assets/wheelchair 3 (5).png'
import pr7hover from '../../assets/familygold.png'
import babywalkhover from '../../assets/wheelchair 3 (1).png'
import pr4hover from '../../assets/wheelchair 3 (2).png'
import pr3hover from '../../assets/wheelchair 3 (3).png'
import pr5hover from '../../assets/wheelchair 3 (4).png'
import { useAwarnessMsg, useServicemain } from '../../Store'
import { Link } from 'react-router-dom'

// import Center2 from '../../Component/Center2'

export default function HomePage() {
  const [hoverimgMouse, setHoverimgMouse] = useState(null)
  const { allawarness } = useAwarnessMsg()
  const [filterAwarness, setFilterawarness] = useState([])
  // const originalBabyData = [
  //   { img: pr9, hoverimg: pr9hover, title: 'مشورة الإعاقة والدمج' },
  //   { img: pr8, hoverimg: pr8hover, title: 'الألف يوم الذهبية التالية' },
  //   { img: pr7, hoverimg: pr7hover, title: 'مشورة المباعدة بين الحمل' },
  //   { img: babywalk, hoverimg: babywalkhover, title: 'مشورة الأطفال' },
  //   { img: pr4, hoverimg: pr4hover, title: 'مشورة الحامل' },
  //   { img: pr3, hoverimg: pr3hover, title: 'مشورة ما قبل الزواج' },
  //   { img: pr5, hoverimg: pr5hover, title: 'المشورة الأسرية بالمستشفيات' },
  // ];
  const imageMap = {
    'مشورة الإعاقة والدمج': { img: pr9, hoverimg: pr9hover },
    'الألف يوم الذهبية التالية': { img: pr8, hoverimg: pr8hover },
    'مشورة المباعدة بين الحمل': { img: pr7, hoverimg: pr7hover },
    'مشورة الأطفال': { img: babywalk, hoverimg: babywalkhover },
    'مشورة الحامل': { img: pr4, hoverimg: pr4hover },
    'مشورة ما قبل الزواج': { img: pr3, hoverimg: pr3hover },
    'المشورة الأسرية بالمستشفيات': { img: pr5, hoverimg: pr5hover },
  };

  const [Baby, setBaby] = useState([]);
  useEffect(() => {
    let copyfilterAwarness = ([...allawarness].sort((a, b) => b.orderView - a.orderView)).slice(0,1); 
    setFilterawarness(copyfilterAwarness)
  }, [allawarness])
  const { allservice, setservice } = useServicemain()
  // useEffect(() => {
  //   const mergedData = originalBabyData.map(baby => {
  //     const match = allservice.find(apiItem =>
  //       apiItem.mashoraDesc?.trim().toLowerCase() === baby.title?.trim().toLowerCase()
  //     );
  //     return {
  //       ...baby,
  //       mashoraId: match?.mashoraId || null,
  //       servDesc: match?.servDesc || '',
  //       mashoraFile: match?.mashoraFile || null,
  //       mashoraDesc: match?.mashoraDesc || baby.title, // ده هو اللي هيظهر في الواجهة
  //     };
  //   });

  //   setBaby(mergedData);
  // }, [allservice]);
  useEffect(() => {
    const merged = allservice
      .filter(item => imageMap[item.mashoraDesc])
      .map(item => ({
        ...item,
        img: imageMap[item.mashoraDesc].img,
        hoverimg: imageMap[item.mashoraDesc].hoverimg,
      }));

    setBaby(merged);
  }, [allservice]);
  return (
    <div className='parent flex-grow-1 d-flex ' id={styles.parent}>
      <div className='col-12'>
        <div className='' id={styles.imgparent}>

          <div>

            <SectionContainHeader />
          </div>
          <div className='col-12 text-center py-3 align-items-center justify-content-center' id={styles.sectionBaby}>
            <div className='container col-12 text-center d-flex align-items-center mt-4  justify-content-between  '>
              {
                Baby.map((el, index) => (
                  <Link to={`/Services/${el.mashoraId}`} key={el.mashoraId} className=' text-white nav-link text-center d-flex flex-column align-items-center gap-3 justify-content-center' data-aos="fade-up"
                    data-aos-offset="5" data-aos-delay={`${index * 100}`} id={styles.cardbaby} onMouseEnter={() => setHoverimgMouse(index)} onMouseLeave={() => setHoverimgMouse(null)} >

                    <img src={hoverimgMouse == index ? el.hoverimg : el.img} width={70} height={70} style={{ objectFit: "contain" }} alt="" />
                    <h3 className='text-center'>{el.mashoraDesc}</h3>

                  </Link>

                ))
              }

            </div>
          </div>
          <TopicHour />
          <News />
        </div>
        <About />
        <Interlocuter />
        <Center2 />
        <Lightteam />
        <NumberInitiative2 />
        <div className='col-12 container  d-flex justify-content-between align-items-center'>
          <Video />
          <Infograph />
        </div>
        {/*رسائل توعوية*/}
        <div className='col-12 container d-flex align-items-center' id={styles.msg} >
          <div className='container col-12 d-flex  align-items-center'>
            <div className='col-12 container d-flex flex-column   '>
              <h2>رسائل توعوية</h2>
              {
                filterAwarness.map((el, index) => {
                  return (
                    <div key={el.msgId} className=' col-12 container d-flex flex-column align-items-center '>
                      <p>"{el.msgText}"</p>
                    </div>
                  )
                })
              }

            </div>
          </div>
        </div>


        <ImportentLink />
        {/* <Center2/> */}
      </div>
    </div>
  )
}
