import React, { useEffect } from 'react'
import { useAbout, useallActiveEmployees, useAwarnessMsg, usedomain, useGovs, useImportantlink, useInfograph, useinitiativenumber, useNews, useServicemain } from '../Store'
import { getAllData } from '../Data/Repo/dataRepo'

export default function Employeeloader() {
  const { domain } = usedomain()
  const { setInfograph } = useInfograph()
  const { setImportantlink } = useImportantlink()
  const { setallEmployees } = useallActiveEmployees()
  const { setallabout } = useAbout()
  const { setInews } = useNews()
  const { setallawarness } = useAwarnessMsg()
  const { setservice } = useServicemain()
  const { setgovs } = useGovs()
  const { setinitivenumber } = useinitiativenumber()
  useEffect(() => {
    getAllData.get_all_employess(domain).then((res) => {
      setallEmployees(res)
    })

  }, [])
  useEffect(() => {
    getAllData.get_allmainpage_infograph(domain).then((res) => {
      setInfograph(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_allimportant_link(domain).then((res) => {
      setImportantlink(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_allimportant_link(domain).then((res) => {
      setImportantlink(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_allnews(domain).then((res) => {
      setInews(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_all_about(domain).then((res) => {
      setallabout(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_all_awarnessmsg(domain).then((res) => {
      setallawarness(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_all_servicemain(domain).then((res) => {
      setservice(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_all_govs(domain).then((res) => {
      setgovs(res)
    })
  }, [])
  useEffect(() => {
    getAllData.get_all_initiativenumber(domain).then((res) => {
      setinitivenumber(res)
    })
  }, [])
  return (
    null
  )
}
