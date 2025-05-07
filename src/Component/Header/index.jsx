import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import { RiMenu2Fill } from 'react-icons/ri';
import { FaUserAlt } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import logo from '../../assets/1000Logo-WNOvseAe.png'
import { Dropdown } from 'react-bootstrap';
import './index.scss'
import { Link, useLocation } from 'react-router-dom';
import { usepathes } from '../../Store';
export default function Header() {
    const { path } = usepathes()
    const [activePath, setActivePath] = useState()
    const location = useLocation()
    useEffect(() => {
        setActivePath(location.pathname)
       
    }, [location])

    return (
        <div className={styles.header + ' col-12 '}>
            <div className={styles.part1 + " d-flex  h-100 align-items-center align-content-between justify-content-between gap-5 "}>

                <div className='  ms-3 justify-content-center '>
                    {/* <img src={logo} width={100} alt="" /> */}
                </div>
                <div className=' col-8 me-4 d-flex justify-content-between align-items-center  h-100 '>
                    {
                        path.map((el,index)=>{
                            return(
                               <Link className={` nav-link ${styles.linkfont}  ${el.path==activePath? styles.activelink:null} `} to={el.path}>{el.name} </Link>
                            )
                        })
                    }
                </div>

            </div>
            <div className={styles.part2 + " col-12 d-flex flex-row "}>
                <div className='col-12'>
                    {/* <div className='co-11  py-4 px-4 d-flex align-items-center justify-content-between'>
                        <div className='text-center '>
                        <h1 className='text-center'>PrimeCare </h1>
                        </div>
                        <div className='bg d-flex align-items-center gap-5' >
                            <div className='text-uppercase d-flex align-items-center  gap-2'>
                                <span> Login</span>
                            <FaUserAlt /> 
                            </div>
                            <IoSearch style={{fontSize:"20px"}} />
                            </div>
                    </div> */}
                </div>

            </div>
        </div>
    )
}
