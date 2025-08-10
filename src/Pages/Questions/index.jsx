import React, { useEffect, useState } from 'react'
import ContactComponent from '../../Component/ContactComponent'
import { usecommonquestion } from '../../Store'
import { getAllData } from '../../Data/Repo/dataRepo'
import { getDomain } from '../../configLoader'
import './index.scss'
import { Pagination } from 'react-bootstrap'
import PaginationComponent from '../../Component/PaginationComponent'
export default function Questions() {
  const { commonquestion, setcommonquestion } = usecommonquestion()
  const domain = getDomain()
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

  const [searchTerm, setSearchTerm] = useState('');
  const [currentpage, setCurrentPage] = useState(1)
  let qusetionperpage =5
  let indexofLasqustion = currentpage * qusetionperpage
  let indexofFirsqustion = indexofLasqustion - qusetionperpage
  let filteredqustion = Array.isArray(commonquestion) && commonquestion?.filter((question) => {
    return normalizeArabic(question.quest || '').includes(normalizeArabic(searchTerm)) || normalizeArabic(question.answer || '').includes(normalizeArabic(searchTerm));
  })
  let filteredquestionPerPage = Array.isArray(filteredqustion) && filteredqustion?.slice(indexofFirsqustion, indexofLasqustion)
  let totalpages = Math.ceil((searchTerm ? filteredqustion.length : commonquestion.length) / qusetionperpage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    getAllData.get_show_commonQuestion(domain).then((res) => {
      setcommonquestion(res)
    })
  }, [])
  return (
    <div>
      <ContactComponent searchTerm={searchTerm}
        handleSearch={handleSearch} />


      <div className="questions-page container py-5">
        <div className="question-list">

          {
            (searchTerm ? filteredquestionPerPage : currentpage).length === 0 ? (
              <div className=' text-center col-12'>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>

              </div>
            ) :
              Array.isArray(filteredquestionPerPage) && filteredquestionPerPage?.map((el, index) => (
                <div
                  key={el.qId || index}
                  className={`question-item ${index % 2 === 0 ? 'bg-light' : 'bg-gray'} d-flex flex-column gap-3`}
                >
                  <h5 className="question-title m-0">{el.quest}</h5>
                  <p className="question-answer">{el.answer}</p>
                </div>
              ))
          }
        </div>
      </div>
      <div className="d-flex justify-content-center my-3">
        <div className="d-flex justify-content-center my-3" dir="rtl">
          {/* {

            Array.from({ length: totalpages }, (_, i) => {
              const pageNum = i + 1;
              const arabicNum = pageNum.toLocaleString('ar-EG');
              return (
                <button
                  key={pageNum}
                  className={`btn mx-1 ${currentpage === pageNum ? 'currentactive' : 'noncurrentactive'}`}
                  onClick={() => paginate(pageNum)}
                >
                  {arabicNum}
                </button>
              );
            })} */}
          <PaginationComponent
            current={currentpage}
            handle={paginate}
            total={totalpages}
          />
        </div>
      </div>
    </div>
  )
}
