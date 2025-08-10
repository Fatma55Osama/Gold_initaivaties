// import React from 'react'
// import styles from './index.module.css' // لو عندك ستايلات مخصصة
// import ContactComponent from '../../Component/ContactComponent';

// export default function ConsultationOld({ consultation }) {
//     if (!consultation) return <p>لا توجد استشارات سابقة</p>;

//     return (
//         <div>
//             <ContactComponent none="d-none" />
//             <div className={styles.card}>
//                 <h3>تفاصيل الاستشارة</h3>
//                 <div className={styles.item}>
//                     <strong>نص الاستشارة:</strong>
//                     <p>{consultation.question}</p>
//                 </div>
//                 <div className={styles.item}>
//                     <strong>تاريخ الإرسال:</strong>
//                     <p>{new Date(consultation.date).toLocaleDateString('ar-EG')}</p>
//                 </div>
//                 <div className={styles.item}>
//                     <strong>الرد:</strong>
//                     <p>{consultation.reply || "لم يتم الرد بعد"}</p>
//                 </div>
//             </div>
//         </div>

//     )
// }
import React from 'react';
import styles from './index.module.css';
import ContactComponent from '../../Component/ContactComponent';

export default function ConsultationOld() {
  // بيانات استشارة ثابتة للتجربة
  const consultation = {
    question: "عندي ألم في المعدة بعد الأكل، ماذا أفعل؟",
    date: "2025-08-05T12:00:00Z",
    reply: "ينصح بزيارة طبيب مختص وعمل تحليل جرثومة المعدة."
  };

  return (
    <div>
      <ContactComponent none="d-none" hidden="d-none" showLimited={true} />
      <div className='d-flex align-items-center container'>
        <div className={styles.card + "  col-8"}>
          <h3>تفاصيل الاستشارة</h3>
          <div className={styles.item + " d-flex"}>
            <strong>نص الاستشارة:</strong>
            <p>{consultation.question}</p>
          </div>
          <div className={styles.item + " d-flex"}>
            <strong>تاريخ الإرسال:</strong>
            <p>{new Date(consultation.date).toLocaleDateString('ar-EG')}</p>
          </div>
          <div className={styles.item + " d-flex"}>
            <strong>الرد:</strong>
            <p>{consultation.reply || "لم يتم الرد بعد"}</p>
          </div>
        </div>
        <div className={`${styles.profileCard} text-end`}>
          <div className={styles.profileItem}>
            <span className={styles.label}>الاسم:</span>
            <span className={styles.value}>فاطمة محمد</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>رقم الهاتف:</span>
            <span className={styles.value}>01012345678</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>عدد الاستشارات:</span>
            <span className={styles.value}>3</span>
          </div>
        </div>
      </div>

    </div>
  );
}

