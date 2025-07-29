import React from 'react'
// import './index.scss'
import styles from './index.module.css'
import { useAbout } from '../../Store'
import { Link } from 'react-router-dom';
export default function Interlocuter() {
  const { allabout, setallabout } = useAbout()
  const about = allabout?.[0];
  return (
    <div className='col-12 d-flex align-iems-center  ' id={styles.backimg}>
      <div className='container d-flex flex-column text-center justify-content-evenly '>
        <h2>محاور المبادرة</h2>
        {about && (
          <div className='col-12 d-flex flex-column flex-md-row  justify-content-between gap-4'>
            <Link to="/about" state={{ targetSection: 'section1' }} className='nav-link container d-flex' id={styles.imgbg1} data-aos="fade-up"
              data-aos-offset="5" data-aos-delay={400} >
              <div className=' col-12 my-2' id={styles.border}>
                <div className='col-12 d-flex flex-column text-center justify-content-between h-100 '>
                  <h4 className='mt-5'>المحور الثالث</h4>
                  <div className='py-2 text-center ' id={styles.boxtext}>{about.pillar3}</div>
                </div>
              </div>
            </Link>

            <Link to="/about" state={{ targetSection: 'section1' }}className='container d-flex nav-link' data-aos="fade-up"
              data-aos-offset="30" data-aos-delay={500} id={styles.imgbg2}>
              <div className=' col-12 my-2' id={styles.border}>
                <div className='col-12 d-flex flex-column text-center justify-content-between h-100 '>
                  <h4 className='mt-5'>المحور الثاني</h4>
                  <div className='py-2 text-center ' id={styles.boxtext}>{about.pillar2}</div>
                </div>
              </div>
            </Link>

            <Link to="/about" state={{ targetSection: 'section1' }} className='nav-link container d-flex' data-aos="fade-up"
              data-aos-offset="5" data-aos-delay={600} id={styles.imgbg3}>
              <div className=' col-12 my-2' id={styles.border}>
                <div className='col-12 d-flex flex-column text-center justify-content-between h-100 '>
                  <h4 className='mt-5'>المحور الأول</h4>
                  <div className='py-2 text-center ' id={styles.boxtext}>{about.pillar1}</div>
                </div>
              </div>
            </Link>
          </div>
        )}

      </div>

    </div>
  )
}
