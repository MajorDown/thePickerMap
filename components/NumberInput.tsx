import {View, Text, StyleSheet, Pressable} from 'react-native';
import globalsStyles from '@/constants/Styles';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: globalsStyles.input.backgroundColor,
        borderRadius: globalsStyles.input.borderRadius,
    },
    valueBlock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
    },
    value: {
        color: globalsStyles.InputText.color    
    },
    btnContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        padding: 2,
        borderWidth: 1
    },
})

type NumberInputProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
}

/**
 * @description - Champ pour entrer un nombre
 * @param {number} props.value - La valeur du nombre
 * @param {(value: number) => void} props.onChange - Fonction appelée lorsque la valeur change
 * @param {number} props.min - La valeur minimale
 * @param {number} props.max - La valeur maximale
 * @returns {JSX.Element}
 */
const NumberInput = (props: NumberInputProps): JSX.Element => {
    const [value, setValue] = useState<number>(props.value > props.max ? props.max : props.value);

    const handleAdd = () => {
        if (value < props.max) setValue(value + 1);
    }

    const handleSub = () => {
        if (value > props.min) setValue(value - 1);
    }

    return (<View style={styles.container}>
        <View style={styles.valueBlock}>
            <Text style={styles.value}>{value}</Text>
        </View>
        <View style={styles.btnContainer}>
            <Pressable style={styles.btn} onPress={() => handleAdd()}><Text>+</Text></Pressable>  
            <Pressable style={styles.btn} onPress={() => handleSub()}><Text>-</Text></Pressable>          
        </View>
    </View>)
}

export default NumberInput;