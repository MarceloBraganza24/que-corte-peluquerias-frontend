import React, { createContext, useState } from 'react';

export const InputDataPaContext = createContext(null)

export const ParentPaComponent = ({children}) => {

  const [inputFirstNamePa, setInputFirstNamePa] = useState('');
  const [inputLastNamePa, setInputLastNamePa] = useState('');
  const [inputPhonePa, setInputPhonePa] = useState('');
  const [inputEmailPa, setInputEmailPa] = useState('');

  const handleInputFirstNamePa = (e) => {
    const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
    setInputFirstNamePa(texto);
  };

  const handleInputLastNamePa = (e) => {
    const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
    setInputLastNamePa(texto);
  };

  const handleInputPhonePa = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputPhonePa(inputValue);
    }
  };

  const handleInputEmailPa = (e) => {
    const inputValue = e.target.value;
    setInputEmailPa(inputValue);
  };

  return (
    <InputDataPaContext.Provider value={{ inputFirstNamePa, inputLastNamePa, inputPhonePa, inputEmailPa, handleInputFirstNamePa, handleInputLastNamePa, handleInputPhonePa, handleInputEmailPa }}>
      {children}
    </InputDataPaContext.Provider>
  );
}