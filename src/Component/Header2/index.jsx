import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { IoSearch } from 'react-icons/io5'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { ImLinkedin } from 'react-icons/im'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { MdLocationPin } from 'react-icons/md'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { usepathes } from '../../Store'
import { Link, useLocation } from 'react-router-dom'
export default function Header2() {
    const { path } = usepathes()
    const [activePath, setActivePath] = useState()
    const location = useLocation()
    useEffect(() => {
        setActivePath(location.pathname)

    }, [location])

    return (
        <div className='col-12  align-items-start d-flex justify-content-start'>
            <div className='col-12 col-md-11 col-lg-8 ' id={styles.halfheader}>
                <div className={styles.part1 + " container  d-flex justify-content-between py-2 px-3"}>
                    <div className='d-flex align-items-center gap-2 gap-md-4 '>
                        <IoSearch className={styles.icon} />
                        <div className='d-flex gap-2 gap-md-3'>
                            <FaFacebook className={styles.icon} />
                            <PiInstagramLogoFill className={styles.icon} />
                            <ImLinkedin className={styles.icon} />
                            <AiFillTwitterCircle className={styles.icon} />
                        </div>
                    </div>
                    <div id={styles.asema}>العاصمة الادارية _ الحي الحكومي <MdLocationPin className={styles.icon} /></div>
                    <div id={styles.dateday} className='text-end me-md-5 pe-5 '>  {new Date().toISOString().split('T')[0]}</div>
                </div>
                <div className={styles.part2}>
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
            </div>
            <div className={styles.rotat + "  col-2"}></div>
        </div>
    )
}
