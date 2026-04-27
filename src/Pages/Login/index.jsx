import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; // لو بتستخدمي React Router
import styles from './index.module.css'; // نفس ملف CSS المستخدم في Register
import ContactComponent from '../../Component/ContactComponent';
import { postlogin } from '../../Data/API/postlogin';
import { getDomain } from '../../configLoader';
import { ToastContainer } from 'react-toastify'

import { Bounce, toast } from 'react-toastify'

export default function Login() {
    const domain = getDomain()
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        // phone: Yup.string().required('رقم الهاتف مطلوب').matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01'),
        username: Yup.string().required('اسم المستخدم مطلوب'),
        password: Yup.string().required('كلمة المرور مطلوبة'),
    });

    const handleSubmit = (values, { resetForm }) => {
        postlogin(domain, values).then((res) => {
            if (res?.status === 200 || res?.status === 201) {
                toast.success('تم تسجيل الدخول بنجاح');
                resetForm()
                const token = res.data.token;
                sessionStorage.setItem("token", res.data.regesterId)
                // sessionStorage.setItem("token", res.data.token)

                setTimeout(() => {
                    navigate('/consultationnew')

                }, 2000)
            } else {
                toast.error('تعذر تسجيل الدخول، تأكد من بياناتك وحاول مرة أخرى');
            }
        }).catch((err) => {
            console.log(err);
            const errorMsg = err.response?.data || "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى لاحقًا";
            if (err.response?.data) {
                toast.error(errorMsg);
            } else {
                toast.error(errorMsg);
            }
        });

    };

    return (
        <div>
            <ContactComponent none="d-none" hiddenheader="d-none" />
            <div className={`${styles.opinion} p-md-5 py-5 mt-2 rounded`}>
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
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    <Form className="d-flex container flex-column gap-4" id={styles.form}>
                        {/* <div className="form-group text-end d-flex flex-column gap-2">
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
                        </div> */}

                        <h3 className='text-end'>تسجيل الدخول </h3>
                        <div className="form-group text-end d-flex flex-column gap-2">
                            <label htmlFor="username">اسم المستخدم</label>
                            <Field
                                type="text"
                                dir="rtl"
                                name="username"
                                placeholder="ادخل اسم المستخدم"
                                className="form-control"
                                id={styles.input}
                            />
                            <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
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
