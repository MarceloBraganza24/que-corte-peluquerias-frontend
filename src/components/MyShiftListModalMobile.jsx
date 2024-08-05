import React, { useState, useEffect, useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import {OpenModalContext} from '../context/OpenModalContext'; 
import moment from 'moment-timezone'

const MyShiftListModalMobile = ({id,hairdresser,first_name,last_name,service,email,date,schedule,handleUpdateMyShiftModalMobileLocal,shifts,holidaysData}) => {
    const adjustedDate = moment.tz(date, 'America/Argentina/Buenos_Aires').startOf('day').toDate();
    const adjustedNewDatee = new Date(adjustedDate);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [confirmationDelShiftsModal, handleConfirmationDelShiftsModal] = useState(false);
    const [inputChanges, setInputChanges] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const {handleUpdateMyShiftModalMobile} = useContext(OpenModalContext);
    const [holidays, setHolidays] = useState([]);
    const optionsService = ['Servicio','Corte caballero','Corte de barba','Corte y barba'];

    const [expiredDate, setExpiredDate] = useState(false);
    
    const [selectHairdresserISh, setSelectHairdresserISh] = useState(`${hairdresser}`);
    const [inputFirstNameISh, setInputFirstNameISh] = useState('');
    const [inputLastNameISh, setInputLastNameISh] = useState('');
    const [inputServiceISh, setInputServiceISh] = useState(`${service}`);
    const [inputEmailISh, setInputEmailISh] = useState('');
    const [inputDateISh, setInputDateISh] = useState(`${adjustedDate}`);
    const [selectScheduleOptionISh, setSelectScheduleOptionISh] = useState('');

    const formatInputDate = moment(inputDateISh).format('YYYY-MM-DD')
    const concatDateSchedule = (formatInputDate) + ' ' + (selectScheduleOptionISh?selectScheduleOptionISh:schedule)
    const dateMShLFormated = new Date(concatDateSchedule);

    let fechaActual = new Date();

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
    const optionsScheduleISh = [];
    optionsScheduleISh.push(`${schedule}`)

    useEffect(() => {
        if(dateMShLFormated < fechaActual) {
            setExpiredDate(true);
        }
        setHolidays(holidaysData)
    },[])
    
    // const lastScheduleMor = originalOptionsMorScheduleISh[originalOptionsMorScheduleISh.length - 1]
    // const firstScheduleAft = originalOptionsAftScheduleISh[0]
    // const lastScheduleSat = originalOptionsSaturdayScheduleISh[originalOptionsSaturdayScheduleISh.length - 1]
    
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



    if(dateMShLFormated.getDay() == 6) {
        if(selectHairdresserISh=='Ayrton'){
            let filteredSatArray = originalOptionsAyrtonSaturdayScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredSatArray = originalOptionsMirkoSaturdayScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredSatArray = originalOptionsAleSaturdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } else if(dateMShLFormated.getDay() == 2) {
        if(selectHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredTuesdayArray = originalOptionsAleTuesdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredTuesdayArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } else if(dateMShLFormated.getDay() == 3 || dateMShLFormated.getDay() == 4) {
        if(selectHairdresserISh=='Ayrton'){
            //let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            /* filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            }) */
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredMorArray = originalOptionsMirkoMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredMorArray = originalOptionsAleMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredAftArray = originalOptionsAleAftScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleISh.push(res)
            })
        }
    } else {
        if(selectHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredMorArray = originalOptionsMirkoMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredMorArray = originalOptionsAleMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredAftArray = originalOptionsAleAftScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
            optionsScheduleISh.push(res)
            })
        }
    }


    /* if(dateMShLFormated.getDay() == 6) {
        if(selectHairdresserISh=='Ayrton'){
            let filteredSatArray = originalOptionsAyrtonSaturdayScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredSatArray = originalOptionsMirkoSaturdayScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredSatArray = originalOptionsAleSaturdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } else if(dateMShLFormated.getDay() == 2) {
        if(selectHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredTuesdayArray = originalOptionsAleTuesdayScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredTuesdayArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } else {
        if(selectHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsAyrtonMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAyrtonAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredMorArray = originalOptionsMirkoMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsMirkoAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredMorArray = originalOptionsAleMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredAftArray = originalOptionsAleAftScheduleISh.filter(time => !aleSchedules.includes(time));
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } */







    /* if(dateMShLFormated.getDay() == 6) {
        if(selectHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredSatArray = originalOptionsSaturdayScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredSatArray = originalOptionsSaturdayScheduleISh.filter(time => !mirkoSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredSatArray = originalOptionsSaturdayScheduleISh.filter(time => !aleSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredSatArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } else if(dateMShLFormated.getDay() == 3 || dateMShLFormated.getDay() == 4) {
        if(selectHairdresserISh=='Ayrton'){
            let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !aleSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } else {
        if(selectHairdresserISh=='Ayrton'){
            let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !ayrtonSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Mirko') {
            let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !mirkoSchedules.includes(time));
            let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !mirkoSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        } else if(selectHairdresserISh=='Ale') {
            let filteredMorArray = originalOptionsMorScheduleISh.filter(time => !aleSchedules.includes(time));
            let filteredAftArray = originalOptionsAftScheduleISh.filter(time => !aleSchedules.includes(time));
            optionsScheduleISh.push(`${schedule}`);
            filteredMorArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
            filteredAftArray.forEach(res => {
                optionsScheduleISh.push(res)
            })
        }
    } */

    const handleInputFirstNameISh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputFirstNameISh(texto);
        texto===first_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectHairdresserISh!==hairdresser && selectHairdresserISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(inputDateISh.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleInputLastNameISh = (e) => {
        const texto = e.target.value.replace(/[^A-Za-zñÑ\s]/gi, '');
        setInputLastNameISh(texto);
        texto===last_name?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectHairdresserISh!==hairdresser && selectHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(inputDateISh.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleSelectServiceISh = (e) => {
        setInputServiceISh(e);
        e===service?setInputChanges(false):setInputChanges(true);
        e===''&&setInputChanges(false);
        if(selectHairdresserISh!==hairdresser && selectHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(inputDateISh.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleSelectHairdresserISh = (e) => {
        setSelectHairdresserISh(e.target.value);
        e.target.value===hairdresser?setInputChanges(false):setInputChanges(true);
        e.target.value===''&&setInputChanges(false);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(inputDateISh.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleInputEmailISh = (e) => {
        const texto = e.target.value;
        setInputEmailISh(texto);
        texto===email?setInputChanges(false):setInputChanges(true);
        texto===''&&setInputChanges(false);
        if(selectHairdresserISh!==hairdresser && selectHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputDateISh.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };
    
    const handleSelectScheduleOptionISh = (e) => {
        const texto = e.target.value;
        setSelectScheduleOptionISh(texto);
        texto==schedule?setInputChanges(false):setInputChanges(true);
        texto==''&&setInputChanges(false);
        if(selectHairdresserISh!==hairdresser && selectHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(inputDateISh.getTime() != adjustedNewDatee.getTime()) {
            setInputChanges(true);
        }
    };

    const handleDateChange = date => {
        date&&setInputDateISh(date);
        const newDate = new Date(date)
        if(newDate.getTime() == adjustedNewDatee.getTime()) {
            setInputChanges(false)
        } else {
            setInputChanges(true);
        }
        if(selectHairdresserISh!==hairdresser && selectHairdresserISh!=='')setInputChanges(true);
        if(inputFirstNameISh!==first_name && inputFirstNameISh!=='')setInputChanges(true);
        if(inputLastNameISh!==last_name && inputLastNameISh!=='')setInputChanges(true);
        if(inputEmailISh!==email && inputEmailISh!=='')setInputChanges(true);
        if(selectScheduleOptionISh!==schedule && selectScheduleOptionISh!=='')setInputChanges(true);
    };

    const handleBtnDelShift = async() => {
        handleConfirmationDelShiftsModal(true);
    };

    const fecha15DiasDespues = new Date(fechaActual);
    fecha15DiasDespues.setDate(fechaActual.getDate() + 15);

    const dateToCompareHoliday = {
        date: formatInputDate?formatInputDate:adjustedDate,
        hairdresser: selectHairdresserISh
    }
    const existsHoliday = holidays.some(holiday =>
        holiday.date == dateToCompareHoliday.date &&
        holiday.hairdresser == dateToCompareHoliday.hairdresser
    );


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
        document.getElementById('btnUpdateShift').style.display = 'none';
        setShowSpinner(true);
        if (dateMShLFormated.getDay() == 0 || dateMShLFormated.getDay() == 1) {
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
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
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
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectHairdresserISh == 'Ayrton' && dateMShLFormated.getDay() == 2 && !existsUniqueAyrtonMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Ayrton' && dateMShLFormated.getDay() == 3 && !existsUniqueAyrtonAftSchedules){
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
        } else if(selectHairdresserISh == 'Ayrton' && dateMShLFormated.getDay() == 4 && !existsUniqueAyrtonAftSchedules){
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
        } else if(selectHairdresserISh == 'Ayrton' && dateMShLFormated.getDay() == 5 && !existsUniqueAyrtonMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Ayrton' && dateMShLFormated.getDay() == 6 && !existsUniqueAyrtonSatSchedules){
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
        } else if(selectHairdresserISh == 'Mirko' && dateMShLFormated.getDay() == 2 && !existsUniqueMirkoAftSchedules){
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
        } else if(selectHairdresserISh == 'Mirko' && dateMShLFormated.getDay() == 3 && !existsUniqueMirkoMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Mirko' && dateMShLFormated.getDay() == 4 && !existsUniqueMirkoMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Mirko' && dateMShLFormated.getDay() == 5 && !existsUniqueMirkoMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Mirko' && dateMShLFormated.getDay() == 6 && !existsUniqueMirkoSatSchedules){
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
        } else if(selectHairdresserISh == 'Ale' && dateMShLFormated.getDay() == 2 && !existsUniqueAleTuesdaySchedules){
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
        } else if(selectHairdresserISh == 'Ale' && dateMShLFormated.getDay() == 3 && !existsUniqueAleMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Ale' && dateMShLFormated.getDay() == 4 && !existsUniqueAleMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Ale' && dateMShLFormated.getDay() == 5 && !existsUniqueAleMorAftSchedules){
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
        } else if(selectHairdresserISh == 'Ale' && dateMShLFormated.getDay() == 6 && !existsUniqueAleSatSchedules){
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
        } else if(dateMShLFormated < fechaActual) {
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
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(selectHairdresserISh == 'Peluquero' || selectHairdresserISh == '') {
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
        } else if(dateMShLFormated > fecha15DiasDespues) {
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
            setShowSpinner(false);
            document.getElementById('btnUpdateShift').style.display = 'block';
        } else if(inputFirstNameISh !== first_name || inputLastNameISh !== last_name || inputEmailISh !== email || inputDateISh !== formatInputDate || selectScheduleOptionISh !== schedule) {
            const shiftToUpdate = {
                hairdresser: selectHairdresserISh,
                first_name: inputFirstNameISh?inputFirstNameISh:first_name,
                last_name: inputLastNameISh?inputLastNameISh:last_name,
                service: inputServiceISh?inputServiceISh:service,
                email: inputEmailISh?inputEmailISh:email,
                date: formatInputDate?formatInputDate:adjustedDate,
                schedule: selectScheduleOptionISh?selectScheduleOptionISh:schedule
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
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    handleUpdateMyShiftModalMobileLocal(false);
                    handleUpdateMyShiftModalMobile(false);
                    setInputChanges(false)
                }, 1500);
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

    const ConfirmationDeleteModal = ({formatInputDate,schedule}) => {
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
                    handleConfirmationDelShiftsModal(false);
                    handleUpdateMyShiftModalMobile(false);
                    handleUpdateMyShiftModalMobileLocal(false);
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
            handleConfirmationDelShiftsModal(false)
        }

        return (
            <>
                <div className='confirmationDeleteBtnMyShiftListModalContainer'>
                    <div className='confirmationDeleteBtnMyShiftListModalContainer__ask'>¿Estás seguro que deseas borrar el turno con fecha {formatInputDate} {schedule}?</div>
                    <div className='confirmationDeleteBtnMyShiftListModalContainer__askMobile'>
                        <div className='confirmationDeleteBtnMyShiftListModalContainer__askMobile__ask'>¿Estás seguro que deseas borrar el turno con fecha {formatInputDate} {schedule}?</div>
                    </div>
                    <div className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer'>
                        <div className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer__btns'>
                            <div></div>
                        </div>
                        <div className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnDelShift} className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer__btns__prop'>Si</button>
                        </div>
                        <div className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer__btns'>
                            <button onClick={handleBtnConfirmationDeleteBtnNo} className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer__btns__prop'>No</button>
                        </div>
                        <div className='confirmationDeleteBtnMyShiftListModalContainer__btnsContainer__btns'>
                            {showSpinner&&<Spinner/>}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const closeM = () => {
        handleUpdateMyShiftModalMobile(false);
        handleUpdateMyShiftModalMobileLocal(false);
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
        <div className='myShiftModalContainerMobile'>
            <div className='myShiftModalContainerMobile__btnCloseModal'>
                {
                    !confirmationDelShiftsModal&&!inputChanges?
                    <>
                        <Link onClick={closeM} className='myShiftModalContainerMobile__btnCloseModal__prop'>
                            Cerrar
                        </Link>
                    </>
                        :
                    <>
                        <div onClick={unsavedChanges} className='myShiftModalContainerMobile__btnCloseModal__prop'>Cerrar</div>
                    </>
                }
            </div>
            {
                !confirmationDelShiftsModal&&!expiredDate?
                <>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Peluquero</div>
                        <div className='myShiftModalContainerMobile__labelInput__selectSchedule'>
                            <select className='myShiftModalContainerMobile__labelInput__selectSchedule__select' value={selectHairdresserISh} onChange={handleSelectHairdresserISh}>
                                {optionsHairdresser.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Nombre</div>
                        <div className='myShiftModalContainerMobile__labelInput__input'>
                            <input className='myShiftModalContainerMobile__labelInput__input__prop' value={!inputFirstNameISh?first_name:inputFirstNameISh}onChange={handleInputFirstNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Apellido</div>
                        <div className='myShiftModalContainerMobile__labelInput__input'>
                            <input className='myShiftModalContainerMobile__labelInput__input__prop' value={!inputLastNameISh?last_name:inputLastNameISh}onChange={handleInputLastNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Servicio</div>
                        <div className='myShiftModalContainerMobile__labelInput__selectService'>
                            <select className='myShiftModalContainerMobile__labelInput__selectService__select' value={inputServiceISh} onChange={(e) => {handleSelectServiceISh(e.target.value)}}>
                                {optionsService.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Email</div>
                        <div className='myShiftModalContainerMobile__labelInput__input'>
                            <input className='myShiftModalContainerMobile__labelInput__input__prop' type='email' value={!inputEmailISh?email:inputEmailISh}onChange={handleInputEmailISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Fecha</div>
                        <DatePicker className='myShiftModalContainerMobile__datePikerShiftsListMobile'
                            selected={!inputDateISh?formatInputDate:inputDateISh}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Horario</div>
                        <div className='myShiftModalContainerMobile__labelInput__selectSchedule'>
                            <select className='myShiftModalContainerMobile__labelInput__selectSchedule__select' value={selectScheduleOptionISh} onChange={handleSelectScheduleOptionISh}>
                                {optionsScheduleISh.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__btns'>
                        <button className='myShiftModalContainerMobile__btns__btn' onClick={handleBtnDelShift}>Borrar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__btns'>
                        <button id='btnUpdateShift' className='myShiftModalContainerMobile__btns__btn' onClick={handleBtnUpdShift}>Actualizar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__btns'>
                        {showSpinner&&<Spinner/>}
                    </div>
                </>
                :
                <>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Peluquero</div>
                        <div className='myShiftModalContainerMobile__labelInput__selectSchedule'>
                            <select disabled className='myShiftModalContainerMobile__labelInput__selectSchedule__select' value={selectHairdresserISh} onChange={handleSelectHairdresserISh}>
                                {optionsHairdresser.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Nombre</div>
                        <div className='myShiftModalContainerMobile__labelInput__input'>
                            <input disabled className='myShiftModalContainerMobile__labelInput__input__prop' value={!inputFirstNameISh?first_name:inputFirstNameISh}onChange={handleInputFirstNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Apellido</div>
                        <div className='myShiftModalContainerMobile__labelInput__input'>
                            <input disabled className='myShiftModalContainerMobile__labelInput__input__prop' value={!inputLastNameISh?last_name:inputLastNameISh}onChange={handleInputLastNameISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Servicio</div>
                        <div className='myShiftModalContainerMobile__labelInput__selectService'>
                            <select disabled className='myShiftModalContainerMobile__labelInput__selectService__select' value={inputServiceISh} onChange={(e) => {handleSelectServiceISh(e.target.value)}}>
                                {optionsService.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Email</div>
                        <div className='myShiftModalContainerMobile__labelInput__input'>
                            <input disabled className='myShiftModalContainerMobile__labelInput__input__prop' type='email' value={!inputEmailISh?email:inputEmailISh}onChange={handleInputEmailISh}/>
                        </div>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Fecha</div>
                        <DatePicker className='myShiftModalContainerMobile__datePikerShiftsListMobile'
                            selected={!inputDateISh?formatInputDate:inputDateISh}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            disabled
                        />
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__labelInput'>
                        <div className='myShiftModalContainerMobile__labelInput__label'>Horario</div>
                        <div className='myShiftModalContainerMobile__labelInput__selectSchedule'>
                            <select disabled className='myShiftModalContainerMobile__labelInput__selectSchedule__select' value={selectScheduleOptionISh} onChange={handleSelectScheduleOptionISh}>
                                {optionsScheduleISh.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div style={{paddingTop:'2vh'}} className='myShiftModalContainerMobile__btns'>
                        <button className='myShiftModalContainerMobile__btns__btn' onClick={handleBtnDelShift}>Borrar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__btns'>
                        <button disabled id='btnUpdateShift' className='myShiftModalContainerMobile__btns__btn' onClick={handleBtnUpdShift}>Actualizar</button>
                    </div>
                    <div style={{paddingTop:'1vh'}} className='myShiftModalContainerMobile__btns'>
                        {showSpinner&&<Spinner/>}
                    </div>
                </>
            }
            
            {
                confirmationDelShiftsModal&&<ConfirmationDeleteModal formatInputDate={formatInputDate} schedule={schedule}/>
            }
        </div>
    </>
    )
}

export default MyShiftListModalMobile