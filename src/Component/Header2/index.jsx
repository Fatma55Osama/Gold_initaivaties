import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { IoMenu, IoSearch } from 'react-icons/io5'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { MdLocationPin } from 'react-icons/md'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { usecontactfooter, usepathes } from '../../Store'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/rectangle-6.png'
import Accordion from 'react-bootstrap/Accordion';
import './index.scss'
import { getAllData } from '../../Data/Repo/dataRepo'
import { getDomain } from '../../configLoader'
import { FaXTwitter } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";


export default function Header2() {
    const { path } = usepathes()
    const [activePath, setActivePath] = useState()
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation()
    const { contactfooter, setcontactfooter } = usecontactfooter()
    const domain = getDomain()

    useEffect(() => {
        setActivePath(location.pathname)
        getAllData.get_storecontact(domain).then((res) => {
            setcontactfooter(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [location])

    // useEffect(() => {

    // }, [])
    return (
        <div className='col-12  align-items-start d-flex justify-content-start'>
            <div className='col-12 col-md-11 col-lg-8 ' id={styles.halfheader}>
                <div className={styles.part1 + "  px-4 d-flex justify-content-between py-2 px-md-3"}>
                    <div className='d-none d-md-flex align-items-center gap-2 gap-md-4 '>
                        {/* <IoSearch className={styles.icon} /> */}
                        <div className='d-flex align-items-center gap-2 gap-md-3'>

                            <Link to={'/login'}><BsPersonCircle className={styles.icon} /></Link>

                            <a href="https://www.facebook.com/share/16iwfH8UVT/?mibextid=qi2Omg" target='_blank'>

                                <FaFacebook className={styles.icon} title='فيسبوك' />
                            </a>
                            <a href="https://instagram.com/mohpegypt?igshid=1t65jqxaoiwqb" target='_blank'>

                                <PiInstagramLogoFill className={styles.icon} title='انستجرام' />
                            </a>


                            <a href="https://www.youtube.com/channel/UCzEGfjELHCOQxgPr0dll1pA?pbjreload=10" target='_blank'>

                                <FaYoutube className={styles.icon} title='يوتيوب' />
                            </a>
                            <a href="https://x.com/mohpegypt" target='_blank'>

                                <FaXTwitter className={styles.icon} title='تويتر' />

                            </a>
                        </div>
                    </div>
                    <a href={contactfooter[0]?.location} className={' nav-link'} target='_blank' >


                        <span > <span id={styles.asema}> {contactfooter[0]?.address}</span>  <MdLocationPin className={styles.icon} /></span>
                    </a>
                    {/* <div id={styles.asema}>العاصمة الادارية _ الحي الحكومي <MdLocationPin className={styles.icon} /></div> */}
                    <div id={styles.dateday} className='text-end me-md-5 pe-md-5 '>  {new Date().toISOString().split('T')[0]}</div>
                </div>
                <div className={styles.part2 + " d-none d-md-flex"}>
                    <div className=' col-12 col-md-12  me-md-5 me-lg-5 container  pe-5 py-2 py-md-3 py-lg-3 d-flex justify-content-between align-items-center  h-100 '>
                        {
                            path.map((el, index) => {
                                const isActive = el.links.some(link =>
                                    link.path === '/'
                                        ? location.pathname === '/'
                                        : location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                                );
                                return (
                                    <Link
                                        key={index}
                                        to={el.mainPath || el.links[0].path}
                                        className={`nav-link ${styles.linkfont} ${isActive ? styles.activelink : ""}`}
                                    >
                                        {el.name}
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
                {/* mobile view */}
                <div className={`d-flex d-md-none justify-content-between align-items-center w-100 px-3 py-2`} >
                    <img src={logo} alt="Logo" style={{ height: 40 }} />
                    <button id={styles.menuicon} onClick={() => setShowMobileMenu(true)} >
                        <IoMenu className="text-black" />
                    </button>
                </div>


                {/* <div className={styles.rotat + "  col-2"}></div> */}
            </div>
            {showMobileMenu && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    zIndex: 9999,
                    display: 'flex',
                    background: "white",
                    flexDirection: 'column',
                    alignItems: 'end',
                    overflow: "scroll",
                    justifyContent: "start",
                    padding: '30px 20px',
                    color: 'black'
                }} onClick={(e) => e.stopPropagation()}>
                    <div className="w-100 d-flex justify-content-between align-items-center mb-4">
                        <button onClick={() => setShowMobileMenu(false)} style={{ background: 'none', border: 'none', fontSize: 28, color: 'black' }}>×</button>
                        <div className='d-flex gap-2 align-items-center '>
                            <h6 className={` me-0 p-0 `}>مبادرة الألف يوم الذهبية</h6>
                            <img src={logo} height={50} width={70} alt="Logo" />
                        </div>
                    </div>

                    <div className="d-flex flex-column-reverse flex align-items-end w-100" id={styles.gaptextheader}>
                        {
                            path.map((el, index) => {
                                const isActive = el.links.some(link =>
                                    link.path === '/'
                                        ? location.pathname === '/'
                                        : location.pathname === link.path || location.pathname.startsWith(`${link.path}/`)
                                );

                                if (el.name === "الركن الإعلامي" || el.name ===  "تواصل معنا") {
                                    return (
                                        <Accordion key={index} className={`w-100 mb-2 border-0 mediaAccordion ${styles.mediaAccordion}`} alwaysOpen>
                                            <Accordion.Item eventKey="0" className="border-0">
                                                <Accordion.Header className={`w-100 p-0 m-0 bg-transparent border-0`}>
                                                    <div className="w-100 d-flex flex-row-reverse justify-content-between align-items-center">
                                                        <span className={`${styles.linkfont}`}>{el.name} <span className="accordion-icon" /></span>

                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body className="d-flex flex-column-reverse align-items-end gap-3  pt-4 pe-1">
                                                    {
                                                        el.links.map((sub, subIndex) => {
                                                            const subIsActive = location.pathname === sub.path || location.pathname.startsWith(`${sub.path}/`)
                                                            return (
                                                                <Link
                                                                    key={subIndex}
                                                                    to={sub.path}
                                                                    className={` nav-link  ${styles.linkfont} ${subIsActive ? styles.activelink : ""}`}
                                                                    onClick={() => setShowMobileMenu(false)}
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    )
                                }

                                return (
                                    <Link
                                        key={index}
                                        to={el.mainPath || el.links[0].path}
                                        className={`nav-link ${styles.linkfont} ${isActive ? styles.activelink : ""}`}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        {el.name}
                                    </Link>
                                )
                            })
                        }

                    </div>

                    <hr className='col-12 mt-4' />
                    <div className=' col-12 d-flex align-items-center gap-2 gap-md-4 mt-2 justify-content-center '>
                        {/* <IoSearch className={styles.icon} /> */}
                        <div className={styles.cycleicon + " d-flex justify-content-center align-items-center"}>

                            <Link to={'/login'} className=' d-flex justify-content-center align-items-center'>
                                <BsPersonCircle className={styles.icon} />
                            </Link>
                        </div>
                        <div className={styles.cycleicon + " d-flex justify-content-center align-items-center"}>

                            <a href="https://www.facebook.com/share/16iwfH8UVT/?mibextid=qi2Omg" target='_blank' className=' d-flex justify-content-center align-items-center'>

                                <FaFacebook className={styles.icon} title='فيسبوك' />
                            </a>
                        </div>
                        <div className={styles.cycleicon + " d-flex justify-content-center align-items-center"}>

                            <a href="https://instagram.com/mohpegypt?igshid=1t65jqxaoiwqb" target='_blank' className=' d-flex justify-content-center align-items-center'>

                                <PiInstagramLogoFill className={styles.icon} title='انستجرام' />
                            </a>                        </div>
                        <div className={styles.cycleicon + " d-flex justify-content-center align-items-center"}>

                            <a href="https://www.youtube.com/channel/UCzEGfjELHCOQxgPr0dll1pA?pbjreload=10" target='_blank' className=' d-flex justify-content-center align-items-center'>

                                <FaYoutube className={styles.icon} title='يوتيوب' />
                            </a>                        </div>
                        <div className={styles.cycleicon + " d-flex justify-content-center align-items-center"}>

                            <a href="https://x.com/mohpegypt" target='_blank' className=' d-flex justify-content-center align-items-center'>

                                <FaXTwitter className={styles.icon} title='تويتر' />
                            </a>                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}
