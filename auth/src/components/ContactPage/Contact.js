import React,{useState} from 'react';
import "./Contact.css";

function Contact() {
    const [email, setEmail]=useState(()=>localStorage.getItem("user_email")||"")
    const [message,setMessage]=useState("")
    const [successMessage, setSuccessMessage]=useState("")
    const hire =async(e)=>{
        e.preventDefault()
    }
    const b= `
    const body={email,message}
    const res= await fetch("/api/v1/hireme",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
    }) 
    const parseRes= res.json();
    setSuccessMessage("Mail Sent! You will be contacted within 24hrs!")
    `

    return (
        <div>
            
           <div className="contact-contain">
            <p className="title">Contact Me</p>
            <form className="contact-form" onSubmit={hire} method="POST">
                <div className="contact-input">
                    <label htmlFor="hiring_email">Your Email</label>     
                    <input id="hiring_email" value={email} onChange={e=>setEmail(e.target.value)} type="email"/> 
                </div>
                <div className="contact-input">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} type="text" rows="4" cols="65"/>
                    <textarea id="small-message" value={message} onChange={e=>setMessage(e.target.value)} type="text" rows="22" cols="41"/>

                </div>
                <div className="submit">
                <button  type="submit">Hire Me!</button>
                </div>
                <div className="success-message">{successMessage}</div>
                <div className="contact-list">
                    <ul>
                        <li>Chhavi Varma</li>
                        <li>Ph No: +91 8879455806</li>
                        <li>Email: cvarma649@gmail.com</li>
                    </ul>
                </div>
                <div></div>
            </form>
            </div>
        </div>
        
    )
}

export default Contact
