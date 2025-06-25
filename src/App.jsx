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
  return (
    <div className="App d-flex flex-column">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<AboutIndex />} />
          <Route path='indicators' element={<h1>indicators</h1>} />
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
           <Route path='opinion' element={<Opinion/>}/>
        </Route>
        <Route path='/'>
          <Route path='*' element={<h1>404 Not Found</h1>} />

        </Route>
      </Routes>
    </div>
  )
}
