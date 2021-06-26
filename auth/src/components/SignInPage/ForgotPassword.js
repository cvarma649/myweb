import React,{useState} from 'react';
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail]=useState("")
    const [successMessage, setSuccessMessage]=useState("")

    const sendResetLink=(e)=>{
        e.preventDefault();
    }
    return (
        <div>
            <div className="fp-container">
           <p className="title">Forgot Password</p>
            <form className="login-form11" onSubmit={sendResetLink} method="POST">
                <div className="login-input11">
                    <label htmlFor="email">Email</label>     
                    <input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email"/> 
                </div>
                <div className="submit">
                <button  type="submit">Send Reset Link</button>
                </div>
                <div className="success-message">{successMessage}</div>
            </form> 
            </div>
        </div>
    )
}

export default ForgotPassword;
