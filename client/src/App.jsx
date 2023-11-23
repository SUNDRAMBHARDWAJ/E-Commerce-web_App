import React, { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AddProd from './seller/AddProd';
import ProductDes from './seller/ProductDes';
import Home from './user/Home';
import Cart from './user/Cart';
import axios from 'axios';
import Login from './Auth/Login';
import Myorders from './user/Myorders'
import Signup from './Auth/Signup';
import EmailVerification from './Emailverification/EmailVerification';
import AddressForm from './user/AddressForm';
import Payment from './user/Payment';
import OrderConfirmation from './user/OrderConfirmation';
import ChangePass from './user/ChangePass';
import SellerOrders from './seller/SellerOrders';
function App() {
  const history = useNavigate();
  var [isLogged,setisLogged] = useState(false);
  var [count,setcount] = useState(0);
  var [type,settype] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:3000/testtoken',{
      withCredentials:true
    })
    .then((data)=>{
      setisLogged(data.data.verify)
      settype(data.data.type)
      console.log(data.data.verify," ",count)
      setcount(1);
    }).catch(()=>{
      console.log('Error hai bhai')
      setcount(1);
      setisLogged(false)
    })
  },[])
  return (
    
    <>
      <Routes>
      {console.log(count)}
        <Route exact path='/signup' element={
          <ProtectedRouteLogin Auth={isLogged} val={count} type={type}>
            <Signup/>
          </ProtectedRouteLogin>
        } />
      <Route exact path='/signin' element=
      {<ProtectedRouteLogin Auth={isLogged} val={count} type={type}>
        <Login/>
      </ProtectedRouteLogin>
        }/>
      <Route exact path='/verifyEmail' Component={EmailVerification} />
      <Route exact path='/user' element={
        <ProtectedRoute Auth={isLogged} val={count} type={type}> 
          <Home/>
        </ProtectedRoute>
      }/>
       <Route exact path='/payment' element={
        <ProtectedRoute Auth={isLogged} val={count} type={type}> 
          <Payment/>
        </ProtectedRoute>
      }/>
       <Route exact path='/address-details' element={
        <ProtectedRoute Auth={isLogged} val={count} type={type}> 
          <AddressForm/>
        </ProtectedRoute>
      }/>
      <Route exact path='/placed-successfullly' element={
          <ProtectedMessage>
            <OrderConfirmation/>
          </ProtectedMessage>
      } />

      <Route exact path='/' element={
        <ProtectedSellerRoute Auth={isLogged} val={count} type={type}> 
         <AddProd/>
        </ProtectedSellerRoute>
      } />
      <Route exact path='/seller/orders' element={
        <ProtectedSellerRoute Auth={isLogged} val={count} type={type}> 
        <SellerOrders/>
        </ProtectedSellerRoute>
      } />
      <Route exact path='/ProductDescription' element={
        <ProtectedSellerRoute Auth={isLogged} val={count} type={type}> 
       <ProductDes/>
        </ProtectedSellerRoute>
      } />
      <Route exact path='/user/cart' element={
          <ProtectedRoute Auth={isLogged} val={count} type={type}> 
            <Cart/>
            </ProtectedRoute>
      } />
      <Route exact path='/user/myorders' element={
          <ProtectedRoute Auth={isLogged} val={count} type={type}> 
            <Myorders/>
          </ProtectedRoute>
      } />
      <Route exact path='/user/change-password' element={
          <ProtectedRoute Auth={isLogged} val={count} type={type}> 
             <ChangePass/>
          </ProtectedRoute>
      } />
    
    </Routes>
    

    </>
  )
}

export default App


function ProtectedRoute({Auth,val,type,children}){
  if(val === 1 && Auth && type === 0){
    console.log('type', type)
    return children
  }
  else if(val === 1 && Auth && type === 1){
    return <Navigate to='/' replace/>
  }
  else if(val === 1 && !Auth){
    return <Navigate to='/signin' replace/>
  }
}
function ProtectedSellerRoute({Auth,val,type,children}){
  if(val === 1 && Auth && type === 1){
    return children
  }
  else if(val === 1 && Auth && type === 0){
    return <Navigate to='/user' replace/>
  }
  else if(val === 1 && !Auth){
    return <Navigate to='/signin' replace/>
  }
}

function ProtectedRouteLogin({Auth,val,type,children}){
  if(val === 1 && Auth && type === 0){
    return <Navigate to='/user' replace/>
  }
  else if(val === 1 && Auth && type === 1){
    return <Navigate to='/' replace/>
  }
  else{
    return children;
  }
}
function ProtectedMessage({children}){
  const data = JSON.parse(localStorage.getItem('Confirm'));
  console.log(data)
  if(data.show === true){
    localStorage.removeItem('Confirm')
    return children;
  }else{
    return <Navigate to='/user' replace/>
  }
}