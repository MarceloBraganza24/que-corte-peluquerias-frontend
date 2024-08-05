import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import {OpenModalContext} from '../context/OpenModalContext'; 

const CreatePartnerModalMobile = ({setIsOpenCreatePartnerModalLocalMobile,resultCompleteMembershipNumber}) => {
    const {handleCreatePartnerModalMobile} = useContext(OpenModalContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [inputFirstNamePaL, setInputFirstNamePaL] = useState('');
    const [inputLastNamePaL, setInputLastNamePaL] = useState('');
    //const [inputPartnerNumberPaL, setInputPartnerNumberPaL] = useState('');
    const [selectOptionMembershipNumber, setSelectOptionMembershipNumberShL] = useState('');
    const [inputEmailPaL, setInputEmailPaL] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    const regex = /^[A-Za-zñÑ\s]*$/;
    const optionsMembershipNumber = [];
    resultCompleteMembershipNumber.forEach((element) => {
        optionsMembershipNumber.push(element)
    })

    const handleInputFirstNamePaL = (e) => {
        const texto = e.target.value;
        if(regex.test(texto)) {
        setInputFirstNamePaL(texto);
        }
    };

    const handleInputLastNamePaL = (e) => {
        const texto = e.target.value;
        if(regex.test(texto)) {
          setInputLastNamePaL(texto);
        }
    };

    const handleSelectOptionMembershipNumberShL = (e) => {
        setSelectOptionMembershipNumberShL(e);
    };

    const handleInputEmailPaL = (e) => {
        const texto = e.target.value;
        setInputEmailPaL(texto);
    };

    const closeM = () => {
        setIsOpenCreatePartnerModalLocalMobile(false);
        handleCreatePartnerModalMobile(false);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const cleanPropsCreatePartner = () => {
        setInputFirstNamePaL('')
        setInputLastNamePaL('')
        setInputEmailPaL('')
        setSelectOptionMembershipNumberShL(optionsMembershipNumber[0])
    };

    const handleBtnCreatePartner = async() => {
        if(!inputFirstNamePaL || !inputLastNamePaL || !inputEmailPaL) {
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
        } else if (inputEmailPaL && !validateEmail(inputEmailPaL)) {
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
            document.getElementById('btnCreatePartner').style.display = 'none';
            setShowSpinner(true);
            const partnerToCreate = {
                first_name: inputFirstNamePaL,
                last_name: inputLastNamePaL,
                partner_number: selectOptionMembershipNumber?selectOptionMembershipNumber:optionsMembershipNumber[0],
                email: inputEmailPaL,
                partner_datetime: currentDate
            }
            const response = await fetch(`${apiUrl}/api/partners/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partnerToCreate)
            })
            if(response.ok) {
                toast('Has registrado un socio correctamente!', {
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
                    cleanPropsCreatePartner();
                    document.getElementById('btnCreatePartner').style.display = 'block';
                    setShowSpinner(false);
                }, 2000);
            }
            const data = await response.json();
            if(data.error === 'There is already a partner with that data') {
                toast('Ya existe un socio con ese email o número de socio ingresado!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnCreatePartner').style.display = 'block';
                setShowSpinner(false);
            }
        }
    };

    return (
        <>
            <div className='createPartnerModalContainerMobile'>
                <div className='createPartnerModalContainerMobile__btnCloseModal'>
                    <Link onClick={closeM} className='createPartnerModalContainerMobile__btnCloseModal__prop'>
                        Cerrar
                    </Link>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createPartnerModalContainerMobile__labelInput'>
                    <div className='createPartnerModalContainerMobile__labelInput__label'>
                        <div className='createPartnerModalContainerMobile__labelInput__label__prop'>N° socio:</div>
                    </div>
                    <div className='createPartnerModalContainerMobile__labelInput__select'>
                        <select className='createPartnerModalContainerMobile__labelInput__select__prop' value={selectOptionMembershipNumber} onChange={(e) => {handleSelectOptionMembershipNumberShL(e.target.value)}}>
                            {optionsMembershipNumber.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createPartnerModalContainerMobile__labelInput'>
                    <div className='createPartnerModalContainerMobile__labelInput__label'>
                        <div className='createPartnerModalContainerMobile__labelInput__label__prop'>Nombre:</div>
                    </div>
                    <div className='createPartnerModalContainerMobile__labelInput__input'>
                        <input type='text' className='createPartnerModalContainerMobile__labelInput__input__prop' value={inputFirstNamePaL} onChange={handleInputFirstNamePaL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createPartnerModalContainerMobile__labelInput'>
                    <div className='createPartnerModalContainerMobile__labelInput__label'>
                        <div className='createPartnerModalContainerMobile__labelInput__label__prop'>Apellido:</div>
                    </div>
                    <div className='createPartnerModalContainerMobile__labelInput__input'>
                        <input type='text' className='createPartnerModalContainerMobile__labelInput__input__prop' value={inputLastNamePaL} onChange={handleInputLastNamePaL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createPartnerModalContainerMobile__labelInput'>
                    <div className='createPartnerModalContainerMobile__labelInput__label'>
                        <div className='createPartnerModalContainerMobile__labelInput__label__prop'>Email:</div>
                    </div>
                    <div className='createPartnerModalContainerMobile__labelInput__input'>
                        <input type='email' className='createPartnerModalContainerMobile__labelInput__input__prop' value={inputEmailPaL} onChange={handleInputEmailPaL}/>
                    </div>
                </div>
                <div style={{paddingTop:'2vh'}} className='createPartnerModalContainerMobile__btns'>
                    <button id='btnCreatePartner' className='createPartnerModalContainerMobile__btns__btn' onClick={handleBtnCreatePartner}>Crear socio</button>
                </div>
                {showSpinner&&<Spinner/>}
            </div>
        </>
    )
}

export default CreatePartnerModalMobile