import React, {useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Spinner from './Spinner';
import {OpenModalContext} from '../context/OpenModalContext';

const PartnersListModal = ({id,first_name,last_name,partner_number,email,handleUpdatePartnerModalLocal,resultCompleteMembershipNumber}) => {
    const [inputFirstNameIPa, setInputFirstNameIPa] = useState('');
    const [inputLastNameIPa, setInputLastNameIPa] = useState('');
    const [inputPartnerNumberIPa, setInputPartnerNumberIPa] = useState('');
    const [selectOptionMembershipNumber, handleSelectOptionMembershipNumberShL] = useState('');
    const [inputEmailIPa, setInputEmailIPa] = useState('');
    const [confirmationDelPartnersModal, handleConfirmationDelPartnersModal] = useState(false);
    const {handleUpdatePartnerModal} = useContext(OpenModalContext);
    const [inputChanges, setInputChanges] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const optionsMembershipNumber = [];
    optionsMembershipNumber.push(`${partner_number}`)
    resultCompleteMembershipNumber.forEach((element) => {
        optionsMembershipNumber.push(element)
    })

    const handleInputFirstNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputFirstNameIPa(texto);
        texto===first_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputLastNameIPa!==last_name && inputLastNameIPa!=='')setInputChanges(true);
        if(inputPartnerNumberIPa!=partner_number && inputPartnerNumberIPa!='')setInputChanges(true);
        if(inputEmailIPa!==email && inputEmailIPa!=='')setInputChanges(true);
    };

    const handleInputLastNameIPa = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputLastNameIPa(texto);
        texto===last_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputFirstNameIPa!==first_name && inputFirstNameIPa!=='')setInputChanges(true);
        if(inputPartnerNumberIPa!=partner_number && inputPartnerNumberIPa!='')setInputChanges(true);
        if(inputEmailIPa!==email && inputEmailIPa!=='')setInputChanges(true);
    };

    const handleInputPartnerNumberIPa = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputPartnerNumberIPa(inputValue);
            inputValue==partner_number?setInputChanges(false):setInputChanges(true);
            inputValue==''&&setInputChanges(false);
            if(inputFirstNameIPa!==first_name && inputFirstNameIPa!=='')setInputChanges(true);
            if(inputLastNameIPa!==last_name && inputLastNameIPa!=='')setInputChanges(true);
            if(inputEmailIPa!==email && inputEmailIPa!=='')setInputChanges(true);
        }
    };

    const handleInputEmailIPa = (e) => {
        const texto = e.target.value;
        setInputEmailIPa(texto);
        texto===email?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputFirstNameIPa!==first_name && inputFirstNameIPa!=='')setInputChanges(true);
        if(inputLastNameIPa!==last_name && inputLastNameIPa!=='')setInputChanges(true);
        if(inputPartnerNumberIPa!=partner_number && inputPartnerNumberIPa!='')setInputChanges(true);
    };

    const handleBtnDelPartner = async() => {
        handleConfirmationDelPartnersModal(true);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleBtnUpdPartner = async() => {
        if (!validateEmail(inputEmailIPa?inputEmailIPa:email)) {
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
        } else if ((inputFirstNameIPa == first_name || inputFirstNameIPa == '') && (inputLastNameIPa == last_name || inputLastNameIPa == '') && (inputEmailIPa == email || inputEmailIPa == '') && (selectOptionMembershipNumber?selectOptionMembershipNumber:optionsMembershipNumber[0]) == partner_number) {
            toast('No tienes cambios para actualizar!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if ((inputFirstNameIPa != first_name || inputFirstNameIPa != '') || (inputLastNameIPa != last_name || inputLastNameIPa != '') || (inputEmailIPa != email || inputEmailIPa != '') || (selectOptionMembershipNumber?selectOptionMembershipNumber:optionsMembershipNumber[0]) != partner_number) {
            document.getElementById('btnUpdatePartner').style.display = 'none';
            setShowSpinner(true);
            const partnerToUpdate = {
                first_name: inputFirstNameIPa?inputFirstNameIPa:first_name,
                last_name: inputLastNameIPa?inputLastNameIPa:last_name,
                partner_number: selectOptionMembershipNumber?selectOptionMembershipNumber:partner_number,
                email: inputEmailIPa?inputEmailIPa:email
            }
            const response = await fetch(`${apiUrl}/api/partners/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partnerToUpdate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has actualizado el turno correctamente!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    handleUpdatePartnerModal(false);
                    handleUpdatePartnerModalLocal(false);
                    setInputChanges(false);
                }, 1500);
            }
            if(data.error === 'There is already a partner with that email or membership number') {
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
                document.getElementById('btnUpdatePartner').style.display = 'block';
                setShowSpinner(false);
            } else if(data.error === 'There is already a partner with that data') {
                toast('No tienes cambios para actualizar!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnUpdatePartner').style.display = 'block';
                setShowSpinner(false);
                setInputChanges(false);
            }
        }
    };

    const ConfirmationDeleteModal = () => {
        const handleBtnDelPartner = async() => {
            setShowSpinner(true);
            const response = await fetch(`${apiUrl}/api/partners/${id}`, {
                method: 'DELETE',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            })
            if(response.ok) {
                toast('Has eliminado el socio correctamente!', {
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
                    handleUpdatePartnerModal(false);
                    handleUpdatePartnerModalLocal(false);
                    handleConfirmationDelPartnersModal(false);
                    setInputChanges(false);
                }, 2000);
            } else {
                toast('Has ocurrido un error al querer eliminar el socio!', {
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
        };

        const handleBtnConfirmationDeleteBtnNo = () => {
            handleConfirmationDelPartnersModal(false);
        }

        return (
            <>
                <div className='confirmationDeleteBtnPartnersListModalContainer'>
                    <div className='confirmationDeleteBtnPartnersListModalContainer__ask'>¿Estás seguro que deseas borrar el socio?</div>
                    <div className='confirmationDeleteBtnPartnersListModalContainer__askMobile'>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__askMobile__ask'>¿Estás seguro que deseas</div>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__askMobile__ask'>borrar el socio?</div>
                    </div>
                    <div className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer'>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns'>
                            <div></div>
                        </div>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnDelPartner} className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns__prop'>Si</button>
                        </div>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns__prop'>No</button>
                        </div>
                        <div className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns'>
                            {showSpinner&&<Spinner/>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const closeM = () => {
        handleUpdatePartnerModal(false);
        handleUpdatePartnerModalLocal(false);
    }

    const unsavedChanges = () => {
        toast('No has actualizado los cambios!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const buttonDisabledStyle = {
        color: 'white',
        cursor: 'pointer'
    };

    return (
    <>
        
        <div className='partnersModalContainer'>
            <div className='partnersModalContainer__btnCloseModal'>
                {
                    !confirmationDelPartnersModal&&!inputChanges?
                    <>
                        <Link onClick={closeM} className='partnersModalContainer__btnCloseModal__prop'>
                            Cerrar
                        </Link>
                    </>
                        :
                    <>
                        <div onClick={unsavedChanges} className='partnersModalContainer__btnCloseModal__prop'>Cerrar</div>
                    </>
                }
            </div>
            <div className='partnersModalContainer__header'>
                <div className='partnersModalContainer__header__label'>N° socio</div>
                <div className='partnersModalContainer__header__label'>Nombre</div>
                <div className='partnersModalContainer__header__label'>Apellido</div>
                <div className='partnersModalContainer__header__label'>Email</div>
            </div>
            <div className='partnersModalContainer__itemPartner'>
                {
                    !confirmationDelPartnersModal?
                    <>
                        <div className='partnersModalContainer__itemPartner__input'>
                            {/* <input className='partnersModalContainer__itemPartner__input__prop' maxLength={13} value={!inputPartnerNumberIPa?partner_number:inputPartnerNumberIPa} onChange={handleInputPartnerNumberIPa}/> */}
                            <select className='itemCreatePartner__select__prop' value={selectOptionMembershipNumber} onChange={(e) => {handleSelectOptionMembershipNumberShL(e.target.value)}}>
                                {optionsMembershipNumber.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input className='partnersModalContainer__itemPartner__input__prop' value={!inputFirstNameIPa?first_name:inputFirstNameIPa} onChange={handleInputFirstNameIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input className='partnersModalContainer__itemPartner__input__prop' value={!inputLastNameIPa?last_name:inputLastNameIPa} onChange={handleInputLastNameIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input type='email' className='partnersModalContainer__itemPartner__input__prop' value={!inputEmailIPa?email:inputEmailIPa} onChange={handleInputEmailIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__btns'>
                            <button className='partnersModalContainer__itemPartner__btns__btn' onClick={handleBtnDelPartner}>Borrar</button>
                            <button id='btnUpdatePartner' className='partnersModalContainer__itemPartner__btns__btn' onClick={handleBtnUpdPartner}>Actualizar</button>
                            {showSpinner&&<Spinner/>}
                        </div>
                    </>
                    :
                    <>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <select disabled className='itemCreatePartner__select__prop' value={selectOptionMembershipNumber} onChange={(e) => {handleSelectOptionMembershipNumberShL(e.target.value)}}>
                                {optionsMembershipNumber.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled className='partnersModalContainer__itemPartner__input__prop' value={!inputFirstNameIPa?first_name:inputFirstNameIPa} onChange={handleInputFirstNameIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled className='partnersModalContainer__itemPartner__input__prop' value={!inputLastNameIPa?last_name:inputLastNameIPa} onChange={handleInputLastNameIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__input'>
                            <input disabled type='email' className='partnersModalContainer__itemPartner__input__prop' value={!inputEmailIPa?email:inputEmailIPa} onChange={handleInputEmailIPa}/>
                        </div>
                        <div className='partnersModalContainer__itemPartner__btns'>
                            <button className='partnersModalContainer__itemPartner__btns__btn'>Borrar</button>
                            <button disabled id='btnUpdateShift' style={buttonDisabledStyle} className='partnersModalContainer__itemPartner__btns__btn'>Actualizar</button>
                        </div>
                    </>
                }
            </div>
            {
                confirmationDelPartnersModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default PartnersListModal