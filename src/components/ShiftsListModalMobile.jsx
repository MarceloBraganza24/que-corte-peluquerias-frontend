import React, { useState, useEffect, useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import {OpenModalContext} from '../context/OpenModalContext'; 
import moment from 'moment-timezone'

const ShiftsListModalMobile = ({id,hairdresser,first_name,last_name,service,email,date,schedule,handleUpdateShiftModalMobileLocal,shifts}) => {
    const adjustedItemDate = moment.tz(date, 'America/Argentina/Buenos_Aires').startOf('day').toDate();
    
    const [confirmationDelShiftsModalMobile, handleConfirmationDelShiftsModalMobile] = useState(false);
    const [inputChanges, setInputChanges] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const {handleUpdateShiftModalMobile} = useContext(OpenModalContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [inputFirstNameISh, setInputFirstNameISh] = useState('');
    const [inputLastNameISh, setInputLastNameISh] = useState('');
    const [inputServiceISh, setInputServiceISh] = useState(`${service}`);
    const [inputEmailISh, setInputEmailISh] = useState('');
    const [inputDateISh, setInputDateISh] = useState(`${adjustedItemDate}`);
    const [selectScheduleOptionISh, setSelectScheduleOptionISh] = useState(`${schedule}`);
    const [inputAddScheduleHShLM, setInputAddScheduleHShLM] = useState('');
    const [inputAddScheduleMShLM, setInputAddScheduleMShLM] = useState('');
    const [selectOptionHairdresserISh, setSelectOptionHairdresserISh] = useState(`${hairdresser}`);
    const [isAddSchedule, setIsAddSchedule] = useState(false);
    
    const concatAddSchedules = inputAddScheduleHShLM + ':' + inputAddScheduleMShLM
    const formatInputDate = moment(inputDateISh).format('YYYY-MM-DD')
    const concatDateSchedule = (formatInputDate) + ' ' + (!isAddSchedule?(selectScheduleOptionISh?selectScheduleOptionISh:schedule):concatAddSchedules)
    let concatNewDateSchedule = new Date(concatDateSchedule);
    
    let fechaActual = new Date();
    //const [expiredDate, setExpiredDate] = useState(false);
   
    useEffect(() => {
        /* if(concatNewDateSchedule < fechaActual) {
            setExpiredDate(true);
        } */
        setSelectScheduleOptionISh(schedule);
    },[])

    const optionsService = ['Servicio','Corte caballero','Corte de barba','Corte y barba'];
    const optionsHairdresser = ['Peluquero','Ayrton','Mirko','Ale'];
    const originalOptionsAyrtonMorScheduleISh = ['09:20','09:40','10:00','10:20','10:40','11:00','11:30','12:00','12:20','12:40',];
    const originalOptionsAyrtonAftScheduleISh = ['15:00','15:30','16:00','16:20','16:40','17:00','17:30','18:00','18:20','18:40','19:00','19:20','19:40'];
    const originalOptionsAyrtonSaturdayScheduleISh = ['09:20','09:40','10:00','10:20','10:40','11:00','11:30','12:00','12:20','12:40','13:00','13:20','13:40'];
    let combinedAyrtonMorAftSchedules = [...originalOptionsAyrtonMorScheduleISh, ...originalOptionsAyrtonAftScheduleISh];
    let combinedAyrtonSchedules = [...originalOptionsAyrtonMorScheduleISh, ...originalOptionsAyrtonAftScheduleISh, ...originalOptionsAyrtonSaturdayScheduleISh];
    let uniqueSetAyrtonSchedules = new Set(combinedAyrtonSchedules);
    let uniqueElementsAyrtonSchedules = [...uniqueSetAyrtonSchedules];
    uniqueElementsAyrtonSchedules.sort((a, b) => {
        let [hourA, minuteA] = a.split(':').map(Number);
        let [hourB, minuteB] = b.split(':').map(Number);
        return hourA - hourB || minuteA - minuteB;
    });

    const originalOptionsMirkoMorScheduleISh = ['09:40','10:00','10:20','10:40','11:00','11:30','12:00'];
    const originalOptionsMirkoAftScheduleISh = ['15:10','15:30','16:00','16:20','16:40','17:00','17:30','18:00','18:20','18:40'];
    const originalOptionsMirkoSaturdayScheduleISh = ['09:40','10:00','10:20','10:40','11:00','11:30','11:50','12:10','12:30','13:00','13:20','13:40','14:00'];
    let combinedMirkoMorAftSchedules = [...originalOptionsMirkoMorScheduleISh, ...originalOptionsMirkoAftScheduleISh];
    let combinedMirkoSchedules = [...originalOptionsMirkoMorScheduleISh, ...originalOptionsMirkoAftScheduleISh, ...originalOptionsMirkoSaturdayScheduleISh];
    let uniqueSetMirkoSchedules = new Set(combinedMirkoSchedules);
    let uniqueElementsMirkoSchedules = [...uniqueSetMirkoSchedules];
    uniqueElementsMirkoSchedules.sort((a, b) => {
        let [hourA, minuteA] = a.split(':').map(Number);
        let [hourB, minuteB] = b.split(':').map(Number);
        return hourA - hourB || minuteA - minuteB;
    });

    const originalOptionsAleMorScheduleISh = ['10:00','10:30','11:00','11:30','12:00','12:20'];
    const originalOptionsAleAftScheduleISh = ['15:00','15:30','16:00','16:20','16:40','17:00','17:30','18:00','18:20'];
    const originalOptionsAleTuesdayScheduleISh = ['10:00','10:30','11:00','11:30','12:00','12:30','16:00','16:30','17:00','17:30','18:00','18:20','18:40','19:00','19:20','19:40'];
    const originalOptionsAleSaturdayScheduleISh = ['10:00','10:20','10:40','11:00','11:30','12:00','12:20','12:40','13:00','13:30','14:00','14:30'];
    let combinedAleMorAftSchedules = [...originalOptionsAleMorScheduleISh, ...originalOptionsAleAftScheduleISh];
    let combinedAleSchedules = [...originalOptionsAleMorScheduleISh, ...originalOptionsAleAftScheduleISh, ...originalOptionsAleTuesdayScheduleISh, ...originalOptionsAleSaturdayScheduleISh];
    let uniqueSetAleSchedules = new Set(combinedAleSchedules);
    let uniqueElementsAleSchedules = [...uniqueSetAleSchedules];
    uniqueElementsAleSchedules.sort((a, b) => {
        let [hourA, minuteA] = a.split(':').map(Number);
        let [hourB, minuteB] = b.split(':').map(Number);
        return hourA - hourB || minuteA - minuteB;
    });

    const optionsScheduleSh = [];

    // const lastScheduleMor = originalOptionsMorScheduleISh[originalOptionsMorScheduleISh.length - 1]
    // const firstScheduleAft = originalOptionsAftScheduleISh[0]
    // const lastScheduleSat = originalOptionsSaturdayScheduleISh[originalOptionsSaturdayScheduleISh.length - 1]
    optionsScheduleSh.push(`${schedule}`)

    function filtrarPorFecha(shiftsFiltered, fecha) {
        return shiftsFiltered.filter(objeto => objeto.date === fecha);
    }

    const shiftsByDate = filtrarPorFecha(shifts, formatInputDate);

    const ayrtonShifts = shiftsByDate.filter(shift => shift.hairdresser == 'Ayrton');
    const mirkoShifts = shiftsByDate.filter(shift => shift.hairdresser == 'Mirko');
    const aleShifts = shiftsByDate.filter(shift => shift.hairdresser == 'Ale');

    const ayrtonSchedules = ayrtonShifts.map(shift => shift.schedule)
    const mirkoSchedules = mirkoShifts.map(shift => shift.schedule)
    const aleSchedules = aleShifts.map(shift => shift.schedule)


    if(concatNewDateSchedule.getDay() == 6) {
        if(selectOptionHairdresserISh=='Ayrton'){
            let filteredSatArray = originalOptionsAyrtonSaturdayScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserISh=='Mirko') {
            let filteredSatArray = originalOptionsMirkoSaturdayScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserISh=='Ale') {
            let filteredSatArray = originalOptionsAleSaturdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        }
    } else if(concatNewDateSchedule.getDay() == 2) {
        if(selectOptionHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserISh=='Mirko') {
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredAftArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserISh=='Ale') {
            let filteredTuesdayArray = originalOptionsAleTuesdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredTuesdayArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
        }
    } else {
        if(selectOptionHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserISh=='Mirko') {
            let filteredMorArray = originalOptionsMirkoMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleSh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleSh.push(res)
            })
        } else if(selectOptionHairdresserISh=='Ale') {
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

    const addSchedule = () => {
        if(isAddSchedule){
            setIsAddSchedule(false)
        } else {
            setIsAddSchedule(true)
            setInputChanges(true)
        }
    };

    const adjustedNewDatee = new Date(adjustedItemDate)

    const handleSelectOptionHairdresserISh = (e) => {
        setSelectOptionHairdresserISh(e);
        e===hairdresser?setInputChanges(false):setInputChanges(true);
        e===''&&setInputChanges(false);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputServiceISh!==service && inputServiceISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(adjustedItemDate.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleInputFirstNameISh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputFirstNameISh(texto);
        texto===first_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectOptionHairdresserISh!==hairdresser && selectOptionHairdresserISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputServiceISh!==service && inputServiceISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(adjustedItemDate.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleInputLastNameISh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputLastNameISh(texto);
        texto===last_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectOptionHairdresserISh!==hairdresser && selectOptionHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputServiceISh!==service && inputServiceISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(adjustedItemDate.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleSelectServiceISh = (e) => {
        setInputServiceISh(e);
        e===service?setInputChanges(false):setInputChanges(true);
        e===''&&setInputChanges(false);
        if(selectOptionHairdresserISh!==hairdresser && selectOptionHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(adjustedItemDate.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleInputEmailISh = (e) => {
        const texto = e.target.value;
        setInputEmailISh(texto);
        texto===email?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectOptionHairdresserISh!==hairdresser && selectOptionHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputServiceISh!==service && inputServiceISh!=='')setInputChanges(true);
        if(adjustedItemDate.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };
    
    const handleSelectScheduleOptionISh = (e) => {
        const texto = e.target.value;
        setSelectScheduleOptionISh(texto);
        texto===schedule?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectOptionHairdresserISh!==hairdresser && selectOptionHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputServiceISh!==service && inputServiceISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(adjustedItemDate.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
    };

    const handleInputAddScheduleHShLM = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputAddScheduleHShLM(inputValue);
        }
    };

    const handleInputAddScheduleMShLM = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputAddScheduleMShLM(inputValue);
        }
    };

    const handleOnBlurInputAddScheduleHShLM = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            if(inputValue.length == 1){
                setInputAddScheduleHShLM(`0${inputValue}`);
            } else {
                setInputAddScheduleHShLM(inputValue);
            }
        }
    };

    const handleOnBlurInputAddScheduleMShLM = (e) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            if(inputValue.length == 1){
                setInputAddScheduleMShLM(`0${inputValue}`);
            } else {
                setInputAddScheduleMShLM(inputValue);
            }
        }
    };

    const handleDateChange = date => {
        setInputDateISh(date);
        const newDate = new Date(date)
        if(newDate.getTime() == adjustedNewDatee.getTime()) {
            setInputChanges(false)
        } else {
            setInputChanges(true);
        }
        if(selectOptionHairdresserISh!==hairdresser && selectOptionHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputServiceISh!==service && inputServiceISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleBtnDelShift = async() => {
        handleConfirmationDelShiftsModalMobile(true);
    };

    
    let existsUniqueAyrtonMorAftSchedules = combinedAyrtonMorAftSchedules.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    let existsUniqueAyrtonAftSchedules = originalOptionsAyrtonAftScheduleISh.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    let existsUniqueAyrtonSatSchedules = originalOptionsAyrtonSaturdayScheduleISh.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);

    let existsUniqueMirkoMorAftSchedules = combinedMirkoMorAftSchedules.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    let existsUniqueMirkoAftSchedules = originalOptionsMirkoAftScheduleISh.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    let existsUniqueMirkoSatSchedules = originalOptionsMirkoSaturdayScheduleISh.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);

    let existsUniqueAleMorAftSchedules = combinedAleMorAftSchedules.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    let existsUniqueAleTuesdaySchedules = originalOptionsAleTuesdayScheduleISh.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    let existsUniqueAleSatSchedules = originalOptionsAleSaturdayScheduleISh.includes(selectScheduleOptionISh?selectScheduleOptionISh:schedule);
    const handleBtnUpdShift = async() => {
        if( !isAddSchedule && (inputFirstNameISh == '' || inputFirstNameISh == first_name) && (selectOptionHairdresserISh == hairdresser) && (inputLastNameISh == '' || inputLastNameISh == last_name) && (inputServiceISh == '' || inputServiceISh == service) && (inputEmailISh == '' || inputEmailISh == email) && (inputDateISh == '' || inputDateISh == date) && (selectScheduleOptionISh == '' || selectScheduleOptionISh == schedule) ) {
            toast('No tienes cambios para actualizar', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (isAddSchedule && (!inputAddScheduleHShLM || !inputAddScheduleMShLM)) {
            toast('Debes ingresar un horario!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } /* else if(concatNewDateSchedule < fechaActual) {
            toast('Debes ingresar una fecha a futuro', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } */ else if(selectOptionHairdresserISh == 'Ayrton' && concatNewDateSchedule.getDay() == 2 && !existsUniqueAyrtonMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ayrton' && concatNewDateSchedule.getDay() == 3 && !existsUniqueAyrtonMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ayrton' && concatNewDateSchedule.getDay() == 4 && !existsUniqueAyrtonMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ayrton' && concatNewDateSchedule.getDay() == 5 && !existsUniqueAyrtonMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ayrton' && concatNewDateSchedule.getDay() == 6 && !existsUniqueAyrtonSatSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Mirko' && concatNewDateSchedule.getDay() == 2 && !existsUniqueMirkoAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Mirko' && concatNewDateSchedule.getDay() == 3 && !existsUniqueMirkoMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Mirko' && concatNewDateSchedule.getDay() == 4 && !existsUniqueMirkoMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Mirko' && concatNewDateSchedule.getDay() == 5 && !existsUniqueMirkoMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Mirko' && concatNewDateSchedule.getDay() == 6 && !existsUniqueMirkoSatSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ale' && concatNewDateSchedule.getDay() == 2 && !existsUniqueAleTuesdaySchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ale' && concatNewDateSchedule.getDay() == 3 && !existsUniqueAleMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ale' && concatNewDateSchedule.getDay() == 4 && !existsUniqueAleMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ale' && concatNewDateSchedule.getDay() == 5 && !existsUniqueAleMorAftSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Ale' && concatNewDateSchedule.getDay() == 6 && !existsUniqueAleSatSchedules && !isAddSchedule){
            toast('El horario no esta permitido para el día de semana seleccionado del peluquero elegido', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectOptionHairdresserISh == 'Peluquero' || selectOptionHairdresserISh == '') {
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
            document.getElementById('btnUpdateShift').style.display = 'none';
            setShowSpinner(true);
            const shiftToUpdate = {
                hairdresser: selectOptionHairdresserISh,
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                service: (inputServiceISh=='Servicio'||inputServiceISh=='-')?'-':inputServiceISh,
                email: inputEmailISh?inputEmailISh:email,
                date: formatInputDate?formatInputDate:adjustedItemDate,
                schedule: !isAddSchedule?(selectScheduleOptionISh?selectScheduleOptionISh:schedule):concatAddSchedules
            }
            const response = await fetch(`${apiUrl}/api/shifts/${id}`, {
                method: 'PUT',         
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftToUpdate)
            })
            const data = await response.json();
            if(response.ok) {
                toast('Has actualizado el turno correctamente!', {
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
                    handleUpdateShiftModalMobileLocal(false);
                    handleUpdateShiftModalMobile(false);
                    setInputChanges(false);
                }, 2000);
            }
            if(data.error === 'There is already a shift with that date and time') {
                toast('Ya existe un turno con esa fecha y horario del peluquero elegido!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnUpdateShift').style.display = 'block';
                setShowSpinner(false);
            } else if(data.error === 'There is already a shift with that data') {
                toast('No tienes cambios para actualizar!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                document.getElementById('btnUpdateShift').style.display = 'block';
                setShowSpinner(false);
                setInputChanges(false);
            }  
        }
    };

    const ConfirmationDeleteModal = () => {
        const handleBtnDelShift = async() => {
            setShowSpinner(true);
            const response = await fetch(`${apiUrl}/api/shifts/${id}`, {
                method: 'DELETE',         
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(response.ok) {
                toast('Has eliminado el turno correctamente!', {
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
                    handleConfirmationDelShiftsModalMobile(false);
                    handleUpdateShiftModalMobile(false);
                    handleUpdateShiftModalMobileLocal(false);
                }, 2000);
            } else {
                toast('Has ocurrido un error al querer eliminar el turno!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        };

        const handleBtnConfirmationDeleteBtnNo = () => {
            handleConfirmationDelShiftsModalMobile(false)
        }

        return (
            <>
                <div className='confirmationDeleteBtnShiftListModalContainer'>
                    <div className='confirmationDeleteBtnShiftListModalContainer__ask'>¿Estás seguro que deseas borrar el turno?</div>
                    <div className='confirmationDeleteBtnShiftListModalContainer__askMobile'>
                        <div className='confirmationDeleteBtnShiftListModalContainer__askMobile__ask'>¿Estás seguro que deseas</div>
                        <div className='confirmationDeleteBtnShiftListModalContainer__askMobile__ask'>borrar el turno?</div>
                    </div>
                    <div className='confirmationDeleteBtnShiftListModalContainer__btnsContainer'>
                        <div className='confirmationDeleteBtnShiftListModalContainer__btnsContainer__btns'>
                            <div></div>
                        </div>
                        <div className='confirmationDeleteBtnShiftListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnDelShift} className='confirmationDeleteBtnShiftListModalContainer__btnsContainer__btns__prop'>Si</button>
                        </div>
                        <div className='confirmationDeleteBtnShiftListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnShiftListModalContainer__btnsContainer__btns__prop'>No</button>
                        </div>
                        <div className='confirmationDeleteBtnShiftListModalContainer__btnsContainer__btns'>
                            {showSpinner&&<Spinner/>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const closeM = () => {
        handleUpdateShiftModalMobile(false);
        handleUpdateShiftModalMobileLocal(false);
    }

    const unsavedChanges = () => {
        toast('No has actualizado los cambios!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const buttonDisabledStyle = {
        color: 'white',
        cursor: 'pointer'
    };

    return (
    <>
        <div className='updateShiftModalContainerMobile'>
            <div className='updateShiftModalContainerMobile__btnCloseModal'>
                {
                    !confirmationDelShiftsModalMobile&&!inputChanges?
                    <>
                        <Link onClick={closeM} className='updateShiftModalContainerMobile__btnCloseModal__prop'>
                            Cerrar
                        </Link>
                    </>
                        :
                    <>
                        <div onClick={unsavedChanges} className='updateShiftModalContainerMobile__btnCloseModal__prop'>Cerrar</div>
                    </>
                }
            </div>
            {
                !confirmationDelShiftsModalMobile?
                <>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Peluquero</div>
                        <div className='updateShiftModalContainerMobile__labelInput__selectService'>
                            <select className='updateShiftModalContainerMobile__labelInput__selectService__select' value={selectOptionHairdresserISh} onChange={(e) => {handleSelectOptionHairdresserISh(e.target.value)}}>
                                {optionsHairdresser.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Fecha</div>
                        <DatePicker className='updateShiftModalContainerMobile__labelInput__datePikerShiftsListMobile'
                            selected={!inputDateISh?formatInputDate:inputDateISh}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Horario</div>
                        <div className='updateShiftModalContainerMobile__labelInput__selectSchedule'>
                            {
                                !isAddSchedule?
                                <select className='updateShiftModalContainerMobile__labelInput__selectSchedule__select' value={selectScheduleOptionISh} onChange={handleSelectScheduleOptionISh}>
                                    {optionsScheduleSh.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                                :
                                <>
                                    <input style={{width: '10vh'}} maxLength={2} className='itemCreateShift__selectSchedule__input' type="text" value={inputAddScheduleHShLM} onBlur={handleOnBlurInputAddScheduleHShLM} onChange={handleInputAddScheduleHShLM} />
                                    <div style={{color: 'white'}}>:</div>
                                    <input style={{width: '10vh'}} maxLength={2} className='itemCreateShift__selectSchedule__input' type="text" value={inputAddScheduleMShLM} onBlur={handleOnBlurInputAddScheduleMShLM} onChange={handleInputAddScheduleMShLM} />
                                </>
                            }
                            <button className='itemCreateShift__selectSchedule__btn' style={{width: '5vh'}} onClick={addSchedule}>+</button>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Nombre</div>
                        <div className='updateShiftModalContainerMobile__labelInput__input'>
                            <input className='updateShiftModalContainerMobile__labelInput__input__prop' value={!inputFirstNameISh?first_name:inputFirstNameISh}onChange={handleInputFirstNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Apellido</div>
                        <div className='updateShiftModalContainerMobile__labelInput__input'>
                            <input className='updateShiftModalContainerMobile__labelInput__input__prop' value={!inputLastNameISh?last_name:inputLastNameISh}onChange={handleInputLastNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Servicio</div>
                        <div className='updateShiftModalContainerMobile__labelInput__selectService'>
                            <select className='updateShiftModalContainerMobile__labelInput__selectService__select' value={inputServiceISh} onChange={(e) => {handleSelectServiceISh(e.target.value)}}>
                                {optionsService.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Email</div>
                        <div className='updateShiftModalContainerMobile__labelInput__input'>
                            <input className='updateShiftModalContainerMobile__labelInput__input__prop' type='email' value={!inputEmailISh?email:inputEmailISh}onChange={handleInputEmailISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__btns'>
                        <button className='updateShiftModalContainerMobile__btns__btn' onClick={handleBtnDelShift}>Borrar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__btns'>
                        <button id='btnUpdateShift' className='updateShiftModalContainerMobile__btns__btn' onClick={handleBtnUpdShift}>Actualizar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__btns'>
                        {showSpinner&&<Spinner/>}
                    </div>
                </>
                :
                <>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Peluquero</div>
                        <div className='updateShiftModalContainerMobile__labelInput__selectService'>
                            <select disabled className='updateShiftModalContainerMobile__labelInput__selectService__select' value={selectOptionHairdresserISh} onChange={(e) => {handleSelectOptionHairdresserISh(e.target.value)}}>
                                {optionsHairdresser.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Fecha</div>
                        <DatePicker className='updateShiftModalContainerMobile__labelInput__datePikerShiftsListMobile'
                            selected={!inputDateISh?formatInputDate:inputDateISh}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            disabled
                        />
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Horario</div>
                        <div className='updateShiftModalContainerMobile__labelInput__selectSchedule'>
                            {
                                !isAddSchedule?
                                <select disabled className='updateShiftModalContainerMobile__labelInput__selectSchedule__select' value={selectScheduleOptionISh} onChange={handleSelectScheduleOptionISh}>
                                    {optionsScheduleSh.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                                :
                                <>
                                    <input disabled style={{width: '10vh', backgroundColor:'grey'}} maxLength={2} className='itemCreateShift__selectSchedule__input' type="text" value={inputAddScheduleHShLM} onChange={handleInputAddScheduleHShLM} />
                                    <div style={{color: 'white'}}>:</div>
                                    <input disabled style={{width: '10vh', backgroundColor:'grey'}} maxLength={2} className='itemCreateShift__selectSchedule__input' type="text" value={inputAddScheduleMShLM} onChange={handleInputAddScheduleMShLM} />
                                </>
                            }
                            <button disabled className='itemCreateShift__selectSchedule__btn' style={{width: '5vh'}} onClick={addSchedule}>+</button>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Nombre</div>
                        <div className='updateShiftModalContainerMobile__labelInput__input'>
                            <input disabled className='updateShiftModalContainerMobile__labelInput__input__prop' value={!inputFirstNameISh?first_name:inputFirstNameISh}onChange={handleInputFirstNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Apellido</div>
                        <div className='updateShiftModalContainerMobile__labelInput__input'>
                            <input disabled className='updateShiftModalContainerMobile__labelInput__input__prop' value={!inputLastNameISh?last_name:inputLastNameISh}onChange={handleInputLastNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Servicio</div>
                        <div className='updateShiftModalContainerMobile__labelInput__selectService'>
                            <select disabled className='updateShiftModalContainerMobile__labelInput__selectService__select' value={inputServiceISh} onChange={(e) => {handleSelectServiceISh(e.target.value)}}>
                                {optionsService.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__labelInput'>
                        <div className='updateShiftModalContainerMobile__labelInput__label'>Email</div>
                        <div className='updateShiftModalContainerMobile__labelInput__input'>
                            <input disabled className='updateShiftModalContainerMobile__labelInput__input__prop' type='email' value={!inputEmailISh?email:inputEmailISh}onChange={handleInputEmailISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='updateShiftModalContainerMobile__btns'>
                        <button disabled className='updateShiftModalContainerMobile__btns__btn' onClick={handleBtnDelShift}>Borrar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__btns'>
                        <button disabled id='btnUpdateShift' className='updateShiftModalContainerMobile__btns__btn' onClick={handleBtnUpdShift}>Actualizar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='updateShiftModalContainerMobile__btns'>
                        {showSpinner&&<Spinner/>}
                    </div>
                </>
            }
            {
                confirmationDelShiftsModalMobile&&<ConfirmationDeleteModal/>
            }
        </div>
    </>
    )
}

export default ShiftsListModalMobile