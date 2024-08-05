import React, { createContext, useState } from 'react';

export const InputDataULContext = createContext(null)

export const ParentULComponent = ({children}) => {

  const [inputFirstNameUL, setInputFirstNameUL] = useState('');
  const [inputLastNameUL, setInputLastNameUL] = useState('');
  const [inputEmailUL, setInputEmailUL] = useState('');
  const [inputPasswordUL, setInputPasswordUL] = useState('');

    const handleInputFirstNameUL = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputFirstNameUL(texto);
    };

    const handleInputLastNameUL = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputLastNameUL(texto);
    };
  
    const handleInputPasswordUL = (e) => {
      const inputValue = e.target.value;
      setInputPasswordUL(inputValue);
    };

    const handleInputEmailUL = (e) => {
        const inputValue = e.target.value;
        setInputEmailUL(inputValue);
    };

    const handleEmptyInputFirstNameUL = () => {
        setInputFirstNameUL('');
    };

    const handleEmptyInputLastNameUL = () => {
        setInputLastNameUL('');
    };
  
    const handleEmptyInputPasswordUL = () => {
      setInputPasswordUL('');
    };

    const handleEmptyInputEmailUL = () => {
        setInputEmailUL('');
    };

  return (
    <InputDataULContext.Provider value={{ inputFirstNameUL, inputLastNameUL, inputPasswordUL, inputEmailUL, handleInputFirstNameUL, handleInputLastNameUL, handleInputPasswordUL, handleInputEmailUL,handleEmptyInputFirstNameUL,handleEmptyInputLastNameUL,handleEmptyInputPasswordUL,handleEmptyInputEmailUL }}>
      {children}
    </InputDataULContext.Provider>
  );
}