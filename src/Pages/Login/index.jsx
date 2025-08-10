import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'; // لو بتستخدمي React Router
import styles from './index.module.css'; // نفس ملف CSS المستخدم في Register
import ContactComponent from '../../Component/ContactComponent';

export default function Login() {
    const validationSchema = Yup.object({
        phone: Yup.string().required('رقم الهاتف مطلوب').matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01'),

        password: Yup.string().required('كلمة المرور مطلوبة'),
    });

    const handleSubmit = (values) => {
        console.log(values);
        // هنا تضيفي كود تسجيل الدخول
    };

    return (
        <div>
                <ContactComponent none="d-none" hiddenheader="d-none" />
            <div className={`${styles.opinion} p-md-5 py-5 mt-2 rounded`}>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="d-flex container flex-column gap-4" id={styles.form}>
                        <div className="form-group text-end d-flex flex-column gap-2">
                            <label htmlFor="phone">رقم الهاتف</label>
                            <Field
                                type="text"
                                dir="rtl"
                                name="phone"
                                placeholder="ادخل رقم هاتفك"
                                className="form-control"
                                id={styles.input}
                            />
                            <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                        </div>

                        <div className="form-group text-end d-flex flex-column gap-2">
                            <label htmlFor="password">كلمة المرور</label>
                            <Field
                                type="password"
                                dir="rtl"
                                name="password"
                                placeholder="ادخل كلمة المرور"
                                className="form-control"
                                id={styles.input}
                            />
                            <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-light px-4">دخول</button>
                        </div>

                        <div className="d-flex flex-column align-items-end gap-2 mt-3">
                            <Link to="/forgetpassword" className="text-decoration-none text-danger">
                                نسيت كلمة المرور؟
                            </Link>
                            <Link to="/register" className="text-decoration-none text-primary">
                                مستخدم جديد؟ سجل علي البوابة الآن
                            </Link>
                           
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    );
}
