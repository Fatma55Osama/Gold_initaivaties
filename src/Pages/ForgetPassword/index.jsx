import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.css'; // نفس ملف التنسيق المستخدم في باقي الصفحات
import ContactComponent from '../../Component/ContactComponent';

export default function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false);

    const validationSchema = Yup.object({
        phone: Yup.string().required('رقم الهاتف مطلوب').matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01'),

    });

    const handleSubmit = (values) => {
        console.log('إرسال رابط إعادة تعيين كلمة المرور إلى:', values.email);
        // هنا تضيفي كود الإرسال الحقيقي
        setSubmitted(true);
    };

    return (
        <div>
            <ContactComponent none="d-none" hiddenheader="d-none"/>

            <div className={`${styles.opinion} p-md-5 py-5 mt-2 rounded`}>
                {!submitted ? (
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="d-flex container flex-column gap-4" id={styles.form}>
                            <div className="form-group text-end d-flex flex-column gap-2">
                                <label htmlFor="phone">رقم الهاتف</label>
                                <Field
                                    type="phone"
                                    dir="rtl"
                                    name="phone"
                                    placeholder="أدخل رقم هاتفك"
                                    className="form-control"
                                    id={styles.input}
                                />
                                <ErrorMessage name="text" component="div" className="text-danger small mt-1" />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-light px-4">إرسال</button>
                            </div>
                        </Form>
                    </Formik>
                ) : (
                    <div className="text-center">
                        <h5 className="text-success">تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.</h5>
                    </div>
                )}
            </div>
        </div>

    );
}
