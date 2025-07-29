
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useallActiveEmployees, usepathimg } from '../../Store';
import { useState } from 'react';
import { getPathImg } from '../../configLoader';


export default function Alllightteam() {
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
    const  pathimg  = getPathImg()

    const { Employees } = useallActiveEmployees()
    const [Searchterm, setSearchterm] = useState('')
    const lightperpage = 9
    const [currentPage, setCurrentpage] = useState(1)
    let indexofLastteam = currentPage * lightperpage
    let indexofFirsteam = indexofLastteam - lightperpage
    let filteredteam = Employees.filter((team) => {
        const name = normalizeArabic(team.empName || '');
        const gov = normalizeArabic(team.govName || '');
        const search = normalizeArabic(Searchterm);

        return name.includes(search) || gov.includes(search);
    }).sort((a, b) => new Date(b.honorDate) - new Date(a.honorDate));

    let filteredteamPerPage = filteredteam.slice(indexofFirsteam, indexofLastteam)
    let totalpages = Math.ceil((Searchterm ? filteredteam.length : Employees.length) / lightperpage);
    const paginate = (pageNumber) => {
        setCurrentpage(pageNumber);
        window.scrollTo(0, 0);
    };
    const handleSearch = (e) => {
        setSearchterm(e.target.value);
        setCurrentpage(1);
    };
    return (
        <div className='col-12' id={styles.parentalldiv}>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-center ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-md-9 d-flex flex-column gap-3 pb-3'>
                            <h2>نماذج مضيئة </h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p className={styles.justifyText}>تهتم المبادرة بإعداد كوادر مدربة لتشغيل غرف المشورة بالوحدات والمستشفيات لنشر الوعي بأهمية الألف يوم الأولى من عمر الطفل. وفي هذا الصدد، فقد تم تدريب صفوة مختارة من أطباء الأسنان والصيادلة وأطباء العلاج الطبيعي والمثقفين الصحيين من وحدات الرعاية الصحية الأولية والمستشفيات. ويعرض هذا الجزء المتميزين من هذه الكوادر تكريماً لهم على الجهد المبذول.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className=' col-12 mb-4 d-flex flex-column-reverse flex-md-row justify-content-between align-items-md-center mt-5   container  '>

                <div className='d-flex align-items-center  justify-content-between gap-3' id={styles.search}>
                    <button className='py-0 px-4 border-0'>بحث</button>
                    <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

                        <span style={{ marginRight: '8px', color: '#aaa' }}></span>
                        <input type="text" value={Searchterm} onChange={handleSearch} placeholder="...بحث بالأسم /المحافظة" className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>

                </div>
                <div className=' d-flex flex-column pb-3 align-items-end mt-3' id={styles.lightteam}>
                    <h3> نماذج مضيئة</h3>
                </div>


            </header>
            <div className=' col-12 d-flex flex-column align-items-end '>
                <div className='container'>

                    <div className={`${styles.cardContainer} col-12 mb-5 d-flex  justify-content-md-start`}>
                        {
                            (Searchterm ? filteredteamPerPage : currentPage).length === 0 ? (
                                <div className=' text-center col-12'>
                                    <p style={{ textAlign: 'center', marginTop: '20px' }}>لا يوجد نتائج مطابقة للبحث</p>

                                </div>
                            ) :
                                filteredteamPerPage.map((el, index) => {
                                    const formattedDate = el.honorDate?.split("T")[0].replace(/-/g, "/");

                                    return (
                                        <div key={el.govId} className='d-flex justify-content-center align-items-center bg-white gap-2' id={styles.cardslid} data-aos="fade-up"
                                        data-aos-offset="0" data-aos-delay={100}
                                        >
                                            <div className={styles.card + " d-flex flex-column justify-content-between align-items-center gap-1"}>
                                                <div className={styles.imgCard}>
                                                    <img src={`${pathimg}/Employees/${el.empImage}`} alt="" />
                                                </div>
                                                <span className={styles.Cardtitle}>
                                                    {el.empName}
                                                </span>
                                                <div className={styles.textCard + " text-end col-9 px-2 py-3"}>
                                                    <p>المحافظة: {el.govName}</p>
                                                    <p className='lh-base'>الوظيفة: {el.empJob}</p>
                                                    <p>تاريخ التكريم:{formattedDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }


                    </div>
                    <div className=" d-flex justify-content-center my-3" dir="rtl">
                        {Array.from({ length: totalpages }, (_, i) => {
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

            </div>

        </div >


    )


}


