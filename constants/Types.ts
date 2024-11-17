export const ProductTypes = ["fruit", "leaf", "root", "seed", "flower", "mushroom", "other"]; 

export type ProductType = keyof typeof ProductTypes;

export type ProductPosition = {
    lat: number;
    lon: number;
}

export const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
export const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
export const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"];

export type PickDate = {
    day: keyof typeof days;
    month: keyof typeof months;
    year: keyof typeof years;
}

export type SearchedProduct = {
    id: string;
    name: string;
    type: ProductType;
    informations: string;
}

export type PickedProduct = {
    id: string;
    name: string;
    type: ProductType;
    position: ProductPosition;
    informations: string;
    date: PickDate;
}

