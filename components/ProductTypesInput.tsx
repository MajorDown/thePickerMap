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
    },
    input: {
        backgroundColor: Colors.white,
    }
});

type ProductTypesInputProps = {
    value: ProductType;
    onChange: (value: ProductType) => void;
};

const ProductTypesInput = (props: ProductTypesInputProps): JSX.Element => {
    return (<View style={styles.container}>
        <Text style={GlobalsStyles.text}>Quel type de trésors avez-vous trouvé ?</Text>
        <SelectInput
            options={ProductTypes.map((type) => ({ label: type, value: type }))}
            onSelect={(newValue) => props.onChange(newValue as ProductType)}
            selectBtnStyles={styles.input}           
        />
    </View>
    );
}

export default ProductTypesInput;