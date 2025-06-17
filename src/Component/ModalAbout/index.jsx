import React from 'react'
import styles from './index.module.css'
import { useModal } from '../../Store'

export default function ModalAbout(props) {
    const { closeModal } = useModal()

    return (
        <div
            className="col-12 d-flex justify-content-center align-items-center"
            onClick={() => closeModal()}
            id={styles.modalstyle}
        >
            <div className="" onClick={(e) => e.stopPropagation()}>
                <img src={props.img} alt="عرض" style={{ maxWidth: '100%', maxHeight: '90vh' }} />
            </div>
        </div>
    )
}
