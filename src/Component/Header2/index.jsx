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
            <div className='col-7 ' id={styles.halfheader}>
                <div className={styles.part1 + " container d-flex justify-content-between py-2"}>
                    <div className='d-flex align-items-center gap-4 '>
                        <IoSearch className={styles.icon} />
                        <div className='d-flex gap-3'>
                            <FaFacebook className={styles.icon} />
                            <PiInstagramLogoFill className={styles.icon} />
                            <ImLinkedin className={styles.icon} />
                            <AiFillTwitterCircle className={styles.icon} />
                        </div>
                    </div>
                    <div>العاصمة الادارية _ الحي الحكومي <MdLocationPin className={styles.icon} /></div>
                    <div className='text-end me-5 pe-4'>05 مايو 2025</div>
                </div>
                <div className={styles.part2}>
                <div className=' col-12 me-5 container pe-5 py-3 d-flex justify-content-between align-items-center  h-100 '>
                    {
                        path.map((el,index)=>{
                            return(
                               <Link className={` nav-link ${styles.linkfont}  ${el.path==activePath? styles.activelink:null} `} to={el.path}>{el.name} </Link>
                            )
                        })
                    }
                </div>
                </div>
            </div>
            <div className={styles.rotat + "  col-2"}></div>
        </div>
    )
}
