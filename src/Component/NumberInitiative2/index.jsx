import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import femal from '../../assets/family (3).png'
import child from '../../assets/family (2).png'
import family from '../../assets/family (1).png'
import { useinitiativenumber } from '../../Store'
export default function NumberInitiative2() {
    const { allinitivenumber, setinitivenumber } = useinitiativenumber()
    const [filterednumber, setFilterednumber] = useState([])
    useEffect(() => {
        let copyfilterednumber = [...allinitivenumber].filter((el) => { return el.onMainPage }).slice(0, 3)
        setFilterednumber(copyfilterednumber)
    }, [allinitivenumber])
    return (
        <div className='col-12 d-flex align-items-center' id={styles.number}>
            <div className='container d-flex flex-column justify-content-between gap-4 mt-5 ' id={styles.numbercontainer} >
                <h2>المبادرة في أرقام</h2>
                <div className='d-flex  justify-content-between align-items-center'data-aos="fade-up"
              data-aos-offset="100" data-aos-delay={50}>
                    {
                        filterednumber?.map((el) => {
                            return (
                                <div key={el.initId} className='col-3 d-flex flex-column justify-content-center align-items-center'
                                    >
                                    {/* <img src={femal} width={88} alt="" /> */}
                                    <h3>{el.indNumber}</h3>
                                    <span>{el.indTitle}</span>
                                </div>
                            )
                        })
                    }

                   
                </div>

            </div>
        </div>
    )
}
