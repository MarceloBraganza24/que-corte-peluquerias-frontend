import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import {OpenModalContext} from '../context/OpenModalContext'; 

const CreateProductModalMobile = ({setIsOpenCreateProductModalLocalMobile}) => {
    const {handleCreateProductModalMobile} = useContext(OpenModalContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [inputTitleProdL, setInputTitleProdL] = useState('');
    const [inputDescriptionProdL, setInputDescriptionProdL] = useState('');
    const [inputPriceProdL, setInputPriceProdL] = useState('');
    const [inputStockProdL, setInputStockProdL] = useState('');
    const [inputCategoryProdL, setInputCategoryProdL] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);
    /* const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}`; */

    const handleInputTitleProdL = (e) => {
        const texto = e.target.value;
        setInputTitleProdL(texto);
    };

    const handleInputDescriptionProdL = (e) => {
        const inputValue = e.target.value;
        setInputDescriptionProdL(inputValue);
    };

    const handleInputPriceProdL = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputPriceProdL(inputValue);
        }
    };

    const handleInputStockProdL = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputStockProdL(inputValue);
        }
    };

    const handleInputCategoryProdL = (e) => {
        const texto = e.target.value;
        setInputCategoryProdL(texto);
    };

    const closeM = () => {
        setIsOpenCreateProductModalLocalMobile(false);
        handleCreateProductModalMobile(false);
    };

    const cleanPropsCreateProduct = () => {
        setInputTitleProdL('')
        setInputDescriptionProdL('')
        setInputPriceProdL('')
        setInputStockProdL('')
        setInputCategoryProdL('')
    };

    const handleBtnCreatePartner = async() => {
        if(!inputTitleProdL || !inputDescriptionProdL || !inputPriceProdL || !inputStockProdL || !inputCategoryProdL) {
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
        } else {
            document.getElementById('btnCreateProduct').style.display = 'none';
            setShowSpinner(true);
            const productToCreate = {
                title: inputTitleProdL,
                description: inputDescriptionProdL,
                price: inputPriceProdL,
                stock: inputStockProdL,
                category: inputCategoryProdL
            }
            const response = await fetch(`${apiUrl}/api/products/register`, {
                method: 'POST',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToCreate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has registrado un producto correctamente!', {
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
                    document.getElementById('btnCreateProduct').style.display = 'block';
                    setShowSpinner(false);   
                    cleanPropsCreateProduct();
                }, 2000);
            }
            if(data.error === 'There is already a product with that title') {
                toast('Ya existe un producto con ese título!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnCreateProduct').style.display = 'block';
                setShowSpinner(false);
            }
        }
    };

    return (
        <>
            <div className='createProductModalContainerMobile'>
                <div className='createProductModalContainerMobile__btnCloseModal'>
                    <Link onClick={closeM} className='createProductModalContainerMobile__btnCloseModal__prop'>
                        Cerrar
                    </Link>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProductModalContainerMobile__labelInput'>
                    <div className='createProductModalContainerMobile__labelInput__label'>
                        <div className='createProductModalContainerMobile__labelInput__label__prop'>Título:</div>
                    </div>
                    <div className='createProductModalContainerMobile__labelInput__input'>
                        <input type='text' className='createProductModalContainerMobile__labelInput__input__prop' value={inputTitleProdL} onChange={handleInputTitleProdL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProductModalContainerMobile__labelInput'>
                    <div className='createProductModalContainerMobile__labelInput__label'>
                        <div className='createProductModalContainerMobile__labelInput__label__prop'>Descripción:</div>
                    </div>
                    <div className='createProductModalContainerMobile__labelInput__input'>
                        <input type='text' className='createProductModalContainerMobile__labelInput__input__prop' value={inputDescriptionProdL} onChange={handleInputDescriptionProdL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProductModalContainerMobile__labelInput'>
                    <div className='createProductModalContainerMobile__labelInput__label'>
                        <div className='createProductModalContainerMobile__labelInput__label__prop'>Precio:</div>
                    </div>
                    <div className='createProductModalContainerMobile__labelInput__input'>
                        <input className='createProductModalContainerMobile__labelInput__input__prop' value={inputPriceProdL} onChange={handleInputPriceProdL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProductModalContainerMobile__labelInput'>
                    <div className='createProductModalContainerMobile__labelInput__label'>
                        <div className='createProductModalContainerMobile__labelInput__label__prop'>Stock:</div>
                    </div>
                    <div className='createProductModalContainerMobile__labelInput__input'>
                        <input type='email' className='createProductModalContainerMobile__labelInput__input__prop' value={inputStockProdL} onChange={handleInputStockProdL}/>
                    </div>
                </div>
                <div style={{paddingTop:'1vh',paddingBottom:'1vh'}} className='createProductModalContainerMobile__labelInput'>
                    <div className='createProductModalContainerMobile__labelInput__label'>
                        <div className='createProductModalContainerMobile__labelInput__label__prop'>Categoría:</div>
                    </div>
                    <div className='createProductModalContainerMobile__labelInput__input'>
                        <input type='email' className='createProductModalContainerMobile__labelInput__input__prop' value={inputCategoryProdL} onChange={handleInputCategoryProdL}/>
                    </div>
                </div>
                <div style={{paddingTop:'2vh'}} className='createProductModalContainerMobile__btns'>
                    <button id='btnCreateProduct' className='createProductModalContainerMobile__btns__btn' onClick={handleBtnCreatePartner}>Crear producto</button>
                </div>
                {showSpinner&&<Spinner/>}
            </div>
        </>
    )
}

export default CreateProductModalMobile