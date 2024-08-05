import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Spinner from './Spinner';

const SingUp = () => {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    const user_datetime = currentDate;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(!first_name || !last_name || !email || !password) {
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
                const response = await fetch(`${apiUrl}/api/sessions/singUp`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ first_name, last_name, email, password, user_datetime })
                })
                const data = await response.json();
                if (response.ok) {
                    navigate("/login");
                    toast('El registro de usuario se ha realizado con éxito', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } 
                if(data.error === 'There is already a user with that email') {
                    toast('Ya existe un usuario con ese email!', {
                        position: "top-right",
                        autoClose: 1500,
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
            <div className='singUpContainer'>
                <div className='singUpContainer__credentials'>
                    <div className='singUpContainer__credentials__phrase'>
                        <h1 className='singUpContainer__credentials__phrase__title'>Que Corte</h1>
                    </div>
                    <div className='singUpContainer__credentials__phrase'>
                        <h2 className=''>Registro de usuario</h2>
                    </div>
                    <form className='singUpContainer__credentials__form'>
                        <div className='singUpContainer__credentials__form__label-input'>
                            <h2 className='singUpContainer__credentials__form__label-input__label'>Nombre</h2>
                            <input className='singUpContainer__credentials__form__label-input__input' placeholder='Nombre' onChange={(e) => {setFirstName(e.target.value)}}/>
                        </div>
                        <div className='singUpContainer__credentials__form__label-input'>
                            <h2 className='singUpContainer__credentials__form__label-input__label'>Apellido</h2>
                            <input className='singUpContainer__credentials__form__label-input__input' placeholder='Apellido' onChange={(e) => {setLastName(e.target.value)}}/>
                        </div>
                        <div className='singUpContainer__credentials__form__label-input'>
                            <h2 className='singUpContainer__credentials__form__label-input__label'>Email</h2>
                            <input className='singUpContainer__credentials__form__label-input__input' type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <div className='singUpContainer__credentials__form__label-input'>
                            <h2 className='singUpContainer__credentials__form__label-input__label'>Contraseña</h2>
                            <input className='singUpContainer__credentials__form__label-input__input' type='password' placeholder='Contraseña' onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <div className='singUpContainer__credentials__form__btn'>
                            <button className='singUpContainer__credentials__form__btn__prop' onClick={handleSubmit}>Registrarse</button>
                        </div> 
                    </form>
                    <Link to={"/login"} className='singUpContainer__credentials__form__btn'>
                        <button className='singUpContainer__credentials__form__btn__prop'>Iniciar sesión</button>
                    </Link>
                    <div className='singUpContainer__credentials__form__btn'>
                        {showSpinner&&<Spinner/>}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default SingUp