import { StyleSheet, View, Text } from "react-native";
import SelectInput, {SelectOption} from "./SelectInput";
import { ProductTypes, ProductType } from "@/constants/Types";
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

type ProductTypesInputProps = {
    value: ProductType | "";
    onChange: (value: ProductType) => void;
    canBeNull?: boolean;
    mode: "create" | "search";
};

/**
 * @description - Champ pour choisir un type de produit
 * @param {ProductType} props.value - La valeur actuelle
 * @param {(value: ProductType) => void} props.onChange - Fonction de rappel pour gérer le changement de valeur
 * @returns {JSX.Element}
 */
const ProductTypesInput = (props: ProductTypesInputProps): JSX.Element => {
    const possiblesValues = (): SelectOption[] => {
        let values = [];
        //pour chaque type de produit, on ajoute une option
        for (let type of ProductTypes) values.push({ label: type, value: type });
        if (props.mode === "search") values.push({ label: "pas de filtrage", value: "" });
        return values;
    }

    return (<View style={styles.container}>
        <Text style={GlobalsStyles.text}>
            {props.mode === "create" ? 
                "A quel Type de produit appartiens ce trésors ?" : 
                "Filtrer par type de produit"
            }            
        </Text>
        <SelectInput
            options={possiblesValues()}
            onSelect={(newValue) => props.onChange(newValue as ProductType)}
            selectBtnStyles={styles.input}
            optionsListStyles={styles.input}          
        />
    </View>);
}

export default ProductTypesInput;