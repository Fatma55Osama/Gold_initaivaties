import React from 'react'
import { ClipLoader } from 'react-spinners';
// import { TailSpin } from 'react-loader-spinner'
import logo from '../../assets//rectangle-6.png'
export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-spinner-wrapper">
        <ClipLoader
          height="100"
          loading={true}
          width="100"
          size={180}
          color="#724780"
          ariaLabel="tail-spin-loading"
        />
        <img src={logo} alt="Loading..." className="centered-logo" />
      </div>
    </div>
  );
}
