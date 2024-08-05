import React, { createContext, useState } from 'react';

export const InputDataProdContext = createContext(null)

export const ParentProdComponent = ({children}) => {

  const [inputTitleProd, setInputTitleProd] = useState('');
  const [inputDescriptionProd, setInputDescriptionProd] = useState('');
  const [inputPriceProd, setInputPriceProd] = useState('');
  const [inputStockProd, setInputStockProd] = useState('');
  const [inputCategoryProd, setInputCategoryProd] = useState('');

  const handleInputTitleProd = (e) => {
    const inputValue = e.target.value;
    setInputTitleProd(inputValue);
  };

  const handleInputDescriptionProd = (e) => {
    const inputValue = e.target.value;
    setInputDescriptionProd(inputValue);
  };

  const handleInputPriceProd = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputPriceProd(inputValue);
    } 
  };

  const handleInputStockProd = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputStockProd(inputValue);
    } 
  };

  const handleInputCategoryProd = (e) => {
    const inputValue = e.target.value;
    setInputCategoryProd(inputValue);
  };

  const handleEmptyInputTitleProd = () => {
    setInputTitleProd('');
  };

  const handleEmptyInputDescriptionProd = () => {
    setInputDescriptionProd('');
  };

  const handleEmptyInputPriceProd = () => {
      setInputPriceProd('');
  };

  const handleEmptyInputStockProd = () => {
      setInputStockProd('');
  };

  const handleEmptyInputCategoryProd = () => {
    setInputCategoryProd('');
  };

  return (
    <InputDataProdContext.Provider value={{ inputTitleProd, inputDescriptionProd, inputPriceProd, inputStockProd, inputCategoryProd, handleInputTitleProd, handleInputDescriptionProd, handleInputPriceProd, handleInputStockProd, handleInputCategoryProd,handleEmptyInputTitleProd,handleEmptyInputDescriptionProd,handleEmptyInputPriceProd,handleEmptyInputStockProd,handleEmptyInputCategoryProd }}>
      {children}
    </InputDataProdContext.Provider>
  );
}