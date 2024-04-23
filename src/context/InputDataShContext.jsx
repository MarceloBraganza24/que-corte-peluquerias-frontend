import React, { createContext, useState } from 'react';

export const InputDataShContext = createContext(null)

export const ParentComponent = ({children}) => {

  const [inputFirstNameSh, setInputFirstNameSh] = useState('');
  const [inputLastNameSh, setInputLastNameSh] = useState('');
  const [inputDateSh, setInputDateSh] = useState('');
  const [inputScheduleSh, setInputScheduleSh] = useState('');
  const [inputOptionSh, setInputOptionSh] = useState('');
  const [inputPriceSh, setInputPriceSh] = useState('');

  const handleInputFirstNameSh = (e) => {
    setInputFirstNameSh(e);
  };

  const handleInputLastNameSh = (e) => {
    setInputLastNameSh(e);
  };

  const handleInputDateSh = (e) => {
    setInputDateSh(e);
  };

  const handleInputScheduleSh = (e) => {
    setInputScheduleSh(e);
  };

  const handleInputOptionSh = (e) => {
    setInputOptionSh(e);
    handleInputPriceSh(e)
  };

  const handleInputPriceSh = (e) => {
    if(e === 'Caballeros') {
        setInputPriceSh('3000')
    } else if(e === 'Damas') {
        setInputPriceSh('5000')
    } else if(e === 'Niños') {
        setInputPriceSh('2000')
    } else {
        setInputPriceSh('')
    }
  };

  return (
    <InputDataShContext.Provider value={{ inputFirstNameSh, inputLastNameSh, inputDateSh, inputScheduleSh, inputOptionSh, inputPriceSh, handleInputFirstNameSh, handleInputLastNameSh, handleInputDateSh, handleInputScheduleSh, handleInputOptionSh }}>
      {children}
    </InputDataShContext.Provider>
  );
}