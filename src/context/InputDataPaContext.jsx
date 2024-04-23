import React, { createContext, useState } from 'react';

export const InputDataPaContext = createContext(null)

export const ParentPaComponent = ({children}) => {

  const [inputFirstNamePa, setInputFirstNameSh] = useState('');
  const [inputLastNamePa, setInputLastNamePa] = useState('');
  const [inputDniPa, setInputDniPa] = useState('');
  const [inputPhonePa, setInputPhonePa] = useState('');
  const [inputEmailPa, setInputEmailPa] = useState('');

  const handleInputFirstNamePa = (e) => {
    setInputFirstNameSh(e);
  };

  const handleInputLastNamePa = (e) => {
    setInputLastNamePa(e);
  };

  const handleInputDniPa = (e) => {
    setInputDniPa(e);
  };

  const handleInputPhonePa = (e) => {
    setInputPhonePa(e);
  };

  const handleInputEmailPa = (e) => {
    setInputEmailPa(e);
  };

  return (
    <InputDataPaContext.Provider value={{ inputFirstNamePa, inputLastNamePa, inputDniPa, inputPhonePa, inputEmailPa, handleInputFirstNamePa, handleInputLastNamePa, handleInputDniPa, handleInputPhonePa, handleInputEmailPa }}>
      {children}
    </InputDataPaContext.Provider>
  );
}