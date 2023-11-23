import React, { useEffect, useState } from 'react'
import Header from './Header'
import NavbarUser from './NavbarUser'
import ProdCards from './ProdCards'
import axios from 'axios'
import "./UserStyle.css"
const userId = 1545;
function Home() {
    var [arr,setarr] = useState(undefined)
    var [count,setCount] = useState(1);
    var [visible,setvisible] = useState('none')
    useEffect(()=>{
        axios.get('http://localhost:3000/users/home', {
        withCredentials: true,
        }).then((response)=>{
        console.log(response)
        setarr(response.data)
        })
    },[])
    function fetchMoreData(count){
        return function (){
            fetch(`http://localhost:3000/users/sendata?id=${count}`,{method:'get'})
          .then((response)=>response.json())
          .then((data)=>{
              setarr(arr.concat(data))
              setCount(count+1)
          })
        }
    }
    console.log(count)
  return (
   <>
       <NavbarUser/>
       <Header/>
       <section
        className="container-fluid justify-content-center product text-center"
        style={{ color: "white", padding: "5%", width: '102%' }}
        id="product">
        <div className="row" id="productlist">
            {(typeof arr) === 'undefined'?<p>Loading...</p>:
            arr.map((item,index)=>{
                return <ProdCards key={index} image={item.imageLink} name={item.name} price={item.price} id={item._id} detail={item.detail}/>
            })}
        </div>
        <button
            className="btn btn-sm btn-outline-success m-4"
            onClick={fetchMoreData(count)}
            style={{ color: "white", border: "2px solid white" ,width:150}}
            >
            Load More
            </button>
        </section>

   </>
  )
}

export default Home