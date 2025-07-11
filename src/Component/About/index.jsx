import React from 'react'
import mask from '../../assets/mask-group-1.png'
import './index.scss'
import { useAbout } from '../../Store'
import { Link } from 'react-router-dom'
export default function About() {
  const { allabout, setallabout } = useAbout()
  console.log("allabout", allabout);
  const shortText = allabout?.[0]?.aboutText.split(/\s+/).slice(0, 77).join(' ') + '.';

  return (
    <div className='aboutsection'>

      <div className="overlap-17 d-flex flex-row ">
        <img
          className="mask-group"
          alt="Mask group"
          src={mask}
        />

        <div className="div-3" data-aos="fade-up"
          data-aos-offset="5" data-aos-delay={400}>

          <Link to={'/about'} className="text-wrapper-30">المبادرة في سطور</Link>
          <Link to={'/about'} className='element-4 justifyText nav-link'>
          <div dangerouslySetInnerHTML={{ __html: shortText }} />
          </Link>

        </div>
      </div>
    </div>
  )
}
