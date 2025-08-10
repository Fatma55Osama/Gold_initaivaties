import React, { useState } from 'react'
import styles from './index.module.css'
import { usepathes } from '../../Store'
import { Link } from 'react-router-dom'
export default function ContactComponent(props) {
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
            <header className={` col-12 d-flex align-items-center mt-5   container  ${props.none === "d-none" ? " justify-content-end" : "justify--between"} ${props.hidden == "d-flex" ? " d-none" : "d-flex"} ${props.hiddenheader == "d-none" ?"d-none":"d-flex"}`}>

                <div className={`align-items-center gap-3 ${props.none === "d-none" ? "d-none justify-content-end" : "d-flex justify-content-between"}`} id={styles.search}>                    <button className='py-0 px-4 border-0'>بحث</button>
                    <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

                        <span style={{ marginRight: '8px', color: '#aaa' }}></span>
                        <input type="text" placeholder="...بحث" value={props.searchTerm} onChange={props.handleSearch} className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
               content </div>
                <div className='d-flex mb-2 gap-3 gap-md-4 justify-content-between align-items-center '>

                    {
                        props.showLimited ? (path
                            .filter(el => el.name === "تواصل معنا")
                            .flatMap((el, index) => {
                                return el.links.slice(0, 2).map((link, idx) => {
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
                            })) : (path
                                .filter(el => el.name === "تواصل معنا")
                                .flatMap((el, index) => {
                                    return el.links.slice(5,).map((link, idx) => {
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
                                }))

                    }
                </div>


            </header>

        </div>
    )
}
