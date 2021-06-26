import React from 'react'
import "./Nav.css";
import {Link} from "react-router-dom";


function Nav({auth, logout}) {
    return (
        <div className="nav-contain">
            <div className="navbar  navbar-default navbar-static-top" >
               <div className="nav" >
                   <ul >
                     <li><Link  to="/">Home</Link></li>
                     <li><Link to="/about">About Me</Link></li>    
                     <li>
                     {!auth ? <Link to="/signin">Sign In</Link> : <Link onClick={e=>logout(e)}>SignOut</Link>}
                     </li>
                     <li><Link to="/contact">Contact</Link></li>
                 </ul>
               </div>
            </div>
        </div>
    )
}

export default Nav


