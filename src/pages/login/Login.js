import React from 'react'
import {Link} from 'react-router-dom'

import './login.css'

const Login = () => {
    return ( 
        <div className="login">
            
            <form className="loginForm">
            <h2>Calistenia APP</h2>
                <input type="text" placeholder="email" className="loginInput" />
                <input type="password" placeholder="password" className="loginInput" />
                <Link className="loginButton" to={"/dashboard/home"}>Ingresar</Link>
            </form>
        </div>

     );
}
 
export default Login;