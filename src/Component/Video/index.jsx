import React from 'react'
import './index.scss'
import video from '../../assets/mask-group-2.png'
import regtangel from '../../assets/rectangle-206.svg'
import group1 from '../../assets/group-1.png'
import logovideo from '../../assets/Frame.png'
export default function Video() {
  return (
    <div className='parentvideo'> <div className="overlap-28 d-flex flex-column align-items-end">
    <div className="text-wrapper-52 me-5">أحدث الفيديوهات</div>

    <p className="element-6">
      في ضوء حرص الدولة المصرية على تحسين الخصائص السكانية كما ونوعا
      وتحقيق التنمية وتحسين معدلات الإنجاب وصحة الأم في أثناء الحمل وبعد
      الولادة، جاءت مبادرة &#34;الألف يوم الذهبية لتنمية الأسرة
      المصرية&#34; لتكون خطوة محورية نحو بناء أجيال أكثر صحة ورفاهية،
      والتي أطلقها السيد رئيس الجمهورية تحت مظلة المبادرة الرئاسية
      &#34;100 مليون صحة&#34; في أغسطس 2023،.............
    </p>
{/* 
    <img
      className="rectangle-19"
      alt="Rectangle"
      src="/img/rectangle-206.svg"
    /> */}

    <div className="rectangle-20" />

    <img
      className="mask-group-2"
      alt="Mask group"
      src={video}
    />

    <a
      className="overlap-wrapper"
      href="https://www.facebook.com/watch/?v=1174100127199748&amp;rdid=t35rQY6HJPFXdB7Z"
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="overlap-29">
        <div className="ellipse-8" />

        <img className="group-15" alt="Group" src={logovideo}/>
      </div>
    </a>
  </div></div>
  )
}
