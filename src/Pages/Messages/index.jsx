
import styles from './index.module.css'
import logo from '../../assets/rectangle-6.png'
import { create } from "zustand";
import AOS from 'aos';
import HomePage from '../..//Pages/HomePage'
import { Element } from 'react-scroll'
import { Link, useLocation } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useAwarnessMsg, usepathes } from '../../Store';
import { useState } from 'react';

export default function Messages() {
    const { allawarness } = useAwarnessMsg()
    const { path } = usepathes()

    const location = useLocation()

    const [currentPage, setCurrentPage] = useState(1);
    const awarnessPerPage = 10; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastawarness = currentPage * awarnessPerPage;
    const indexOfFirstawarness = indexOfLastawarness - awarnessPerPage;
    const filteredawarness = allawarness?.filter(awarness =>
        awarness.msgText.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>الركن الإعلامي</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p >يعرض هذا الجزء أخبار المبادرة على الصعيدين الداخلي والخارجي، كما يعرض فيديوهات وألبومات صور لتوثيق الفعاليات والأنشطة التي تُنفذها المبادرة.
                                        هذا بالإضافة إلى التوعية المستمرة بأهمية المبادرة لتحسين الخصائص السكانية من خلال مجموعة من الإنفوجراف والرسائل التوعوية </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className=' col-12 d-flex justify-content-between align-items-center mt-5   container  '>

                <div className='d-flex align-items-center gap-3' id={styles.search}>
                    <button className='py-0 px-4 border-0'>بحث</button>
                    <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

                        <span style={{ marginRight: '8px', color: '#aaa' }}></span>
                        <input type="text" placeholder="...بحث" value={searchTerm} onChange={handleSearch} className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
                </div>

                <div className='d-flex   gap-4 justify-content-between align-items-center '>
                    {
                        path
                            .filter(el => el.name === "الركن الإعلامي")
                            .flatMap((el, index) => {
                                return el.links.map((link, idx) => {
                                    const isActive = link.path === location.pathname;

                                    return (
                                        <Link
                                            key={`${index}-${idx}`}
                                            to={link.path}
                                            className={`nav-link ${styles.sectionlink} ${isActive ? styles.activelink : ""}`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                });
                            })
                    }
                </div>


            </header>
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



                {/* <div className='col-12 container bg-success d-flex  pb-2 ' id={styles.CRegtangle}  >
                    {
                         (searchTerm ? filteredNewsPerPage : currentNews).length === 0 ? (
                                <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>
                            ) : ((searchTerm ? filteredNewsPerPage : currentNews)).map((el, index) => {
                            return (
                                <div className='container text-end d-flex justify-content-end '>
                                    <div className='col-12 container d-flex flex-column gap-2 '>
                                        <h7>   {el.msgText}  </h7>
                                    </div>

                                </div>
                            )
                        })
                    }


                </div> */}
            </div>

            {/* <div className='col-12 ' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>

                <div className='col-12 container d-flex  pb-2 ' id={styles.CRegtangle}  >

                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-12 container d-flex flex-column gap-2 '>
                            <h7>الرسالة التوعوية الثانية ------------ الرسالة التوعوية الثانية ----------- الرسالة التوعوية الثانية</h7>
                        </div>

                    </div>

                </div>
            </div> */}
            <div className="d-flex justify-content-center my-3" dir="rtl">
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
            </div>
        </div >


    )


}


