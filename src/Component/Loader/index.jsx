import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import logo from '../../assets//rectangle-6.png'
export default function Loader() {
   return (
    <div className="loader-container">
      <div className="loader-spinner-wrapper">
        <TailSpin
          visible={true}
          height="100"
          width="100"
          color="#724780"
          ariaLabel="tail-spin-loading"
        />
        <img src={logo} alt="Loading..." className="centered-logo" />
      </div>
    </div>
  );
}
