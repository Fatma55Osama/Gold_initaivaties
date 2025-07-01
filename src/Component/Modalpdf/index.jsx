import React from 'react'
import styles from './index.module.css'
import { useModalpdf, usepathimg } from '../../Store'
import { IoMdCloseCircle } from 'react-icons/io'

export default function Modalpdf(props) {
    const { closeModalpdf } = useModalpdf()
    const { pathimg } = usepathimg()

    return (
        <div
            className="col-12 d-flex justify-content-center align-items-center"
            onClick={() => closeModalpdf()}
            id={styles.modalstyle}
        >
            
            <div className="d-flex flex-column align-items-end " onClick={(e) => e.stopPropagation()}>
                
                            <IoMdCloseCircle  onClick={() => closeModalpdf()} id={styles.iconarrowclose} />
                
                    <iframe
                        src={`${pathimg}/${props.folder}/${props.file}`}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                    />
               
            </div>
            
        </div>
    )
}
