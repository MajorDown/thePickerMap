import { SearchedProduct, PickedProduct } from '@/constants/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKeys = {
    SEARCHED: "SEARCHED_PRODUCTS",
    PICKED: "PICKED_PRODUCTS"
}

/**
 * @class DataManager
 * @classdesc Classe pour la gestion des données dans le AsyncStorage
 */
export default class DataManager {
    
    /**
     * Récupère les produits recherchés
     * @returns {Promise<SearchedProduct[]>}
     */
    static getSearchedProducts = async (): Promise<SearchedProduct[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageKeys.SEARCHED);
            return jsonValue != null ? JSON.parse(jsonValue) as SearchedProduct[] : [];
        } catch (e) {
            console.error('getSearchedProducts ~> error:', e);
            return [];
        }
    }
    
    /**
     * update les produits recherchés
     * @param {SearchedProduct[]} products
     * @returns {Promise<boolean>}
     */
    static setSearchedProducts = async (products: SearchedProduct[]): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(storageKeys.SEARCHED, JSON.stringify(products));
            return true;
        } catch (e) {
            console.error('setSearchedProducts ~> error:', e);
            return false;
        }
    }
    
    /**
     * Supprime les produits recherchés
     * @returns {Promise<boolean>}
     */
    static removeSearchedProducts = async (): Promise<boolean> => {
        try {
            await AsyncStorage.removeItem(storageKeys.SEARCHED);
            return true;
        } catch (e) {
            console.error('removeSearchedProducts ~> error:', e);
            return false;
        }
    }
    
    /**
     * Récupère les produits ramassés
     * @returns {Promise<PickedProduct[]>}
     */
    static getPickedProducts = async (): Promise<PickedProduct[]> => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageKeys.PICKED);
            return jsonValue != null ? JSON.parse(jsonValue) as PickedProduct[] : [];
        } catch (e) {
            console.error('getPickedProducts ~> error:', e);
            return [];
        }
    }
    
    /**
     * update les produits ramassés
     * @param {PickedProduct[]} products
     * @returns {Promise<boolean>}
     */
    static setPickedProducts = async (products: PickedProduct[]): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(storageKeys.PICKED, JSON.stringify(products));
            return true;
        } catch (e) {
            console.error('setPickedProducts ~> error:', e);
            return false;
        }
    }
    
    /**
     * Supprime les produits ramassés
     * @returns {Promise<boolean>}
     */
    static removePickedProducts = async (): Promise<boolean> => {
        try {
            await AsyncStorage.removeItem(storageKeys.PICKED);
            return true;
        } catch (e) {
            console.error('removePickedProducts ~> error:', e);
            return false;
        }
    }
}
