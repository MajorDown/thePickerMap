import {Context, createContext, useContext, PropsWithChildren, useState, useEffect} from 'react';
import {SearchedProduct, PickedProduct} from '@/constants/Types';
import DataManager from '@/data/dataManager';

export type DataContextType = {
    searchedProducts: SearchedProduct[];
    updateSearchedProducts: (products: SearchedProduct[]) => void;
    pickedProducts: PickedProduct[];
    updatePickedProducts: (products: PickedProduct[]) => void;
}

/**
 * @description Contexte pour les data de l'application
 * @typedef {Object} DataContextType
 * @property {SearchedProduct[]} searchedProducts
 * @property {function} updateSearchedProducts
 * @property {PickedProduct[]} pickedProducts
 * @property {function} updatePickedProducts
 */
const DataContext: Context<DataContextType> = createContext<DataContextType>({
    searchedProducts: [],
    updateSearchedProducts: () => {},
    pickedProducts: [],
    updatePickedProducts: () => {}
});

/**
 * @description Hook pour accéder aux data de l'application
 * @typedef {Object} PropsWithChildren
 * @property {ReactNode} children
 * @returns {JSX.Element}
 */
export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
}

/**
 * @description Provider pour les data de l'application
 * @typedef {Object} PropsWithChildren
 * @property {ReactNode} children
 * @returns {JSX.Element}
 */
export const DataProvider = (props: PropsWithChildren): JSX.Element => {
    const [searchedProducts, updateSearchedProducts] = useState<SearchedProduct[]>([]);
    const [pickedProducts, updatePickedProducts] = useState<PickedProduct[]>([]);

    const updateSearched = async () => await DataManager.setSearchedProducts(searchedProducts);
    const updatePicked = async () => await DataManager.setPickedProducts(pickedProducts);

    useEffect(() => {
        const initData = async () => {
            const searched = await DataManager.getSearchedProducts();
            const picked = await DataManager.getPickedProducts();
            updateSearchedProducts(searched);
            updatePickedProducts(picked);
        }
        initData();
    }, []);

    useEffect(() => {updateSearched()}, [searchedProducts]);

    useEffect(() => {updatePicked()}, [pickedProducts]);

    return (
        <DataContext.Provider value={{
            searchedProducts, 
            updateSearchedProducts, 
            pickedProducts, 
            updatePickedProducts}}
        >
            {props.children}
        </DataContext.Provider>
    );
}
