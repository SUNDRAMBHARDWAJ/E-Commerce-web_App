import React from 'react'
import "./UserStyle.css"
import iphone from "./images/iphoneback.png"
function Header() {
  return (
   <>
       <div className="topmost row" style={{ height: 500 }}>
  <div className="col-6 container">
    <img src={iphone} className="img-fluid" alt="" />
  </div>
  <div className="col-6 container" style={{ padding: "3%" }}>
    <h1
      style={{
        fontSize: 100,
        color: "white",
        fontFamily: 'Georgia, "Times New Roman", Times, serif'
      }}
    >
      The Digital Zone
    </h1>
    <h4
      style={{
        color: "white",
        fontFamily:
          '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif'
      }}
    >
      A Best platform to purchase Digital items!
    </h4>
  </div>
</div>
   </>
  )
}

export default Header