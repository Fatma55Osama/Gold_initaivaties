import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { useallActiveEmployees, usepathimg } from "../../Store";
import { getPathImg } from "../../configLoader";
import { Link } from "react-router-dom";

export default function Lightteam() {
  const { Employees } = useallActiveEmployees();
  const pathimg = getPathImg();
  const [filteremployess, setFilteremployess] = useState([]);
  useEffect(() => {
    if (!Array.isArray(Employees)) {
      console.warn("Employees is not an array:", Employees);
      return;
    }

    const filtered = Employees.filter((el) => el.onMainPage).sort(
      (a, b) => new Date(b.honorDate) - new Date(a.honorDate)
    );

    setFilteremployess(filtered);
  }, [Employees]);
  return (
    <div className={styles.lighteam}>
      <h3 className={styles.textWareber + " text-center mb-3"}>نماذج مضيئة</h3>
      {/* <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={true}
        loop={false} // مهم
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[FreeMode, Autoplay]}
        className={`${styles.mySwiper} mySwiper container swiperHomeTeam d-flex flex-row-reverse`}
      >
        {filteremployess.slice(0, 12).map((el) => {
          const formattedDate = el.honorDate?.split("T")[0].replace(/-/g, "/");
          return (
            <SwiperSlide
              key={el.empId}
              className="d-flex justify-content-center align-items-center bg-white gap-2"
              id={styles.cardslid}
            >
              <Link
                to={`/lightteam/detailslightteam/${el.empId}`}
                className={
                  styles.card +
                  " d-flex flex-column justify-content-between align-items-center gap-1 nav-link"
                }
              >
                <div className={styles.imgCard}>
                  <img src={`${pathimg}/Employees/${el.empImage}`} alt="" />
                </div>
                <span className={styles.Cardtitle}>{el.empName}</span>
                <div
                  className={
                    styles.textCard +
                    " text-end col-10 col-md-8 col-lg-7 px-4 py-md-3"
                  }
                >
                  <p>المحافظة: {el.govName}</p>
                  <p>الوظيفة: {el.empJob}</p>
                  <p>تاريخ التكريم: {formattedDate}</p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper> */}

      <div className=" col-12 container ">
        <Swiper
          // direction='rtl'
          slidesPerView="auto"
          spaceBetween={30}
          loop={true}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className={styles.mySwipeerr + " mySwiper importantLinksSwiper"}
        >
          {filteremployess.slice(0, 12).map((el) => {
            const formattedDate = el.honorDate
              ?.split("T")[0]
              .replace(/-/g, "/");
            return (
              <SwiperSlide
                key={el.empId}
                className="d-flex justify-content-center align-items-center bg-white gap-2"
                id={styles.cardslid}
              >
                <Link
                  to={`/lightteam/detailslightteam/${el.empId}`}
                  className={
                    styles.card +
                    " d-flex flex-column justify-content-between align-items-center gap-1 nav-link"
                  }
                >
                  <div className={styles.imgCard}>
                    <img src={`${pathimg}/Employees/${el.empImage}`} alt="" />
                  </div>
                  <span className={styles.Cardtitle}>{el.empName}</span>
                  <div
                    className={
                      styles.textCard +
                      " text-end col-10 col-md-8 col-lg-7 px-4 py-md-3"
                    }
                  >
                    <p>المحافظة: {el.govName}</p>
                    <p>الوظيفة: {el.empJob}</p>
                    <p>تاريخ التكريم: {formattedDate}</p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
