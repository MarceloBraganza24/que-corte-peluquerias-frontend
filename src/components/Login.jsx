import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {IsLoggedContext} from '../context/IsLoggedContext';
import Spinner from './Spinner';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(IsLoggedContext);
    const [showSpinner, setShowSpinner] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

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
                setShowSpinner(true);
                const response = await fetch(`${apiUrl}/api/sessions/login`, {
                    method: 'POST',         
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                })
                const data = await response.json();
                if (response.ok) {
                    const tokenJWT = data.data;
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 1);
                    const cookieJWT = `TokenJWT=${tokenJWT}; expires=${expirationDate.toUTCString()}`;
                    document.cookie = cookieJWT;
                    navigate("/home");
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
                }
                if(data.error === 'incorrect credentials') {
                    toast('Alguno de los datos ingresados es incorrecto. Inténtalo nuevamente!', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setShowSpinner(false);
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
                    <form className='loginContainer__credentials__form'>
                        <div className='loginContainer__credentials__form__label-input'>
                            <h2 className='loginContainer__credentials__form__label-input__label'>Email</h2>
                            <input className='loginContainer__credentials__form__label-input__input' type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <div className='loginContainer__credentials__form__label-input'>
                            <h2 className='loginContainer__credentials__form__label-input__label'>Contraseña</h2>
                            <input className='loginContainer__credentials__form__label-input__input' type='password' placeholder='Contraseña' onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>     
                        <div className='loginContainer__credentials__form__btn'>
                            <button className='loginContainer__credentials__form__btn__prop' onClick={handleSubmit}>Iniciar sesión</button>
                        </div>       
                    </form>
                    <Link to={"/singUp"} className='loginContainer__credentials__form__btn'>
                        <button className='loginContainer__credentials__form__btn__prop'>Registrarse</button>
                    </Link>
                    <Link to={"/sendMail"} className='loginContainer__credentials__phrase'>
                        <div className='loginContainer__credentials__phrase__sendMail'>¿Olvidaste tu contraseña? Has click aquí</div>
                    </Link>
                    <div className='loginContainer__credentials__form__btn'>
                        {showSpinner&&<Spinner/>}
                    </div>  
                </div>
            </div>
        </>
    )
}

export default Login