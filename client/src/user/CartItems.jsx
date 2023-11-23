import React, { useState,useContext } from 'react'
import { Mycontext } from './Cart';
function CartItems(props) {
  var [show,setshow] = useState('none')
  var [quantity,setquantity] = useState(props.quantity)
  const ob =  useContext(Mycontext);
  console.log(ob.cart)
  function deleteFromCart(id){

    return function(){
      ob.setcart(ob.cart.filter(function(value, index){ 
        return value._id != id;
    }))
    }
  }
  return (
      <>
    <div
  className="card col-4"
  style={{
    width: "18rem",
    padding: "2%",
    margin: 5,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
  }}
>
  <img
    style={{ height: 250 }}
    src={props.image}
    className="img-fluid"
    alt="..."
  />
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <h4>Price:- {props.price}</h4>
    <h5>
      Quantity:- {quantity}
    </h5>
    <div style={{ display: "block", marginBottom: 10 }}>
      <button
        className="btn btn-info m-1"
        onClick={()=>{
          fetch(`http://localhost:3000/users/inccart?id=${props.id}`,{method:'post'})
          .then(response=>response.json())
          .then((data)=>{
            if(data){
          ob.setcart(ob.cart.map((val,i)=>{
            if(val._id === props.id){
              setquantity(++quantity)
              return {...val,quantity:val.quantity+1}
            }else{
              return val
            }
          }))
          }else{
            alert('Somthing Went Wrong')
          }
          })
        }}
      >
        +
      </button>
      <button
        onClick={()=>{
          if(quantity >= 2){
          fetch(`http://localhost:3000/users/deccart?id=${props.id}`,{method:'post'})
          .then(response=>response.json())
          .then((data)=>{
            if(data){
          ob.setcart(ob.cart.map((val,i)=>{
            if(val._id === props.id){
              setquantity(--quantity)
              return {...val,quantity:val.quantity-1}
            }else{
              return val
            }
          }))
          }
          })
          }else{
            fetch(`http://localhost:3000/users/dcart?id=${props.id}`,{method:'post'})
            .then(response=>response.json())
            .then((data)=>{
              if(data)
              deleteFromCart(props.id)()
              else
              alert("Something Went Wrong")
            })
          }
        }}
        className="btn btn-info"
      >
        -
      </button>
    </div>
    <button
      className="btn btn-primary m-1"
      onClick={()=>{
        setshow('block')
      }}
    >
      Details
    </button>
      <button className="btn btn-secondary"
      onClick={()=>{
        fetch(`http://localhost:3000/users/dcart?id=${props.id}`,{method:'post'})
            .then(response=>response.json())
            .then((data)=>{
              if(data)
              deleteFromCart(props.id)()
              else
              alert("Something Went Wrong")
            })
      }
      }
      >Delete</button>
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

export default CartItems