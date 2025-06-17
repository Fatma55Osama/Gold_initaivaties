
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { IoMdArrowDropdown } from 'react-icons/io';
import { useallActiveEmployees } from '../../Store';
import { useState } from 'react';


export default function Alllightteam() {
    const navLinks = [
        // { label: "  المشورة الأسرية بالمستشفيات", to: "/#" },

        // { label: "   مشورة ما قبل الزواج", to: "/#" },
        // { label: "  مشورة الحامل", to: "/#" },
        // { label: " مشورة الأطفال", to: "/#" },
        // { label: " مشورة المباعدة بين الحمل", to: "/#" },
        // { label: " الألف يوم الذهبية التالية", to: "/#" },
        // { label: " مشورة الإعاقة والدمج", to: "/#" },
        { label: " نماذج مضيئة", to: "/Services" },
    ];
    const { Employees } = useallActiveEmployees()
    const [Searchterm, setSearchterm] = useState('')
    const lightperpage = 9
    const [currentPage, setCurrentpage] = useState(1)
    let indexofLastteam = currentPage * lightperpage
    let indexofFirsteam = indexofLastteam - lightperpage
    let filteredteam = Employees.filter((team) => {
        return team.empName.toLowerCase().includes(Searchterm.toLowerCase())}).sort((a, b) => new Date(b.honorDate) - new Date(a.honorDate))

    let filteredteamPerPage = filteredteam.slice(indexofFirsteam, indexofLastteam)
    let totalpages = Math.ceil(Searchterm ? filteredteam.length : Employees.length) / lightperpage
    const handleSearch = (e) => {
        setSearchterm(e.target.value);
        setCurrentpage(1);
    };
    return (
        <div className='col-12' id={styles.parentalldiv}>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>نماذج مضيئة </h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p > نماذج مضيئة</p>

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
                        <input type="text" value={Searchterm} onChange={handleSearch} placeholder="...بحث" className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
                </div>

                {/* <div className='d-flex    gap-3 justify-content-between align-items-center '>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            spy={true}
                            smooth={true}
                            duration={500}
                            to={link.to}
                            activeClass={styles.active}
                            className={" nav-link " + styles.sectionlinkservice}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div> */}


            </header>
            <div className=' col-12 d-flex flex-column align-items-end '>
                <div className='container'>
                    <div className='col-12 d-flex flex-column pb-3 align-items-end mt-3'>
                        <h3> نماذج مضيئة</h3>
                    </div>
                    <div className='col-12 d-flex flex-wrap justify-content-end gap-4 mb-5'>
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
                                        >
                                            <div className={styles.card + " d-flex flex-column justify-content-center align-items-center gap-1"}>
                                                <div className={styles.imgCard}>
                                                    <img src={`/src/assets/Upfiles/Photo/${el.empImage}`} alt="" />
                                                </div>
                                                <span className={styles.Cardtitle}>
                                                    {el.empName}
                                                </span>
                                                <div className={styles.textCard + " text-end col-7 px-4 py-3"}>
                                                    <p>المحافظة: {el.govName}</p>
                                                    <p>الوظيفة: {el.empJob}</p>
                                                    <p>تاريخ التكريم:{formattedDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }


                    </div>
                </div>
                <div className="d-flex justify-content-center my-3" dir="rtl">
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
        </div >


    )


}


