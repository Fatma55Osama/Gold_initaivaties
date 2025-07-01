import React, { useEffect, useState } from 'react';
import './index.scss';
import { useInfograph, usepathimg } from '../../Store';
import { Link } from 'react-router-dom';

export default function Infograph() {
  const { infograph } = useInfograph();
  const { pathimg } = usepathimg();
  const [filterinfo, setfilterinfo] = useState([]);

  useEffect(() => {
    const copy = [...infograph]
      .filter(el => el.onMainPage && el.orderView !== undefined)
      .sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate))
      .slice(0, 2);
    setfilterinfo(copy);
  }, [infograph]);

  return (
    <div className="infograph-section">
      <div className="infograph-content" data-aos="fade-up" data-aos-offset="10" data-aos-delay={50}>
        <Link className="section-title" to="/infograph">إنفوجراف</Link>

        <div className="infograph-grid">
          {filterinfo.map((el) => {
            const shortText = el.infoTitle.split(/\s+/).slice(0, 10).join(' ') + '...';

            return (
              <Link
                key={el.infoId}
                to={`/infograph/detailsinfograph/${el.infoId}`}
                className="infograph-item nav-link"
              >
                <img
                  className="infograph-img"
                  src={`${pathimg}/Infograph/${el.infoPhoto}`}
                  alt="infograph"
                />
                <p className="infograph-text">{shortText}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
