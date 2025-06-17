
import styles from './index.module.css'
import logo from '../../assets/rectangle-6.png'
import { create } from "zustand";
import AOS from 'aos';
import HomePage from '../..//Pages/HomePage'
import { Element } from 'react-scroll'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useVedio } from '../../Store';
import iconvedio from '../../assets/Frame.png'
import { useState } from 'react';
export default function AllVideo() {
    const { allvedio, setallvedio } = useVedio()
    const [currentPage, setCurrentPage] = useState(1);
    const vedioPerPage = 4; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastvedio = currentPage * vedioPerPage;
    const indexOfFirstvedio = indexOfLastvedio - vedioPerPage;
    const filteredvedio = allvedio?.filter(vedio =>
        vedio.vedioTitle.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const filteredNewsPerPage = filteredvedio.slice(indexOfFirstvedio, indexOfLastvedio);
    const totalPages = Math.ceil(
        (searchTerm ? filteredvedio.length : allvedio.length) / vedioPerPage
    );
    // حساب البداية والنهاية

    const currentNews = allvedio.slice(indexOfFirstvedio, indexOfLastvedio);

    // تغيير الصفحة
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className='col-12'>
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

                        <span style={{ marginRight: '8px', color: '#aaa' }}><IoMdArrowDropdown style={{ color: "black" }} /></span>
                        <input type="text" placeholder="...بحث" value={searchTerm} onChange={handleSearch} className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
                </div>

                <div className='d-flex   gap-4 justify-content-between align-items-center '>
                    {navLinks.map((link, index) => (
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
                    ))}
                </div>


            </header>
            {/*---------------------- Start مكتبة الفيديو-------------------------*/}
            <div className=' col-12  d-flex flex-column   '>

                <div className='d-flex flex-column container justify-content-between'>
                    <div className=' flex-column mt-5 '>
                        <h3 id={styles.h3}>مكتبة الفيديو</h3>
                    </div>
                    <div className='d-flex   flex-wrap justify-content-end'>
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
                                return (
                                    <div key={el.vedioId} className=' flex-column  col-6  ' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>
                                        <div className='   d-flex  flex-column ' id={styles.CRegtangle}  >
                                            <div className=' text-wrap flex-column ' id={styles.phdiv}>
                                                <div className=' flex-column position-relative' id={styles.imgrayse} >
                                                    <img src={`/src/assets/Upfiles/Video/${el.vCoverPhoto}`} className='' alt="" />
                                                </div>
                                                <div className='  position-absolute  col-10 d-flex justify-content-center' id={styles.iconvedio}>
                                                    <a
                                                        href={el.vedioURL}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >

                                                        <img src={iconvedio} width={50} className='' alt="" />
                                                    </a>
                                                </div>
                                                <div className=' text-wrap mt-3 ' >
                                                    <h5>{el.vedioTitle}</h5>
                                                    <h6>{formattedDate}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
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


