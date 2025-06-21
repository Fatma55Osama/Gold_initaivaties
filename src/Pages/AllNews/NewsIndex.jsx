
import styles from './index.module.css'
import logo from '../../assets/rectangle-6.png'
import { create } from "zustand";
import AOS from 'aos';
import HomePage from '../..//Pages/HomePage'
import { Element } from 'react-scroll'
import { useNews, usepathes, usepathimg } from '../../Store';
import { IoMdArrowDropdown } from 'react-icons/io';
import cc from '../../assets/president.png'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AllNews() {
    const { path } = usepathes()
    const location = useLocation()
    const navLinks = [
        { label: "الرسائل التوعوية", to: "/messages" },
        { label: "قائمة الإنفوجراف", to: "/infograph" },
        { label: "مكتبة الفيديو", to: "/video" },
        { label: "ألبومات الصور", to: "/Photo" },
        { label: "أخبار المبادرة", to: "/mediacorner" },
    ];
    const { pathimg } = usepathimg()

    const { allnews } = useNews()
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 5; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const filteredNews = allnews.filter(news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const filteredNewsPerPage = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(
        (searchTerm ? filteredNews.length : allnews.length) / newsPerPage
    );
    // حساب البداية والنهاية

    const currentNews = allnews.slice(indexOfFirstNews, indexOfLastNews);

    // تغيير الصفحة
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); window.scrollTo(0, 0); };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
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
                {/* <div className=' d-flex align-items-center '>
                    <button>بحث</button>
                    <IoMdArrowDropdown />
                    <input type="text" />
                </div> */}
                <div className='d-flex align-items-center gap-3' id={styles.search}>
                    <button className='py-0 px-4 border-0'>بحث</button>
                    <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

                        <span style={{ marginRight: '8px', color: '#aaa' }}><IoMdArrowDropdown style={{ color: "black" }} /></span>
                        <input type="text" placeholder="...بحث" value={searchTerm} onChange={handleSearch} className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
                </div>

                <div className='d-flex   gap-4 justify-content-between align-items-center '>
                    {/* {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            spy={true}
                            smooth={true}
                            duration={500}
                            to={link.to}
                            activeClass={styles.active}
                            className={" nav-link " + styles.sectionlink}
                        >
                            {link.label}
                        </Link>
                    ))} */}
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
            {/*---------------------- Start الأخبار-------------------------*/}

            <div className='col-12 container d-flex flex-column'>

                <div className='col-12 position-relative ' id={styles.Lines}>
                    <div className='col-12 d-flex flex-column pb-3 align-items-end'>
                        <h3>أخبار المبادرة</h3>
                    </div>
                    <div className='d-flex flex-column gap-5'>
                        {
                            (searchTerm ? filteredNewsPerPage : currentNews).length === 0 ? (
                                <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>
                            ) : (
                                filteredNewsPerPage.map((el, index) => {
                                    const formattedDate = new Date(el.publishDate).toLocaleDateString('ar-EG', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    });
                                    const shortText = el.newsText.split(/\s+/).slice(0, 30).join(' ') + '...';
                                    return (
                                        <div className='col-12 container d-flex  pb-2 ' id={styles.CRegtangle} key={el.newsId} >
                                            <div className='container text-end d-flex justify-content-end '>
                                                <div className='col-12 container d-flex flex-column '>
                                                    <h5>{el.title}</h5>
                                                    <h6>{formattedDate}</h6>
                                                    <p className={styles.p}>{shortText}</p>
                                                    <Link className='nav-link' id={styles.span} to={`/detailsnews/${el.newsId}`}><span id={styles.span}>إقرأ المزيد</span></Link>
                                                </div>
                                            </div>
                                            <div className='col-12 container d-flex flex-column align-items-center  ' id={styles.NewsImg} >
                                                <img src={`${pathimg}/News/${el.smallPhoto}`} className='' alt="" id={styles.NewsImg} />
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>

                    {/* <div className='col-12 container d-flex  pb-2 ' id={styles.CRegtangle}  >


                        <div className='container text-end d-flex justify-content-end '>
                            <div className='col-12 container d-flex flex-column '>
                                <h5>الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في اغسطس 2023</h5>
                                <h6>الأربعاء 23 أغسطس 2023</h6>
                                <p>أطلقت وزارة الصحة والسكان مبادرة الألف يوم الذهبية لتنمية الأسرة المصرية، بهدف تقديم خدمات المشورة وتنظيم الأسرة للأم والطفل منذ ...</p>
                                <h8>إقرأ المزيد</h8>
                            </div>

                        </div>
                        <div className='col-12 container d-flex flex-column align-items-center pb-3 ' id={styles.NewsImg} >
                            <img src={cc} alt="" id={styles.NewsImg} />
                        </div>
                    </div> */}
                </div>

                {/* <Element name='section5' className='col-12 position-relative ' id={styles.Lines}>
                    <div className='col-12 container d-flex  pb-2 ' id={styles.CRegtangle}  >

                        <div className='container text-end d-flex justify-content-end '>
                            <div className='col-12 container d-flex flex-column '>
                                <h5>الألف يوم الذهبية مبادرة رئاسية أطلقها رئيس الجمهورية في اغسطس 2023</h5>
                                <h6>الأربعاء 23 أغسطس 2023</h6>
                                <p>أطلقت وزارة الصحة والسكان مبادرة الألف يوم الذهبية لتنمية الأسرة المصرية، بهدف تقديم خدمات المشورة وتنظيم الأسرة للأم والطفل منذ ...</p>
                                <h8>إقرأ المزيد</h8>
                            </div>

                        </div>
                        <div className='col-12 container d-flex flex-column align-items-center pb-3 ' id={styles.NewsImg} >

                        </div>
                    </div>
                </Element> */}
            </div>

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

            {/* ---------------------- End الأخبار------------------------- */}



        </div >


    )


}


