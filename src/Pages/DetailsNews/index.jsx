import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'
import { getAllData } from '../../Data/Repo/dataRepo';
import { usedetailsnew, usedomain, usepathes, usepathimg } from '../../Store';
import { getDomain, getPathImg } from '../../configLoader';
import MediaComponent from '../../Component/MediaComponent';
export default function DetailsNews() {

    const { detailnew, setdetailsnew } = usedetailsnew()
    const pathimg = getPathImg()

    const domain = getDomain()
    const params = useParams();
    let id = params.id;
    const formattedDate = new Date(detailnew.publishDate).toLocaleDateString('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    useEffect(() => {
        getAllData.get_show_singleNew(domain, id).then((res) => {
            setdetailsnew(res)
        })

    }, [])
    return (
        <div className='col-12' id={styles.parentalldiv}>
   
            <MediaComponent none="d-none" align="align-items-end" />

            <div className=' container  mt-5 '>
                <h3 id={styles.h3news}>الأخبار</h3>
            </div>
            <div className='col-12' id={styles.details}>

                <div className='container py-1 mt-3'>

                    <div className='text-end d-flex flex-column gap-3'>
                        <div>{ }</div>
                        <h4>{detailnew?.title}</h4>
                        <h5 className=' m-0' id={styles.h5new}>{formattedDate}</h5>
                        <div className='d-flex flex-column justify-content-end' id={styles.newscontainer}>
                            <div style={{ overflow: 'hidden' }} className='d-flex flex-column' id={styles.colimgtitle}>
                                <p id={styles.newsParagraph} style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: detailnew?.newsTextOne }} />

                                <img
                                    src={`${pathimg}/News/${detailnew?.largPhoto}`}
                                    alt={detailnew?.largPhotoAltText}

                                  
                                    style={{ marginRight: '15px', marginBottom: '10px' }}
                                />

                                <p id={styles.newsParagraph} className='py-5' style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: detailnew?.newsTextTwo }} />
                                <div className='d-flex col-12  justify-content-end  gap-2 mb-5' id={styles.source}>
                                    <p style={{ textAlign: 'justify' , fontSize:"15px"}} className='mt-1 mt-md-0' dangerouslySetInnerHTML={{ __html: detailnew?.newsSource }} />
                                    <h5 className=' m-0 pt-1' id={styles.h5new}>  / المصدر   </h5>

                                </div>
                                {/* <p id={styles.newsParagraph} key={index} style={{ textAlign: 'justify' }}  dangerouslySetInnerHTML={{ __html: detailnew?.newsText }}/> */}

                            </div>
                            {/* <p><img id={styles.newsImg} width={285} height={291} src={`/src/assets/Upfiles/News/${detailnew?.smallPhoto}`} alt="" />{detailnew?.newsText}</p> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
