import React, { useEffect, useState } from "react";
import Navebar from "./Components/Navebar";
import { Route, Routes,Navigate,useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

import Products from "./Components/Products";
import Home from "./Components/Home";
import Cart from "./Components/Cart";

import ProductsContextProvider  from "./Context/ProductsContext";
import Favorite from "./Components/Favorite";
import Categories from "./Components/Categories";
import CategoryProducts from "./Components/CategoryProducts";
import Brands from "./Components/Brands";
import BrandProducts from "./Components/BrandProducts";
import ProductDetails from "./Components/ProductDetails";
import UserAddress from "./Components/UserAddress";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Notfound from "./Components/Notfound";
import Footer from "./Components/Footer";


import ScrollToTopButton from "./Components/ScrollToTopButton";
function App() {

  const [userData, setUserData] = useState(null);
 useEffect (()=>{
  if (localStorage.getItem('userToken'))
  {
    getUserData();
  }
 },[]);

let navigate = useNavigate();

function getUserData (){

  const token = localStorage.getItem('userToken');
 let  decodedToken = jwtDecode(token)

  setUserData(decodedToken);
}
// when change userData from null to data => print 
useEffect(() => {}, [userData]);

function logOut (){
  localStorage.removeItem('userToken') ;
  setUserData(null);
  navigate('/login')
  
}

// when user dosent login navigate to login & else return children (any comonent he clicked )
function ProtectedRoute({children}){
  if (!localStorage.getItem('userToken')){
  return  <Navigate to = '/login' />
  }
  else
  {
   return children ;
  }
}

  return (
    <>
<ProductsContextProvider>
<Navebar userData={userData} logOut={logOut} />

            <Routes>

              <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
              <Route path="products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
              <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="favorite" element={<ProtectedRoute><Favorite/></ProtectedRoute>} />
              <Route path="brands" element={<ProtectedRoute><Brands/></ProtectedRoute>} />
              <Route path="brandproducts/:id" element={<BrandProducts/>}/>
              
              <Route path="categories" element={<ProtectedRoute><Categories/></ProtectedRoute>} />
              <Route path="/category/:id" element={<CategoryProducts />} />
              <Route path="productdetails/:id" element={<ProductDetails/>} />
              <Route path="userAddress" element={<UserAddress/>} />
                      
              <Route path='login'  element = {<Login   getUserData={getUserData}  />  } />
              <Route path='register'  element = {<Register/>} />
              
              <Route path='*'  element = {<Notfound/>} />

            </Routes>
</ProductsContextProvider>
<ScrollToTopButton/>
    <Footer/>

    </>
  );
}

export default App;
