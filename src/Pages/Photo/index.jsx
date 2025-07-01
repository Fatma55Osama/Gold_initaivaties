
import styles from './index.module.css'
import { IoMdArrowDropdown, IoMdClose } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import reyse from '../../assets/Upfiles/Video/president.png'
import { usedomain, usepathes, usepathimg, usePhotoo } from '../../Store';
import { useEffect, useState } from 'react';
import { getAllData } from '../../Data/Repo/dataRepo';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Photo() {
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
  
    const { allphoto, setallphoto } = usePhotoo()
    const { pathimg } = usepathimg()

    const [filterphoto, setfilterphoto] = useState([])
    const { domain } = usedomain()
    useEffect(() => {
        getAllData.get_all_photo(domain).then((res) => {
            setallphoto(res)
        })
    }, [domain]);

    // useEffect(() => {
    //     const copyfilterphoto = [...allphoto].filter(photo => photo.albumId === albumId).sort((a, b) => (a.orderView ?? Infinity) - (b.orderView ?? Infinity));
    //     setfilterphoto(copyfilterphoto);
    // }, [allphoto]);
    useEffect(() => {
        // نجيب صورة واحدة فقط لكل ألبوم عن طريق Map
        const uniqueAlbumsMap = new Map();

        allphoto.forEach(photo => {
            if (!uniqueAlbumsMap.has(photo.albumId)) {
                uniqueAlbumsMap.set(photo.albumId, photo); // ناخد أول صورة في الألبوم
            }
        });

        const uniqueAlbums = Array.from(uniqueAlbumsMap.values());
        setfilterphoto(uniqueAlbums); // نعرض بس صور الغلاف
    }, [allphoto]);
    const [selectedAlbumPhotos, setSelectedAlbumPhotos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAlbum = (albumId) => {
        const photosInAlbum = allphoto.filter(photo => photo.albumId === albumId);
        setSelectedAlbumPhotos(photosInAlbum);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAlbumPhotos([]);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const photoPerPage = 6; // عدد الأخبار في كل صفحة
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastphoto = currentPage * photoPerPage;
    const indexOfFirstphoto = indexOfLastphoto - photoPerPage;
    const filteredphoto = filterphoto?.filter(photo =>
        normalizeArabic(photo.albumTitle).includes(normalizeArabic(searchTerm))
    ).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const filteredNewsPerPage = filteredphoto.slice(indexOfFirstphoto, indexOfLastphoto);
    const totalPages = Math.ceil(
        (searchTerm ? filteredphoto.length : filterphoto.length) / photoPerPage
    );
    // حساب البداية والنهاية

    // const currentNews = filterphoto.slice(indexOfFirstphoto, indexOfLastphoto);

    // تغيير الصفحة
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); window.scrollTo(0, 0); }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
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
            {/*---------------------- Start ألبوم الصور-------------------------*/}
            <div className='col-12 ' id={styles.Lines}>
                <div className='col-12 container'>
                    <div className='  col-12  d-flex flex-column  pb-3'>
                        <h3 id={styles.h3}>ألبومات الصور</h3>
                    </div>
                    <div className='  pb-4 d-flex   ' id={styles.CRegtangle}  >
                        {/**هنا هنعمل الmap */}

                        <div className='d-flex flex-wrap justify-content-between align-items-center  col-12 pt-4 pe-4'>
                            {
                                filteredNewsPerPage.length === 0 ? (
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
                                        <div onClick={() => openAlbum(el.albumId)} id={styles.phdiv} key={el.albumId}>
                                            <div id={styles.Img}>
                                                <img src={`${pathimg}/Photo/${el.coverPhoto}`} alt="" />
                                            </div>
                                            <div className='mt-3'>
                                                <h5 id={styles.h55}>{el.albumTitle}</h5>
                                                <h6 id={styles.h66}>{formattedDate}</h6>
                                            </div>
                                        </div>
                                    );
                                })
                            }

                        </div>
                        {/* </div>*/}
                        {isModalOpen && (
                            <div className={styles.modal}>
                                <div className='d-flex justify-content-start align-items-start my-3 mx-4'>

                                    <button className={styles.button2 + ' bg-danger'} onClick={closeModal}><IoMdClose className={styles.iconclose} /></button>
                                </div>
                                {/* <div>
                                    {selectedAlbumPhotos.map(photo => (
                                        <img key={photo.id} src={`/src/assets/Upfiles/Photo/${photo.photo}`} alt="" />
                                    ))}
                                </div> */}
                                <Swiper className={styles.slider + " mySwiper"} navigation={true} modules={[Navigation]}>
                                    {selectedAlbumPhotos.map(photo => (
                                        <SwiperSlide key={photo.id}>
                                            <img src={`${pathimg}/Photo/${photo.photo}`} alt="" />
                                        </SwiperSlide>
                                    ))}

                                </Swiper>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* ---------------------- End ألبوم الصور------------------------- */}

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


