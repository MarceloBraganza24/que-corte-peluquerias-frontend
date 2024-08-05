import React, { createContext, useState } from 'react';

export const PricesContext = createContext(null)

export const PricesParentComponent = ({children}) => {

  const [inputCreatePriceOf, setInputCreatePriceOf] = useState('');
  const [inputCreateValuePriceOf, setInputCreateValuePriceOf] = useState('');
  const [inputCreateCategory, setInputCreateCategory] = useState('');
  const [partnersPrices, setPartnersPrices] = useState([]);
  const [prices, setPrices] = useState([]);
  

  const regex = /^[a-zA-Z0-9ñÑ\s]+$/;

  const handleInputCreatePriceOf = (e) => {
    const texto = e.target.value;
    regex.test(texto);
    setInputCreatePriceOf(texto);
  };

  const handleInputCreateValuePriceOf = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
        setInputCreateValuePriceOf(inputValue);
    }
  };

  const handleInputCreateCategory = (e) => {
    setInputCreateCategory(e);
  };

  const handleEmptyInputCreatePriceOf = () => {
    setInputCreatePriceOf('');
  };

  const handleEmptyInputCreateValuePriceOf = () => {
    setInputCreateValuePriceOf('');
  };

  const handlePartnersPrices = (service) => {
    setPartnersPrices(service);
  };

  const handlePrices = (service) => {
    setPrices(service);
  };
  
  return (
    <PricesContext.Provider value={{inputCreatePriceOf,inputCreateValuePriceOf,inputCreateCategory,partnersPrices,prices,handleInputCreatePriceOf,handleInputCreateValuePriceOf,handleInputCreateCategory,handlePartnersPrices,handlePrices,handleEmptyInputCreatePriceOf,handleEmptyInputCreateValuePriceOf}}>
      {children}
    </PricesContext.Provider>
  );
}