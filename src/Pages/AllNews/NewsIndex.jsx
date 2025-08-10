
import styles from './index.module.css'
import { useNews, usepathes, usepathimg } from '../../Store';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { getPathImg } from '../../configLoader';
import MediaComponent from '../../Component/MediaComponent';

export default function AllNews() {
    const { path } = usepathes()
    const location = useLocation()

    const pathimg = getPathImg()
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
    const { allnews } = useNews()
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 5; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const filteredNews = allnews?.filter(news =>
        normalizeArabic(news.title).includes(normalizeArabic(searchTerm))
    ).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
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
            {/* <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-center ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-md-9 d-flex flex-column gap-3 pb-3'>
                            <h2>الركن الإعلامي</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p className='justifyText'>يعرض هذا الجزء أخبار المبادرة على الصعيدين الداخلي والخارجي، كما يعرض فيديوهات وألبومات صور لتوثيق الفعاليات والأنشطة التي تُنفذها المبادرة.
                                        هذا بالإضافة إلى التوعية المستمرة بأهمية المبادرة لتحسين الخصائص السكانية من خلال مجموعة من الإنفوجراف والرسائل التوعوية </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className=' col-12 d-flex flex-column-reverse  flex-lg-row justify-content-between align-items-lg-center mt-5 gap-4 gap-lg-0  container  '>

                <div className='d-flex align-items-center gap-3' id={styles.search}>
                    <button className='py-0 px-4 border-0'>بحث</button>
                    <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

                        <span style={{ marginRight: '8px', color: '#aaa' }}></span>
                        <input type="text" placeholder="...بحث" value={searchTerm} onChange={handleSearch} className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
                </div>

                <div className='d-none d-md-flex  gap-4 justify-content-between align-items-center '>

                    {
                        path
                            .filter(el => el.name === "الركن الإعلامي")
                            .flatMap((el, index) => {
                                return el.links.map((link, idx) => {
                                    const isActive =
                                        link.path === '/'
                                            ? location.pathname === '/'
                                            : location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);


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


            </header> */}
            <MediaComponent searchTerm={searchTerm}
                handleSearch={handleSearch} />
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
                                    const shortText = el.newsTextOne.split(/\s+/).slice(0, 30).join(' ') + '...';
                                    return (
                                        <div className='col-12 container d-flex  flex-md-row  pb-2 ' id={styles.CRegtangle} key={el.newsId} >
                                            <div className='container text-end d-flex justify-content-end '>
                                                <Link className='col-12 container d-flex flex-column nav-link '>
                                                    <Link className='nav-link ' to={`/mediacorner/detailsnews/${el.newsId}`} ><h5>{el.title}</h5></Link>
                                                    <Link className='nav-link' to={`/mediacorner/detailsnews/${el.newsId}`}> <h6>{formattedDate}</h6></Link>
                                                    <Link className='nav-link' to={`/mediacorner/detailsnews/${el.newsId}`}> <p className={styles.p + " me-4 p-0"} dangerouslySetInnerHTML={{ __html: shortText }} /></Link>

                                                    <Link to={`/mediacorner/detailsnews/${el.newsId}`} className={styles.btnback + '  rounded-3 nav-link '}>

                                                        <IoIosArrowRoundBack className={styles.iconarrow} />
                                                        <button className='rounded-3 py-1 px-4' > إقرأ المزيد </button>
                                                    </Link>
                                                    {/* <Link className='nav-link' id={styles.span} to={`/mediacorner/detailsnews/${el.newsId}`}><span id={styles.span} > إقرأ المزيد</span></Link> */}
                                                </Link>
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


                </div>


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


