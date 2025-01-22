/*
* @name getSeason
* @description Renvoie la saison en fonction de la date passée en paramètre
* @param {Date} date - La date dont on veut connaître la saison
* @returns {string} La saison correspondant à la date
**/
const getSeason = (date: Date): string => {
    const month = date.getMonth() + 1; // Janvier = 0
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
};

export default getSeason;