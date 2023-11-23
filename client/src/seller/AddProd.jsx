import React from 'react'
import { useState ,useEffect} from 'react'
import "./index.css";
import Navbar from './Navbar';
function AddProd() {
    return (
      <div>
        <Navbar/>
        <div className='fdata'>
        <Addform/>
        </div>
      </div>
    )
}
  function Addform(){
    var [name,setname] = useState("");
    var [price,setprice] = useState("");
    var [qty,setqty] = useState("");
    var [des,setdes] = useState("");
    var [ilink,setilink] = useState("");
    //var [formdata,setformdata] = useState({name:name,des:des,qty:qty,price:price,ilink:ilink})
    function setValName(event){
      setname(event.target.value)
    }
    function setValprice(event){
      setprice(event.target.value)
    }
    function setValqty(event){
      setqty(event.target.value)
    }
    function setValDes(event){
      setdes(event.target.value)
    }
    function setValIlink(event){
      setilink(event.target.value)
    }
    function setTheValues(){
      if(name.trim().length !== 0 && price.trim().length !== 0 + qty.trim().length !== 0 && + des.trim().length !== 0  && ilink.trim().length !== 0){
        console.log(JSON.stringify({name:name,des:des,ilink:ilink,price:price,qty:qty}))
          fetch('http://localhost:3000/seller/addproduct',
          {method:'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({name:name,des:des,ilink:ilink,price:price,qty:qty})
        }
          ).then(response=>response.json())
          .then((data)=>{
            if(data){
              alert("Data Added SuccessFully")
              setname("");
              setdes("");
              setilink("");
              setqty("");
              setprice("");
            }else{
              alert("Request Failed")
            }
          })
      }else{
        alert("Empty Value Not Accepted Plz Fill")
      }
    }
    return(
      <div className='form'>
      <h1>Add New Product</h1>
      <label htmlFor="productName">Product Name:</label>
      <input onChange={setValName} value={name} type="text" id="productName" name="productName" />
      <label htmlFor="productDesc">Product Description:</label>
      <textarea onChange={setValDes} value={des} id="productDesc" name="productDesc" />
      <label htmlFor="productQty">Product Quantity:</label>
      <input onChange={setValqty} value={qty} type="number" id="productQty" name="productQty" />
      <label htmlFor="productPrice">Product Price:</label>
      <input onChange={setValprice} value={price} type="number" id="productPrice" name="productPrice" />
      <label htmlFor="productImage">Product Image Link:</label>
      <input onChange={setValIlink} value={ilink} type="text" id="productImage" name="productImage" />
      <button onClick={setTheValues} className='butn'>Submit</button>
  </div>
    )
  }
export default AddProd