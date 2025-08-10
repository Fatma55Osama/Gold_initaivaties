import React, { useState } from 'react'
import { usepathes } from '../../Store';
import styles from './index.module.css'
import { Link } from 'react-router-dom';
export default function MediaComponent(props) {
  const { path } = usepathes()
 
  return (
    <div>
      <div className='col-12 position-relative ' id={styles.About}>
        <div className='col-12 ' id={styles.AboutLogo}>

        </div>
        <div className='col-12 position-absolute d-flex align-items-center ' id={styles.bgColor}>
          <div className='container text-end d-flex justify-content-end '>
            <div className='col-md-9 d-flex flex-column gap-3 pb-3'>
              <h2>الركن الإعلامي</h2>
              <div className='col-12  ' id={styles.regtangle}>
                <div className='container '>
                  <p className='justifyText'>يعرض هذا الجزء أخبار المبادرة على الصعيدين الداخلي والخارجي، كما يعرض فيديوهات وألبومات صور لتوثيق الفعاليات والأنشطة التي تُنفذها المبادرة.
                    هذا بالإضافة إلى التوعية المستمرة بأهمية المبادرة لتحسين الخصائص السكانية من خلال مجموعة من الإنفوجراف والرسائل التوعوية </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className={`col-12 d-flex flex-column-reverse flex-lg-row ${
    props.align === "align-items-end"
      ? "justify-content-end align-items-end"
      : "justify-content-between align-items-lg-center"
  } mt-5 gap-4 gap-lg-0 container`}>

        <div className={` ${props.none} d-flex align-items-center gap-3`} id={styles.search}>
          <button className='py-0 px-4 border-0'>بحث</button>
          <div className="input-container" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(114, 71, 128, 1)', borderRadius: '4px', padding: '5px' }}>

            <span style={{ marginRight: '8px', color: '#aaa' }}></span>
            <input type="text" placeholder="...بحث" value={props.searchTerm} onChange={props.handleSearch} className='text-end' style={{ border: 'none', outline: 'none', flex: 1 }} />
          </div>
        </div>

        <div className={`  d-none d-md-flex  gap-4 justify-content-between align-items-center `}>

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


      </header>
    </div>
  )
}
