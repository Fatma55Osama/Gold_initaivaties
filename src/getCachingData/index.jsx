import React, { useEffect } from 'react'
import { useAbout, useallActiveEmployees, useAwarnessMsg, usedomain, useGovs, useImportantlink, useInfograph, useinitiativenumber, useNews, useServicemain, useVedio } from '../Store'
import { getAllData } from '../Data/Repo/dataRepo'
import { getDomain } from '../configLoader'

export default function Employeeloader({ setLoading }) {
  const  domain  = getDomain()
  const { setInfograph } = useInfograph()
  const { setImportantlink } = useImportantlink()
  const { setallEmployees } = useallActiveEmployees()
  const { setallabout } = useAbout()
  const { setInews } = useNews()
  const { setallawarness } = useAwarnessMsg()
  const { setservice } = useServicemain()
  const { setgovs } = useGovs()
  const { setinitivenumber } = useinitiativenumber()
  const { setallvedio } = useVedio()

  useEffect(() => {
    setLoading(true); // بدء التحميل

    // نجيب كل البيانات دفعة واحدة
    Promise.all([
      getAllData.get_all_employess(domain).then(res => setallEmployees(res)),
      getAllData.get_allmainpage_infograph(domain).then(res => setInfograph(res)),
      getAllData.get_allimportant_link(domain).then(res => setImportantlink(res)),
      getAllData.get_allnews(domain).then(res => setInews(res)),
      getAllData.get_all_about(domain).then(res => setallabout(res)),
      getAllData.get_all_awarnessmsg(domain).then(res => setallawarness(res)),
      getAllData.get_all_servicemain(domain).then(res => setservice(res)),
      getAllData.get_all_govs(domain).then(res => setgovs(res)),
      getAllData.get_all_initiativenumber(domain).then(res => setinitivenumber(res)),
      getAllData.get_all_vedio(domain).then(res => setallvedio(res)),
    ])
    .finally(() => setLoading(false)); // انتهاء التحميل
  }, []);

  return null;
}