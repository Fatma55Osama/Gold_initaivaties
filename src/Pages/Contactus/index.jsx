import React from 'react'
import styles from './index.module.css'
import { FaLocationDot } from 'react-icons/fa6'
import { MdForwardToInbox, MdOutlineEmail } from 'react-icons/md'
import { LuPhone } from 'react-icons/lu'
import { SlLocationPin } from 'react-icons/sl'
export default function ContactUs() {
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
                                    <p>يعرض هذا القسم باقة مختارة من التواصل</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 my-5' id={styles.contact}>
                <div className='container d-flex justify-content-end'>
                    <ul className='d-flex flex-column gap-5  align-items-end'>
                        <li>  العنوان/ 3 ش مجلس الشعب - القاهرة <SlLocationPin className={styles.iconcontact}/></li>
                        <li>    صندوق بريد رقم/   11516 <MdForwardToInbox className={styles.iconcontact} /></li>
                        <li>  nichp@mohp.gov.eg / بريد اليكترونى  <MdOutlineEmail className={styles.iconcontact} /></li>
                        <li>سويتش الوزارة  27951821  - 27943462  -   27964281<LuPhone className={styles.iconcontact} /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
