import React from 'react'
import styles from './index.module.css'
import { usepathes } from '../../Store'
import { Link } from 'react-router-dom'
export default function ContactComponent() {
    const { path } = usepathes()

    return (
        <div>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-center ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-md-9 d-flex flex-column gap-3 pb-3'>
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


                <div className='d-flex mb-2 gap-3 gap-md-4 justify-content-between align-items-center '>

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
        </div>
    )
}
