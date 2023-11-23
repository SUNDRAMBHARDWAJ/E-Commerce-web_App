import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import "./index.css";
import Cards from './Cards';
const arrContext = createContext();
function ProductDes() {
    var [arr,setarr] = useState(undefined);
    useEffect(()=>{
        fetch('http://localhost:3000/seller/myproducts')
        .then(response=>response.json())
        .then((data)=>{
            console.log(data)
            setarr(data)
        })
    },[])
  return (
    <>
    <arrContext.Provider value={{arr,setdel:setarr}}>
    <Navbar/>
    <div className='fdata'>
        <div className='row container m-5'>
            {typeof (arr) === 'undefined'?
            <p>Loading</p>:
            arr.map((item,index)=>{
                return (
                    <Cards key={item._id} name={item.name} image={item.imageLink} des={item.detail} qty={item.quantity} price={item.price} id={item._id}/>
                )
            })
            }
            
        </div>
    </div>
    </arrContext.Provider>
    </>
  )
}

export default ProductDes;
export {arrContext}