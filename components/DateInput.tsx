import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { PickDate, months, years } from '@/constants/Types';
import SelectInput from './SelectInput';
import Colors from '@/constants/Colors';
import globalsStyles from '@/constants/Styles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    margin: 5,
  },
  text: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.white,
    padding: 5
  },
});

/**
 * Retourne le nombre de jours dans un mois donné.
 * @param {number} year - Année (ex. : 2024)
 * @param {number} month - Mois (1 pour janvier, 2 pour février, etc.)
 * @returns {number} - Nombre de jours dans le mois
 */
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate(); // Le jour 0 du mois suivant donne le dernier jour du mois courant
};

/**
 * Retourne un tableau des jours valides pour un mois et une année donnés.
 * @param {number} year - Année (ex. : 2024)
 * @param {number} month - Mois (1 pour janvier, 2 pour février, etc.)
 * @returns {PickDate['day'][]} - Tableau des jours valides
 */
const generateDays = (year: number, month: number): PickDate['day'][] => {
  const daysInMonth = getDaysInMonth(year, month);
  return Array.from({ length: daysInMonth }, (_, i) =>
    String(i + 1).padStart(2, '0') as PickDate['day']
  );
};

/**
 * Retourne la date actuelle au format PickDate.
 * @returns {PickDate} - La date actuelle
 */
const getCurrentDate = (): PickDate => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0') as PickDate['day'];
  const month = String(now.getMonth() + 1).padStart(2, '0') as PickDate['month']; // Mois en base 0
  const year = String(now.getFullYear()) as PickDate['year'];
  return { day, month, year };
};

type DateInputProps = {
  date?: PickDate; // La date est maintenant optionnelle
  onDateChange: (date: PickDate) => void;
};

/**
 * Composant DateInput
 * @param {PickDate} [props.date] - La date actuelle (optionnelle, par défaut : aujourd'hui)
 * @param {(date: PickDate) => void} props.onDateChange - Fonction de rappel pour gérer le changement de date
 * @returns {JSX.Element}
 */
const DateInput = (props: DateInputProps): JSX.Element => {
  // Initialisation de la date par défaut avec la date d'aujourd'hui ou celle fournie en props
  const initialDate = props.date || getCurrentDate();
  const [actualDate, setActualDate] = useState<PickDate>(initialDate);
  const [validDays, setValidDays] = useState<PickDate['day'][]>(
    generateDays(Number(initialDate.year), Number(initialDate.month))
  );

  const onDayChange = (day: string) => {
    setActualDate({ ...actualDate, day: day as PickDate['day'] });
    props.onDateChange({ ...actualDate, day: day as PickDate['day'] });
  };

  const onMonthChange = (month: string) => {
    const updatedMonth = month as PickDate['month'];
    const updatedDays = generateDays(Number(actualDate.year), Number(month));
    setValidDays(updatedDays);
    setActualDate({
      ...actualDate,
      month: updatedMonth,
      day: updatedDays.includes(actualDate.day) ? actualDate.day : updatedDays[0],
    });
    props.onDateChange({
      ...actualDate,
      month: updatedMonth,
      day: updatedDays.includes(actualDate.day) ? actualDate.day : updatedDays[0],
    });
  };

  const onYearChange = (year: string) => {
    const updatedYear = year as PickDate['year'];
    const updatedDays = generateDays(Number(year), Number(actualDate.month));
    setValidDays(updatedDays);
    setActualDate({
      ...actualDate,
      year: updatedYear,
      day: updatedDays.includes(actualDate.day) ? actualDate.day : updatedDays[0],
    });
    props.onDateChange({
      ...actualDate,
      year: updatedYear,
      day: updatedDays.includes(actualDate.day) ? actualDate.day : updatedDays[0],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, globalsStyles.text]}>Date de la cueillette :</Text>
      <SelectInput
        options={validDays.map((day) => ({ label: day, value: day }))}
        onSelect={(day) => onDayChange(day.toString())}
        defaultValue={{ label: initialDate.day, value: initialDate.day }}
        selectBtnStyles={styles.input}
        optionsListStyles={styles.input}
      />
      <SelectInput
        options={months.map((month) => ({ label: month, value: month }))}
        onSelect={(month) => onMonthChange(month.toString())}
        defaultValue={{ label: initialDate.month, value: initialDate.month }}
        selectBtnStyles={styles.input}
        optionsListStyles={styles.input}
      />
      <SelectInput
        options={years.map((year) => ({ label: year, value: year }))}
        onSelect={(year) => onYearChange(year.toString())}
        defaultValue={{ label: initialDate.year, value: initialDate.year }}
        selectBtnStyles={styles.input}
        optionsListStyles={styles.input}
      />
    </View>
  );
};

export default DateInput;
