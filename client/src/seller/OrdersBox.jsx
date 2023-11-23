import React from 'react'
import "./sellerOrder.css"
function OrdersBox(props) {
  return (
    <div className="items row m-5">
    <div className="col m-lg-5">
      <img
        src={props.val.imageLink}
        className="img-fluid"
        style={{ height: 250 }}
      />
    </div>
    <div className="col m-lg-5">
      <h6>Item name: {props.val.pname} </h6>
      <h6>ordered by: {props.val.usname}</h6>
      <h6>Item price:  {props.val.price}</h6>
      <h6>qty: {props.val.quantity} </h6>
      <h6>contact Deatails: {props.val.telephone}</h6>
      <h6>Email:{props.val.email}</h6>
      <h6>
        Address:- {props.val.street} {props.val.city} {props.val.state} {props.val.zip}
      </h6>
      <h6 style={{ color: "red" }}>
        order Total:- {props.val.price * props.val.quantity}
      </h6>
    </div>
  </div>
  )
}

export default OrdersBox