
import { useInfograph, usepathes, usepathimg } from '../../Store';
import styles from './index.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react';


export default function AllInfograph() {
    const { infograph, setInfograph } = useInfograph()
    const [currentPage, setCurrentPage] = useState(1);
    const infoPerPage = 4; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const { pathimg } = usepathimg()
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
    const indexOfLastinfo = currentPage * infoPerPage;
    const indexOfFirstinfo = indexOfLastinfo - infoPerPage;
    const filteredinfo = infograph?.filter(info =>
       normalizeArabic(info.infoTitle).includes(normalizeArabic(searchTerm))).sort((a, b) => {

            if (a.orderView !== b.orderView) {
                return b.orderView - a.orderView;
            }

            return new Date(b.publicationDate) - new Date(a.publicationDate);
        });
    ;
    const filteredNewsPerPage = filteredinfo.slice(indexOfFirstinfo, indexOfLastinfo);
    const totalPages = Math.ceil(
        (searchTerm ? filteredinfo.length : infograph.length) / infoPerPage
    );


    const currentNews = infograph.slice(indexOfFirstinfo, indexOfLastinfo);


    const paginate = (pageNumber) => { setCurrentPage(pageNumber); window.scrollTo(0, 0); }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    console.log("infograph", infograph)
    const navLinks = [
        { label: "الرسائل التوعوية", to: "/messages" },
        { label: "قائمة الإنفوجراف", to: "/infograph" },
        { label: "مكتبة الفيديو", to: "/video" },
        { label: "ألبومات الصور", to: "/Photo" },
        { label: "أخبار المبادرة", to: "/mediacorner" },
    ];
    return (
        <div className='col-12'>
            <div className='col-12 position-relative ' id={styles.Aboutinfo}>
                <div className='col-12 ' id={styles.AboutLogoinfo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
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
                        path.filter(el => el.name === "الركن الإعلامي")
                            .flatMap((el, index) => {
                                return el.links.map((link, idx) => {
                                    const isActive = link.path === location.pathname
                                    return (
                                        <Link
                                            key={`${index}-${idx}`}
                                            to={link.path}
                                            className={`nav-link ${styles.sectionlink} ${isActive ? styles.activelink : ""}`}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                })
                            })
                    }
                </div>


            </header>
            {/*---------------------- Start مكتبة الفيديو-------------------------*/}
            <div className=' col-12  d-flex flex-column container  '>
                <div className=' col-12  d-flex flex-column pb-3 align-items-end mt-5'>
                    <h3>الإنفوجراف</h3>
                </div>
                <div className='col-12 d-flex flex-wrap flex-row-reverse container justify-content-center ' id={styles.allinfodiv}>
                    {
                        (searchTerm ? filteredNewsPerPage : currentNews).length === 0 ? (
                            <div className=' text-center col-12'>
                                <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>

                            </div>
                        ) : filteredNewsPerPage.map((el, index) => {
                            const formattedDate = new Date(el.publicationDate).toLocaleDateString('ar-EG', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            });
                            const shortText = el.infoTitle.split(/\s+/).slice(0, 12).join(' ') + '...';

                            return (
                                <div key={el.infoId} className='' data-aos="fade-up" data-aos-offset="5" data-aos-delay="100" id={styles.Lines}>
                                    <div className='   d-flex  flex-column  ' id={styles.CRegtangleinfo}  >
                                        <Link to={`/infograph/detailsinfograph/${el.infoId}`} className=' text-wrap flex-column nav-link' id={styles.phdivinfo}>
                                            <div className='   flex-column '  >
                                                <img src={`${pathimg}/Infograph/${el.infoPhoto}`} id={styles.Imginfo} alt="" />
                                            </div>
                                            <div className=' text-wrap  ' id={styles.Titleinfo}>
                                                <h5 id={styles.infoTitle}>{shortText} </h5>
                                                <h6> {formattedDate}  </h6>
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            )
                        })
                    }


                </div>
            </div>
            {/* ---------------------- End مكتبة الفيديو------------------------- */}

            <div className="d-flex justify-content-center my-3">
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
            </div>

        </div >


    )


}


