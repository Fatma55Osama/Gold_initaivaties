import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'
import { getAllData } from '../../Data/Repo/dataRepo';
import { usedetailsinfo, usedomain, usepathes, usepathimg } from '../../Store';
import { getDomain, getPathImg } from '../../configLoader';
import MediaComponent from '../../Component/MediaComponent';
export default function DetailsInfograph() {

    const { path } = usepathes()
    const location = useLocation()
    const { detailinfo, setdetailsinfo } = usedetailsinfo()

    const pathimg = getPathImg()


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
            console.log("detailnew", detailinfo)
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
            <MediaComponent none="d-none"  align="align-items-end"/>
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
                                        alt=""
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
    )
}
