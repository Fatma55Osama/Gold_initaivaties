import React, { useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";
import { usemodalmashora } from "../../Store";
import { IoMdClose } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import { getAllData } from "../../Data/Repo/dataRepo";
import { getDomain } from "../../configLoader";
import { postAppointmentbyday } from "../../Data/API/postAppointmentbyday";
import { useNavigate } from "react-router-dom";

export default function MashuoraOnline() {
  const { closeModalmashora } = usemodalmashora();
  const domain = getDomain();
  const [date, setDate] = useState(null); // اليوم اللي هنختاره هيتخزن هنا
  const [slots, setSlots] = useState([]); //دا الوقت اللي ف التاريخ اللي اختارته
  const [selectedTime, setSelectedTime] = useState(null); // الوقت اللي اختارته
  const [aavailableDates, setAavailableDates] = useState([]);
  const [id, setId] = useState(null);
  const token = sessionStorage.getItem("token");
  const [consultationType, setConsultationType] = useState("مشورة ما قبل الزواج");
  const navigate = useNavigate();
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }; // دي الفانكشن اللي بكتب التاريخ عدل

  const formatDisplayDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }; // ودي فانكشن علشان لما اظهر التاريخ لليوزر ف الماسدج النجاح يبقي صح

  const availableSet = useMemo(() => {
    return new Set(aavailableDates.map((x) => x.date));
  }, [aavailableDates]);

  const isAvailable = (date) => {
    const d = formatDate(date);
    return availableSet.has(d);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setSelectedTime(null);

    const formatted = formatDate(selectedDate);
    const selectedDay = aavailableDates.find((d) => d.date === formatted);

    setSlots(selectedDay?.slots || []);
  };
  useEffect(() => {
    getAllData.get_store_getdays(domain).then((res) => {
      const fixed = res.map((item) => ({
        date: `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`,
        // isAvailable: item.isAvailable ?? true,
        // slots: item.slots ?? [],
      }));
      setAavailableDates(fixed);
    });
  }, []);
  useEffect(() => {
    if (!date) return;

    const formatted = formatDate(date);

    getAllData
      .get_show_appointmentbyday(domain, formatted)
      .then((res) => {
        setSlots(res);
        console.log("API RESPONSE:", res);
      })
      .catch((err) => console.log(err));
  }, [date]);
  const book = () => {
    if (!consultationType) {
      toast.error("من فضلك اختاري نوع المشورة");
      return;
    }

    if (!date || !selectedTime) {
      toast.error("اختاري اليوم والوقت الأول");
      return;
    }
    const formattedTime = new Date(selectedTime).toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    postAppointmentbyday(domain, id, token, consultationType)
      .then((res) => {
        console.log("SUCCESS:", res);

        if (res?.status >= 200 && res?.status < 300) {
          toast.success(
            `تم الحجز يوم ${date.toLocaleDateString("ar-EG")} الساعة ${formattedTime}`,
          );

          setTimeout(() => {
            closeModalmashora();
            navigate("/onlinemashora");
          }, 3000);
        }
      })
      .catch((err) => {
        (console.log(err),
          toast.error(
            `لم يتم الحجز يوم ${date.toLocaleDateString("ar-EG")} الساعة ${formattedTime} برجاء محاولة الحجز مره اخرى`,
          ));
      });
    console.log({
      id,
      token,
    });
  }; //هنا الفانكشن اللي بتبعت التاريخ والوقت اللي اليوزر اختارهم

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          newestOnTop
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <div className={styles.header}>
          <IoMdClose onClick={closeModalmashora} />
          <h4>حجز مشورة اونلاين</h4>
        </div>

        {/* Body */}
        <div className="d-flex flex-wrap justify-content-end gap-3">
          <div className="d-flex flex-wrap align-items-center gap-3 justify-content-end">
            <select
              className="mt-3"
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
            >
              <option value="" disabled>
                {" "}
                اختر نوع المشورة
              </option>
              <option value="مشورة ما قبل الزواج">مشورة ما قبل الزواج</option>
              <option value="مشورة سنة اولى زواج">مشورة سنة اولى زواج </option>
              <option value="مشورة الحامل">مشورة الحامل</option>
              <option value="مشورة الرضاعة الطبيعية">
                مشورة الرضاعة الطبيعية
              </option>
              <option value="مشورة تربية الأبناء">مشورة تربية الأبناء</option>
              <option value="مشورة الإعاقة والدمج">مشورة الإعاقة والدمج</option>
            </select>
            {/* <input type="text" list="mashora" /> */}
            {/* <div className="d-flex align-items-end gap-2">
              <label htmlFor="child">مشورة الطفل</label>
              <input
                id="child"
                value="مشورة الطفل"
                name="consultationType"
                type="radio"
                checked={consultationType == "مشورة الطفل"}
                onChange={(e) => setConsultationType(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-end gap-2">
              <label htmlFor="BeforeMarriage">مشورة ما قبل الزواج</label>
              <input
                id="BeforeMarriage"
                value="مشورة ما قبل الزواج"
                name="consultationType"
                type="radio"
                checked={consultationType == "مشورة ما قبل الزواج"}
                onChange={(e) => setConsultationType(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-end gap-2">
              <label htmlFor="Pregnant">مشورة الحامل</label>
              <input
                id="Pregnant"
                value="مشورة الحامل"
                name="consultationType"
                type="radio"
                checked={consultationType == "مشورة الحامل"}
                onChange={(e) => setConsultationType(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-end gap-2">
              <label htmlFor="Hospitals">مشورة المستشفيات</label>
              <input
                id="Hospitals"
                value="مشورة المستشفيات"
                name="consultationType"
                type="radio"
                checked={consultationType == "مشورة المستشفيات"}
                onChange={(e) => setConsultationType(e.target.value)}
              />
            </div> */}
          </div>

          <p className={styles.title + " mt-4"}>نوع المشورة : </p>
        </div>
        <div className={styles.body}>
          {/* Slots */}
          <div className={styles.slotsBox}>
            <p className={styles.title}>المواعيد المتاحة </p>

            {!date && <p className={styles.hint}>اختاري يوم الأول 👉</p>}
            {date && (
              <p className={styles.hint}>
                المواعيد المتاحة ليوم: {formatDisplayDate(date)}
              </p>
            )}

            <div className={styles.slots + ""}>
              {slots.map((slot) => {
                const dateObj = new Date(slot.date);

                const formattedTime = slot.date
                  ? dateObj.toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "لا يوجد مواعيد محجوزة";

                return (
                  <button
                    key={slot.id}
                    disabled={slot.isBooked}
                    onClick={() => {
                      setSelectedTime(slot.date); // مهم نغير دي كمان
                      setId(slot.id);
                    }}
                    className={`${styles.slot}
        ${slot.isBooked ? styles.booked : ""}
        ${selectedTime === slot.date ? styles.selected : ""}
      `}
                  >
                    {formattedTime}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calendar */}
          <div className={styles.calendarBox}>
            <p className={styles.title}>اختار التاريخ</p>

            <Calendar
              onChange={handleDateChange}
              value={date}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const d = formatDate(date);
                  const found = aavailableDates.some((x) => x.date === d);

                  return found ? styles.available : styles.unavailable;
                }
              }}
              tileDisabled={({ date }) => !isAvailable(date)}
            />
          </div>
        </div>

        {/* booking */}
        <button
          onClick={book}
          disabled={!selectedTime || !date || !consultationType}
          className={styles.cta}
        >
          احجز الآن
        </button>
      </div>
    </div>
  );
}
