import React, { createContext, useState } from 'react';

export const InputDataShLContext = createContext(null)

export const ParentShLComponent = ({children}) => {

  const [inputFirstNameShL, setInputFirstNameShL] = useState('');
  const [inputLastNameShL, setInputLastNameShL] = useState('');
  const [inputEmailShL, setInputEmailShL] = useState('');
  const [inputDateShL, setInputDateShL] = useState(new Date);
  const [selectScheduleOptionShL, setSelectScheduleOptionShL] = useState('');
  const [inputAddScheduleHShL, setInputAddScheduleHShL] = useState('');
  const [inputAddScheduleMShL, setInputAddScheduleMShL] = useState('');
  const [inputOptionServiceShL, setInputOptionServiceShL] = useState('');
  const [selectOptionHairdresserShL, setInputOptionHairdresserShL] = useState('');
  const [selectOptionHeaderHairdresserShL, setInputOptionHeaderHairdresserShL] = useState('');


  //,handleOnBlurInputAddScheduleMShLM,handleOnBlurInputAddScheduleHShLM

  const regex = /^[A-Za-zñÑ\s]*$/;

  const handleInputFirstNameShL = (e) => {
    const texto = e.target.value;
    if(regex.test(texto)) {
      setInputFirstNameShL(texto);
    }
  };

  const handleEmptyInputFirstNameShL = () => {
    setInputFirstNameShL('');
  };

  const handleEmptyInputLastNameShL = () => {
    setInputLastNameShL('');
  };

  const handleEmptyInputEmailShL = () => {
    setInputEmailShL('');
  };
  
  const handleEmptyInputAddScheduleHShL = () => {
    setInputAddScheduleHShL('');
  };

  const handleEmptyInputAddScheduleMShL = () => {
    setInputAddScheduleMShL('');
  };

  const handleInputLastNameShL = (e) => {
    const texto = e.target.value;
    if(regex.test(texto)) {
      setInputLastNameShL(texto);
    }
  };

  const handleInputEmailShL = (e) => {
    const texto = e.target.value;
    setInputEmailShL(texto);
  };

  const handleInputDateShL = (e) => {
    setInputDateShL(e);
  };

  const handleSelectScheduleOptionShL = (e) => {
    setSelectScheduleOptionShL(e);
  };

  
  const handleInputAddScheduleHShL = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
        setInputAddScheduleHShL(inputValue);
    }
  };

  const handleInputAddScheduleMShL = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
        setInputAddScheduleMShL(inputValue);
    }
  };

  const handleInputOptionServiceShL = (e) => {
    setInputOptionServiceShL(e);
  };

  const handleSelectOptionHairdresserShL = (e) => {
    setInputOptionHairdresserShL(e);
  };

  const handleSelectOptionHeaderHairdresserShL = (e) => {
    setInputOptionHeaderHairdresserShL(e);
  };

  const handleOnBlurInputAddScheduleHShLM = (e) => {
      const inputValue = e.target.value;
      if (/^\d*$/.test(inputValue)) {
          if(inputValue.length == 1){
            setInputAddScheduleHShL(`0${inputValue}`);
          } else {
            setInputAddScheduleHShL(inputValue);
          }
      }
  };

  const handleOnBlurInputAddScheduleMShLM = (e) => {
      const inputValue = e.target.value;
      if (/^\d*$/.test(inputValue)) {
          if(inputValue.length == 1){
              setInputAddScheduleMShL(`0${inputValue}`);
          } else {
            setInputAddScheduleMShL(inputValue);
          }
      }
  };

  return (
    <InputDataShLContext.Provider value={{ inputAddScheduleHShL,inputAddScheduleMShL,inputFirstNameShL, inputLastNameShL, inputEmailShL, inputDateShL, selectScheduleOptionShL,inputOptionServiceShL,selectOptionHairdresserShL,selectOptionHeaderHairdresserShL, handleInputFirstNameShL,handleEmptyInputFirstNameShL, handleInputLastNameShL,handleEmptyInputLastNameShL,handleEmptyInputEmailShL, handleInputEmailShL, handleInputDateShL, handleSelectScheduleOptionShL,handleInputOptionServiceShL,handleSelectOptionHairdresserShL,handleSelectOptionHeaderHairdresserShL,handleInputAddScheduleHShL,handleInputAddScheduleMShL,handleEmptyInputAddScheduleHShL,handleEmptyInputAddScheduleMShL,handleOnBlurInputAddScheduleHShLM,handleOnBlurInputAddScheduleMShLM}}>
      {children}
    </InputDataShLContext.Provider>
  );
}