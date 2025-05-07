import React from 'react'
import mask from '../../assets/mask-group-1.png'
import './index.scss'
export default function About() {
  return (
    <div className=''>
        
        <div className="overlap-17 d-flex flex-row ">
          <img
            className="mask-group"
            alt="Mask group"
            src={mask}
          />

          <div className="div-3">
            <div className="text-wrapper-30">المبادرة في سطور</div>

            <p className="element-4">
              {" "}
              مبادرة &#34;الألف يوم الذهبية لتنمية الأسرة المصرية&#34; هي إحدى
              المبادرات الهامة لبناء الإنسان المصري حيث تهدف إلى الاهتمام بتحسين
              الخصائص السكانية لأفراد الأسرة المصرية وتنمية الطفولة المبكرة
              وخاصة في فترة الألف يوم الذهبية الأولي من العمر نظرا لأهميتها
              القصوى. وهي واحدة من مبادرات المبادرة الرئاسية &#34;100 مليون
              صحة&#34;. وقد أطلق المبادرة معالي الأستاذ الدكتور / خالد عبد
              الغفار – وزير الصحة والسكان - في احتفالية بالعاصمة الإدارية
              الجديدة يوم 22 أغسطس 2023.
            </p>
          </div>
        </div>
    </div>
  )
}
