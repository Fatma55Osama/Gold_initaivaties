
import styles from './index.module.css'

import { create } from "zustand";
import AOS from 'aos';
import HomePage from '../..//Pages/HomePage'
import { Element } from 'react-scroll'
import { Link, useLocation } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useModalvedio, usepathes, usepathimg, usePlay, useVedio } from '../../Store';
import iconvedio from '../../assets/Frame.png'
import { useEffect, useState } from 'react';
import { getPathImg } from '../../configLoader';
import MediaComponent from '../../Component/MediaComponent';
import ModalVedio from '../../Component/ModalVedio';
import PaginationComponent from '../../Component/PaginationComponent';
export default function AllVideo() {
    const { path } = usepathes()
    const { isplaying, setIsplaying } = usePlay()
    const { modalvedio, openModalvedio, closeModalvedio } = useModalvedio()

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
    const [selectedVedio, setSelectedVedio] = useState(null);
    const { allvedio, setallvedio } = useVedio()
    const [currentPage, setCurrentPage] = useState(1);
    const vedioPerPage = 4; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastvedio = currentPage * vedioPerPage;
    const indexOfFirstvedio = indexOfLastvedio - vedioPerPage;
    const filteredvedio = allvedio?.filter(vedio =>
        normalizeArabic(vedio.vedioTitle).includes(normalizeArabic(searchTerm))
    ).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const filteredNewsPerPage = filteredvedio.slice(indexOfFirstvedio, indexOfLastvedio);
    const totalPages = Math.ceil(
        (searchTerm ? filteredvedio.length : allvedio.length) / vedioPerPage
    );
    // حساب البداية والنهاية

    const currentNews = allvedio.slice(indexOfFirstvedio, indexOfLastvedio);

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
    const pathimg = getPathImg()
    useEffect(() => {
        if (modalvedio) {
            // امنع السكرول في الخلفية
            document.body.style.overflow = "hidden";
        } else {
            // رجع الوضع الطبيعي
            document.body.style.overflow = "auto";
        }

        // تنظيف لما الكومبوننت يتشال
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalvedio]);

    return (
        <div className='col-12'>
         
            <MediaComponent searchTerm={searchTerm}
                handleSearch={handleSearch} />
            {/*---------------------- Start مكتبة الفيديو-------------------------*/}
            <div className=' col-12  d-flex flex-column   '>

                <div className='d-flex flex-column container justify-content-between'>
                    <div className=' flex-column mt-5 '>
                        <h3 id={styles.h3}>مكتبة الفيديو</h3>
                    </div>
                    <div className='d-flex flex-row-reverse flex-wrap justify-content-start'>
                        {
                            (searchTerm ? filteredNewsPerPage : currentNews).length === 0 ? (
                                <div className=' text-center col-12'>
                                    <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>

                                </div>
                            ) : filteredNewsPerPage.map((el, index) => {
                                const formattedDate = new Date(el.publishDate).toLocaleDateString('ar-EG', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                });
                                const shortText = el.vedioTitle.length > 100
                                    ? el.vedioTitle.substring(0, 430) + '...'
                                    : el.vedioTitle;
                                return (
                                    <div key={el.vedioId} className='  flex-column col-12  col-md-6  ' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>
                                        <div className='  d-flex  flex-column ' id={styles.CRegtangle}  >
                                            {
                                                !isplaying && (
                                                    <div className=' text-wrap flex-column ' id={styles.phdiv}>
                                                        <div className=' flex-column position-relative' id={styles.imgrayse} >
                                                            <img src={`${pathimg}/Video/${el.vCoverPhoto}`} className='' alt={el.vCoverPhotoAltText} />
                                                        </div>
                                                        <div className='  position-absolute  col-10 d-flex justify-content-center' onClick={() => { openModalvedio(true); setSelectedVedio(el) }} id={styles.iconvedio}>
                                                            {/* <a
                                                                href={el.vedioURL}
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                            >

                                                              
                                                            </a> */}
                                                            <img src={iconvedio} width={50} className='' alt="" />
                                                        </div>
                                                        <div className=' text-wrap mt-3 ' id={styles.textvedio}>
                                                            <h5>{shortText}</h5>
                                                            <h6>{formattedDate}</h6>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            modalvedio && (<ModalVedio vedioURL={selectedVedio.vedioURL} vedioTitle={selectedVedio.vedioTitle} />)
                        }
                        {/* <div className=' flex-column' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>
                            <div className='   d-flex  flex-column ' id={styles.CRegtangle}  >
                                <div className=' text-wrap flex-column ' id={styles.phdiv}>
                                    <div className=' flex-column' id={styles.imgrayse} >
                                        <img src={reyse} className='' alt="" />
                                    </div>
                                    <div className=' text-wrap mt-3 ' >
                                        <h5>الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في أغسطس 2023</h5>
                                        <h6>الأربعاء 23 أغسطس 2023</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' flex-column ' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>
                            <div className='   d-flex  flex-column ' id={styles.CRegtangle}  >
                                <div className=' text-wrap flex-column ' id={styles.phdiv}>
                                    <div className=' container  flex-column' id={styles.Img} >
                                    </div>
                                    <div className=' text-wrap mt-3 ' >
                                        <h5>الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في أغسطس 2023</h5>
                                        <h6>الأربعاء 23 أغسطس 2023</h6>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
            {/* ---------------------- End مكتبة الفيديو------------------------- */}
            {/* <div className="d-flex justify-content-center my-3" dir="rtl">
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    const arabicNum = pageNum.toLocaleString('ar-EG');
                    return (
                        <button
                            key={pageNum}
                            className={`btn mx-1 ${currentPage === pageNum ? styles.currentactive : styles.noncurrentactive}`}
                            onClick={() => paginate(pageNum)}
                        >
                            {arabicNum}
                        </button>
                    );
                })}
            </div> */}
            {(searchTerm ? filteredNewsPerPage.length : allvedio.length) > 0 && (
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


