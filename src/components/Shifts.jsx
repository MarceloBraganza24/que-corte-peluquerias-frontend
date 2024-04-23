import React, { useState, useEffect, useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataShContext} from '../context/InputDataShContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

const Shifts = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const { inputFirstNameSh, handleInputFirstNameSh, inputLastNameSh, handleInputLastNameSh, inputDateSh, handleInputDateSh, inputScheduleSh, handleInputScheduleSh, inputOptionSh, handleInputOptionSh, inputPriceSh } = useContext(InputDataShContext);
    const options = ["Elije tu turno","Caballeros", "Damas", "Niños"];
    initMercadoPago('APP_USR-c6a80bf1-6064-4d38-85c2-873ae24113ef', {
        locale: 'es-AR'
    });
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const pagarTurnoBtn = document.getElementById('pagarTurnoBtn');

    useEffect(() => {
        const getCookie = (name) => {
            const cookieName = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
            }
            return "";
        };

        const cookieValue = getCookie('TokenJWT');
        if(cookieValue) {
            login()
          } else {
            logout()
          }
        //mountHome(cookieValue);
    }, []);

    /* const mountHome = (cookie) => {
        if(cookie) {
          login()
        } else {
          logout()
        }
    } */

    const pagarTurno = async () => {
        try {
            const order = {
                title: inputOptionSh,
                quantity: 1,
                unit_price: inputPriceSh,
                first_name: inputFirstNameSh,
                last_name: inputLastNameSh,
                date: inputDateSh,
                schedule: inputScheduleSh
            }
            if(!inputFirstNameSh || !inputLastNameSh || !inputDateSh || !inputScheduleSh || !inputPriceSh) {
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
                pagarTurnoBtn.style.display = 'none';
                const preference = await fetch('http://localhost:8081/api/payments/create-preference-shift', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                const response = await preference.json();
                const id = response.id;
                return id;
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleBuy = async (evt) => {
        evt.preventDefault();
        const id = await pagarTurno();
        if(id) setPreferenceId(id);
    };

    const handleDateChange = date => {
        handleInputDateSh(date);
    };
    
    const loginToast = async (evt) => {
        evt.preventDefault();
        toast('Debes iniciar sesión para registrar un turno', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
  return (
    <>
        <NavBar/>
        {
            !isLoggedIn ? 
        <>
            <div className='warningLogin'>
              <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
            </div>
            <div className='shiftsContainer'>
                <div className='shiftsContainer__form'>
                    <h2 className='shiftsContainer__form__phrase'>Registrá tu turno</h2>
                    <div className='shiftsContainer__form__credentials'>
                        <form >
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Nombre:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' disabled placeholder='Nombre' onChange={(e) => {handleInputFirstNameSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Apellido:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' disabled placeholder='Apellido' onChange={(e) => {handleInputLastNameSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Fecha:</h2>
                                <DatePicker className='datePiker'
                                    disabled
                                    selected={inputDateSh}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Seleccione una fecha"
                                />
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Horario:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' disabled type='time' placeholder='Horario' onChange={(e) => {handleInputScheduleSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Turno:</h2>
                                <select disabled value={inputOptionSh} onChange={handleInputOptionSh}>
                                </select>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <h2 className='shiftsContainer__form__credentials__label-input__label'>Precio:</h2>
                                <input id='priceShift' className='shiftsContainer__form__credentials__label-input__input__precio' disabled value={inputPriceSh}/>
                            </div>
                            <div className='shiftsContainer__form__credentials__btn'>
                                <button id='pagarTurnoBtn' className='shiftsContainer__form__credentials__btn__prop' onClick={loginToast}>Pagar</button>
                            </div>
                        </form>
                    </div>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                </div>
            </div>
            </> 
            :
            <>
            <div className='shiftsContainerIsLoggedIn'>
                <div className='shiftsContainerIsLoggedIn__form'>
                    <h2 className='shiftsContainerIsLoggedIn__form__phrase'>Registrá tu turno</h2>
                    <div className='shiftsContainerIsLoggedIn__form__credentials'>
                        <form >
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Nombre:</h2>
                                <input className='shiftsContainer__form__credentials__label-input__input' placeholder='Nombre' value={inputFirstNameSh} onChange={(e) => {handleInputFirstNameSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Apellido:</h2>
                                <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Apellido' value={inputLastNameSh} onChange={(e) => {handleInputLastNameSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Fecha:</h2>
                                <DatePicker className='datePiker'
                                    selected={inputDateSh}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Seleccione una fecha"
                                />
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Horario:</h2>
                                <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input' type='time' value={inputScheduleSh} placeholder='Horario' onChange={(e) => {handleInputScheduleSh(e.target.value)}}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Turno:</h2>
                                <select value={inputOptionSh} onChange={(e) => {handleInputOptionSh(e.target.value)}}>
                                    {options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>Precio:</h2>
                                <input id='priceShift' className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__precio' disabled value={inputPriceSh}/>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__btn'>
                                <button id='pagarTurnoBtn' className='shiftsContainerIsLoggedIn__form__credentials__btn__prop' onClick={handleBuy}>Pagar</button>
                            </div>
                        </form>
                    </div>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                </div>
            </div>
            <LogOut/> 
            </>
        }
        <Footer/>
    </>
  )
}

export default Shifts