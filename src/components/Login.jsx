import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(IsLoggedContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(!email || !password) {
                toast('Debes completar todos los campos', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                const response = await fetch('http://localhost:8081/api/sessions/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                const data = await response.json();
                const tokenJWT = data.data;
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 1);
                const cookieHttp = `TokenJWT=${tokenJWT}; expires=${expirationDate.toUTCString()}`;
                const cookieHttps = `TokenJWT=${tokenJWT}; domain="https://g9s2wrzd-5173.brs.devtunnels.ms"; port="5173"; expires=${expirationDate.toUTCString()}`;
                document.cookie = cookieHttp;
                document.cookie = cookieHttps;
                if (response.ok) {
                    navigate("/");
                    toast('Bienvenido, has iniciado sesion con éxito!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    login();
                } else {
                    toast('Alguno de los datos ingresados es incorrecto. Inténtalo nuevamente.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <>
            <div className='loginContainer'>
                <div className='loginContainer__credentials'>
                    
                    <div className='loginContainer__credentials__phrase'>
                        <h1 className='loginContainer__credentials__phrase__title'>Que Corte</h1>
                    </div>
                    <div className='loginContainer__credentials__phrase'>
                        <h2 className=''>Inicio de sesión</h2>
                    </div>
                    <form className='loginContainer__credentials__form' onSubmit={handleSubmit}>
                        <div className='loginContainer__credentials__form__label-input'>
                            <h2 className='loginContainer__credentials__form__label-input__label'>Email</h2>
                            <input className='loginContainer__credentials__form__label-input__input' type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <div className='loginContainer__credentials__form__label-input'>
                            <h2 className='loginContainer__credentials__form__label-input__label'>Contraseña</h2>
                            <input className='loginContainer__credentials__form__label-input__input' type='password' placeholder='Contraseña' onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>     
                        <div className='loginContainer__credentials__form__btn'>
                            <button className='loginContainer__credentials__form__btn__prop' type="submit">Iniciar sesión</button>
                        </div>       
                    </form>
                    <Link to={"/singUp"} className='loginContainer__credentials__form__btn'>
                        <button className='loginContainer__credentials__form__btn__prop'>Registrarse</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Login