import React from 'react'
// import './index.scss'
import styles from './index.module.css'
export default function Interlocuter() {
  return (
    <div className='col-12 d-flex align-iems-center  ' id={styles.backimg}>
      <div className='container d-flex flex-column text-center justify-content-evenly '>
        <h2>محاور المبادرة</h2>
        <div className='col-12 d-flex justify-content-between gap-4'>
           <div className='container d-flex' id={styles.imgbg1}>
            <div className=' col-12 my-2' id={styles.border}>
              <div className='col-12 d-flex flex-column text-center justify-content-between h-100 '>
                <h4 className='mt-5'>المحور الثالث</h4>
                <div className='py-2 text-center ' id={styles.boxtext}>تخفيض الوفيات ومضاعفات حديثي الولادة </div>
              </div>
            </div>
           </div>
           <div className='container d-flex' id={styles.imgbg2}>
            <div className=' col-12 my-2' id={styles.border}>
              <div className='col-12 d-flex flex-column text-center justify-content-between h-100 '>
                <h4 className='mt-5'>المحور الثالث</h4>
                <div className='py-2 text-center ' id={styles.boxtext}>تخفيض الوفيات ومضاعفات حديثي الولادة </div>
              </div>
            </div>
           </div>
           <div className='container d-flex' id={styles.imgbg3}>
            <div className=' col-12 my-2' id={styles.border}>
              <div className='col-12 d-flex flex-column text-center justify-content-between h-100 '>
                <h4 className='mt-5'>المحور الثالث</h4>
                <div className='py-2 text-center ' id={styles.boxtext}>تخفيض الوفيات ومضاعفات حديثي الولادة </div>
              </div>
            </div>
           </div>
        </div>
      </div>

    </div>
  )
}
