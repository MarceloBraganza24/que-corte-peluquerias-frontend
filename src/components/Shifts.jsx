import React, { useState, useEffect, useContext } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import LogOut from './LogOut';
import { toast } from "react-toastify";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {IsLoggedContext} from '../context/IsLoggedContext';
import {InputDataShContext} from '../context/InputDataShContext';
import {BtnMPContext} from '../context/BtnMPContext';
import {OpenModalContext} from '../context/OpenModalContext'; 
import { Link } from 'react-router-dom';
import HMenu from './HMenu';
import moment from 'moment-timezone'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);
setDefaultLocale('es');

import { format } from 'date-fns';
import Spinner from './Spinner';

const Shifts = () => {
    initMercadoPago('APP_USR-c6a80bf1-6064-4d38-85c2-873ae24113ef', {
        locale: 'es-AR'
    });
    const apiUrl = import.meta.env.VITE_API_URL;
    const {isLoggedIn, login, logout} = useContext(IsLoggedContext);
    const [user, setUser] = useState('');
    const {handleBtnBuyVisible} = useContext(BtnMPContext);
    const pagarTurnoBtn = document.getElementById('pagarTurnoBtn');
    const {menuOptionsModal,handleMenuOptionsModal} = useContext(OpenModalContext);
    const [admPremPreferenceId, setAdmPremPreferenceId] = useState(null);
    const [preferenceId, setPreferenceId] = useState(null);
    const { inputFirstNameSh, handleInputFirstNameSh, inputLastNameSh, handleInputLastNameSh, inputEmailSh, handleInputEmailSh, inputDateSh, handleInputDateSh, inputOptionServiceSh, handleInputOptionServiceSh, selectScheduleSh, handleSelectScheduleSh, inputPriceSh,selectOptionHairdresserSh,handleSelectOptionHairdresserSh} = useContext(InputDataShContext);
    const [shifts, setShifts] = useState([]);
    const [holidays, setHolidays] = useState([]);
    //console.log(holidays)
    const [prices, setPrices] = useState([]);
    const [saveConfirmationShiftModal, setSaveConfirmationShiftModal] = useState(false);
    const [isWantPay, setIsWantPay] = useState(false);
    const [isMonted, setIsMonted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const optionsService = ['Elija su servicio'];

    function capitalizeFirstLetter(str) {
        if (str.length === 0) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    if(!user.isMembershipFeePaid) {
        const noPartnersPrices = prices.filter(price => price.category == 'No socios')
        noPartnersPrices.forEach(res => {
            let capitalizedString = capitalizeFirstLetter(res.price_of);
            optionsService.push(capitalizedString)
        })
    } else {
        const partnersPrices = prices.filter(price => price.category == 'Socios')
        const noPartnersPricesWMS = partnersPrices.filter(price => price.price_of != 'cuota socio')
        noPartnersPricesWMS.forEach(res => {
            let capitalizedString = capitalizeFirstLetter(res.price_of);
            optionsService.push(capitalizedString)
        })
    }

    const formatedDate = format(inputDateSh, 'yyyy-MM-dd');

    const dateToCompareHoliday = {
        date: formatedDate,
        hairdresser: selectOptionHairdresserSh
    }
    const existsHoliday = holidays.some(holiday =>
        holiday.date == dateToCompareHoliday.date &&
        holiday.hairdresser == dateToCompareHoliday.hairdresser
    );

    //console.log(exists)

    const formatedNewDate = moment.tz(formatedDate, 'UTC');
    const dayFormatedNewDate = formatedNewDate.day();

    const optionsHairdresser = ['Peluquero','Ayrton','Mirko','Ale'];

    const originalOptionsAyrtonMorScheduleISh = ['09:20','09:40','10:00','10:20','10:40','11:00','11:30','12:00','12:20','12:40',];
    const originalOptionsAyrtonAftScheduleISh = ['15:00','15:30','16:00','16:20','16:40','17:00','17:30','18:00','18:20','18:40','19:00','19:20','19:40'];
    const originalOptionsAyrtonSaturdayScheduleISh = ['09:20','09:40','10:00','10:20','10:40','11:00','11:30','12:00','12:20','12:40','13:00','13:20','13:40'];

    const originalOptionsMirkoMorScheduleISh = ['09:40','10:00','10:20','10:40','11:00','11:30','12:00'];
    const originalOptionsMirkoAftScheduleISh = ['15:10','15:30','16:00','16:20','16:40','17:00','17:30','18:00','18:20','18:40'];
    const originalOptionsMirkoSaturdayScheduleISh = ['09:40','10:00','10:20','10:40','11:00','11:30','11:50','12:10','12:30','13:00','13:20','13:40','14:00'];

    const originalOptionsAleMorScheduleISh = ['10:00','10:30','11:00','11:30','12:00','12:20'];
    const originalOptionsAleAftScheduleISh = ['15:00','15:30','16:00','16:20','16:40','17:00','17:30','18:00','18:20'];
    const originalOptionsAleTuesdayScheduleISh = ['10:00','10:30','11:00','11:30','12:00','12:30','16:00','16:30','17:00','17:30','18:00','18:20','18:40','19:00','19:20','19:40'];
    const originalOptionsAleSaturdayScheduleISh = ['10:00','10:20','10:40','11:00','11:30','12:00','12:20','12:40','13:00','13:30','14:00','14:30'];

    const optionsScheduleSh = [];

    function filtrarPorFecha(shiftsFiltered, fecha) {
        return shiftsFiltered.filter(objeto => objeto.date === fecha);
    }
    const shiftsByDate = filtrarPorFecha(shifts, formatedDate);
    //const schedules = shiftsByDate.map(shift => shift.schedule)

    const ayrtonShifts = shiftsByDate.filter(shift => shift.hairdresser == 'Ayrton');
    const mirkoShifts = shiftsByDate.filter(shift => shift.hairdresser == 'Mirko');
    const aleShifts = shiftsByDate.filter(shift => shift.hairdresser == 'Ale');

    const ayrtonSchedules = ayrtonShifts.map(shift => shift.schedule)
    const mirkoSchedules = mirkoShifts.map(shift => shift.schedule)
    const aleSchedules = aleShifts.map(shift => shift.schedule)
    
    /* if(dayFormatedNewDate == 6) {
        let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !schedules.includes(time));
        let filteredSatArray = originalOptionsSaturdayScheduleISh.filter(time => !schedules.includes(time));
        filteredMorArray.forEach(res => {
            optionsScheduleSh.push(res)
        })
        filteredSatArray.forEach(res => {
            optionsScheduleSh.push(res)
        })
    } else if(dayFormatedNewDate == 3 || dayFormatedNewDate == 4) {
        let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !schedules.includes(time));
        filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
        })
    } else {
        let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !schedules.includes(time));
        let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !schedules.includes(time));
        filteredMorArray.forEach(res => {
            optionsScheduleSh.push(res)
        })
        filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
        })
    } */



    if(dayFormatedNewDate == 6) {
        if(selectOptionHairdresserSh=='Ayrton'){
            let filteredSatArray = originalOptionsAyrtonSaturdayScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Mirko') {
            let filteredSatArray = originalOptionsMirkoSaturdayScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Ale') {
            let filteredSatArray = originalOptionsAleSaturdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        }
    } else if(dayFormatedNewDate == 2) {
        if(selectOptionHairdresserSh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Mirko') {
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredAftArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Ale') {
            let filteredTuesdayArray = originalOptionsAleTuesdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredTuesdayArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        }
    } else if(dayFormatedNewDate == 3 || dayFormatedNewDate == 4) {
        if(selectOptionHairdresserSh=='Ayrton'){
            //let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            /* filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            }) */
            filteredAftArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Mirko') {
            let filteredMorArray = originalOptionsMirkoMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Ale') {
            let filteredMorArray = originalOptionsAleMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredAftArray = originalOptionsAleAftScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        }
    } else {
        if(selectOptionHairdresserSh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Mirko') {
            let filteredMorArray = originalOptionsMirkoMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserSh=='Ale') {
            let filteredMorArray = originalOptionsAleMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredAftArray = originalOptionsAleAftScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            menuOptionsModal&&handleMenuOptionsModal(false);
            async function fetchShiftsData() {
                const response = await fetch(`${apiUrl}/api/shifts`)
                const shiftsAll = await response.json();
                setShifts(shiftsAll.data)
            }
            fetchShiftsData();
            async function fetchHolidaysData() {
                const response = await fetch(`${apiUrl}/api/holidays`)
                const holidaysAll = await response.json();
                setHolidays(holidaysAll.data)
            }
            fetchHolidaysData();
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
                if(!response.ok) {
                    window.location.href = '/login';
                }
                const data = await response.json();
                if(data.error === 'jwt expired') {
                    logout();
                    window.location.href = '/login';
                } else {
                    const user = data.data
                    if(user) {
                        setUser(user);
                    }
                }
                } catch (error) {
                console.error('Error:', error);
                }
            };
            fetchData();
            if(cookieValue) {
                login()
            } else {
                logout()
            }
        }, 10000);

        return () => {
            handleBtnBuyVisible(false);
            clearInterval(interval);
        };
    }, [isMonted]);
    
    useEffect(() => {
        
        menuOptionsModal&&handleMenuOptionsModal(false);
        async function fetchPricesData() {
            const response = await fetch(`${apiUrl}/api/prices`)
            const pricesAll = await response.json();
            setPrices(pricesAll.data)
        }
        fetchPricesData();
        async function fetchShiftsData() {
            const response = await fetch(`${apiUrl}/api/shifts`)
            const shiftsAll = await response.json();
            setShifts(shiftsAll.data)
        }
        fetchShiftsData();
        async function fetchHolidaysData() {
            const response = await fetch(`${apiUrl}/api/holidays`)
            const holidaysAll = await response.json();
            setHolidays(holidaysAll.data)
        }
        fetchHolidaysData();
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
            if(!response.ok) {
                window.location.href = '/login';
            }
            const data = await response.json();
            if(data.error === 'jwt expired') {
                logout();
                window.location.href = '/login';
            } else {
                const user = data.data
                if(user) {
                    setUser(user);
                }
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
        fetchData();
        if(cookieValue) {
            login()
        } else {
            logout()
        }

        setTimeout(() => {
            setIsMonted(true);
        }, 10000)

        return () => {
            handleBtnBuyVisible(false);
        };
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const fechaActual = new Date();
    const concat = formatedDate + ' ' + (selectScheduleSh?selectScheduleSh:optionsScheduleSh[0]);
    const newFormatedDate = new Date(concat);

    const fecha15DiasDespues = new Date(fechaActual);
    fecha15DiasDespues.setDate(fechaActual.getDate() + 15);

    const pagarTurno = async () => {
        try {
            const order = {
                title: `Corte ${inputOptionServiceSh}`,
                quantity: 1,
                unit_price: inputPriceSh,
                first_name: inputFirstNameSh,
                last_name: inputLastNameSh,
                email: inputEmailSh,
                date: formatedDate,
                schedule: selectScheduleSh?selectScheduleSh:optionsScheduleSh[0]
            }
            if(!inputFirstNameSh || !inputLastNameSh || !inputEmailSh || !formatedDate || !inputPriceSh) {
                toast('Debes completar todos los campos', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (!validateEmail(inputEmailSh)) {
                toast('El email no es válido!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (inputDateSh.getDay() == 0 || inputDateSh.getDay() == 1) {
                toast('Elige un dia entre martes y sabado!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(newFormatedDate < fechaActual) {
                toast('Debes ingresar una fecha a futuro', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if(selectOptionHairdresserSh == 'Peluquero') {
                toast('Debes elegir un peluquero', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                const preference = await fetch(`${apiUrl}/api/payments/create-preference-shift`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                const response = await preference.json();
                if(response.id) {
                    pagarTurnoBtn.style.display = 'none';
                    const id = response.id;
                    return id;
                } else {
                    toast('Ha ocurrido un error al intentar pagar el turno, intente nuevamente', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });                    
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleBuy = async (evt) => {
        evt.preventDefault();
        const id = await pagarTurno();
        if(id) {
            setPreferenceId(id);
            handleBtnBuyVisible(true);
        }
            
    };

    const handleAdmPremBuy = async (evt) => {
        evt.preventDefault();
        const id = await pagarTurno();
        if(id) {
            setAdmPremPreferenceId(id);
            handleBtnBuyVisible(true);
        }
            
    };

    const handleDateChange = date => {
        handleInputDateSh(date);
    };
    
    const loginToast = async (evt) => {
        evt.preventDefault();
        toast('Debes iniciar sesión para registrar un turno', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const styleDisabledBtns = {
        backgroundColor: 'grey',
        border: 'none'
    }

    const handleBtnSaveShift = () => {

        if(!inputFirstNameSh || !inputLastNameSh || !inputEmailSh) {
            toast('Debes completar todos los campos', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (inputOptionServiceSh=='' || inputOptionServiceSh=='Elija su servicio') {
            toast('Debes elegir el servicio!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (!validateEmail(inputEmailSh)) {
            toast('El email no es válido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (inputDateSh.getDay() == 0 || inputDateSh.getDay() == 1) {
            toast('Elige un dia entre martes y sabado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(existsHoliday) {
            toast('En la fecha ingresada el peluquero se encuenta de vacaciones', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(newFormatedDate < fechaActual) {
            toast('Debes ingresar una fecha a futuro', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(newFormatedDate > fecha15DiasDespues) {
            toast('Debes ingresar una fecha con 15 dias de anticipacion como máximo', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(selectOptionHairdresserSh == 'Peluquero' || selectOptionHairdresserSh == '') {
            toast('Debes elegir un peluquero', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            setSaveConfirmationShiftModal(true);
        }
    };

    const handleWantPayShift = () => {
        if(!inputFirstNameSh || !inputLastNameSh || !inputEmailSh) {
            toast('Debes completar todos los campos', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (!validateEmail(inputEmailSh)) {
            toast('El email no es válido!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (inputDateSh.getDay() == 0 || inputDateSh.getDay() == 1) {
            toast('Elige un dia entre martes y sabado!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if(newFormatedDate < fechaActual) {
            toast('Debes ingresar una fecha a futuro', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            setIsWantPay(true);
        }
    };

    const SaveConfirmationShiftModal = ({setSaveConfirmationShiftModal}) => {

        const handleBtnSaveShift = async() => {
                setShowSpinner(true);
                const shiftToCreate = {
                    first_name: inputFirstNameSh,
                    last_name: inputLastNameSh,
                    hairdresser: selectOptionHairdresserSh,
                    service: inputOptionServiceSh,
                    email: inputEmailSh,
                    date: formatedDate,
                    schedule: selectScheduleSh?selectScheduleSh:optionsScheduleSh[0],
                    price: inputPriceSh,
                    shift_datetime: fechaActual
                }
                const response = await fetch(`${apiUrl}/api/shifts/register`, {
                    method: 'POST',         
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(shiftToCreate)
                })
                const data = await response.json();
                if(response.ok) {
                    toast('Has creado el turno correctamente!', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                if(data.error === 'There is already a shift with that date and time') {
                    toast('Ya existe un turno con esa fecha y horario!', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    document.getElementById('btnCreateShift').style.display = 'block';
                    setShowSpinner(false);
                }
        };

        const handleBtnConfirmationDeleteBtnNo = () => {
            setSaveConfirmationShiftModal(false);
        }


        return (
            <div className='confirmationSaveBtnSaveShiftModalContainer'>
                <div className='confirmationSaveBtnSaveShiftModalContainer__ask'>¿Estás seguro que deseas registrar el turno?</div>
                <div className='confirmationSaveBtnSaveShiftModalContainer__askMobile'>
                    <div className='confirmationSaveBtnSaveShiftModalContainer__askMobile__ask'>¿Estás seguro que deseas</div>
                    <div className='confirmationSaveBtnSaveShiftModalContainer__askMobile__ask'> registrar el turno?</div>
                </div>
                <div className='confirmationSaveBtnSaveShiftModalContainer__btnsContainer'>
                    <div className='confirmationSaveBtnSaveShiftModalContainer__btnsContainer__btns'>
                        <div></div>
                    </div>
                    <div className='confirmationSaveBtnSaveShiftModalContainer__btnsContainer__btns'>
                        <button onClick={handleBtnSaveShift} className='confirmationSaveBtnSaveShiftModalContainer__btnsContainer__btns__prop'>Si</button>
                    </div>
                    <div className='confirmationSaveBtnSaveShiftModalContainer__btnsContainer__btns'>
                        <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationSaveBtnSaveShiftModalContainer__btnsContainer__btns__prop'>No</button>
                    </div>
                    {showSpinner&&<Spinner/>}
                </div>
            </div>
        )

    }

  return (
    <>
        <NavBar/>
        {
            isLoggedIn && (user.role=='admin' || user.role=='premium')?
            <>
                <HMenu/>
                <div className='shiftsContainerIsLoggedIn'>
                    <div className='shiftsContainerIsLoggedIn__form'>
                        <h2 className='shiftsContainerIsLoggedIn__form__phrase'>Registra tu turno</h2>
                        <div className='shiftsContainerIsLoggedIn__form__credentials'>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Nombre:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' placeholder='Nombre' value={inputFirstNameSh} onChange={handleInputFirstNameSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Apellido:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' placeholder='Apellido' value={inputLastNameSh} onChange={handleInputLastNameSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Peluquero:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <select className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={selectOptionHairdresserSh} onChange={(e) => {handleSelectOptionHairdresserSh(e.target.value)}}>
                                        {optionsHairdresser.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Servicio:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <select className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={inputOptionServiceSh} onChange={(e) => {handleInputOptionServiceSh(e.target.value)}}>
                                        {optionsService.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Email:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' type='email' placeholder='Email' value={inputEmailSh} onChange={handleInputEmailSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Fecha:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <DatePicker
                                        className="react-datepicker-wrapper"
                                        selected={inputDateSh}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Seleccione una fecha"
                                        locale="es"
                                    />
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Horario:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <select className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={selectScheduleSh} onChange={(e) => {handleSelectScheduleSh(e.target.value)}}>
                                        {optionsScheduleSh.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Precio:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__price'>{inputPriceSh?`$ ${inputPriceSh}`:inputPriceSh}</div>
                                </div>
                            </div>
                            {
                                isWantPay ?
                                <>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                        <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                            <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Turno:</h2>
                                        </div>
                                        <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                            <select className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={inputOptionServiceSh} onChange={(e) => {handleInputOptionServiceSh(e.target.value)}}>
                                                {optionsService.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                        <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                            <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Precio:</h2>
                                        </div>
                                        <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__price'>{inputPriceSh?`$ ${inputPriceSh}`:inputPriceSh}</div>
                                        </div>
                                    </div>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__btn'>
                                        <button id='pagarTurnoBtn' className='shiftsContainerIsLoggedIn__form__credentials__btn__prop' onClick={handleAdmPremBuy}>Pagar</button>
                                    </div>
                                    {admPremPreferenceId && <Wallet initialization={{ preferenceId: admPremPreferenceId }} />} 
                                </>
                                :
                                <>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__btn'>
                                        <button className='shiftsContainerIsLoggedIn__form__credentials__btn__prop' onClick={handleBtnSaveShift}>Registrar turno</button>
                                        {/* <button className='shiftsContainerIsLoggedIn__form__credentials__btn__propWantBuy' onClick={handleWantPayShift}>Deseas pagar el turno? Has click aquí</button> */}
                                    </div>
                                </>
                            }
                            {saveConfirmationShiftModal && <SaveConfirmationShiftModal setSaveConfirmationShiftModal={setSaveConfirmationShiftModal}/>}
                        </div>
                    </div>
                </div>
                <LogOut/> 
            </>
            : isLoggedIn?
            <>
                <HMenu/>
                <div className='shiftsContainerIsLoggedIn'>
                    <div className='shiftsContainerIsLoggedIn__form'>
                        <h2 className='shiftsContainerIsLoggedIn__form__phrase'>Registra tu turno</h2>
                        <div className='shiftsContainerIsLoggedIn__form__credentials'>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Nombre:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' placeholder='Nombre' value={inputFirstNameSh} onChange={handleInputFirstNameSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Apellido:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' placeholder='Apellido' value={inputLastNameSh} onChange={handleInputLastNameSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Servicio:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <select className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={inputOptionServiceSh} onChange={(e) => {handleInputOptionServiceSh(e.target.value)}}>
                                        {optionsService.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Email:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <input className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' type='email' placeholder='Email' value={inputEmailSh} onChange={handleInputEmailSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Fecha:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <DatePicker
                                        className="react-datepicker-wrapper"
                                        selected={inputDateSh}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Seleccione una fecha"
                                    />
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Horario:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <select className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={selectScheduleSh} onChange={(e) => {handleSelectScheduleSh(e.target.value)}}>
                                        {optionsScheduleSh.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Precio:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__price'>{inputPriceSh?`$ ${inputPriceSh}`:inputPriceSh}</div>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__btn'>
                                {/* <button id='pagarTurnoBtn' className='shiftsContainerIsLoggedIn__form__credentials__btn__prop' onClick={handleBuy}>Pagar</button> */}
                                <button id='pagarTurnoBtn' className='shiftsContainerIsLoggedIn__form__credentials__btn__propNonRegister'>Aún no puedes registrar un turno</button>
                            </div>
                        </div>
                        {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />} 
                    </div>
                </div>
                <LogOut/> 
            </>
            :
            <>
                <div className='warningLogin'>
                <p className='warningLogin__prop'>Si aún no has iniciado sesión, <Link to={"/login"} className='warningLogin__link'>has click aquí</Link></p>
                </div>
                <div className='shiftsContainer'>
                    <div className='shiftsContainer__form'>
                        <h2 className='shiftsContainer__form__phrase'>Registra tu turno</h2>
                        <div className='shiftsContainer__form__credentials'>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Nombre:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <input disabled className='shiftsContainer__form__credentials__label-input__input__prop' placeholder='Nombre' value={inputFirstNameSh} onChange={handleInputFirstNameSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Apellido:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <input disabled className='shiftsContainer__form__credentials__label-input__input__prop' placeholder='Apellido' value={inputLastNameSh} onChange={handleInputLastNameSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainerIsLoggedIn__form__credentials__label-input'>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainerIsLoggedIn__form__credentials__label-input__label__prop'>Servicio:</h2>
                                </div>
                                <div className='shiftsContainerIsLoggedIn__form__credentials__label-input__input'>
                                    <select style={styleDisabledBtns} disabled className='shiftsContainerIsLoggedIn__form__credentials__label-input__input__prop' value={inputOptionServiceSh} onChange={(e) => {handleInputOptionServiceSh(e.target.value)}}>
                                        {optionsService.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Email:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <input disabled className='shiftsContainer__form__credentials__label-input__input__prop' placeholder='Email' value={inputEmailSh} onChange={handleInputEmailSh}/>
                                </div>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Fecha:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <DatePicker
                                        className="react-datepicker-wrapper"
                                        disabled
                                        selected={inputDateSh}
                                        onChange={handleDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Seleccione una fecha"
                                    />
                                </div>
                            </div>
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Horario:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <select style={styleDisabledBtns} disabled className='shiftsContainer__form__credentials__label-input__input__prop' value={selectScheduleSh} onChange={(e) => {handleSelectScheduleSh(e.target.value)}}>
                                        {optionsScheduleSh.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Turno:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <select style={styleDisabledBtns} disabled className='shiftsContainer__form__credentials__label-input__input__prop' value={inputOptionServiceSh} onChange={(e) => {handleInputOptionServiceSh(e.target.value)}}>
                                        {optionsService.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}
                            <div className='shiftsContainer__form__credentials__label-input'>
                                <div className='shiftsContainer__form__credentials__label-input__label'>
                                    <h2 className='shiftsContainer__form__credentials__label-input__label__prop'>Precio:</h2>
                                </div>
                                <div className='shiftsContainer__form__credentials__label-input__input'>
                                    <div className='shiftsContainer__form__credentials__label-input__input__price'>{inputPriceSh?`$ ${inputPriceSh}`:inputPriceSh}</div>
                                </div>
                            </div>
                            <div className='shiftsContainer__form__credentials__btn'>
                                <button id='pagarTurnoBtn' className='shiftsContainer__form__credentials__btn__prop' onClick={loginToast}>Pagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }
        <Footer/>
    </>
  )
}

export default Shifts