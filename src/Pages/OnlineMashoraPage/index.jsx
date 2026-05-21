import ContactComponent from "../../Component/ContactComponent";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { getDomain } from "../../configLoader";
import { getAllData } from "../../Data/Repo/dataRepo";
import {
  usedetailconsultationold,
  usemodalmashora,
  useprofileData,
} from "../../Store";
import { show_appointmentforuser } from "../../Data/API/show_appointmentforuser";
import { post_EvaluateMeeting } from "../../Data/API/post_EvaluateMeeting";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function OnlineMashouraPage() {
  const { consultationold } = usedetailconsultationold();
  const { profileData, setProfileData } = useprofileData();

  const token = sessionStorage.getItem("token");
  const domain = getDomain();
  const [appointmentId, setAppointmentId] = useState(null);
  const [modalevalute, setmodalevalute] = useState(false);
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [inputfeedback, setInputFeedback] = useState("");
  const [appointmentforuser, setAppointmentforuser] = useState([]);
  const [now, setNow] = useState(new Date());
  const { modalmashora, openModalmashora } = usemodalmashora();

  // profile
  useEffect(() => {
    getAllData.get_store_profileData(domain, token).then((res) => {
      setProfileData(res);
    });
  }, []);

  // appointment
  // useEffect(() => {
  //   show_appointmentforuser(domain, token)
  //     .then((res) => setAppointmentforuser(res))
  //     .catch((err) => console.log(err));
  //   console.log("appointmentforuser is", appointmentforuser);
  // }, []);

  // // live clock
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     show_appointmentforuser(domain, token).then((res) =>
  //       setAppointmentforuser(res),
  //     );
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAppointments = () => {
      show_appointmentforuser(domain, token)
        .then((res) => setAppointmentforuser(res))
        .catch((err) => console.log(err));
    };

    // أول مرة مباشرة
    fetchAppointments();

    // تحديث كل 5 ثواني
    const interval = setInterval(fetchAppointments, 5000);

    return () => clearInterval(interval);
  }, []);

  const handelevaluate = () => {
    // const appointmentId = appointmentforuser?.data?.id;

    if (rate === 0) {
      toast.error("برجاء اختيار تقييم");
      return;
    }

    post_EvaluateMeeting(domain, appointmentId, token, rate, inputfeedback)
      .then((res) => {
        console.log("SUCCESS:", res);

        if (res?.status >= 200 && res?.data.success) {
          setTimeout(() => {
            setmodalevalute(false);
            setInputFeedback("");
            setRate(0);
            toast.success(`تم ارسال رأيك بنجاح`);
          }, 3000);
        }
      })
      .catch((err) => {
        (console.log(err), toast.error(`لم يتم ارسال رأيك حاول مره اخري`));
      });
  };

  //date formatting
  // const dateStr = appointmentforuser?.data?.date;

  // // meeting logic (LIVE)
  // const ismeeting = React.useMemo(() => {
  //   if (!dateStr) return false;

  //   const start = new Date(dateStr);
  //   const end = appointmentforuser?.data?.isCompleted;

  //   return now >= start && now <= end;
  // }, [now, dateStr]);
  // const canRate = React.useMemo(() => {
  //   if (!dateStr) return false;

  //   const start = appointmentforuser?.data?.isCompleted;
  //   const end = new Date(start.getTime() + 40 * 60 * 1000);

  //   return now > end; // بعد انتهاء اللقاء
  // }, [now, dateStr]);
  return (
    <div>
      <ContactComponent
        none="d-none"
        hidden="d-none"
        showheadsm="d-flex"
        showLimited={true}
      />
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
        {token ? (
          <div className="d-flex flex-wrap flex-column-reverse flex-md-row  flex-md-nowrap align-items-md-start align-items-end justify-content-end  justify-content-md-end  container gap-5 gap-md-5">
            <div className=" d-flex flex-wrap justify-content-end container gap-5 gap-md-5">
              <div className=" d-flex flex-wrap justify-content-end container gap-5 gap-md-5">
                {appointmentforuser?.data?.length > 0 ? (
                  appointmentforuser.data.map((el, index) => {
                    const formattedDate = el?.date
                      ? new Date(el?.date).toLocaleDateString("ar-EG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "لا يوجد مواعيد محجوزة";

                    const formattedTime = el?.date
                      ? new Date(el?.date).toLocaleTimeString("ar-EG", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "لا يوجد مواعيد محجوزة";

                    const start = new Date(el?.date);

                    const isMeetingTime = now >= start;

                    const canJoin = isMeetingTime && !el?.isCompleted;

                    const canRate = el?.isCompleted;

                    return (
                      <div
                        key={index}
                        className="bg-secondary bg-opacity-10 col-md-12 col-lg-7 col-12 d-flex justify-content-end px-5 py-3"
                      >
                        <div className="d-flex flex-column gap-5 text-end">
                          {/* التاريخ */}
                          <div className="d-flex gap-2 justify-content-end align-items-center">
                            <span className={styles.labelevaluate}>
                              {formattedDate}
                            </span>
                            <span className={styles.labelevaluate}>
                              : تاريخ المشورة
                            </span>
                          </div>

                          {/* الوقت */}
                          <div className="d-flex gap-2 justify-content-end align-items-center">
                            <span className={styles.labelevaluate}>
                              {formattedTime}
                            </span>
                            <span className={styles.labelevaluate}>
                              : توقيت المشورة
                            </span>
                          </div>

                          {/* النوع */}
                          <div className="d-flex gap-2 justify-content-end align-items-center">
                            <span className={styles.labelevaluate}>
                              {el?.appointmentsType}
                            </span>
                            <span className={styles.labelevaluate}>
                              : نوع المشورة
                            </span>
                          </div>

                          {/* الأزرار */}
                          <div className="d-flex gap-5">
                            <button
                              onClick={() => {
                                setAppointmentId(el?.id);
                                setmodalevalute(true);
                              }}
                              className={`${styles.evaluatebtn} px-3 py-2 ${
                                !canRate ||
                                el?.rate != null ||
                                (el?.notes && el.notes.trim() !== "")
                                  ? styles.disabled
                                  : ""
                              }`}
                              disabled={
                                !canRate ||
                                el?.rate != null ||
                                (el?.notes && el.notes.trim() !== "")
                              }
                            >
                              تقييم اللقاء
                            </button>

                            <button
                              className={`${styles.evaluatebtn} px-2 ${
                                !canJoin ? styles.disabled : ""
                              }`}
                              disabled={!canJoin}
                              onClick={() => {
                                if (canJoin && el?.meetUrl) {
                                  window.open(el.meetUrl, "_blank");
                                }
                              }}
                            >
                              {canJoin ? "انضم الي اللقاء" : "غير متاح الآن"}
                            </button>
                          </div>
                          {/* عرض رأيه */}
                          {(el.rate || el.notes) && (
                            <div className=" d-flex gap-2 justify-content-end align-items-start ">
                              <div
                                className={`${styles.labelevaluate} d-flex flex-column align-items-end `}
                              >
                                {el.rate && (
                                  <div
                                    className={`${styles.stars} d-flex flex-row-reverse `}
                                  >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <span
                                        key={star}
                                        className={`${styles.star} ${
                                          Number(el.rate) >= star
                                            ? styles.active
                                            : ""
                                        }`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {el.notes && <span>{el.notes}</span>}
                              </div>

                              <span className={styles.labelevaluate + " mt-2"}>
                                : رأيك
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-100 text-center py-5 bg-secondary bg-opacity-10 d-flex flex-column justify-content-center align-items-center">
                    <h5 className="text-muted mb-3">لا يوجد مواعيد محجوزة</h5>

                    <button
                      className={`${styles.evaluatebtn} px-4 py-2`}
                      onClick={() => {
                        openModalmashora();
                      }}
                    >
                      يمكنك حجز موعد
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles.profileCard}  text-end p-3`}>
              <div className={styles.profileItem}>
                <span className={styles.label}>الاسم:</span>
                <span className={styles.value}>
                  {profileData?.userName ||
                    consultationold[0]?.regestration?.userName}
                </span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>رقم الهاتف:</span>
                <span className={styles.value}>
                  {profileData?.mobileNum ||
                    consultationold[0]?.regestration?.mobileNum}
                </span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>عدد اللقاءات:</span>
                <span className={styles.value}>
                  {appointmentforuser?.data?.length}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center  d-flex flex-column align-items-center">
            <h5 className="text-danger mb-3"> برجاء تسجيل الدخول </h5>
            <Link
              to={"/login"}
              className="btn text-white px-4"
              id={styles.btnlog}
            >
              تسجيل الدخول
            </Link>
          </div>
        )}
      </div>
      {modalevalute && (
        <div className={styles.modalevalute}>
          <div
            className={`${styles.contentevalute} d-flex flex-column`}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="mb-3">تقييم اللقاء</h4>

            {/* ⭐ النجوم */}
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${
                    (hover || rate) >= star ? styles.active : ""
                  }`}
                  onClick={() => setRate(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* textarea */}
            <textarea
              placeholder="اكتب تقييمك هنا..."
              className={styles.textarea}
              value={inputfeedback}
              onChange={(e) => setInputFeedback(e.target.value)}
            />

            {/* buttons */}
            <div className="d-flex gap-3 justify-content-end mt-3">
              <button
                onClick={() => setmodalevalute(false)}
                className={styles.cancelBtn}
              >
                إلغاء
              </button>

              <button className={styles.submitBtn} onClick={handelevaluate}>
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
