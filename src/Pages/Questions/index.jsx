import React, { useEffect } from 'react'
import ContactComponent from '../../Component/ContactComponent'
import { usecommonquestion } from '../../Store'
import { getAllData } from '../../Data/Repo/dataRepo'
import { getDomain } from '../../configLoader'
import  './index.scss'
export default function Questions() {
  const { commonquestion, setcommonquestion } = usecommonquestion()
  const domain = getDomain()
  useEffect(() => {
    getAllData.get_show_commonQuestion(domain).then((res) => {
      setcommonquestion(res)
    })
  }, [])
  return (
    <div>
      <ContactComponent />
      <div className="questions-page container py-5">
        <div className="question-list">
          {
           Array.isArray(commonquestion) && commonquestion?.map((el, index) => (
              <div
                key={el.qId || index}
                className={`question-item ${index % 2 === 0 ? 'bg-light' : 'bg-gray'} d-flex flex-column gap-3`}
              >
                <h5 className="question-title m-0">{el.quest}</h5>
                <p className="question-answer">{el.answer}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
