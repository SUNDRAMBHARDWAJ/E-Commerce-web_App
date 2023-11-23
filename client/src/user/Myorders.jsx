import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavbarUser from './NavbarUser'
import OrderItems from './OrderItems';

function Myorders() {
    var [orderArr,setorderArr] = useState(undefined);
    useEffect(()=>{
        axios.get('http://localhost:3000/users/myorders',{
            withCredentials:true
        })
        //fetch(`http://localhost:3000/users/myorders?id=${userId}`)
        // .then(response=>response.json())
        .then((response)=>{
            console.log(response.data)
            setorderArr(response.data)
        })
    },[])
  return (
   <>
       <NavbarUser/>
       <section
        className="container aligns-items-center m-5"
        style={{ marginTop: 10}}
        >
        {(typeof orderArr) === 'undefined'?<p>Loading...</p>:
            orderArr.map((item,index)=>{
                return <OrderItems key={index} image={item.imageLink} name={item.name} price={item.price}
                    quantity={item.quantity} city={item.city} state={item.state} zip={item.zip} 
                    street={item.street}
                />
        })}
    </section>
   </>
  )
}

export default Myorders