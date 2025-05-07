import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Component/MainLayout'
import HomePage from './Pages/HomePage'
import AOS from 'aos';

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
           <Route path='about' element={<h1>about</h1>}/>
           <Route path='indicators' element={<h1>indicators</h1>}/>
           <Route path='serviceinitiative' element={<h1>serviceinitiative</h1>}/>
           <Route path='resultinitiative' element={<h1>resultinitiative</h1>}/>
           <Route path='mediacorner' element={<h1>mediacorner</h1>}/>
           <Route path='contactus' element={<h1>contactus</h1>}/>

           
        </Route>
      </Routes>
    </div>
  )
}
