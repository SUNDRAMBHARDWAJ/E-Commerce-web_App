import React, { createContext, useEffect, useState } from 'react'
import NavbarUser from './NavbarUser'
import CartItems from './CartItems';
import "./UserStyle.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Mycontext = createContext();
function Cart() {
    const history = useNavigate();
    var total = 0;
    var [cart,setcart] = useState(undefined)
    useEffect(()=>{
        axios.get('http://localhost:3000/users/mycart',{
            withCredentials:true
        })
        .then((response)=>{
            console.log(response.data)
            setcart(response.data)
        })
    },[])
  return (
    <>  <Mycontext.Provider value={{cart,setcart}}>
        <NavbarUser/>
        <section
        className="container justify-content-center"
        style={{ marginTop: 70 }}
        >
            <div className="row" id="productlist">
            {(typeof cart) === 'undefined'?<p>Loading...</p>:
            cart.length === 0?<h1 style={{fontFamily:'sans-serif'}}>🙄 It Seems You Have Added Nothing!</h1>:
            cart.map((item,index)=>{
                {total += item.price*item.quantity}
                return <CartItems key={item._id} image={item.imageLink} name={item.name} price={item.price} quantity={item.quantity} id={item._id} detail={item.detail}/>
            })}
        </div>
        {   (typeof cart) === 'undefined'?<></>:
            cart.length === 0?<></>
            :<div className="order-container">
            <p>Order Total:- {total}</p>
            <a 
            onClick={()=>{
                history('/address-details')
            }
            }
             className="place-order-button">
                Place Order
            </a>
            </div>
        }
        

        </section>
    </Mycontext.Provider>
    </>
  )
}

export default Cart;
export {Mycontext};