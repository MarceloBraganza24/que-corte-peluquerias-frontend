import React, { createContext, useState } from 'react';

export const InputDataPaLContext = createContext(null)

export const ParentPaLComponent = ({children}) => {

  const [inputFirstNamePaL, setInputFirstNamePaL] = useState('');
  const [inputLastNamePaL, setInputLastNamePaL] = useState('');
  const [inputEmailPaL, setInputEmailPaL] = useState('');
  const [inputParnerNumberDosPaL, setInputParnerNumberDosPaL] = useState('');
  const [selectOptionMembershipNumber, setSelectOptionMembershipNumber] = useState('');
  
  const handleInputPartnerNumberDosPaL = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputParnerNumberDosPaL(inputValue);
    } 
  };

  const handleInputFirstNamePaL = (e) => {
    const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
    setInputFirstNamePaL(texto);
  };

  const handleInputLastNamePaL = (e) => {
    const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
    setInputLastNamePaL(texto);
  };

  const handleInputEmailPaL = (e) => {
    const inputValue = e.target.value;
    setInputEmailPaL(inputValue);
  };

  const handleSelectOptionMembershipNumberShL = (e) => {
    setSelectOptionMembershipNumber(e);
  };

  const handleEmptyInputFirstNamePaL = () => {
    setInputFirstNamePaL('')
  };

  const handleEmptyInputLastNamePaL = () => {
    setInputLastNamePaL('')
  };

  const handleEmptyInputPartnerNumberPaL = () => {
    setInputParnerNumberDosPaL('')
  };

  const handleEmptyInputEmailPaL = () => {
    setInputEmailPaL('')
  };
  
  return (
    <InputDataPaLContext.Provider value={{ selectOptionMembershipNumber,inputParnerNumberDosPaL,inputFirstNamePaL, inputLastNamePaL, inputEmailPaL, handleSelectOptionMembershipNumberShL,handleInputFirstNamePaL, handleInputLastNamePaL, handleInputEmailPaL,handleEmptyInputFirstNamePaL,handleEmptyInputLastNamePaL,handleEmptyInputPartnerNumberPaL,handleEmptyInputEmailPaL,handleInputPartnerNumberDosPaL }}>
      {children}
    </InputDataPaLContext.Provider>
  );
}