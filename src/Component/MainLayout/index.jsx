import React, { useEffect } from 'react'
import Footer from '../Footer'
import { Outlet, useLocation } from 'react-router-dom'
import Employeeloader from '../../getCachingData'
import Header2 from '../Header2'
import Seo from '../SEO'
import { getDomain, getSiteUrl } from '../../configLoader'
import { useLoading } from '../../Store'
import Loader from '../Loader'
import { useLoadAllData } from '../../Hooks/useLoadData'

export default function MainLayout() {
  const { pathname } = useLocation();
  const domain = getDomain()
  const siteUrl = getSiteUrl()

  const { isLoading, setIsLoading } = useLoading();

  // const {
  //   employees,
  //   infograph,
  //   importantLinks,
  //   news,
  //   about,
  //   awarness,
  //   services,
  //   govs,
  //   initiative,
  //   videos,
  // } = useLoadAllData();

  // const isLoading =
  //   employees.isLoading ||
  //   infograph.isLoading ||
  //   importantLinks.isLoading ||
  //   news.isLoading ||
  //   about.isLoading ||
  //   awarness.isLoading ||
  //   services.isLoading ||
  //   govs.isLoading ||
  //   initiative.isLoading ||
  //   videos.isLoading;


  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="col-12 d-flex flex-column justify-content-between flex-grow-1">
      <Seo
        title="مبادرة الألف يوم الذهبية"
        description="مبادرة الألف يوم الذهبية (1000 Golden Days Initiative) تهدف إلى دعم صحة الأم والطفل خلال الألف يوم الأولى من الحياة. تعرف على Golden Days ومبادرة دعم الأم والطفل في مصر."
        image={`/src/assets/1000Logo-WNOvseAe-WNOvseAe.png`}
        url={`${siteUrl}${pathname}`}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header2 />
          <Outlet />
          <Footer />
        </>
      )}

      <Employeeloader setLoading={setIsLoading} />
    </div>

  )
}
