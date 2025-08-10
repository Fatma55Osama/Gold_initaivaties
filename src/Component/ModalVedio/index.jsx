import React from 'react'
import styles from './index.module.css'
import { useModalvedio, usePlay } from '../../Store'
import { IoMdCloseCircle } from 'react-icons/io'
export default function ModalVedio(props) {
    const { isplaying, setIsplaying } = usePlay()
    const { modalvedio, openModalvedio, closeModalvedio } = useModalvedio()
    function getYoutubeId(url) {
        if (!url || typeof url !== 'string') return null;

        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    return (
        <div className={styles.modalvedio}>
            <div className=' d-flex justify-content-end '>
                <IoMdCloseCircle onClick={() => closeModalvedio()} id={styles.iconarrowclose} />
            </div>
            <div className='col-12 mb-5 d-flex justify-content-between align-items-center '>
                <div className='col-6 ms-4 '>
                    <div onClick={(e) => e.stopPropagation()} className={styles.contentModal2 + " d-flex flex-row align-items-center"}>
                        {props?.vedioURL && getYoutubeId(props.vedioURL) && (
                            <iframe
                                src={`https://www.youtube.com/embed/${getYoutubeId(props.vedioURL)}`}
                                width="800"
                                height="500"
                                className='rounded-3'
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
                 <div className='col-6 text-end px-5' id={styles.h5}>
                       <h5>{props.vedioTitle}</h5>
                 </div>
            </div>


        </div>
    )
}
