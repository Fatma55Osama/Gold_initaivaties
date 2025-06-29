import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiMenu2Fill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useServicemain } from '../../Store';
import babywalk from '../../assets/wheelchair 2 (1).png'
import pr4 from '../../assets/wheelchair 2 (2).png'
import pr3 from '../../assets/wheelchair 2 (3).png'
import pr5 from '../../assets/wheelchair 2 (4).png'
import pr7 from '../../assets/wheelchair6.png'
import pr8 from '../../assets/wheelchair 2.png'
import pr9 from '../../assets/wheelchair 2 (5).png'
import pr9hover from '../../assets/wheelchair 3.png'
import pr8hover from '../../assets/wheelchair 3 (5).png'
import pr7hover from '../../assets/familygold.png'
import babywalkhover from '../../assets/wheelchair 3 (1).png'
import pr4hover from '../../assets/wheelchair 3 (2).png'
import pr3hover from '../../assets/wheelchair 3 (3).png'
import pr5hover from '../../assets/wheelchair 3 (4).png'
export default function Footer() {
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

  const { allservice, setservice } = useServicemain()

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
    <div className={styles.parentfooter + " col-12"}>
      <div className='container d-flex flex-column justify-content-end text-end py-5 '>

        <div className='d-flex justify-content-between  gap-3 text-end'>

          <ul className='d-flex flex-column align-items-end gap-3'>
            <Link id={styles.li} className='d-flex align-items-center nav-link' to={'/contactus'}>أرقام التواصل</Link>
            {/* <li id={styles.li} className='d-flex align-items-center'>إسأل/ إستشر</li>
            <li id={styles.li} className='d-flex align-items-center'>أسئلة شائعة</li> */}
            <Link id={styles.li} className='d-flex align-items-center nav-link'>رأيك يهمنا</Link>
          </ul>
          <ul className='d-flex flex-column align-items-end gap-3'>
            <Link id={styles.li} className='d-flex align-items-center nav-link' to={'/mediacorner'}>الأخبار</Link>
            <Link id={styles.li} className='d-flex align-items-center nav-link' to={'/photo'}>ألبومات الصور</Link>
            <Link id={styles.li} className='d-flex align-items-center nav-link' to={'/video'}>مكتبة الفيديوهات</Link>
            <Link id={styles.li} className='d-flex align-items-center nav-link' to={'/infograph'}>قائمة الإنفوجراف</Link>
            <Link id={styles.li} className='d-flex align-items-center nav-link' to={'/messages'}>الرسائل التوعوية</Link>
          </ul>
          {/* <ul className='d-flex flex-column align-items-end gap-3'>
            <li id={styles.li} className='d-flex align-items-center'>خط سير المستفيدين</li>
            <li id={styles.li} className='d-flex align-items-center'>المشورة الأسرية</li>
            <li id={styles.li} className='d-flex align-items-center'> مشورة الحامل</li>
            <li id={styles.li} className='d-flex align-items-center'>مشورة ماقبل الزواج</li>
            <li id={styles.li} className='d-flex align-items-center'> مشورة الأطفال</li>
          </ul> */}


          <ul className='d-flex flex-column align-items-end gap-3'>
            {
              Baby.map((el) => (
                <Link key={el.mashoraId} id={styles.li} to={`/Services/${el.mashoraId}`} className='d-flex align-items-center nav-link' > {el.mashoraDesc} </Link>

              ))
            }

            <Link to={'/lightteam'} id={styles.li} className='d-flex align-items-center nav-link'>نماذج مضيئة</Link>
          </ul>
          <ul className='d-flex flex-column align-items-end gap-3'>
            <Link id={styles.li} to="/about" state={{ targetSection: 'section5' }} className='d-flex align-items-center nav-link'>المبادرة في سطور</Link>
            <Link id={styles.li} to="/about" state={{ targetSection: 'section4' }} className='d-flex align-items-center nav-link'>كلمة رئيس المبادرة</Link>
            <Link id={styles.li} to="/about" state={{ targetSection: 'section3' }} className='d-flex align-items-center nav-link'>كلمة وزير الصحة </Link>
            <Link id={styles.li} to="/about" state={{ targetSection: 'section2' }} className='d-flex align-items-center nav-link'>الهيكل التنظيمي</Link>
            <Link id={styles.li} to="/about" state={{ targetSection: 'section1' }} className='d-flex align-items-center nav-link'>محاور المبادرة</Link>
            <Link id={styles.li} className='d-flex align-items-center nav-link'  to="/about" state={{ targetSection: 'section7' }}>آليات التنفيذ</Link>
          </ul>

        </div>


        {/* <div className='col-12 d-flex justify-content-end align-items-center gap-2 mt-3' id={styles.nav}>
          <div className='col-9  d-flex flex-wrap justify-content-end align-items-center gap-2 mt-4'>
            <span>مركز المعلومات ودعم اتخاذ القرار التابع لمجلس الوزراء</span>
            جميع الحقوق محفوظة. تم التطوير بواسطة,
            <div className='d-flex align-items-center gap-1'>
              <span>مبادرة الألف يوم الذهبية</span>
              ©
            </div>

          </div>

        </div> */}
        <div className='mt-5 d-flex flex-column justify-content-between align-items-center gap-5'>
          <div className='col-12 d-flex justify-content-between' id={styles.footerdiv}>
            <div className='col-lg-5 d-flex justify-content-between' id={styles.parts}>
              <span className='d-flex gap-3 align-items-center'>info@000000000000000000000000.org  <span>©</span> </span>
              <span>
                تليفون :  00000000(202+)</span>
            </div>
            <div className='col-lg-5 d-flex justify-content-between' id={styles.parts}>
              <span className={styles.margenstart}>العاصمة الادارية _ الحي الحكومي  <MdLocationPin style={{ fontSize: "24px" }} /></span>
              <span>
                الرمز البريدي : 11411 <MdEmail style={{ fontSize: "24px" }} /></span>

            </div>

          </div>
          <div className='col-12 d-flex justify-content-center align-items-center'>
            <div className='col-lg-8 d-flex flex-column align-items-center ' id={styles.footerbottom}>
              <span>سياسة حقوق النسخ - إخلاء المسؤولية - سياسة الخصوصية - الشروط و الأحكام - إمكانية الوصول -  اتصل بنا</span>
              <hr className='col-7' />
              <span>حقوق الطبع و النشر 2025 جميع الحقوق محفوظة لمبادرة الألف يوم الذهبية لتنمية الأسرة المصرية - جمهورية مصر العربية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
