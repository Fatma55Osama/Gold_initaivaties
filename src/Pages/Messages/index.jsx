
import styles from './index.module.css'
import { create } from "zustand";
import AOS from 'aos';
import HomePage from '../..//Pages/HomePage'
import { Element } from 'react-scroll'
import { Link, useLocation } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAwarnessMsg, usepathes } from '../../Store';
import { useState } from 'react';
import MediaComponent from '../../Component/MediaComponent';
import PaginationComponent from '../../Component/PaginationComponent';

export default function Messages() {
    const { allawarness } = useAwarnessMsg()
    const { path } = usepathes()

    const location = useLocation()
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
    const [currentPage, setCurrentPage] = useState(1);
    const awarnessPerPage = 5; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastawarness = currentPage * awarnessPerPage;
    const indexOfFirstawarness = indexOfLastawarness - awarnessPerPage;
    const filteredawarness = allawarness?.filter(awarness =>
        normalizeArabic(awarness.msgText).includes(normalizeArabic(searchTerm))
    ).sort((a, b) => b.orderView - a.orderView);
    const filteredNewsPerPage = filteredawarness.slice(indexOfFirstawarness, indexOfLastawarness);
    const totalPages = Math.ceil(
        (searchTerm ? filteredawarness.length : allawarness.length) / awarnessPerPage
    );
    // حساب البداية والنهاية

    const currentNews = allawarness.slice(indexOfFirstawarness, indexOfLastawarness);

    // تغيير الصفحة
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); window.scrollTo(0, 0); }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const navLinks = [
        { label: "الرسائل التوعوية", to: "/messages" },
        { label: "قائمة الإنفوجراف", to: "/infograph" },
        { label: "مكتبة الفيديو", to: "/video" },
        { label: "ألبومات الصور", to: "/Photo" },
        { label: "أخبار المبادرة", to: "/mediacorner" },
    ];

    return (
        <div className='col-12' id={styles.parentalldiv}>
  
            <MediaComponent searchTerm={searchTerm}
                handleSearch={handleSearch} />
            {/*---------------------- Start الرسائل التوعوية-------------------------*/}
            <div className='col-12 mb-5  ' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>
                <div className='col-11 d-flex  flex-column pb-3 align-items-end'>
                    <h3>الرسائل التوعوية</h3>
                </div>
                <div className='d-flex flex-column gap-5'>
                    {
                        (searchTerm ? filteredNewsPerPage : currentNews).length === 0 ? (
                            <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>
                        ) : filteredNewsPerPage.map((el, index) => {
                            return (
                                <div className='col-12 container  d-flex  pb-2 ' id={styles.CRegtangle}  >
                                    <div className='container text-end d-flex justify-content-end '>
                                        <div className='col-12 container d-flex flex-column gap-2 '>
                                            <h7>   {el.msgText}  </h7>
                                        </div>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>



             
            </div>

         
         
            {(searchTerm ? filteredNewsPerPage.length : allawarness.length) > 0 && (
                <div className='py-5'>
                    <PaginationComponent
                        current={currentPage}
                        handle={paginate}
                        total={totalPages}
                    />
                </div>
            )}
        </div >


    )


}


