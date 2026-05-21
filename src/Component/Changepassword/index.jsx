import React from "react";
import * as Yup from "yup";
import styles from "./index.module.css";
import { postResetpassword} from "../../Data/API/postResetpassword";
import { getDomain } from "../../configLoader";
import { ToastContainer } from "react-toastify";

import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function Changepassword() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("البريد الإلكتروني غير صالح").required("مطلوب"),
    newPassword: Yup.string().min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل').required('مطلوب'),
  });
  const domain = getDomain();

  const handleSubmit = (values) => {
    console.log("value" + values);
    postResetpassword(domain, values)
      .then((res) => {
        toast.success("تم إعادة تعيين كلمة المرور بنجاح" || res.data?.message);
        setTimeout(() => {
            navigate('/login');

        }, 2000)
      })
      .catch((err) => {
        console.error(err);
        toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور، حاول مرة أخرى");
      });
  };
  return (
    <div className="container">
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", newPassword: "" }}
        onSubmit={handleSubmit}
      >
        {
          <Form className="text-center">
            <div className="form-group text-end d-flex flex-column gap-2 mb-5">
              <label htmlFor="email">البريد الإلكتروني</label>
              <Field
                type="email"
                dir="rtl"
                name="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="form-control"
                id={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <div className="form-group text-end d-flex flex-column gap-2">
              <label htmlFor="newPassword">كلمة المرور الجديدة</label>
              <Field
                type="password"
                dir="rtl"
                name="newPassword"
                placeholder="أدخل كلمة المرور الجديدة"
                className="form-control"
                id={styles.input}
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-danger small mt-1"
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 px-4">
              تأكيد كلمة المرور
            </button>
          </Form>
}
      </Formik>
    </div>
  );
}
