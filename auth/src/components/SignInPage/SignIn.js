import React from 'react';
import "./SignIn.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import ProductPop from "../Shopping/ProductPop";
import GoogleLogin from "react-google-login";


function SignIn({setAuth}) {  
    
    const [c_email, setC_email] = useState("")
    const [password, setPassword] = useState("")
    const [errResponse, setErrResponse]=useState("")
     const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000/api/v1"

    const login = async(e)=>{
        const email = c_email.toLowerCase()
        const body = {email, password}
        e.preventDefault();
        if(email.length>0 && password.length>0){
            try {
                const response = await fetch(`/api/v1/signin`,{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
                const parseRes = await response.json();
                if(parseRes.auth === true){
                localStorage.setItem("token", parseRes.token);
                localStorage.setItem("user_name", parseRes.user.name)
                localStorage.setItem("user_email", parseRes.user.email)
                setAuth(true);
                }else{
                 setErrResponse(parseRes)
                 setAuth(false)
                }
                console.log(parseRes)
            } catch (error) {
                console.error(error.message)
            }
        }else{
            setErrResponse("Type Something!")
        }
} 

const responseGoogleS=async(res)=>{
    const g_user = await res.profileObj
    console.log(g_user)
    const g_user_name=g_user.name
    const g_user_email=g_user.email
    const body={g_user_name, g_user_email}
    try {
        const response= await fetch(`/api/v1/gsignin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })
        const parseRes = await response.json();
        console.log(parseRes)
        setAuth(true);
        localStorage.setItem("token", parseRes.token)
        localStorage.setItem("user_name", parseRes.user.g_user_name)
        localStorage.setItem("user_email", parseRes.user.g_user_email)
            
             
    } catch (err) {
        console.error("Could not fetch properly")
    }
    
}
const responseGoogleF=(res)=>{
    console.log(`Failed:${res}`)
}

const content=
   <div className="bach">
       {`
       A users table has been set up in a Postgresql Database. The name, password and email of every user is saved 
       in Database, where the password is crypted and email validated via Reg Ex. There are Jason Web Tokens that are generated on authentication
       and then stored in the temporary memeory on client side in the form of cookie sessions.
       On Authenticaton, user is Redirected to Home Page with a dynamic Greeting. There is a Forgot Password option too. But it is valid only after 
       24 hrs of first Sign In. 
       If you don't want to sign in with your email- use email: test@test.com and password: test123
       A Google Sign-In option has been provided as well with the help of the Google Sign in API. While signing in with Google,
       a new user's name and email will be saved to a Postgres Database, stored temporarily in LocalStorage to be accessed for the 
       Greeting on Home page and to send Hiring Email on Contact page. `}
   </div>
  return (
        <div>
           
            <div className="form-container">
                <p className="title">Hey! Login First :D</p> 
                <div className="error-response"><p>{errResponse}</p></div>
                <div className="form-layout">
                <form className="login-form" onSubmit={login} method="POST">
                    <div className="login-input">
                        <label htmlFor="email">Email</label>
                        <input id="email" value={c_email} onChange={e=>setC_email(e.target.value)} type="text"/>
                    </div>
                    <br/>
                    <div className="login-input">
                        <label htmlFor="password">Password</label>
                        <input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password"/>

                        <div className="both-form-contain">
                        <button id="login-button" type="submit">Log In</button>
                        <Link to="/forgot-password" className="forgot-password"><p>Forgot Password?</p></Link>
                        </div>
                        </div>
                    </form>
                        <div className="goog-login"><GoogleLogin
                                id="google-signin"
                                clientId="694825053782-ribjrbp1l5jbvvtscjuqiccrhb29vhru.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogleS}
                                onFailure={responseGoogleF}
                                cookiePolicy={'single_host_origin'}
                                /></div>               
                </div>
                <div className="contain-register">      
                <div className="register">
                <Link to="/signup">New here? Sign up!</Link>
                 <ProductPop className="tippu" content={content} placement="left-start" maxWidth="400px" interactiveBorder={4}/>
                </div>
                </div>
                </div>
                
        </div>
    )
}

export default SignIn
