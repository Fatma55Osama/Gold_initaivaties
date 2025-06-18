import React, { useEffect } from 'react'
import styles from './index.module.css'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowDropdown } from 'react-icons/io'
import { getAllData } from '../../Data/Repo/dataRepo';
import { usedetailsinfo, usedomain, usepathimg } from '../../Store';
export default function DetailsInfograph() {
    const navLinks = [
        { label: "الرسائل التوعوية", to: "/messages" },
        { label: "قائمة الإنفوجراف", to: "/infograph" },
        { label: "مكتبة الفيديو", to: "/video" },
        { label: "ألبومات الصور", to: "/Photo" },
        { label: "أخبار المبادرة", to: "/mediacorner" },
    ];
    const { detailinfo, setdetailsinfo } = usedetailsinfo()

    const { pathimg } = usepathimg()


    const { domain } = usedomain()
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
            <div className='col-12 position-relative ' id={styles.About}>
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
                {/* <div className=' d-flex align-items-center '>
                       <button>بحث</button>
                       <IoMdArrowDropdown />
                       <input type="text" />
                   </div> */}
                {/* <div className='d-flex bg-danger align-items-center gap-3' id={styles.search}>
                    <button className='py-0 px-4 border-0'>بحث</button>
                    <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

                        <span style={{ marginRight: '8px', color: '#aaa' }}><IoMdArrowDropdown style={{ color: "black" }} /></span>
                        <input type="text" placeholder="...بحث" className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
                    </div>
                </div> */}

                <div className='d-flex col-8  gap-4 justify-content-between align-items-center '>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            spy={true}
                            smooth={true}
                            duration={500}
                            to={link.to}
                            activeClass={styles.active}
                            className={" nav-link " + styles.sectionlink}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>


            </header>

            <div className=' flex-column mt-5 '>
                <h3 id={styles.h3info}>الإنفوجراف</h3>
            </div>
            <div className='col-12' id={styles.detailsinfo}>
                <div className='container py-4 mt-4'>
                    <div className='text-end d-flex flex-column gap-3'>
                        <h4>{detailinfo?.infoTitle}</h4>
                        <h5 className=' m-0' id={styles.h5info}>{formattedDate}</h5>
                        <div className='d-flex justify-content-end' id={styles.newscontainer}>
                            <div className='d-flex flex-column align-items-end gap-3' style={{ overflow: 'hidden' }}>
                                {detailinfo?.infoDesc?.split('\n').map((paragraph, index) => (
                                    <p id={styles.infoParagraph} key={index} style={{ textAlign: 'justify' }}>
                                        {paragraph}
                                    </p>
                                ))}
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
