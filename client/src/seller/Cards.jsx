import React, { useContext, useState } from 'react'
import { arrContext } from './ProductDes'
import "./pop.css"
import axios from 'axios'
function Cards(props) {
  const ob = useContext(arrContext); 
  const [show,setshow] = useState("none");
  const [name,setname] = useState(props.name);
  const [des,setdes] = useState(props.des);
  const [qty,setqty] = useState(props.qty);
  const [price,setprice] = useState(props.price);
    function deleteItem(id){
        return function (){
            fetch(`http://localhost:3000/seller/deleteproduct?id=${id}`,{method:'POST'})
            .then(response=>response.json())
            .then((data)=>{
              if(data){
                ob.setdel(ob.arr.filter(function(value, index){ 
                  return value._id != id
              }))
              }
            }).catch((err)=>{
              console.log(err)
            })
        }
    }
    function updateValues(event){
      event.preventDefault()
      axios.post(`http://localhost:3000/seller/updateprod?id=${props.id}`,{
        productName:name,
        productPrice:price,
        productDesc:des,
        productQty:qty
      }).then((response)=>{
        console.log(response)
        setshow('none')
      }).catch((err)=>{
        alert('something Went Wrong')
        setdes(props.des)
        setname(props.name)
        setprice(props.price)
        setqty(props.qty)
        setshow('none')
      })
     
      console.log('Submitted')
    }
  return (
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
    <div style={{ height: 180 }}>
      <h5 className="card-title">Name:- {name}</h5>
      <h5>Price:-{price}</h5>
      <h5>Quantity:-{qty}</h5>
      <h6>Description:-{des}</h6>
    </div>
    <button
      className="btn btn-outline-primary rounded-pill"
      onClick={()=>{
        setshow("block")
      }}
    >
      Update
    </button>
    <button
      className="btn btn-outline-danger rounded-pill m-3"
      onClick={deleteItem(props.id)}
    >
      Delete
    </button>
  </div>
  <div id="popup-container" className="popup" style={{ display: show }}>
  <form onSubmit={updateValues}>
    <label htmlFor="productName">Product Name:</label>
    <input type="text" id="productName" name="productName" value={name} onChange={(event)=>{
      setname(event.target.value)
    }} />
    <label htmlFor="productDesc">Product Description:</label>
    <textarea id="productDesc" name="productDesc"  value={des} onChange={(event)=>{
       setdes(event.target.value)
    }}/>
    <label htmlFor="productQty">Product Quantity:</label>
    <input type="number" id="productQty" value={qty} name="productQty" onChange={(event)=>{
       setqty(event.target.value)
    }} />
    <label htmlFor="productPrice">Product Price:</label>
    <input type="number" id="productPrice" name="productPrice" value={price}  onChange={(event)=>{
       setprice(event.target.value)
    }}/>
    <span className="close" onClick={()=>{
      setshow('none')
    }}>
      ❌
    </span>
    <input type="submit" defaultValue="Update Details" />
  </form>
</div>

</div>
  )
}

export default Cards