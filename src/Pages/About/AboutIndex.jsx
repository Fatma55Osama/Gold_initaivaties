
import styles from './index.module.css'
import { Link, scroller } from 'react-scroll'
import { useAbout, useModal, useModalpdf, usepathimg } from '../../Store';
import { Accordion } from 'react-bootstrap';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ModalAbout from '../../Component/ModalAbout';
import structer from '../../assets//Structure.png'
import { FaFilePdf } from 'react-icons/fa';
import Modalpdf from '../../Component/Modalpdf';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//const myImg = () => {
//    return (
//        <div className='col-12 ' >
//            return <img sr={logo} width={268} height={156} alt="" />
//        </div>
//    );
//};
//export default myImg;

export default function AboutIndex() {
    const { allabout, setallabout } = useAbout()
    const { pathimg } = usepathimg()
const location = useLocation();

useEffect(() => {
  if (location.state?.targetSection) {
    scroller.scrollTo(location.state.targetSection, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  }
}, [location]);
    const navLinks = [
        { label: "آليات التنفيذ", to: "section7" },
        { label: "محاور المبادرة", to: "section1" },
        { label: "الهيكل التنظيمي", to: "section2" },
        { label: "كلمة وزير الصحة", to: "section3" },
        { label: "كلمة رئيس المبادرة", to: "section4" },
        { label: "المبادرة في سطور", to: "section5" },
    ];
    const { openModal, modalindex, closeModal } = useModal()
    const { modalpdf, openModalpdf, closeModalpdf } = useModalpdf()



    return (
        <div className='col-12' id={styles.parentalldiv}>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>عن المبادرة</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p >مبادرة "الألف يوم الذهبية لتنمية الأسرة المصرية" هي إحدى المبادرات الهامة لبناء الإنسان المصري حيث تهدف إلى الاهتمام بتحسين الخصائص السكانية لأفراد الأسرة المصرية وتنمية الطفولة المبكرة وخاصة في فترة الألف يوم الذهبية الأولي من العمر نظرا لأهميتها القصوى. وهي واحدة من مبادرات المبادرة الرئاسية "100 مليون صحة". وقد أطلق المبادرة معالي الأستاذ الدكتور/ خالد عبد الغفار –وزير الصحة والسكان- في احتفالية بالعاصمة الإدارية الجديدة يوم 22 أغسطس 2023.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className='d-flex justify-content-center gap-5  container justify-content-between mt-5 align-items-center'>
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        spy={true}
                        smooth={true}
                        duration={500}
                        to={link.to}
                        className={" nav-link " + styles.sectionlink}
                    >
                        {link.label}
                    </Link>
                ))}
            </header>
            {/*---------------------- Start المبادرة في سطور-------------------------*/}
            <div name='section5' className='col-12 ' id={styles.Lines}>
                <div className='col-12 container d-flex flex-column pb-3'>
                    <h3>المبادرة في سطور</h3>
                </div>
                <div className='col-12  d-flex ' id={styles.CRegtangle}  >
                    <div className='d-flex  container '>
                        <div className=' col-3 container d-flex flex-column justify-content-center' >
                            <div className='' id={styles.LinesImg}>
                                <img src={`${pathimg}/About/${allabout?.[0]?.aboutImg}`} alt="" />
                            </div>
                        </div>

                        <div className=' text-end  d-flex justify-content-center align-items-center '>
                            <div className='col-12 container d-flex flex-column justify-content-center '>
                                <p>{allabout?.[0]?.aboutText}</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* ---------------------- End المبادرة في سطور------------------------- */}


            {/*---------------------- Start كلمة رئيس المبادرة-------------------------*/}
            <div name='section4' className='col-12  ' id={styles.Lines}>
                <div className=' col-12 container d-flex flex-column pb-3 '>
                    <h3>كلمة رئيس المبادرة</h3>
                </div>
                <div className='col-12  d-flex   ' id={styles.CRegtangle}  >
                    {/* <div className='col-12 container d-flex flex-column pb-3 ' id={styles.PresImg} >
                    </div> */}
                    <div className='d-flex container'>
                        <div className=' col-3 container d-flex flex-column justify-content-center' >
                            <div className='d-flex justify-content-center  flex-column ' id={styles.PresImg}>
                                <img src={`${pathimg}/About/${allabout?.[0]?.chairmanImg}`} alt="" />
                            </div>
                        </div>




                        <div className=' text-end d-flex justify-content-center align-items-center  '>
                            <div className='col-12 container d-flex flex-column justify-content-center '>
                                <p>{allabout?.[0]?.chairmanWord}</p>
                            </div>

                        </div>
                    </div>

                    {/* <div className='container d-flex j '>
                        <div className='col-12 container d-flex flex-column '>
                            <p>{allabout?.[0]?.chairmanWord}</p>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* ---------------------- End كلمة رئيس المبادرة------------------------- */}

            {/*---------------------- Start كلمة وزير الصحة-------------------------*/}
            <div name='section3' className='col-12 ' id={styles.Lines}>
                <div className='col-12 container d-flex flex-column pb-3'>
                    <h3>كلمة وزير الصحة</h3>
                </div>
                <div className='col-12  d-flex  py-3 ' id={styles.CRegtangle}  >
                    <div className='container d-flex'>
                        <div className=' col-3 container d-flex flex-column justify-content-center' >
                            <div className='d-flex justify-content-center  flex-column  ' id={styles.MinisterImg}>
                                <img src={`${pathimg}/About/${allabout?.[0]?.ministerImg}`} alt="" />
                            </div>
                        </div>

                        <div className=' text-end d-flex justify-content-center align-items-center  '>
                            <div className='col-12 container d-flex flex-column justify-content-center  '>
                                <p>{allabout?.[0]?.ministerWord}</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* ---------------------- End كلمة وزير الصحة------------------------- */}

            {/*---------------------- Start الهيكل التنظيمي-------------------------*/}
            <div name='section2' className='col-12' id={styles.Lines}>
                <div className='col-12 container d-flex flex-column pb-3'>
                    <h3>الهيكل التنظيمي للمبادرة</h3>
                </div>
                <div className='col-12  d-flex align-items-end pb-4' id={styles.CRegtangle}  >
                    <div className='container d-flex justify-content-between col-12'>
                        <div className=' d-flex justify-content-center  flex-column   ' id={styles.StructImg} >
                            <img src={structer} alt="" />
                        </div>

                        <div className=' text-end d-flex flex-column justify-content-end align-items-end '>
                            <div className='col-12 container d-flex flex-column pb-5'>
                                <p >{allabout?.[0]?.structureText} </p>
                            </div>
                            <div onClick={() => openModal()} className={styles.btnback + '  rounded-3 '}>

                                <IoIosArrowRoundBack className={styles.iconarrow} />
                                <button className='rounded-3 py-1 px-4'> عرض </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {
                modalindex && (<ModalAbout img={`${pathimg}/About/${allabout?.[0]?.structureImg}`} />)
            }
            {/* ---------------------- End الهيكل التنظيمي------------------------- */}

            {/*---------------------- Start محاور المبادرة-------------------------*/}
            <div name='section1' className='col-12 ' id={styles.Lines}>
                <div className='col-12 container d-flex flex-column pb-3'>
                    <h3>محاور المبادرة</h3>
                </div>
                <div className='col-12   d-flex align-items-start pb-5 justify-content-between mt-4 ' id={styles.CRegtangle}  >
                    <div className='container d-flex'>
                        <div className='d-flex'>
                            <div className='col-12  container d-flex flex-column pb-5 mt-4 justify-content-between' id={styles.BgPillar3} >
                                <div className=' col-12 container d-flex flex-column pb-5 mt-4 justify-content-between  ' id={styles.Pillar3} >

                                </div>
                            </div>
                            <div className='col-12 container d-flex flex-column pb-5 mt-4 justify-content-between' id={styles.BgPillar2} >
                                <div className=' col-12 container d-flex flex-column pb-5 mt-4 justify-content-between  ' id={styles.Pillar2} >

                                </div>
                            </div>
                            <div className='col-12 container d-flex flex-column pb-5 mt-4 justify-content-between' id={styles.BgPillar1} >
                                <div className=' col-12 container d-flex flex-column pb-5 mt-4 justify-content-between  ' id={styles.Pillar1} >

                                </div>
                            </div>
                        </div>



                        <div className='container text-end d-flex justify-content-end '>
                            <div className=' col-12 container d-flex flex-column pb-2 mt-4 justify-content-between' dir={"rtl"}>
                                <Accordion defaultActiveKey="1" id={styles.accordion}>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header id={styles.accordionheader}> <h5>المحور الأول: {allabout?.[0]?.pillar1}</h5></Accordion.Header>
                                        <Accordion.Body>
                                            <p className='me-4' id={styles.accorddescription}>{allabout?.[0]?.pillar1Text}    </p>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion defaultActiveKey="1" id={styles.accordion}>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header id={styles.accordionheader}> <h5>المحور الثاني: {allabout?.[0]?.pillar2}</h5></Accordion.Header>
                                        <Accordion.Body>
                                            <p className='me-4' id={styles.accorddescription}>{allabout?.[0]?.pillar2Text}    </p>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion defaultActiveKey="1" id={styles.accordion}>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header id={styles.accordionheader}> <h5>المحور الثالث: {allabout?.[0]?.pillar3}</h5></Accordion.Header>
                                        <Accordion.Body>
                                            <p className='me-4' id={styles.accorddescription}>{allabout?.[0]?.pillar3Text}    </p>

                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                {/* <h5>المحور الأول: أسرة قوية واعية، ومشورة أسرية متكاملة</h5>

                            <h5>المحور الثاني: دعم الولادة الطبيعية وخفض الولادة القيصرية</h5>

                            <h5>المحور الثالث: تخفيض وفيات ومضاعفات حديثي الولادة</h5> */}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* ---------------------- End محاور المبادرة------------------------- */}

            {/*---------------------- Start آليات التنفيذ-------------------------*/}
            <div name='section7' className='col-12 ' id={styles.Lines}>
                <div className='col-12 container d-flex flex-column pb-3'>
                    <h3>آليات التنفيذ</h3>
                </div>
                <div className='col-12  d-flex align-items-end pb-4' id={styles.CRegtangle}  >


                    <div className='container text-end d-flex justify-content-end  mt-4'>
                        <div className='col-12  d-flex flex-column align-items-end justify-content-end pb-5'>
                            <p > {allabout?.[0]?.mechanisms} </p>
                            {/* <button
                                className="px-2 py-2 mt-3 align-self-end d-flex align-items-center gap-2" id={styles.custompurpleoutline}
                                onClick={openModalpdf}
                            >
                                <FaFilePdf /> عرض الملف 
                            </button> */}
                            {/* <div onClick={openModalpdf} className={  ' px-3 d-flex justify-content-end align-items-center  rounded-3 '} id={styles.custompurpleoutline}>

                                <FaFilePdf  />
                                <button className='rounded-3  py-1 px-4'> عرض الملف  </button>
                            </div> */}
                              <div onClick={openModalpdf} className={styles.btnback + ' px-1 rounded-3 d-flex align-items-center'}>

                                <FaFilePdf className={styles.iconfile} />
                                <button className='rounded-3 py-1 px-4'> عرض الملف   </button>
                            </div>
                        </div>
                    </div>

                    {modalpdf && (
                        <Modalpdf file={allabout?.[0]?.mechanismsFile}  folder="About" />
                    )}

                </div>
            </div>
            {/* ---------------------- End آليات التنفيذ------------------------- */}

        </div >


    )


}


