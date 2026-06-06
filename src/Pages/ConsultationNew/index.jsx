import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.css'; // تأكدي أن الملف موجود فعلاً
import ContactComponent from '../../Component/ContactComponent';
import { Link } from 'react-router-dom';
import { getDomain } from '../../configLoader';
import { postConsultationNew } from '../../Data/API/postConsultationNew';
import { ToastContainer } from 'react-toastify'

import { Bounce, toast } from 'react-toastify'
import { getAllData } from '../../Data/Repo/dataRepo';
import { usedetailconsultationold, useprofileData } from '../../Store';

export default function ConsultationNew() {
    const { consultationold, setdetailsconsultation } = usedetailconsultationold()
    const { profileData, setProfileData } = useprofileData()
     let token = sessionStorage.getItem('token')
    const domain = getDomain()
    useEffect(() => {
        getAllData.get_show_consultationold(domain, token).then((res) => {
            setdetailsconsultation(res)
        })
        getAllData.get_store_profileData(domain, token).then((res) => {
            setProfileData(res)
        })
    }, [])
   
    const validationSchema = Yup.object({
        question: Yup.string().required('السؤال مطلوب'),
    });
    const handleSubmit = (values, { resetForm }) => {
        postConsultationNew(domain, token, values).then((res) => {
            if (res?.status === 200 || res?.status === 201) {
                toast.success('تم إرسال سؤالك  بنجاح، سنتواصل معك قريبًا'); resetForm();
                resetForm()
            } else {
                toast.error('حدث خطأ أثناء إرسال السؤال، حاول مرة أخرى');
            }
        })
            .catch((err) => {
                console.error(err);
                toast.error('حدث خطأ أثناء إرسال السؤال، حاول مرة أخرى');
            })

    };

    return (
        <div>
            <ContactComponent none="d-none" hidden="d-none" showheadsm="d-flex" showLimited={true} title="صفحتي الشخصية" />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className={`${styles.opinion} p-md-5 py-5 mt-2 rounded`}>
                {token ? (
                    <div className='d-flex flex-wrap  flex-md-nowrap justify-content-end  justify-content-md-between container gap-5 gap-md-0'>

                        <Formik
                            initialValues={{ question: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}

                        >
                            <Form className="d-flex container flex-column gap-4 col-lg-9 order-1 order-md-0" id={styles.form}>
                                <div className="form-group text-end d-flex flex-column gap-2">
                                    <label htmlFor="question">اكتب سؤالك</label>
                                    <Field
                                        as="textarea"
                                        dir="rtl"
                                        name="question"
                                        placeholder="ما هو سؤالك؟"
                                        className="form-control"
                                        rows="4"
                                        id={styles.input}
                                    />
                                    <ErrorMessage name="question" component="div" className="text-danger small mt-1" />
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-light px-4">إرسال</button>
                                </div>
                            </Form>
                        </Formik>
                        <div className={`${styles.profileCard} text-end p-3`}>
                            <div className={styles.profileItem}>
                                <span className={styles.label}>الاسم:</span>
                                <span className={styles.value}>
                                    {profileData?.userName || consultationold[0]?.regestration?.userName}
                                </span>
                            </div>
                            <div className={styles.profileItem}>
                                <span className={styles.label}>رقم الهاتف:</span>
                                <span className={styles.value}>
                                    {profileData?.mobileNum || consultationold[0]?.regestration?.mobileNum}
                                </span>
                            </div>
                            <div className={styles.profileItem}>
                                <span className={styles.label}>عدد الاستشارات:</span>
                                <span className={styles.value}>{consultationold.length}</span>
                            </div>
                        </div>

                    </div>

                ) : (
                    <div className="text-center  d-flex flex-column align-items-center" >
                        <h5 className="text-danger mb-3"> برجاء تسجيل الدخول  </h5>
                        <Link to={'/login'} className="btn text-white px-4"id={styles.btnlog}>تسجيل الدخول</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
