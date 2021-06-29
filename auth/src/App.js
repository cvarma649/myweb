import React, { Fragment } from "react";
import './App.css';

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import About from "./components/AboutPage/About";
import Contact from "./components/ContactPage/Contact";
import SignUp from "./components/RegisterPage/SignUp";
import SignIn from "./components/SignInPage/SignIn";
import Cart from "./components/Cart/Cart";
import Nav from "./components/Navbar/Nav";
import Product from "./components/Shopping/Product"
import VideoUpload from "./components/Video/VideoUpload";
import VideoPlayer from "./components/Video/VideoPlayer";
import ForgotPassword from "./components/SignInPage/ForgotPassword";
import ResetPassword from "./components/SignInPage/ResetPassword";


import {useState, useEffect} from "react";


function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authyn = isAuthenticated? true : false

  const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1" : "http://localhost:5000"

  function logout(e){
    e.preventDefault();
    localStorage.removeItem("token")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_email")
    setAuth(false) }
 

  const isAuth = async()=>{
    
    const response = await fetch(`${baseUrl}/is_verify`,{
      method:"GET",
      headers:{token: localStorage.token}
    })
    const parseRes = await response.json();
    parseRes===true ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }
  
  useEffect( ()=>{
    isAuth();
  },[])

  const setAuth = (boolean)=> setIsAuthenticated(boolean);

  return (
    
    <Fragment>
     
      <Router>
      <div className="app-container">  
      
      <Nav auth={authyn} logout={logout}/> 
        <Switch>
          <Route exact path="/signin" render={props=> !isAuthenticated ? <SignIn  {...props} setAuth={setAuth}/>: <Redirect to="/"/>}/>
          <Route exact path="/signup" render={props=> !isAuthenticated ? <SignUp  {...props} setAuth={setAuth}/>: <Redirect to="/"/>}/>
          <Route exact path="/forgot-password" render={props=> <ForgotPassword {...props}/>}/>
          <Route exact path="/reset-password/:jT" render={props=> <ResetPassword {...props}/>}/>
          <Route exact path="/cart" render={props=> isAuthenticated ? <Cart {...props} /> :<Redirect to="/signin"/> }/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/products/:id" render={props=> <Product {...props} />}/>
          <Route exact path="/contact" render={props=>  <Contact {...props} /> }/>
          <Route exact path="/upload" render={props=> <VideoUpload {...props}/>}/>
          <Route exact path="/video/:tid" render={props=> isAuthenticated ? <VideoPlayer {...props}/> : <Redirect to="/signin"/>}/>
          <Route exact path="/" render={props=> <HomePage {...props} auth={authyn} />}/>
          

         
        </Switch>
      </div>
    </Router> 
    </Fragment>
    )
}

export default App;
