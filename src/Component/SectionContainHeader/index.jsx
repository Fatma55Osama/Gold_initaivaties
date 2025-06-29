import React from 'react'
import styles from './index.module.css'
import logo from '../../assets/rectangle-6.png'
import freepik from '../../assets/freepik__mamy-and-her-baby__199261 1.png'
export default function SectionContainHeader() {
  return (
    <div className='col-12' id={styles.bgColor}>
       <div className='container d-flex align-items-center justify-content-between'>
        <div id={styles.logodiv1}>
            <img src={logo} width={328} height={200} alt="" />
        </div>
        <div className='d-flex flex-column justify-content-center text-center' id={styles.textSection}>
            <h3>مبــــــادرة</h3>
            <h4>الألــف يــوم الذهبيــة</h4>
            <h5>أطلقها رئيس الجمهورية بتاريخ 22 أغسطس 2023</h5>
        </div>
        <div id={styles.motherbaby}>
            <img src={freepik} width={215} height={304} alt="" />
        </div>
       </div>
    </div>
  )
}
