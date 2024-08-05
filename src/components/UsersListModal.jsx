import React, {useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Spinner from './Spinner';
import {OpenModalContext} from '../context/OpenModalContext';

const UsersListModal = ({id,first_name,last_name,email,role,handleUpdateUsersModalLocal}) => {
    const [inputFirstNameIU, setInputFirstNameIU] = useState('');
    const [inputLastNameIU, setInputLastNameIU] = useState('');
    const [inputEmailIU, setInputEmailIU] = useState('');
    const [inputRoleIU, setInputRoleIU] = useState('');
    const optionsRoleIU = []
    role=="admin"?optionsRoleIU.push(`${role}`,'premium','user'):
    role=="premium"?optionsRoleIU.push(`${role}`,'admin','user'):
    role=="user"&&optionsRoleIU.push(`${role}`,'admin','premium')
    const apiUrl = import.meta.env.VITE_API_URL;
    const [confirmationDelUsersModal, handleConfirmationDelUsersModal] = useState(false);
    const {handleUpdateUserModal} = useContext(OpenModalContext);
    const [inputChanges, setInputChanges] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const handleInputFirstNameIU = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputFirstNameIU(texto);
        texto===first_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputLastNameIU!==last_name && inputLastNameIU!=='')setInputChanges(true);
        if(inputRoleIU!=role && inputRoleIU!='')setInputChanges(true);
        if(inputEmailIU!==email && inputEmailIU!=='')setInputChanges(true);
    };

    const handleInputLastNameIU = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputLastNameIU(texto);
        texto===last_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputFirstNameIU!==first_name && inputFirstNameIU!=='')setInputChanges(true);
        if(inputRoleIU!=role && inputRoleIU!='')setInputChanges(true);
        if(inputEmailIU!==email && inputEmailIU!=='')setInputChanges(true);
    };

    const handleInputEmailIU = (e) => {
        const texto = e.target.value;
        setInputEmailIU(texto);
        texto===email?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputFirstNameIU!==first_name && inputFirstNameIU!=='')setInputChanges(true);
        if(inputLastNameIU!==last_name && inputLastNameIU!=='')setInputChanges(true);
        if(inputRoleIU!=role && inputRoleIU!='')setInputChanges(true);
    };

    const handleInputRoleIU = (e) => {
        const texto = e.target.value;
        setInputRoleIU(texto);
        texto===role?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(inputFirstNameIU!==first_name && inputFirstNameIU!=='')setInputChanges(true);
        if(inputLastNameIU!==last_name && inputLastNameIU!=='')setInputChanges(true);
        if(inputEmailIU!==email && inputEmailIU!=='')setInputChanges(true);
    };

    const handleBtnDelUser = async() => {
        handleConfirmationDelUsersModal(true);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleBtnUpdUser = async() => {
        if (!validateEmail(inputEmailIU?inputEmailIU:email)) {
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
        } else if(inputFirstNameIU !== first_name || inputLastNameIU !== last_name || inputEmailIU !== email || inputRoleIU !== role) {
            document.getElementById('btnUpdateUser').style.display = 'none';
            setShowSpinner(true);
            const userToUpdate = {
                first_name: inputFirstNameIU?inputFirstNameIU:first_name,
                last_name: inputLastNameIU?inputLastNameIU:last_name,
                email: inputEmailIU?inputEmailIU:email,
                role: inputRoleIU?inputRoleIU:role
            }
            const response = await fetch(`${apiUrl}/api/users/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToUpdate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has actualizado el usuario correctamente!', {
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
                    handleUpdateUserModal(false);
                    handleUpdateUsersModalLocal(false);
                    setInputChanges(false)
                }, 1500);
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
            } else if(data.error === 'There is already a user with that data') {
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
                document.getElementById('btnUpdateUser').style.display = 'block';
                setShowSpinner(false);
                setInputChanges(false);
            }
        }
    };

    const ConfirmationDeleteModal = () => {
        const handleBtnDelUser = async() => {
            setShowSpinner(true);
            const response = await fetch(`${apiUrl}/api/users/delete-one/${id}`, {
                method: 'DELETE',         
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(response.ok) {
                toast('Has eliminado el usuario correctamente!', {
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
                    handleUpdateUserModal(false);
                    handleUpdateUsersModalLocal(false);
                }, 2000);
            } else {
                toast('Has ocurrido un error al querer eliminar el usuario!', {
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
            handleConfirmationDelUsersModal(false);
        }

        return (
            <>
                <div className='confirmationDeleteBtnUsersListModalContainer'>
                    <div className='confirmationDeleteBtnUsersListModalContainer__ask'>¿Estás seguro que deseas borrar el usuario?</div>
                    <div className='confirmationDeleteBtnUsersListModalContainer__askMobile'>
                        <div className='confirmationDeleteBtnUsersListModalContainer__askMobile__ask'>¿Estás seguro que deseas</div>
                        <div className='confirmationDeleteBtnUsersListModalContainer__askMobile__ask'>borrar el usuario?</div>
                    </div>
                    <div className='confirmationDeleteBtnUsersListModalContainer__btnsContainer'>
                        <div className='confirmationDeleteBtnUsersListModalContainer__btnsContainer__btns'>
                            <div></div>
                        </div>
                        <div className='confirmationDeleteBtnUsersListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnDelUser} className='confirmationDeleteBtnPartnersListModalContainer__btnsContainer__btns__prop'>Si</button>
                        </div>
                        <div className='confirmationDeleteBtnUsersListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnUsersListModalContainer__btnsContainer__btns__prop'>No</button>
                        </div>
                        <div className='confirmationDeleteBtnUsersListModalContainer__btnsContainer__btns'>
                            {showSpinner&&<Spinner/>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const closeM = () => {
        handleUpdateUserModal(false);
        handleUpdateUsersModalLocal(false);
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
        
        <div className='usersModalContainer'>
            <div className='usersModalContainer__btnCloseModal'>
                {
                    !confirmationDelUsersModal&&!inputChanges?
                    <>
                        <Link onClick={closeM} className='usersModalContainer__btnCloseModal__prop'>
                            Cerrar
                        </Link>
                    </>
                        :
                    <>
                        <div onClick={unsavedChanges} className='usersModalContainer__btnCloseModal__prop'>Cerrar</div>
                    </>
                }
            </div>
            <div className='usersModalContainer__header'>
                <div className='usersModalContainer__header__label'>Nombre</div>
                <div className='usersModalContainer__header__label'>Apellido</div>
                <div className='usersModalContainer__header__label'>Email</div>
                <div className='usersModalContainer__header__label'>Rol</div>
            </div>
            <div className='usersModalContainer__itemUser'>
                {
                    !confirmationDelUsersModal?
                    <>
                        <div className='usersModalContainer__itemUser__input'>
                            <input className='usersModalContainer__itemUser__input__prop' value={!inputFirstNameIU?first_name:inputFirstNameIU} onChange={handleInputFirstNameIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__input'>
                            <input className='usersModalContainer__itemUser__input__prop' value={!inputLastNameIU?last_name:inputLastNameIU} onChange={handleInputLastNameIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__input'>
                            <input className='usersModalContainer__itemUser__input__prop' type='email' value={!inputEmailIU?email:inputEmailIU} onChange={handleInputEmailIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__selectRole'>
                            <select className='usersModalContainer__itemUser__selectRole__select' value={inputRoleIU} onChange={handleInputRoleIU}>
                                {optionsRoleIU.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='usersModalContainer__itemUser__btns'>
                            <button className='usersModalContainer__itemUser__btns__btn' onClick={handleBtnDelUser}>Borrar</button>
                            <button id='btnUpdateUser' className='usersModalContainer__itemUser__btns__btn' onClick={handleBtnUpdUser}>Actualizar</button>
                            {showSpinner&&<Spinner/>}
                        </div>
                    </>
                    :
                    <>
                        <div className='usersModalContainer__itemUser__input'>
                            <input disabled className='usersModalContainer__itemUser__input__prop' value={!inputFirstNameIU?first_name:inputFirstNameIU} onChange={handleInputFirstNameIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__input'>
                            <input disabled className='usersModalContainer__itemUser__input__prop' value={!inputLastNameIU?last_name:inputLastNameIU} onChange={handleInputLastNameIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__input'>
                            <input disabled type='email' className='usersModalContainer__itemUser__input__prop' value={!inputEmailIU?email:inputEmailIU} onChange={handleInputEmailIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__input'>
                            <input disabled className='usersModalContainer__itemUser__input__prop' value={!inputRoleIU?role:inputRoleIU} onChange={setInputRoleIU}/>
                        </div>
                        <div className='usersModalContainer__itemUser__btns'>
                            <button className='usersModalContainer__itemUser__btns__btn'>Borrar</button>
                            <button disabled id='btnUpdateShift' style={buttonDisabledStyle} className='usersModalContainer__itemUser__btns__btn'>Actualizar</button>
                        </div>
                    </>
                }
            </div>
            {
                confirmationDelUsersModal&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default UsersListModal