import { PickDate } from "@/constants/Types";

/*
* @name pickDateToDate
* @description Convertit un PickDate en Date
* @param {PickDate} pickDate - La date à convertir
* @returns {Date} La date convertie
**/
const pickDateToDate = (pickDate: PickDate): Date => {
  return new Date(
    Number(pickDate.year),
    Number(pickDate.month) - 1, // Les mois commencent à 0 en JavaScript
    Number(pickDate.day)
  );
};

export default pickDateToDate;