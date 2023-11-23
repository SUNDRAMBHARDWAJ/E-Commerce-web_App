import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import style from "./Payment.module.css"
function Payment() {
  const history = useNavigate()
  var [orderTotal,setorderTotal] = useState('')
  var [oid,setoid] = useState('')
  useEffect(()=>{
    axios.get('http://localhost:3000/users/payment',{
      withCredentials:true
    }).then((response)=>{
      setorderTotal(response.data.Cart_Total)
      axios.get('http://localhost:3000/users/paymentonprocess',
      {withCredentials:true}
      ).then((resp)=>{
        console.log(resp)
        console.log(resp.data.orderId)
        setoid(resp.data.orderId)
      })
    }).catch((err)=>{
      console.log(err)
      history('/user')
    })
  },[])
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  //const result = await axios.post("http://localhost:5000/payment/orders");

  // if (!result) {
  //     alert("Server error. Are you online?");
  //     return;
  // }


  const options = {
      key: "rzp_test_rBSuIlLakAJ94a", // Enter the Key ID generated from the Dashboard
      amount: orderTotal.toString(),
      currency: 'INR',
      name: "Achiever Corp.",
      description: "Test Transaction",
      order_id: oid,
      handler: async function (response) {
          const data = {
              orderCreationId: oid,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };
            axios.post('http://localhost:3000/users/orderplaced',{
              address:localStorage.getItem('Address')
            },{
              withCredentials:true
            }).then((res)=>{
              console.log(res)
              if(res.data.payment){
                localStorage.setItem('Confirm',JSON.stringify({show:true}))
                history('/placed-successfullly')
              }else{
                alert('something went Wrong')
              }
            }).catch((err)=>{
              alert('something went Wrong')
            })
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
  
  
  return (
    <div className='body'>
    <div className={style.container}>
    <div className={style.box}>
      <h1>Amount to be Paid </h1>
      <p className={style.amount}>₹ {orderTotal}</p>
      <button className={style.button} 
      onClick={displayRazorpay}
      id="rzp-button1">
        Proceed to Pay
      </button>
    </div>
  </div>
  <p />
</div>

  )
}

export default Payment