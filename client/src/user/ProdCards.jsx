import axios from 'axios'
import React, { useState } from 'react'
import Popup from './Popup'
function ProdCards(props) {
  var [show,setshow] = useState('none')
  return (
   <>
       <div
  className="card col-4 justify-content-center bg-transparent mycols"
  style={{
    width: "15rem",
    padding: "2%",
    margin: 5,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    transition: "all .6s cubic-bezier(0.165, 0.84, 0.44, 1)"
  }}
>
  <div className="iamge-section" style={{ height: "50%" }}>
    <img
      style={{ height: 150 }}
      src={props.image}
      className="img-fluid"
      alt="..."
    />
  </div>
  <div className="card-body" style={{ height: "30%" }}>
    <div style={{ height: 80 }}>
      <h6 className="card-title">{props.name}</h6>
      <h6>{props.price}</h6>
    </div>
    <button
      className="btn btn-success btn-sm m-1"
      onClick={()=>{
        setshow('block')
      }}
    >
      Details
    </button>
    <button
      className="btn btn-danger btn-sm"
      onClick={()=>{
        axios.post('http://localhost:3000/users/addtocart',{
          id:props.id
        },{
          withCredentials:true
        }).then((response)=>{
          console.log(response)
          if(response.data === true){
            alert("Item Added to cart Successfully")
            }else{
              alert("Product Out of Stock!")
            }
        })
          // fetch(`http://localhost:3000/users/addtocart?id=${props.id}`,{method:'post'})
          // .then((response)=>response.text())
        }}
    >
      Add
    </button>
  </div>
</div>
 <div  className="popup" style={{display:show,color:'black'}}>
  <div className="popup-content">
    <h1 > {props.name}</h1>
   
    <img
      alt=""
      src={props.image}
      style={{ height: 600, width: "auto"}}
     
      className="img-fluid"
    />
    <p  >{props.detail}</p>
    <p  >{props.price}</p>
    <span className="close" onClick={()=>{
      setshow('none')
    }}>
      &times;
    </span>
  </div>
</div>
   </>
  )
}

export default ProdCards;