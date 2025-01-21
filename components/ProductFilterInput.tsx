import { StyleSheet, View, Text } from "react-native";
import SelectInput, {SelectOption} from "./SelectInput";
import { ProductType } from "@/constants/Types";
import GlobalsStyles from "@/constants/Styles";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        margin: 5
    },
    input: {
        backgroundColor: Colors.white,
    }
});

export const possibleFilters: SelectOption[] = [
    { label: "Pas de filtrage", value: "" },
    { label: "Produits du moment", value: "byPeriod" },
    { label: "Produits de la saison", value: "bySeason" }
];

export type PossibleFilter = (typeof possibleFilters[number]);

type ProductFilterInputProps = {
    value: ProductType | "";
    onChange: (value: ProductType) => void;
    canBeNull?: boolean;
};

/**
 * @description - Champ pour choisir un filtre de produit
 * @param {ProductType} props.value - La valeur actuelle
 * @param {(value: ProductType) => void} props.onChange - Fonction de rappel pour gérer le changement de valeur
 * @returns {JSX.Element}
 */
const ProductFilterInput = (props: ProductFilterInputProps): JSX.Element => {

    return (<View style={styles.container}>
        <Text style={GlobalsStyles.text}>Choisissez le filtre :</Text>
        <SelectInput
            options={possibleFilters}
            onSelect={(newValue) => props.onChange(newValue as ProductType)}
            selectBtnStyles={styles.input}
            optionsListStyles={styles.input}          
        />
    </View>);
}

export default ProductFilterInput;