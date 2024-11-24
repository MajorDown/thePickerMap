export const ProductTypes = ["fruit", "feuille", "racine", "graine", "fleur", "champignon", "autre"] as const; 

export type ProductType = (typeof ProductTypes)[number];

export type Position = {
    lat: number;
    lon: number;
}

export const days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"] as const;
export const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const;
export const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040"] as const;

export type PickDate = {
    day: (typeof days)[number];
    month: (typeof months)[number];
    year: (typeof years)[number];
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
    position: Position;
    informations: string;
    date: PickDate;
}

