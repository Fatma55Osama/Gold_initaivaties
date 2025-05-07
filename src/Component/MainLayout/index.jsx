import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Employeeloader from '../../getCachingData'
import Header2 from '../Header2'

export default function MainLayout() {
    return (
        <div className="col-12 d-flex flex-column justify-content-between flex-grow-1" >
            <Header2 />
            
                <Outlet />
            
            <Employeeloader/>
            <Footer />
        </div>
    )
}
