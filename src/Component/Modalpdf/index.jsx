import React from 'react'
import styles from './index.module.css'
import { useModalpdf } from '../../Store'

export default function Modalpdf(props) {
    const { closeModalpdf } = useModalpdf()

    return (
        <div
            className="col-12 d-flex justify-content-center align-items-center"
            onClick={() => closeModalpdf()}
            id={styles.modalstyle}
        >
            <div className="" onClick={(e) => e.stopPropagation()}>
                
                    <iframe
                        src={`/src/assets/Upfiles/About/${props.file}`}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                    />
               
            </div>
        </div>
    )
}
