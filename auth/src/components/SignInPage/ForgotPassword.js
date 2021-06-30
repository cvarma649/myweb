import React,{useState} from 'react';
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail]=useState("")
    const [successMessage, setSuccessMessage]=useState("")
    const baseUrl = process.env.NODE_ENV==="production" ? "/api/v1":"http://localhost:5000/api/v1"
    
   const sendResetLink=async(e)=>{
        e.preventDefault();
        if(email.length>0){
        const body={email}
        const res = await fetch(`${baseUrl}/forgot_password`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        const parseRes = await res.json();
        console.log(parseRes)
        setSuccessMessage(parseRes.message)
        
    }
        else{
            setSuccessMessage("Invalid Email")
        }}
   
    return (
        <div>
            <div className="fp-container">
           <p className="title">Forgot Password</p>
            <form className="login-form11" onSubmit={sendResetLink} method="POST">
                <div className="login-input11">
                    <label htmlFor="email">Email</label>     
                    <input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="text"/> 
                </div>
                <div className="submit">
                <button  type="submit">Send Reset Link</button>
                </div>
                <div className="success-message"><p>`      ${successMessage}`</p></div>
            </form> 
            </div>
        </div>
    )
}

export default ForgotPassword;
