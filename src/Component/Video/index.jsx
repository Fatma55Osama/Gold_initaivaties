import React, { useEffect, useState } from 'react';
import './index.scss';
import logovideo from '../../assets/Frame.png';
import { useModalvedio, usepathimg, useVedio } from '../../Store';
import { Link } from 'react-router-dom';
import { getPathImg } from '../../configLoader';
import ModalVedio from '../ModalVedio';

export default function Video() {
  const { allvedio } = useVedio();
  const pathimg = getPathImg();

  const [filterVedio, setFilterVedio] = useState([]);
  const { modalvedio, openModalvedio, closeModalvedio } = useModalvedio()
  const [selectedVedio, setSelectedVedio] = useState(null);


  useEffect(() => {
    const copyfilterVedio = allvedio
      .filter((el) => el.onMainPage)
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 1);
    setFilterVedio(copyfilterVedio);
  }, [allvedio]);

  return (
    <div className="video-container">
      {filterVedio.map((el) => {
        const shortText = el.vedioTitle.split(/\s+/).slice(0, 30).join(' ') + '...';

        return (
          <div key={el.vedioId} className="video-card" data-aos="fade-up" data-aos-offset="100" data-aos-delay={50}>
            <Link to="/video" className="video-title">أحدث الفيديوهات</Link>

            <div className="video-image-wrapper">
              <img
                className="video-thumbnail"
                alt={el.vCoverPhotoAltText || "فيديو توعوي عن المبادرة"}
                src={`${pathimg}/Video/${el.vCoverPhoto}`}
              />

              <a
                className="play-button"

                rel="noopener noreferrer"
                onClick={() => { openModalvedio(true); setSelectedVedio(el) }}
              >
                <div className="play-icon-circle">
                  <img src={logovideo} alt="Play Icon" className="play-icon" />
                </div>
              </a>
              {/* <div className="play-icon-circle">
                  <img src={logovideo} alt="Play Icon" className="play-icon" onClick={() => { openModalvedio(true); setSelectedVedio(el) }}/>
                </div> */}
            </div>

            <p className="video-description">{shortText}</p>
          </div>
        );
      })}
      {
        modalvedio && (<ModalVedio vedioURL={selectedVedio.vedioURL} vedioTitle={selectedVedio.vedioTitle} />)
      }
    </div>
  );
}
