import React from 'react'
import styles from './index.module.css'
import imgerr from '../../assets/error.png'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
export default function Errorpage() {
    return (
        <div className={styles.err}>
            <div className={"container d-flex flex-column align-items-center justify-content-center gap-4 "}>
                <img src={imgerr} width={600} alt="" />
                <h1>عذرًا! الصفحة غير موجودة</h1>       <p className=' col-lg-4 col-md-7 text-center'>حدث خطأ ما من فضلك أعد التجربة في وقت لاحق</p>
                <Link to={'/'} className={styles.backhome + ' nav-link btn py-3 px-3 rounded-0'}>                                 <IoIosArrowRoundBack className={styles.iconarrow} />
                    عودة</Link>
            </div>
        </div>
    )
}
<div className={styles.btnback + '  rounded-3 '}>

    <IoIosArrowRoundBack className={styles.iconarrow} />
    <button className='rounded-3 py-1 px-4'> عرض </button>
</div>