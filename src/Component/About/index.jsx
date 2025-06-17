import React from 'react'
import mask from '../../assets/mask-group-1.png'
import './index.scss'
import { useAbout } from '../../Store'
import { Link } from 'react-router-dom'
export default function About() {
  const { allabout, setallabout } = useAbout()
  console.log("allabout", allabout);
  return (
    <div className=''>

      <div className="overlap-17 d-flex flex-row ">
        <img
          className="mask-group"
          alt="Mask group"
          src={mask}
        />

        <div className="div-3" data-aos="fade-up"
          data-aos-offset="5" data-aos-delay={400}>

          <div className="text-wrapper-30">المبادرة في سطور</div>
          <Link to={'/about'} className='element-4 nav-link'>
            {allabout?.[0]?.aboutText}
          </Link>

        </div>
      </div>
    </div>
  )
}
