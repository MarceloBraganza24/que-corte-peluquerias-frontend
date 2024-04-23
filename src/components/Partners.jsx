import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataPaContext} from '../context/InputDataPaContext';

const Partners = () => {
    const [preferenceId, setPreferenceId] = useState(null);
    const { inputFirstNamePa, handleInputFirstNamePa, inputLastNamePa, handleInputLastNamePa, inputDniPa, handleInputDniPa, inputPhonePa, handleInputPhonePa, inputEmailPa, handleInputEmailPa } = useContext(InputDataPaContext);
    initMercadoPago('APP_USR-c6a80bf1-6064-4d38-85c2-873ae24113ef', {
        locale: 'es-AR'
    });
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const pagarCuotaSocioBtn = document.getElementById('pagarCuotaSocioBtn');

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

    const pagarCuotaSocio = async (event) => {
        try {
            const order = {
                title: 'Cuota socio',
                quantity: 1,
                unit_price: 500,
                first_name: inputFirstNamePa,
                last_name: inputLastNamePa,
                dni: inputDniPa,
                phone: inputPhonePa,
                email: inputEmailPa
            }
            if(!inputFirstNamePa || !inputLastNamePa || !inputDniPa || !inputPhonePa || !inputEmailPa) {
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
                pagarCuotaSocioBtn.style.display = 'none';
                const preference = await fetch('http://localhost:8081/api/payments/create-preference-partner', {
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

    const handlePartnerPay = async (evt) => {
        evt.preventDefault();
        const id = await pagarCuotaSocio();
        if(id) setPreferenceId(id);
    };

    const loginToast = (event) => {
        event.preventDefault();
        toast('Debes iniciar sesión para registrarte como socio', {
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

  return (
      <>
            <NavBar/>
        {
            !isLoggedIn ? 
            <>
                <div className='warningLogin'>
                <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
                </div>
                <div className='partnersContainer'>
                    <div className='partnersContainer__form'>
                        <h2 className='partnersContainer__form__phrase'>Registrate aquí mismo</h2>
                        <div className='partnersContainer__form__credentials'>
                            <form>
                                <div className='partnersContainer__form__credentials__label-input'>
                                    <h2 className='partnersContainer__form__credentials__label-input__label'>Nombre:</h2>
                                    <input className='partnersContainer__form__credentials__label-input__input' disabled placeholder='Nombre' onChange={(e) => {setFirstName(e.target.value)}}/>
                                </div>
                                <div className='partnersContainer__form__credentials__label-input'>
                                    <h2 className='partnersContainer__form__credentials__label-input__label'>Apellido:</h2>
                                    <input className='partnersContainer__form__credentials__label-input__input' disabled placeholder='Apellido' onChange={(e) => {setLastName(e.target.value)}}/>
                                </div>
                                <div className='partnersContainer__form__credentials__label-input'>
                                    <h2 className='partnersContainer__form__credentials__label-input__label'>Dni:</h2>
                                    <input className='partnersContainer__form__credentials__label-input__input' disabled type='number' placeholder='Dni' onChange={(e) => {setDni(e.target.value)}}/>
                                </div>
                                <div className='partnersContainer__form__credentials__label-input'>
                                    <h2 className='partnersContainer__form__credentials__label-input__label'>Teléfono:</h2>
                                    <input className='partnersContainer__form__credentials__label-input__input' disabled type='number' placeholder='Teléfono' onChange={(e) => {setPhone(e.target.value)}}/>
                                </div>
                                <div className='partnersContainer__form__credentials__label-input'>
                                    <h2 className='partnersContainer__form__credentials__label-input__label'>Email:</h2>
                                    <input className='partnersContainer__form__credentials__label-input__input' disabled type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
                                </div>
                                <div className='partnersContainer__form__credentials__btn'>
                                    <button className='partnersContainer__form__credentials__btn__prop' onClick={loginToast}>Registrarse</button>
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
            </> 
            :
            <>
                <div className='partnersContainerIsLoggedIn'>
                    <div className='partnersContainerIsLoggedIn__form'>
                        <h2 className='partnersContainerIsLoggedIn__form__phrase'>Registrate aquí mismo</h2>
                        <div className='partnersContainerIsLoggedIn__form__credentials'>
                            <form>
                                <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                    <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Nombre:</h2>
                                    <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Nombre' value={inputFirstNamePa} onChange={(e) => {handleInputFirstNamePa(e.target.value)}}/>
                                </div>
                                <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                    <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Apellido:</h2>
                                    <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' placeholder='Apellido' value={inputLastNamePa} onChange={(e) => {handleInputLastNamePa(e.target.value)}}/>
                                </div>
                                <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                    <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Dni:</h2>
                                    <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='number' placeholder='Dni' value={inputDniPa} onChange={(e) => {handleInputDniPa(e.target.value)}}/>
                                </div>
                                <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                    <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Teléfono:</h2>
                                    <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='number' placeholder='Teléfono' value={inputPhonePa} onChange={(e) => {handleInputPhonePa(e.target.value)}}/>
                                </div>
                                <div className='partnersContainerIsLoggedIn__form__credentials__label-input'>
                                    <h2 className='partnersContainerIsLoggedIn__form__credentials__label-input__label'>Email:</h2>
                                    <input className='partnersContainerIsLoggedIn__form__credentials__label-input__input' type='email' placeholder='Email' value={inputEmailPa} onChange={(e) => {handleInputEmailPa(e.target.value)}}/>
                                </div>
                                <div className='partnersContainerIsLoggedIn__form__credentials__btn'>
                                    <button id='pagarCuotaSocioBtn' className='partnersContainerIsLoggedIn__form__credentials__btn__prop' onClick={handlePartnerPay}>Registrarse</button>
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

export default Partners