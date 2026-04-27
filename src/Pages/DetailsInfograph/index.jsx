import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'
import { getAllData } from '../../Data/Repo/dataRepo';
import { usedetailsinfo, usedomain, usepathes, usepathimg } from '../../Store';
import { getDomain, getPathImg, getSiteUrl } from '../../configLoader';
import MediaComponent from '../../Component/MediaComponent';
import Seo from '../../Component/SEO';
export default function DetailsInfograph() {

    const { path } = usepathes()
    const location = useLocation()
    const { detailinfo, setdetailsinfo } = usedetailsinfo()

    const pathimg = getPathImg()

    const currentUrl = location.pathname; // "/infograph"
    const siteUrl = getSiteUrl()

    const domain = getDomain()
    const params = useParams();
    let id = params.id;
    const formattedDate = new Date(detailinfo.publicationDate).toLocaleDateString('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    useEffect(() => {
        getAllData.get_show_singleinfograph(domain, id).then((res) => {
            setdetailsinfo(res)
        })

    }, [])
    console.log("linkinfogaraph",`${siteUrl}${currentUrl}`)
    return (
        <>
            {/* <Seo
                title={detailinfo?.infoTitle}
                description={detailinfo?.infoDesc || "تفاصيل الخبر"}
                image={detailinfo?.infoPhoto ? `${pathimg}/Infograph/${detailinfo?.infoPhoto}` : `${domain}/assets/1000Logo-WNOvseAe-WNOvseAe.png`}
                url={`${siteUrl}${currentUrl}`}
            /> */}
            <div className='col-12' id={styles.parentalldiv}>

                <MediaComponent none="d-none" align="align-items-end" />
                <div className='  d-flex align-items-end justify-content-center flex-column mt-5 '>
                    <h3 id={styles.h3info}>الإنفوجراف</h3>
                </div>
                <div className='col-12' id={styles.detailsinfo}>
                    <div className='container py-4 mt-4'>
                        <div className='text-end d-flex flex-column gap-3'>
                            <h4>{detailinfo?.infoTitle}</h4>
                            <h5 className=' m-0' id={styles.h5info}>{formattedDate}</h5>
                            <div className='d-flex justify-content-end' id={styles.newscontainer}>
                                <div className='d-flex flex-column align-items-end gap-3' style={{ overflow: 'hidden' }}>
                                    {/* {detailinfo?.infoDesc?.split('\n').map((paragraph, index) => (
                                    <p id={styles.infoParagraph} key={index} style={{ textAlign: 'justify' }}>
                                        {paragraph}
                                    </p>
                                ))} */}
                                    <p id={styles.infoParagraph} style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: detailinfo?.infoDesc }} />

                                    <div className='col-12 d-flex justify-content-center align-items-center '>
                                        <img
                                            src={`${pathimg}/Infograph/${detailinfo?.infoPhoto}`}
                                            alt={detailinfo?.infoPhotoAltText}
                                            width={550}
                                            height={661}
                                            style={{ float: 'left', marginRight: '15px', marginBottom: '10px' }}
                                        />
                                    </div>



                                </div>
                                {/* <p><img id={styles.newsImg} width={285} height={291} src={`/src/assets/Upfiles/News/${detailnew?.smallPhoto}`} alt="" />{detailnew?.newsText}</p> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
