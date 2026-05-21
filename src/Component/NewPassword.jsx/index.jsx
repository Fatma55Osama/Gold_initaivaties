import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup'
import styles from './index.module.css'
import { postVerifyOTP } from '../../Data/API/postVerifyOTP';
import { getDomain } from '../../configLoader';
import { ToastContainer } from 'react-toastify'

import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Changepassword from '../Changepassword';

export default function NewPassword() {
    const [verifyOTP,setVerifyOTP]=useState(false)
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string().email('البريد الإلكتروني غير صالح').required('مطلوب'),
        otp: Yup.array().of(Yup.string().length(1, 'يجب أن يكون الرقم مكونًا من رقم واحد')).required('مطلوب'),
        // newPassword: Yup.string().min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل').required('مطلوب'),
    })
    const domain = getDomain()

    const handleSubmit = (values) => {
        console.log("value" + values)
        postVerifyOTP(domain, values).then((res) => {

            toast.success('تم التحقق من ال otp بنجاح' || res.data?.message);
            setVerifyOTP(true)
            // setTimeout(() => {
            //     navigate('/login');

            // }, 2000)


        }).catch((err) => {
            console.error(err);
            toast.error('حدث خطأ أثناء إعادة تعيين كلمة المرور، حاول مرة أخرى');
        });
    }
    return (
        <div className='container'>
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
            {
                !verifyOTP?( <Formik
                validationSchema={validationSchema}
                initialValues={{ email: "", otp: Array(6).fill('') }}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form className="text-center">
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

                        <h5 className="text-success my-4">
                            تم إرسال رمز التحقق (OTP) إلى بريدك الإلكتروني.
                        </h5>
                        <p className="text-muted mb-3">
                            من فضلك أدخل الرمز المكون من 6 أرقام
                        </p>

                        <div className="d-flex   justify-content-center gap-2 mb-4">
                            {values.otp.map((digit, index) => (
                                <Field
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/, '');
                                        setFieldValue(`otp[${index}]`, val);
                                        if (val && index < 5) {
                                            document.getElementById(`otp-${index + 1}`).focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && !values.otp[index] && index > 0) {
                                            document.getElementById(`otp-${index - 1}`).focus();
                                        }
                                    }}
                                    id={`otp-${index}`}
                                    className={`form-control text-center ${styles.btnotp}`}
                                    // style={{
                                    //     width: "50px",
                                    //     height: "50px",
                                    //     fontSize: "1.5rem",
                                    //     borderRadius: "8px",
                                    //     border: "1px solid #ccc"
                                    // }}
                                />
                            ))}

                        </div>

                        {/* <div className="form-group text-end d-flex flex-column gap-2">
                            <label htmlFor="newPassword">كلمة المرور الجديدة</label>
                            <Field
                                type="password"
                                dir="rtl"
                                name="newPassword"
                                placeholder="أدخل كلمة المرور الجديدة"
                                className="form-control"
                                id={styles.input}
                            />
                            <ErrorMessage name="newPassword" component="div" className="text-danger small mt-1" />
                        </div> */}

                        <button type="submit" className="btn btn-success mt-5 px-4">
                            تأكيد الرمز
                        </button>
                    </Form>
                )}
            </Formik>):<Changepassword/> 
            }
           </div>
    )
}
