import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Component/MainLayout'
import HomePage from './Pages/HomePage'
import AOS from 'aos';
import AboutIndex from './Pages/About/AboutIndex';
import AllNews from './Pages/AllNews/NewsIndex';
import Photo from './Pages/Photo';
import AllVideo from './Pages/AllVideo';
import DetailsNews from './Pages/DetailsNews';
import AllInfograph from './Pages/AllInfograph';
import Messages from './Pages/Messages';
import DetailsInfograph from './Pages/DetailsInfograph';
import HospitalService from './Pages/HospitalService';
import Alllightteam from './Pages/Alllightteam';
import ContactUs from './Pages/Contactus';
import Opinion from './Pages/Opinion';
import Indicators from './Pages/Indicators';
import { FiArrowUpCircle } from 'react-icons/fi';
import Report from './Component/Reports';
import Report2 from './Component/Report2';
import PrintReport from './Component/PrintReport';
import { getDomain, getPathImg } from './configLoader';
import Questions from './Pages/Questions';

export default function App() {
    useEffect(() => {
    console.log("🔥 API Domain:", getDomain());
    console.log("🔥 Image Path:", getPathImg());
  }, []);
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
  const top = () => { window.scrollTo(0, 0) }
  return (
    <div className="App d-flex flex-column">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutIndex />} />
          <Route path='indicators' element={<Indicators />} />
          <Route path='Services' element={<HospitalService />} />

          <Route path='Services/:id' element={<HospitalService />} />
          <Route path='mediacorner' element={<AllNews />} />
          <Route path='contactus' element={<ContactUs />} />
          <Route path='photo' element={<Photo />} />
          <Route path='video' element={<AllVideo />} />
          <Route path='/mediacorner/detailsnews/:id' element={<DetailsNews />} />
          <Route path='/infograph/detailsinfograph/:id' element={<DetailsInfograph />} />
          <Route path='infograph' element={<AllInfograph />} />
          <Route path='messages' element={<Messages />} />
          <Route path='lightteam' element={<Alllightteam />} />
          <Route path='opinion' element={<Opinion />} />
          <Route path='report' element={<Report />} />
          <Route path="/print" element={<Report2 />} />
          <Route path="/printreport" element={<PrintReport />} />
          <Route path='/question' element={<Questions/>}/>
        </Route>
        <Route path='/'>
          <Route path='*' element={<h1>404 Not Found</h1>} />

        </Route>
      </Routes>
      <FiArrowUpCircle onClick={top} className='topbtn' />
    </div>
  )
}
