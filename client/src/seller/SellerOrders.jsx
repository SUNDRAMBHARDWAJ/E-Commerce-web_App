import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import OrdersBox from './OrdersBox';

function SellerOrders() {
    const [arr,setarr] = useState(undefined);
    useEffect(()=>{
        axios.get('http://localhost:3000/seller/recieve_orders')
        .then((response)=>{
            console.log(response)
            setarr(response.data.arr)
        })
    },[])
  return (
    <>
        <Navbar/>
        <div id="OrdersContainer" style={{ marginTop: 70 }}>
        {typeof(arr) === 'undefined' ? <h6>Loading Plz Wait....</h6>:
            arr.map((val,index)=>{
                return <OrdersBox key={index} val={val} />
            })
        }
        </div>
    </>
  )
}

export default SellerOrders