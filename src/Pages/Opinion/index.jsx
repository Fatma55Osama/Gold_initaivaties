import React from 'react'
import styles from './index.module.css'
import Charts from '../../Component/Charts'
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { Chart } from 'chart.js'
import { usedomain } from '../../Store'
import { ToastContainer } from 'react-toastify'
import { Bounce, toast } from 'react-toastify'
import { postopinion } from '../../Data/API/postopinion'
export default function Opinion() {
    const { domain } = usedomain()

    const validationSchema = Yup.object({
        email: Yup.string().email('يرجى إدخال بريد إلكتروني صالح')
            .notRequired(),
        name: Yup.string().required('الأسم مطلوب'),
        phone: Yup.string().required('رقم الهاتف مطلوب').matches(/^01[0-9]{9}$/, 'رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01'),
        opinion: Yup.string().required('رأيك  مطلوب')
    })
    const hadleSubmit = (values,{resetForm}) => {
        console.log(values);
        postopinion(domain, values).then((res) => {
            toast.success('تم ارسال رأيك بنجاح')
              resetForm();
        }).catch((err) => {
            console.log(err)
            toast.error('حدث خطأ أثناء إرسال رأيك');
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
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>رأيك يهمنا</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p>يعرض هذا القسم باقة مختارة من التواصل</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <div className={`${styles.opinion}  p-4 rounded`}>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{ name: "", email: "", phone: "", opinion: "" }}
                    onSubmit={hadleSubmit}
                >
                    <Form className='d-flex container flex-column gap-3' id={styles.form}>
                        <h2 className='text-end p-0 m-0'>رأيك يهمنا</h2>


                        <div className='form-group text-end'>
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
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="opinion">رأيك</label>
                                <Field as="textarea" dir="rtl" name="opinion" placeholder="اكتب رأيك" className="form-control" id={styles.input} rows="3" />
                            </div>

                            <ErrorMessage name="opinion" component="div" className='text-danger small mt-1' />
                        </div>

                        <div className='text-end'>
                            <button type='submit' className='btn btn-light px-4'>إرسال</button>
                        </div>
                    </Form>
                </Formik>
            </div>
            {/* <Charts/> */}
        </div>
    )
}
