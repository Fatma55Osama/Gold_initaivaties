import React, { useEffect } from 'react'
import styles from './index.module.css'
import { FaLocationDot } from 'react-icons/fa6'
import { MdForwardToInbox, MdOutlineEmail } from 'react-icons/md'
import { LuPhone } from 'react-icons/lu'
import { SlLocationPin } from 'react-icons/sl'
import { Link, useLocation } from 'react-router-dom'
import { usecontactfooter, usedomain, usepathes } from '../../Store'
import { getAllData } from '../../Data/Repo/dataRepo'
import { getDomain } from '../../configLoader'
import ContactComponent from '../../Component/ContactComponent'
export default function ContactUs() {
    const { contactfooter, setcontactfooter } = usecontactfooter()
    const { path } = usepathes()
    const  domain  = getDomain()
    const location = useLocation()
    useEffect(() => {
        getAllData.get_storecontact(domain).then((res) => {
            setcontactfooter(res)
            console.log("contactusfooter", res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            <ContactComponent none="d-none"/>
            {/* <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2> تواصل معنا</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p className='justifyText'>
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


            </header> */}
            <div className='col-12 my-5' id={styles.contact}>
                <div className='container d-flex justify-content-end'>
                    {
                        contactfooter.length > 0 && (
                            <ul className='col-12 d-flex flex-column gap-5 align-items-end'>
                                <a href={contactfooter[0]?.location} target='_blank' className='nav-link col-12 d-flex justify-content-end  align-content-end'>
                                    
                                <li className='col-12 d-flex justify-content-end align-items-end'>  العنوان/  {contactfooter[0]?.address}&nbsp;&nbsp;   <SlLocationPin className={styles.iconcontact} /></li>
                                </a>
                                {/* <li>    صندوق بريد رقم/   11516 <MdForwardToInbox className={styles.iconcontact} /></li> */}
                                <li className='col-12 gap-3 gap-md-0 d-flex justify-content-end align-items-end'> {contactfooter[0]?.email} / بريد اليكترونى  <MdOutlineEmail className={styles.iconcontact} /></li>
                                <li className='col-12 gap-3 gap-md-0   d-flex justify-content-end align-items-end'>سويتش الوزارة &nbsp;&nbsp; {contactfooter[0]?.mobileNum}<LuPhone className={styles.iconcontact} /></li>
                            </ul>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
