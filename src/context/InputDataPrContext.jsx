import React, { createContext, useState } from 'react';

export const InputDataPrContext = createContext(null)

export const ParentPrComponent = ({children}) => {

  const [inputBusinessNamePr, setInputBusinessNamePr] = useState('');
  const [inputCuitCuilPr, setInputCuitCuilPr] = useState('');
  const [inputPhonePr, setInputPhonePr] = useState('');
  const [inputEmailPr, setInputEmailPr] = useState('');

  const handleInputBusinessNamePr = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-ZñÑ0-9 ]*$/.test(inputValue)) {
      setInputBusinessNamePr(inputValue);
    }
  };

  const handleInputCuitCuilPr = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputCuitCuilPr(inputValue);
    }
  };

  const handleInputPhonePr = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setInputPhonePr(inputValue);
    }
  };

  const handleInputEmailPr = (e) => {
    const inputValue = e.target.value;
    setInputEmailPr(inputValue);
  };
  
  const handleEmptyInputBusinessNamePr = () => {
    setInputBusinessNamePr('');
  };

  const handleEmptyInputCuitCuilPr = () => {
    setInputCuitCuilPr('');
  };

  const handleEmptyInputPhonePr = () => {
    setInputPhonePr('');
  };

  const handleEmptyInputEmailPr = () => {
    setInputEmailPr('');
  };

  return (
    <InputDataPrContext.Provider value={{ inputBusinessNamePr, inputCuitCuilPr, inputPhonePr, inputEmailPr, handleInputBusinessNamePr, handleInputCuitCuilPr, handleInputPhonePr, handleInputEmailPr,handleEmptyInputBusinessNamePr,handleEmptyInputCuitCuilPr,handleEmptyInputPhonePr,handleEmptyInputEmailPr }}>
      {children}
    </InputDataPrContext.Provider>
  );
}