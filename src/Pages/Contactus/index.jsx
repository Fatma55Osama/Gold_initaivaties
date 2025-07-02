import React from 'react'
import styles from './index.module.css'
import { FaLocationDot } from 'react-icons/fa6'
import { MdForwardToInbox, MdOutlineEmail } from 'react-icons/md'
import { LuPhone } from 'react-icons/lu'
import { SlLocationPin } from 'react-icons/sl'
import { Link, useLocation } from 'react-router-dom'
import { usepathes } from '../../Store'
export default function ContactUs() {
    const { path } = usepathes()
    const location = useLocation()
    return (
        <div>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2> تواصل معنا</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p>
تهم المبادرة بتحقيق التواصل المستمر مع المستفيدين وذلك لتحقيق أعلى قدر من الخدمات، لذا يمكنكم التواصل مع المبادرة عبر وسائل التواصل التالية:</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className=' col-12 d-flex justify-content-end mt-5   container  '>
                

                <div className='d-flex   gap-4 justify-content-between align-items-center '>
                    
                    {
                        path
                            .filter(el => el.name === "تواصل معنا")
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


            </header>
            <div className='col-12 my-5' id={styles.contact}>
                <div className='container d-flex justify-content-end'>
                    <ul className='d-flex flex-column gap-5  align-items-end'>
                        <li>  العنوان/ 3 ش مجلس الشعب - القاهرة <SlLocationPin className={styles.iconcontact} /></li>
                        <li>    صندوق بريد رقم/   11516 <MdForwardToInbox className={styles.iconcontact} /></li>
                        <li>  nichp@mohp.gov.eg / بريد اليكترونى  <MdOutlineEmail className={styles.iconcontact} /></li>
                        <li>سويتش الوزارة  27951821  - 27943462  -   27964281<LuPhone className={styles.iconcontact} /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
