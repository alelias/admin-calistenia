import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './login.css'

const Login = () => {

    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    //const [loginStatus, setLoginStatus] = useState("")

    const login = () => {
        
        axios.post("https://back-calistenia.herokuapp.com/api/login", {
            correo: correo,
            password: password
        }).then((response) => {
            console.log(response);
        })
    }

    return ( 
        <div className="login">
            
            <form className="loginForm">
            <h2>Calistenia APP</h2>
                <input 
                    type="text" 
                    placeholder="email" 
                    className="loginInput"
                    onChange={(e) => {
                        setCorreo(e.target.value)
                    }}    
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    className="loginInput" 
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} 
                />
                
                <Link onClick={login} className="loginButton" to={"/dashboard/home"}>Ingresar</Link>
                {/*to={"/dashboard/home"} */}
            </form>
        </div>

     );
}
 
export default Login;