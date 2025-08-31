import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import ContactComponent from '../../Component/ContactComponent';
import { Link } from 'react-router-dom';
import { usedetailconsultationold } from '../../Store';
import { getAllData } from '../../Data/Repo/dataRepo';
import { getDomain } from '../../configLoader';
import PaginationComponent from '../../Component/PaginationComponent';

export default function ConsultationOld() {
  function normalizeArabic(text) {
    return text
      .replace(/[أإآا]/g, 'ا')  // تطبيع الألف
      .replace(/ة/g, 'ه')       // تطبيع التاء المربوطة
      .replace(/ى/g, 'ي')       // تطبيع الألف المقصورة
      .replace(/ئ/g, 'ي')       // تطبيع الياء الهمزة
      .replace(/ؤ/g, 'و')       // تطبيع الواو همزة
      .replace(/[ًٌٍَُِّْ]/g, '') // إزالة التشكيل
      .replace(/[^ء-يa-zA-Z0-9\s]/g, '') // إزالة الرموز
      .trim()
      .toLowerCase();
  }

  const { consultationold, setdetailsconsultation } = usedetailconsultationold()
  const domain = getDomain()
  let token = sessionStorage.getItem('token')
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  let consultationperpage = 2
  let filteredconsultation = Array.isArray(consultationold) && consultationold.filter((el) => {
    return normalizeArabic(el.questionText).includes(normalizeArabic(searchTerm))
  });
  const indexoflastconsulation = currentPage * consultationperpage
  const indexofFirstconsulation = indexoflastconsulation - consultationperpage
  let filteredconsulationPerPage = filteredconsultation?.slice(indexofFirstconsulation, indexoflastconsulation)
  let totalpages = Math.ceil((searchTerm ? filteredconsultation.length : consultationold.length) / consultationperpage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    getAllData.get_show_consultationold(domain, token).then((res) => {
      setdetailsconsultation(res)
      console.log("deatilsconsultationold", res)
    })
  }, [])
  return (
    <div>
      <ContactComponent searchTerm={searchTerm}
        handleSearch={handleSearch} hidden="d-none" showheadsm="d-flex" showLimited={true} />
      {
        token && consultationold.length>0 ? (
          (searchTerm ? filteredconsulationPerPage : currentPage).length === 0 ? (
            <div className=' text-center col-12'>
              <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>

            </div>
          ) : (
            <div className="container  ">
              <div className="row  d-flex flex-column-reverse flex-md-row justify-content-between align-items-start gap-5 ">
                {/* كارت الاستشارات */}
                <div className="col-12 col-lg-8 col-md-7 mb-4">
                  {Array.isArray(filteredconsulationPerPage) && filteredconsulationPerPage?.map((el, index) => (
                    <div key={index} className={`${styles.card} mb-3 p-3`}>
                      <h3>تفاصيل الاستشارة</h3>
                      <div className={`${styles.item} d-flex flex-wrap`}>
                        <strong>نص الاستشارة:</strong>
                        <p>{el.questionText}</p>
                      </div>
                      <div className={`${styles.item} d-flex flex-wrap`}>
                        <strong>تاريخ الإرسال:</strong>
                        <p>{new Date(el.entryDate).toLocaleDateString('ar-EG')}</p>
                      </div>
                      <div className={`${styles.item} d-flex flex-wrap`}>
                        <strong>الرد:</strong>
                        <p>{el.qAnswerText || "لم يتم الرد بعد"}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* كارت البروفايل */}
                <div className="col-12 col-lg-3 col-md-3 mt-5 d-flex  justify-content-end">
                  <div className={`${styles.profileCard} text-end p-3`}>
                    <div className={styles.profileItem}>
                      <span className={styles.label}>الاسم:</span>
                      <span className={styles.value}>
                        {consultationold[0]?.regestration?.userName}
                      </span>
                    </div>
                    <div className={styles.profileItem}>
                      <span className={styles.label}>رقم الهاتف:</span>
                      <span className={styles.value}>
                        {consultationold[0]?.regestration?.mobileNum}
                      </span>
                    </div>
                    <div className={styles.profileItem}>
                      <span className={styles.label}>عدد الاستشارات:</span>
                      <span className={styles.value}>{consultationold.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )
        ) : (
          <div className="text-center py-5 d-flex  flex-column align-items-center">
            <h5 className="text-danger mb-3 text-center">⚠️ لا توجد استشارات سابقة، يمكنك إرسال استشارة الآن</h5>
            <Link to={'/consultationnew'} id={styles.btnlog} className="btn text-white px-4">إرسال استشارة</Link>
          </div>

        )
      }
      {(searchTerm ? filteredconsulationPerPage.length : consultationold.length) > 0 && (

        <div className='py-5'>
          <PaginationComponent
            current={currentPage}
            handle={paginate}
            total={totalpages}
          />
        </div>
      )}

    </div>
  );
}

