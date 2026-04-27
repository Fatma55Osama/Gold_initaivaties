import React, { useState } from "react";
import styles from "./index.module.css";
import { usemodalmashora } from "../../Store";
import { IoMdClose } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Bounce, toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function MashuoraOnline() {
  const { closeModalmashora } = usemodalmashora();

  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableDates = [
    {
      id: 1,
      date: "2026-04-20",
      isAvailable: true,
      slots: [
        { time: "10:00", isBooked: false },
        { time: "11:00", isBooked: true },
        { time: "12:30", isBooked: false },
      ],
    },
    { id: 2, date: "2026-04-27", isAvailable: false },
    {
      id: 3,
      date: "2026-04-28",
      isAvailable: true,
      slots: [
        { time: "01:00", isBooked: false },
        { time: "12:00", isBooked: true },
        { time: "12:30", isBooked: false },
      ],
    },
  ];

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const formatDisplayDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const isAvailable = (date) => {
    const d = formatDate(date);
    return availableDates.find((x) => x.date === d)?.isAvailable;
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setSelectedTime(null);

    const formatted = formatDate(selectedDate);
    const selectedDay = availableDates.find((d) => d.date === formatted);

    setSlots(selectedDay?.slots || []);
  };

  const book = () => {
    if (!date || !selectedTime) return;
    console.log("Booked:", date, selectedTime);
    toast.success(
      `تم الحجز يوم ${date.toLocaleDateString("ar-EG")} الساعة ${selectedTime}`,
    );
    setTimeout(() => {
      closeModalmashora()
    }, 3000);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <IoMdClose onClick={closeModalmashora} />
          <h4>حجز مشورة اونلاين</h4>
        </div>

        {/* Body */}
        <div className={styles.body}>

 {/* Slots */}
          <div className={styles.slotsBox}>
            <p className={styles.title}>المواعيد المتاحة </p>

            {!date && <p className={styles.hint}>اختاري يوم الأول 👈</p>}
            {date && (
              <p className={styles.hint}>
                المواعيد المتاحة ليوم: {formatDisplayDate(date)}
              </p>
            )}

            <div className={styles.slots + ""}>
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={slot.isBooked}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`${styles.slot}
                    ${slot.isBooked ? styles.booked : ""}
                    ${selectedTime === slot.time ? styles.selected : ""}
                  `}
                >
                  {slot.time}
                </button>
              ))}
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
                  const found = availableDates.find((x) => x.date === d);

                  if (!found) return "";

                  return found.isAvailable
                    ? styles.available
                    : styles.unavailable;
                }
              }}
              tileDisabled={({ date }) => !isAvailable(date)}
            />
          </div>

         
        </div>

        {/* CTA */}
        <button onClick={book} disabled={!selectedTime} className={styles.cta}>
          احجز الآن
        </button>
      </div>
    </div>
  );
}
