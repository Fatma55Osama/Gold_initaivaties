import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './index.module.css'; // نفس ملف التنسيق المستخدم في باقي الصفحات
import ContactComponent from '../../Component/ContactComponent';
import { getDomain } from '../../configLoader';
import { postforgetpassword } from '../../Data/API/postforgetpassword';
import { ToastContainer } from 'react-toastify'

import { Bounce, toast } from 'react-toastify'
import NewPassword from '../../Component/NewPassword.jsx';

export default function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false);
    const domain = getDomain()

    const validationSchema = Yup.object({
        email: Yup.string().required('البريد الإلكتروني مطلوب').email('البريد الإلكتروني غير صالح'),

    });

    const handleSubmit = (values) => {
        // if (!values.email.endsWith("@gmail.com")) {
        //     toast.error("مسموح فقط ببريد Gmail");
        //     return;
        // }
        postforgetpassword(domain, values).then((res) => {
            if (res?.status === 200 || res?.status === 201) {
                toast.success('تم إرسال رابط إعادة تعيين كلمة المرور بنجاح');
                setSubmitted(true);
            } else {
                toast.success('إرسال رابط إعادة تعيين كلمة المرور إلى الإيميل');
                setSubmitted(true);
            }
        }).catch((err) => {
            console.error(err.response.data);
            toast.error('حدث خطأ أثناء إرسال الرابط وتأكد من صحة الإيميل، حاول مرة أخرى');
        });
    };

    return (
        <div>
            <ContactComponent none="d-none" hiddenheader="d-none" />
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
                {!submitted ? (
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form className="d-flex container flex-column gap-4" id={styles.form}>
                            <div className="form-group text-end d-flex flex-column gap-2">
                                <label htmlFor="email">البريد الإلكتروني</label>
                                <Field
                                    type="email"
                                    dir="rtl"
                                    name="email"
                                    placeholder="أدخل بريدك الإلكتروني"
                                    className="form-control"
                                    id={styles.input}
                                />
                                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                            </div>

                            <div className="text-end">
                                <button type="submit" className="btn btn-light px-4">إرسال</button>
                            </div>
                        </Form>
                    </Formik>
                ) : (
                    <NewPassword />
                )}
            </div>
        </div>

    );
}
