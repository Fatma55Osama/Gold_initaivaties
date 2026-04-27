import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./Component/MainLayout";
import HomePage from "./Pages/HomePage";
import AOS from "aos";
import AboutIndex from "./Pages/About/AboutIndex";
import AllNews from "./Pages/AllNews/NewsIndex";
import Photo from "./Pages/Photo";
import AllVideo from "./Pages/AllVideo";
import DetailsNews from "./Pages/DetailsNews";
import AllInfograph from "./Pages/AllInfograph";
import Messages from "./Pages/Messages";
import DetailsInfograph from "./Pages/DetailsInfograph";
import HospitalService from "./Pages/HospitalService";
import Alllightteam from "./Pages/Alllightteam";
import ContactUs from "./Pages/Contactus";
import Opinion from "./Pages/Opinion";
import Indicators from "./Pages/Indicators";
import { FiArrowUpCircle } from "react-icons/fi";
import Questions from "./Pages/Questions";
import DetailsLightTeam from "./Pages/DetailsLightTeam";
import JoinTeams from "./Pages/JoinTeams";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgetPassword";
import ConsultationNew from "./Pages/ConsultationNew";
import ConsultationOld from "./Pages/ConsultationOld";
import Errorpage from "./Pages/Errorpage";
import iconchatbot from "./assets/ChatBot-PNG.png";
import { useModalChatbot, usemodalmashora } from "./Store";
import Chatbot from "./Component/Chatbot";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useShallow } from "zustand/shallow";
import { ToastContainer } from "react-toastify";
import { Bounce, toast } from "react-toastify";
import MashuoraOnline from "./Component/MashuoraOnline";
import onlinemashora from "./assets/OnlineMashoura-png.png";
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//       throwOnError: false,
//     },
//   },
// });

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
    });
    return () => {
      AOS.refresh();
    };
  }, []);

  const top = () => window.scrollTo(0, 0);
  const { modalChatbot, toggleModalChatbot } = useModalChatbot(
    useShallow((state) => ({
      modalChatbot: state.modalChatbot,
      toggleModalChatbot: state.toggleModalChatbot,
    })),
  );
  const { modalmashora, openModalmashora } = usemodalmashora();
  let token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const openmashoraonline = (token) => {
    if (token) {
      openModalmashora();
    } else {
      toast.warning("يرجي تسجيل الدخول علي البوابة لإمكانيه حجز مشورة اونلاين");
      navigate("/login");
    }
  };
  return (
    // <QueryClientProvider client={queryClient}>
    <div className="App d-flex flex-column">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutIndex />} />
          <Route path="indicators" element={<Indicators />} />
          <Route path="Services" element={<HospitalService />} />
          <Route path="Services/:id" element={<HospitalService />} />
          <Route path="mediacorner" element={<AllNews />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="photo" element={<Photo />} />
          <Route path="video" element={<AllVideo />} />
          <Route
            path="/mediacorner/detailsnews/:id"
            element={<DetailsNews />}
          />
          <Route
            path="/infograph/detailsinfograph/:id"
            element={<DetailsInfograph />}
          />
          <Route
            path="/lightteam/detailslightteam/:id"
            element={<DetailsLightTeam />}
          />
          <Route path="infograph" element={<AllInfograph />} />
          <Route path="messages" element={<Messages />} />
          <Route path="lightteam" element={<Alllightteam />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route path="/jointeams" element={<JoinTeams />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/consultationnew" element={<ConsultationNew />} />
          <Route path="/consultationold" element={<ConsultationOld />} />
          <Route path="/question" element={<Questions />} />
          {/* <Route path='/meeting' element={<MargeMeeting/>}/> */}
        </Route>
        <Route path="*" element={<Errorpage />} />
      </Routes>

      <div
        className="mashoraonline d-flex justify-content-center align-items-center  z-3"
        onClick={() => openmashoraonline(token)}
      >
        {/* <strong className="text-center text-white">مشورة اونلاين</strong> */}
        <img
          src={onlinemashora}
          className="mashoraonline"
          alt="مشورة اونلاين"
          title="مشورة اونلاين"
        />
      </div>
      <div
        className="bordchatbot d-flex justify-content-center align-items-center"
        onClick={toggleModalChatbot}
      >
        {modalChatbot ? (
          <IoIosArrowDown className="chatbot-icon" />
        ) : (
          <img
            src={iconchatbot}
            className="chatbot-icon2"
            alt=""
            title="المساعد الذكي"
          />
          // <IoChatboxEllipses className="chatbot-icon" />
        )}
      </div>
      {modalChatbot && <Chatbot />}
      {modalmashora && <MashuoraOnline />}
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
      <FiArrowUpCircle onClick={top} className="topbtn" />
    </div>

    // </QueryClientProvider>
  );
}
