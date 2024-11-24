import {View, Text, TextInput, StyleSheet} from 'react-native';
import { useState } from 'react';
import { PickDate, days, months, years } from '@/constants/Types';
import SelectInput from './SelectInput';

type DateInputProps = {
    date: PickDate;
    onDateChange: (date: PickDate) => void;
}

/**
 * Composant DateInput
 * @param {PickDate} props.date - La date actuelle
 * @param {(date: PickDate) => void} props.onDateChange - Fonction de rappel pour gérer le changement de date
 * @returns {JSX.Element}
 */
const DateInput = (props: DateInputProps):JSX.Element => {
    const [actualDate, setActualDate] = useState<PickDate>(props.date);

    const onDayChange = (day: string) => {
        setActualDate({...actualDate, day: day as PickDate['day']});
        props.onDateChange({...actualDate, day: day as PickDate['day']});
    }

    const onMonthChange = (month: string) => {
        setActualDate({...actualDate, month: month as PickDate['month']});
        props.onDateChange({...actualDate, month: month as PickDate['month']});
    }

    const onYearChange = (year: string) => {
        setActualDate({...actualDate, year: year as PickDate['year']});
        props.onDateChange({...actualDate, year: year as PickDate['year']});
    }

    return (<View>
        <SelectInput 
            options={days.map(day => ({label: day, value: day}))} 
            onSelect={(day) => onDayChange(day.toString())} 
            defaultValue={{label: props.date.day, value: props.date.day}} 
        />
        <SelectInput 
            options={months.map(month => ({label: month, value: month}))} 
            onSelect={(month) => onMonthChange(month.toString())} 
            defaultValue={{label: props.date.month, value: props.date.month}} 
        />
        <SelectInput 
            options={years.map(year => ({label: year, value: year}))} 
            onSelect={(year) => onYearChange(year.toString())} 
            defaultValue={{label: props.date.year, value: props.date.year}} 
        />        
    </View>);
}

export default DateInput;