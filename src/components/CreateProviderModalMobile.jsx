import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import {OpenModalContext} from '../context/OpenModalContext'; 

const CreateProviderModalMobile = ({setIsOpenCreateProviderModalLocalMobile}) => {
    const {handleCreateProviderModalMobile} = useContext(OpenModalContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [inputBusinessNamePrL, setInputBusinessNamePrL] = useState('');
    const [inputCuitCuilPrL, setInputCuitCuilPrL] = useState('');
    const [inputPhonePrL, setInputPhonePrL] = useState('');
    const [inputEmailPrL, setInputEmailPrL] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    const handleInputBusinessNamePrL = (e) => {
        const texto = e.target.value;
        setInputBusinessNamePrL(texto);
    };

    const handleInputCuitCuilPrL = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputCuitCuilPrL(inputValue);
        }
    };

    const handleInputPhonePrL = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputPhonePrL(inputValue);
        }
    };

    const handleInputEmailPrL = (e) => {
        const texto = e.target.value;
        setInputEmailPrL(texto);
    };

    const closeM = () => {
        setIsOpenCreateProviderModalLocalMobile(false);
        handleCreateProviderModalMobile(false);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const cleanPropsCreateProvider = () => {
        setInputBusinessNamePrL('')
        setInputCuitCuilPrL('')
        setInputPhonePrL('')
        setInputEmailPrL('')
    };

    const handleBtnCreatePartner = async() => {
        if(!inputBusinessNamePrL || !inputCuitCuilPrL || !inputPhonePrL || !inputEmailPrL) {
            toast('Debes completar todos los campos!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (inputEmailPrL && !validateEmail(inputEmailPrL)) {
            toast('El email no es válido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            document.getElementById('btnCreateProvider').style.display = 'none';
            setShowSpinner(true);
            const providerToCreate = {
                business_name: inputBusinessNamePrL,
                cuit_cuil: inputCuitCuilPrL,
                phone: inputPhonePrL,
                email: inputEmailPrL,
                provider_datetime: currentDate
            }
            const response = await fetch(`${apiUrl}/api/providers/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(providerToCreate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has registrado un proveedor correctamente!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    document.getElementById('btnCreateProvider').style.display = 'block';
                    setShowSpinner(false);   
                    cleanPropsCreateProvider();
                }, 2000);
            }
            if(data.error === 'There is already a provider with that CUIT-CUIL') {
                toast('Ya existe un proveedor con ese CUIT-CUIL!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnCreateProvider').style.display = 'block';
                setShowSpinner(false);
            } else if(data.error === 'There is already a provider with that email') {
                toast('Ya existe un proveedor con ese email!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnCreateProvider').style.display = 'block';
                setShowSpinner(false);
            } else if(data.error === 'There is already a provider with that business name') {
                toast('Ya existe un proveedor con esa razón social!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnCreateProvider').style.display = 'block';
                setShowSpinner(false);
            }
        }
    };

    return (
        <>
            <div className='createProviderModalContainerMobile'>
                <div className='createProviderModalContainerMobile__btnCloseModal'>
                    <Link onClick={closeM} className='createProviderModalContainerMobile__btnCloseModal__prop'>
                        Cerrar
                    </Link>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProviderModalContainerMobile__labelInput'>
                    <div className='createProviderModalContainerMobile__labelInput__label'>
                        <div className='createProviderModalContainerMobile__labelInput__label__prop'>Razón social:</div>
                    </div>
                    <div className='createProviderModalContainerMobile__labelInput__input'>
                        <input type='text' className='createProviderModalContainerMobile__labelInput__input__prop' value={inputBusinessNamePrL} onChange={handleInputBusinessNamePrL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProviderModalContainerMobile__labelInput'>
                    <div className='createProviderModalContainerMobile__labelInput__label'>
                        <div className='createProviderModalContainerMobile__labelInput__label__prop'>CUIT-CUIL:</div>
                    </div>
                    <div className='createProviderModalContainerMobile__labelInput__input'>
                        <input type='text' className='createProviderModalContainerMobile__labelInput__input__prop' value={inputCuitCuilPrL} onChange={handleInputCuitCuilPrL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProviderModalContainerMobile__labelInput'>
                    <div className='createProviderModalContainerMobile__labelInput__label'>
                        <div className='createProviderModalContainerMobile__labelInput__label__prop'>Teléfono:</div>
                    </div>
                    <div className='createProviderModalContainerMobile__labelInput__input'>
                        <input className='createProviderModalContainerMobile__labelInput__input__prop' value={inputPhonePrL} onChange={handleInputPhonePrL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProviderModalContainerMobile__labelInput'>
                    <div className='createProviderModalContainerMobile__labelInput__label'>
                        <div className='createProviderModalContainerMobile__labelInput__label__prop'>Email:</div>
                    </div>
                    <div className='createProviderModalContainerMobile__labelInput__input'>
                        <input type='email' className='createProviderModalContainerMobile__labelInput__input__prop' value={inputEmailPrL} onChange={handleInputEmailPrL}/>
                    </div>
                </div>
                <div style={{paddingTop:'2vh'}} className='createProviderModalContainerMobile__btns'>
                    <button id='btnCreateProvider' className='createProviderModalContainerMobile__btns__btn' onClick={handleBtnCreatePartner}>Crear proveedor</button>
                </div>
                {showSpinner&&<Spinner/>}
            </div>
        </>
    )
}

export default CreateProviderModalMobile