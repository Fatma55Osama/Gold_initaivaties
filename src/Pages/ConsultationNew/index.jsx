import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.css'; // تأكدي أن الملف موجود فعلاً
import ContactComponent from '../../Component/ContactComponent';

export default function ConsultationNew() {
    const [submitted, setSubmitted] = useState(false);

    const validationSchema = Yup.object({
        question: Yup.string().required('السؤال مطلوب'),
    });

    const handleSubmit = (values) => {
        console.log('تم إرسال السؤال:', values.question);
        // هنا تضيفي كود الإرسال الحقيقي (API)
        setSubmitted(true);
    };

    return (
        <div>
            <ContactComponent none="d-none" hidden="d-none" showLimited={true}/>

            <div className={`${styles.opinion} p-md-5 py-5 mt-2 rounded`}>
                {!submitted ? (
                    <div className='d-flex justify-content-between container'>

                        <Formik
                            initialValues={{ question: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}

                        >
                            <Form className="d-flex container flex-column gap-4 col-9" id={styles.form}>
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
                        <div className={`${styles.profileCard} text-end`}>
                            <div className={styles.profileItem}>
                                <span className={styles.label}>الاسم:</span>
                                <span className={styles.value}>فاطمة محمد</span>
                            </div>
                            <div className={styles.profileItem}>
                                <span className={styles.label}>رقم الهاتف:</span>
                                <span className={styles.value}>01012345678</span>
                            </div>
                            <div className={styles.profileItem}>
                                <span className={styles.label}>عدد الاستشارات:</span>
                                <span className={styles.value}>3</span>
                            </div>
                        </div>

                    </div>

                ) : (
                    <div className="text-center">
                        <h5 className="text-success">✅ تم إرسال سؤالك بنجاح، سنقوم بالرد قريباً.</h5>
                    </div>
                )}
            </div>
        </div>
    );
}
