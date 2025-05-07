import React from 'react'
import styles from './index.module.css'
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiMenu2Fill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
export default function Footer() {
  return (
    <div className={styles.parentfooter + " col-12"}>
      <div className='container d-flex flex-column justify-content-end text-end py-5 '>
        {/* <div className='d-flex flex-column gap-3'>
          <h2>النشرة الاخبارية</h2>
          <input type="email" placeholder='ادخل الايميل الخاص بك' className='py-2 px-3 text-end' />
          <div className=''>
            <button className='py-1 px-3 text-white'>اشتراك</button>
          </div>
        </div>
        <div className='d-flex flex-column gap-3'>
          <h2>الشركة</h2>
          <ul className='d-flex gap-5 justify-content-between '>
            <div className='d-flex flex-column  align-items-end gap-3'>
              <li className='d-flex align-items-center gap-2'>الرئيسية <IoIosArrowForward/> </li>
              <li className='d-flex align-items-center gap-2'>عن المبادرة<IoIosArrowForward /></li>
              <li className='d-flex align-items-center gap-2'>مؤشرات المبادرة <IoIosArrowForward /></li>
            </div>
            <div className='d-flex flex-column  align-items-end gap-3'>
              <li className='d-flex align-items-center gap-2'>خدمات المباردة <IoIosArrowForward/> </li>
              <li className='d-flex align-items-center gap-2'>الركن الإعلامي<IoIosArrowForward/> </li>
              <li className='d-flex align-items-center gap-2'>تواصل معنا <IoIosArrowForward/> </li>
            </div>

          </ul>
        </div> */}

        {/* <div className='d-flex flex-column  gap-3'>
          <h2>العنوان</h2>
          <ul className='d-flex flex-column align-items-end gap-3'>
            <li className='d-flex align-items-center gap-2'>كورنيش النيل - المعادى - ص.ب 11632 القاهرة <MdLocationPin style={{ fontSize: "24px" }} /></li>
            <li className='d-flex align-items-center gap-2'>02050524225 <MdLocalPhone style={{ fontSize: "24px" }} /></li>
            <li className='d-flex align-items-center gap-2'>npc@gov.eg <MdEmail style={{ fontSize: "24px" }} /></li>
          </ul>
        </div> */}
        <div className='d-flex justify-content-between  gap-3 text-end'>
          
          <ul className='d-flex flex-column align-items-end gap-3'>
            <li className='d-flex align-items-center'>أرقام التواصل</li>
            <li className='d-flex align-items-center'>إسأل/ إستشر</li>
            <li className='d-flex align-items-center'>أسئلة شائعة</li>
            <li className='d-flex align-items-center'>رأيك يهمنا</li>
          </ul>
          <ul className='d-flex flex-column align-items-end gap-3'>
            <li className='d-flex align-items-center'>الأخبار</li>
            <li className='d-flex align-items-center'>ألبومات الصور</li>
            <li className='d-flex align-items-center'>مكتبة الفيديوهات</li>
            <li className='d-flex align-items-center'>قائمة الإنفوجراف</li>
            <li className='d-flex align-items-center'>الرسائل التوعوية</li>
          </ul>
          <ul className='d-flex flex-column align-items-end gap-3'>
            <li className='d-flex align-items-center'>خط سير المستفيدين</li>
            <li className='d-flex align-items-center'>المشورة الأسرية</li>
            <li className='d-flex align-items-center'> مشورة الحامل</li>
            <li className='d-flex align-items-center'>مشورة ماقبل الزواج</li>
            <li className='d-flex align-items-center'> مشورة الأطفال</li>
            <li className='d-flex align-items-center'>نماذج مضيئة</li>
          </ul>


          <ul className='d-flex flex-column align-items-end gap-3'>
            <li className='d-flex align-items-center'>المشورة الأسرية بالمستشفيات </li>
            <li className='d-flex align-items-center'>مشورة ما قبل الزواج</li>
            <li className='d-flex align-items-center'>المشورة الأسرية للحامل</li>
            <li className='d-flex align-items-center'>مشورة الأطفال</li>
          </ul>
          <ul className='d-flex flex-column align-items-end gap-3'>
            <li className='d-flex align-items-center'>المبادرة في سطور</li>
            <li className='d-flex align-items-center'>كلمة رئيس المبادرة</li>
            <li className='d-flex align-items-center'>الهيكل التنظيمي</li>
            <li className='d-flex align-items-center'>محاور المبادرة</li>
            <li className='d-flex align-items-center'>مراحل المبادرة</li>
            <li className='d-flex align-items-center'>آليات التنفيذ</li>
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
          <div className='col-12 d-flex justify-content-between'>
          <div className='col-5 d-flex justify-content-between'>
            <span className='d-flex gap-3 align-items-center'>info@000000000000000000000000.org  <span>©</span> </span>
            <span> 
            تليفون :  00000000(202+)</span>
            </div>
            <div className='col-5 d-flex justify-content-between'>
            <span>العاصمة الادارية _ الحي الحكومي  <MdLocationPin style={{ fontSize: "24px" }} /></span>
            <span> 
            الرمز البريدي : 11411 <MdEmail style={{ fontSize: "24px" }} /></span>

            </div>
           
          </div>
          <div className='col-12 d-flex justify-content-center align-items-center'>
            <div className='col-8 d-flex flex-column align-items-center '>
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
