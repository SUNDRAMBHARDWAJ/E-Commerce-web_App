import React, { useState } from 'react'
import "./UserStyle.css"
function Popup(props) {
  console.log(props.show)
  return (
    <>
  <div id="popup-container" className="popup" style={{display:'none'}}>
  <div className="popup-content">
    <h1 id="popname" />
    {props.name}
    <img
      alt=""
      src={props.image}
      style={{ height: 600, width: "auto"}}
      id="popimg"
      className="img-fluid"
    />
    <p id="popinfo" >{props.detail}</p>
    <p id="poprice" >{props.price}</p>
    <span className="close" onClick={()=>{
      
    }}>
      &times;
    </span>
  </div>
</div>
    </>
  )
}

export default Popup