import React, { useEffect } from 'react'
import styles from './index.module.css'
import ServiceComponent from '../../Component/ServiceComponent'
import pdfimg from '../../assets/pdfimg.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usedetailsservice, usedomain, useModalpdf, useServicemain } from '../../Store'
import { getAllData } from '../../Data/Repo/dataRepo'
import Modalpdf from '../../Component/Modalpdf'
import { FaFilePdf } from 'react-icons/fa'
import { getDomain } from '../../configLoader'
export default function HospitalService() {
    const parmas = useParams()
    const navigate = useNavigate()
    let id = parmas.id
    const  domain  = getDomain()
    const { modalpdf, openModalpdf, closeModalpdf } = useModalpdf()
    const { allservice, setservice } = useServicemain()

    const { detailservice, setdetailsservice } = usedetailsservice()
    useEffect(() => {
        if (!id) return;
        getAllData.get_show_single_service(domain, id).then((res) => {
            setdetailsservice(res)
            console.log("detailservice", detailservice)
        })
    }, [id])
    useEffect(() => {
        if (!id && allservice.length > 0) {
            navigate(`/Services/${allservice[0].mashoraId}`, { replace: true });
        }
    }, [id, allservice, navigate]);

    return (
        <div>
            <ServiceComponent />
            <div className={" col-12 container d-flex flex-column gap-4 pb-3 align-items-end  mt-5 mb-5 " + styles.containerhospital}>
                <h2> {detailservice[0]?.mashoraDesc} </h2>
                <div className='col-12 d-flex  justify-content-end my-3 gap-3' >
                    {/* <img onClick={openModalpdf} src={pdfimg} alt="PDF" width={30} height={30} /> */}
                    <p className={styles.justifyText} dangerouslySetInnerHTML={{ __html: detailservice[0]?.servDesc }}/>
                </div>
                <div onClick={openModalpdf} className={styles.btnback + ' px-1 rounded-3 d-flex align-items-center'}>

                    <FaFilePdf className={styles.iconfile} />
                    <button className='rounded-3 py-1 px-4'> عرض الملف   </button>
                </div>
            </div>
            {modalpdf && (
                <Modalpdf file={detailservice?.[0]?.mashoraFile} folder="Services" />
            )}
        </div>
    )
}
