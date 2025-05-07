import React from 'react'
import styles from './index.module.css'
import femal from '../../assets/family (3).png'
import child from '../../assets/family (2).png'
import family from '../../assets/family (1).png'
export default function NumberInitiative() {
  return (
    <div className='col-12'id={styles.number}>
        <div className='container d-flex flex-column justify-content-between gap-4 mt-3 '>
            <h2>المبادرة في أرقام</h2>
            <div className='d-flex  justify-content-between'>
            <div className='col-3 d-flex flex-column justify-content-center align-items-center'>
                <img src={femal} width={88} alt="" />
                <h3>4,519</h3>
                <span>عدد المستفيدات من مشورة الحامل</span>
            </div>
            <div className='col-3 d-flex flex-column justify-content-center align-items-center'>
                <img src={child} width={88} alt="" />
                <h3>4,519</h3>
                <span>عدد المستفين من مشورة الأطفال</span>
            </div>
            <div className='col-3 d-flex flex-column justify-content-center align-items-center'>
                <img src={family} width={88} alt="" />
                <h3>4,519</h3>
                <span>عدد المستفيدات من المشورة الأسرية</span>
            </div>
            </div>
        
        </div>
    </div>
  )
}
