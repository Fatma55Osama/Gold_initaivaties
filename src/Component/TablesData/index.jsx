import React from 'react'
import styles from './index.module.css'

export default function TablesData(props) {
  return (
    
    <div className={`col-12 col-lg-5  my-4`} id={styles.widthtable}>
      <div className={styles.tableWrapper}>
        <table
          className={`${styles.customTable}  text-center`}
          
        >
          <thead>
            <tr>
              <th style={{backgroundColor: props.bgColor}}>العدد</th>
              <th style={{backgroundColor: props.bgColor}}>{props.name}</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(props.data) &&
              props.data.map((el, index) => (
                <tr key={index}>
                  <td>{el.indValue}</td>
                  <td>{el.govName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
