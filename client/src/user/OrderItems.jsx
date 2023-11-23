import React from 'react'
import "./UserStyle.css"
function OrderItems(props) {
  return (
   <>
       <div className="row Orderbox container m-5">
  <div className="col">
    <img src= {props.image} className="img-fluid" />
  </div>
  <div className="col m-5">
    <h5>{props.name}</h5>
  </div>
  <div className="col m-5">
    <h5>Qty:- {props.quantity}</h5>
  </div>
  <div className="col m-5">
    <h5>Price:- {props.price}</h5>
  </div>
  <div className="col m-5">
    <h5>Total:-{props.price * props.quantity}</h5>
  </div>
  <h5 style={{ textAlign: "right" }}>
    Delivery Address: {props.street} {props.city} {props.state} {props.zip}
  </h5>
</div>
   </>
  )
}

export default OrderItems