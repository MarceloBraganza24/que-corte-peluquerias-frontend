import React, { createContext, useState, useEffect } from 'react';

export const InputDataShContext = createContext(null)

export const ParentComponent = ({children}) => {
    const [inputFirstNameSh, setInputFirstNameSh] = useState('');
    const [inputLastNameSh, setInputLastNameSh] = useState('');
    const [selectOptionHairdresserSh, setSelectOptionHairdresserSh] = useState('');
    const [inputEmailSh, setInputEmailSh] = useState('');
    const [inputDateSh, setInputDateSh] = useState(new Date);
    const [selectScheduleSh, setSelectScheduleSh] = useState('');
    const [inputOptionServiceSh, setInputOptionServiceSh] = useState('');
    const [inputPriceSh, setInputPriceSh] = useState('');
    const [prices, setPrices] = useState([]);
    const [user, setUser] = useState('');
    //const [isMembershipFeePaid, setIsMembershipFeePaid] = useState('');
    const [isMonted, setIsMonted] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    /* useEffect(() => {
        setInputOptionServiceSh('Elija su servicio')
    },[isMembershipFeePaid]) */

    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchPricesData() {
                const response = await fetch(`${apiUrl}/api/prices`)
                const pricesAll = await response.json();
                setPrices(pricesAll.data)
            }
            fetchPricesData();
            const getCookie = (name) => {
                const cookieName = name + "=";
                const decodedCookie = decodeURIComponent(document.cookie);
                const cookieArray = decodedCookie.split(';');
                for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(cookieName) === 0) {
                    return cookie.substring(cookieName.length, cookie.length);
                }
                }
                return "";
            };
            const cookieValue = getCookie('TokenJWT');
            const fetchData = async () => {
                try {
                const response = await fetch(`${apiUrl}/api/sessions/current?cookie=${cookieValue}`)
                const data = await response.json();
                if(data.error === 'jwt expired') {
                    logout();
                    window.location.href = '/login';
                } else {
                    const user = data.data
                    if(user) {
                        setUser(user)
                    }
                }
                } catch (error) {
                console.error('Error:', error);
                }
            };
            fetchData();
        }, 10000);
        return () => {
            clearInterval(interval);
        };
    }, [isMonted]);

    useEffect(() => {
        async function fetchPricesData() {
            const response = await fetch(`${apiUrl}/api/prices`)
            const pricesAll = await response.json();
            setPrices(pricesAll.data)
        }
        fetchPricesData();
        const getCookie = (name) => {
            const cookieName = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
            }
            return "";
        };
        const cookieValue = getCookie('TokenJWT');
        const fetchData = async () => {
            try {
            const response = await fetch(`${apiUrl}/api/sessions/current?cookie=${cookieValue}`)
            const data = await response.json();
            if(data.error === 'jwt expired') {
                logout();
                window.location.href = '/login';
            } else {
                const user = data.data
                if(user) {
                    setUser(user)
                    //setIsMembershipFeePaid(user.isMembershipFeePaid)
                }
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
        fetchData();
        setTimeout(() => {
            setIsMonted(true);
        }, 10000)
    },[])   


    const handleInputFirstNameSh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputFirstNameSh(texto);
    };

    const handleInputLastNameSh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputLastNameSh(texto);
    };

    const handleInputEmailSh = (e) => {
    const texto = e.target.value;
        setInputEmailSh(texto);
    };

    const handleInputDateSh = (e) => {
        setInputDateSh(e);
    };

    const handleSelectScheduleSh = (e) => {
        setSelectScheduleSh(e);
    };

    const handleSelectOptionHairdresserSh = (e) => {
        setSelectOptionHairdresserSh(e);
    };

    const handleInputOptionServiceSh = (e) => {
        setInputOptionServiceSh(e);
        //handleInputPriceSh(e)
        e=='Elija su servicio'&&setInputPriceSh('')
        if(!user.isMembershipFeePaid) {
            const noPartnersPrices = prices.filter(price => price.category == 'No socios')
            noPartnersPrices.forEach(res => {
                const compared = compareStringsIgnoreCase(e, res.price_of)
                if(compared) {
                    setInputPriceSh(res.value_price_of)
                }
            })
        } else if(user.isMembershipFeePaid) {
            const partnersPrices = prices.filter(price => price.category == 'Socios')
            const noPartnersPricesWMS = partnersPrices.filter(price => price.price_of != 'cuota socio')
            noPartnersPricesWMS.forEach(res => {
                const compared = compareStringsIgnoreCase(e, res.price_of)
                if(compared) {
                    setInputPriceSh(res.value_price_of)
                }
            })
        }
    };

    function compareStringsIgnoreCase(str1, str2) {
        return str1.toLowerCase() === str2.toLowerCase();
    }

    /* const handleInputPriceSh = (e) => {
        e=='Elija su servicio'&&setInputPriceSh('')
        if(!user.isMembershipFeePaid) {
            const noPartnersPrices = prices.filter(price => price.category == 'No socios')
            noPartnersPrices.forEach(res => {
                const compared = compareStringsIgnoreCase(e, res.price_of)
                if(compared) {
                    setInputPriceSh(res.value_price_of)
                }
            })
        } else if(user.isMembershipFeePaid) {
            const partnersPrices = prices.filter(price => price.category == 'Socios')
            const noPartnersPricesWMS = partnersPrices.filter(price => price.price_of != 'cuota socio')
            noPartnersPricesWMS.forEach(res => {
                const compared = compareStringsIgnoreCase(e, res.price_of)
                if(compared) {
                    setInputPriceSh(res.value_price_of)
                }
            })
        }
    }; */

    return (
    <InputDataShContext.Provider value={{ selectOptionHairdresserSh,inputFirstNameSh, inputLastNameSh, inputEmailSh, inputDateSh, selectScheduleSh, inputOptionServiceSh, inputPriceSh, handleInputFirstNameSh, handleInputLastNameSh, handleInputEmailSh, handleInputDateSh, handleSelectScheduleSh, handleInputOptionServiceSh,handleSelectOptionHairdresserSh }}>
        {children}
    </InputDataShContext.Provider>
    );
}