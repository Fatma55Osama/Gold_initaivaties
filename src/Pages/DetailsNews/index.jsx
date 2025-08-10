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
            console.log("detailnew", detailnew)
        })

    }, [])
    return (
        <div className='col-12' id={styles.parentalldiv}>
            {/* <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>الركن الإعلامي</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p >يعرض هذا الجزء أخبار المبادرة على الصعيدين الداخلي والخارجي، كما يعرض فيديوهات وألبومات صور لتوثيق الفعاليات والأنشطة التي تُنفذها المبادرة.
                                        هذا بالإضافة إلى التوعية المستمرة بأهمية المبادرة لتحسين الخصائص السكانية من خلال مجموعة من الإنفوجراف والرسائل التوعوية </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className=' col-12  d-flex justify-content-end mt-5   container  '>
               

                <div className='d-flex col-8  gap-4 justify-content-between align-items-center '>
                    {
                        path
                            .filter(el => el.name === "الركن الإعلامي")
                            .flatMap((el, index) => {
                                return el.links.map((link, idx) => {
                                    const isActive =
                                        link.path === '/'
                                            ? location.pathname === '/'
                                            : location.pathname === link.path || location.pathname.startsWith(`${link.path}/`);

                                    return (
                                        <Link
                                            key={`${index}-${idx}`}
                                            to={link.path}
                                            className={`nav-link ${styles.sectionlink} ${isActive ? styles.activelink : ""}`}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                });
                            })
                    }
                </div>


            </header> */}
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
                                    alt=""

                                    height={400}
                                    style={{ marginRight: '15px', marginBottom: '10px' }}
                                />

                                <p id={styles.newsParagraph} className='py-5' style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: detailnew?.newsTextTwo }} />
                                <div className='d-flex  justify-content-end gap-2 mb-5'>
                                    <p style={{ textAlign: 'justify' , fontSize:"15px"}}  dangerouslySetInnerHTML={{ __html: detailnew?.newsSource }} />
                                    <h5 className=' m-0 pt-2' id={styles.h5new}>  / المصدر   </h5>

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
