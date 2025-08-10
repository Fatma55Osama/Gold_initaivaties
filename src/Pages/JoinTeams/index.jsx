import React from 'react'
import styles from './index.module.css'
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { Chart } from 'chart.js'
import { usedomain, usepathes } from '../../Store'
import { ToastContainer } from 'react-toastify'
import { Bounce, toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import { getDomain } from '../../configLoader'
import ContactComponent from '../../Component/ContactComponent'
import { postJion_team } from '../../Data/API/postJion_team'
export default function JoinTeams() {
    const domain = getDomain()
    const { path } = usepathes()
    const location = useLocation()
    const validationSchema = Yup.object({
        email: Yup.string().email('يرجى إدخال بريد إلكتروني صالح')
            .required('البريدالإلكتروني مطلوب'),
        name: Yup.string().required('الأسم مطلوب'),
        phone: Yup.string().required('رقم الهاتف مطلوب').matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01'),
        qualification: Yup.string().required("المؤهل مطلوب"),
        jop: Yup.string().required("الوظيفة مطلوبة")
    })
    const hadleSubmit = (values, { resetForm }) => {
        console.log(values);
        postJion_team(domain, values).then((res) => {
            if (res?.status === 200 || res?.status === 201) {
                toast.success('تم إرسال طلب الانضمام بنجاح، سنتواصل معك قريبًا'); resetForm();
                resetForm()
            } else {
                toast.error('حدث خطأ أثناء إرسال طلب الانضمام، حاول مرة أخرى');
            }
        })
            .catch((err) => {
                console.error(err);
                toast.error('حدث خطأ أثناء إرسال طلب الانضمام، حاول مرة أخرى');
            })
    }
    // {

    //         "name": "string",
    //         "email": "string",
    //         "mobileNum": "string",
    //         "opinionText": "string"
    // }
    return (
        <div>
            <ContactComponent none="d-none" />

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
            <div className={`${styles.opinion}  p-md-5 py-5 mt-2 rounded`}>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ name: "", email: "", phone: "", jop: "", qualification: "" }}
                    onSubmit={hadleSubmit}
                >
                    <Form className='d-flex container flex-column gap-4' id={styles.form}>
                        {/* <h2 className='text-end p-0 m-0'>رأيك يهمنا</h2> */}


                        <div className='form-group text-end d-flex flex-column gap-2'>
                            <label htmlFor="name">الاسم</label>
                            <Field type="text" dir="rtl" name="name" placeholder="اكتب اسمك" className="form-control" id={styles.input} />
                            <ErrorMessage name="name" component="div" className='text-danger small mt-1' />
                        </div>


                        <div className='form-group text-end '>
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="email">البريد الإلكتروني</label>
                                <Field type="email" dir="rtl" name="email" placeholder=" اكتب بريدك الإلكتروني" className="form-control" id={styles.input} />
                            </div>

                            <ErrorMessage name="email" component="div" className='text-danger small mt-1' />
                        </div>


                        <div className='form-group text-end '>
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="phone">رقم الهاتف</label>
                                <Field type="text" dir="rtl" name="phone" placeholder=" اكتب رقم هاتفك" className="form-control" id={styles.input} />
                            </div>

                            <ErrorMessage name="phone" component="div" className='text-danger small mt-1' />
                        </div>

                        <div className='form-group text-end'>
                            <div className='d-flex flex-column gap-2 position-relative'>
                                <label htmlFor="qualification">المؤهل</label>

                                <div className='position-relative'>
                                    <Field
                                        as="select"
                                        name="qualification"
                                        className={`form-control ${styles.dropdown}`}
                                        dir="rtl"
                                    >
                                        <option className='text-secondary' value="">اختر المؤهل</option>
                                        <option value="1">أمي</option>
                                        <option value="2">يقرأ ويكتب</option>
                                        <option value="3">ابتدائية</option>
                                        <option value="4">إعدادية</option>
                                        <option value="5">مؤهل متوسط</option>
                                        <option value="6">مؤهل فوق متوسط</option>
                                        <option value="7">مؤهل عالي</option>
                                        <option value="8">دبلومة</option>
                                        <option value="9">ماجستير</option>
                                        <option value="10">دكتوراه</option>
                                    </Field>
                                    {/* السهم */}
                                    <span className={styles.arrow}></span>
                                </div>
                            </div>

                            <ErrorMessage name="qualification" component="div" className='text-danger small mt-1' />
                        </div>

                        <div className='form-group text-end '>
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="phone"> الوظيفة الحالية</label>
                                <Field type="text" dir="rtl" name="jop" placeholder=" اكتب وظيفتك الحالية" className="form-control" id={styles.input} />
                            </div>

                            <ErrorMessage name="jop" component="div" className='text-danger small mt-1' />
                        </div>


                        {/* <div className='form-group text-end'>
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="opinion">رأيك</label>
                                <Field as="textarea" dir="rtl" name="opinion" placeholder="اكتب رأيك" className="form-control" id={styles.input} rows="3" />
                            </div>

                            <ErrorMessage name="opinion" component="div" className='text-danger small mt-1' />
                        </div> */}

                        <div className='text-end'>
                            <button type='submit' className='btn btn-light px-4'>إرسال</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
