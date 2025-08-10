import React from 'react'
import ContactComponent from '../../Component/ContactComponent'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './index.module.css'
import * as Yup from 'yup'
import { getDomain } from '../../configLoader'
import { ToastContainer } from 'react-toastify'
import { Bounce, toast } from 'react-toastify'
import { postregisteration } from '../../Data/API/postregisteration'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate()
    const domain = getDomain()
    const validationSchema = Yup.object({
        email: Yup.string().email('يرجى إدخال بريد إلكتروني صالح')
            .required("بريد إلكتروني مطلوب"),
        username: Yup.string()
            .required('الأسم ثلاثي مطلوب').matches(/^\s*[\u0600-\u06FFa-zA-Z]+(\s+[\u0600-\u06FFa-zA-Z]+){2,}\s*$/, 'الأسم يجب أن يكون ثلاثي على الأقل')
        , name: Yup.string().required("اسم المستخدم مطلوب"),
        phone: Yup.string().required('رقم الهاتف مطلوب').matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01'),
        qualification: Yup.string().required('الحالة التعليمية مطلوبة'),
        statework: Yup.string().required('الحالة العملية مطلوبة'),
        password: Yup.string().required('كلمة المرور مطلوبة').min(6, 'الباسورد لازم يكون 6 أحرف أو أكتر')

    })
    const hadleSubmit = (values, { resetForm }) => {
        console.log(values);
        postregisteration(domain, values).then((res) => {
            if (res?.status === 200 || res?.status === 201) {
                toast.success('تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول');
                resetForm();
                setTimeout(() => {
                    navigate('/login')

                }, 2000)
            } else if (res?.data?.message?.includes('exists')) {
                toast.error('هذا الحساب موجود بالفعل');
            } else {
                toast.error('حدث خطأ أثناء التسجيل، حاول مرة أخرى');
            }
        })
            .catch((err) => {
                console.log(err);
                const errorMsg = err.response?.data || "حدث خطأ ما";
                if (err.response?.data) {
                    toast.error(errorMsg);
                } else {
                    toast.error(errorMsg);
                }
            });

    }
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
            <div className={`${styles.opinion}  p-md-5 py-5 mt-2 rounded`}>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ name: "", username: "", email: "", phone: "", qualification: "", statework: "", password: "" }}
                    onSubmit={hadleSubmit}
                >
                    <Form className='d-flex container flex-column gap-4' id={styles.form}>


                        <div className='form-group text-end d-flex flex-column gap-2'>
                            <label htmlFor="username"  > الاسم ثلاثي</label>
                            <Field type="text" dir="rtl" name="username" placeholder="اكتب اسمك" className="form-control" id={styles.input} />
                            <ErrorMessage name="username" component="div" className='text-danger small mt-1' />
                        </div>

                        <div className='form-group text-end d-flex flex-column gap-2'>
                            <label htmlFor="name"  > اسم المستخدم</label>
                            <Field type="text" dir="rtl" name="name" placeholder="اكتب اسمك" className="form-control" id={styles.input} />
                            <ErrorMessage name="name" component="div" className='text-danger small mt-1' />
                        </div>




                        <div className='form-group text-end '>
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="phone">رقم الهاتف</label>
                                <Field type="text" dir="rtl" name="phone" placeholder=" اكتب رقم هاتفك" className="form-control" id={styles.input} />
                            </div>

                            <ErrorMessage name="phone" component="div" className='text-danger small mt-1' />
                        </div>


                        <div className='from-group text-end d-flex  justify-content-between '>
                            <div className='col-4 d-flex justify-content-end position-relative' >
                                <Field
                                    as="select"
                                    name="qualification"
                                    className={`form-control ${styles.dropdown}`}
                                    dir="rtl"
                                >
                                    <option className='text-secondary' value=""> الحالة التعليمية</option>
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
                                <span className={styles.arrow}></span>
                                <ErrorMessage name="qualification" component="div" className='text-danger small mt-1' />

                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <label className='me-3 d-flex align-items-center gap-1'>
                                    <span>يعمل</span>
                                    <Field type="radio" value="يعمل" name="statework" />
                                </label>
                                <label>
                                    <span>  لا يعمل </span>
                                    <Field type="radio" value="لا يعمل " name="statework" />
                                </label>
                                <label>الحالة العملية</label>
                            </div>
                            <ErrorMessage name="statework" component="div" className='text-danger small mt-1' />

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
                                <label htmlFor="password"> كلمة المرور</label>
                                <Field type="text" dir="rtl" name="password" placeholder=" ادخل كلمة المرور" className="form-control" id={styles.input} />
                            </div>

                            <ErrorMessage name="password" component="div" className='text-danger small mt-1' />
                        </div>

                        <div className='text-end'>
                            <button type='submit' className='btn btn-light px-4'>سجل</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
