import { PropsWithChildren } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 5,
        margin: 5,
        minWidth: 200
    },
    pressed: {
        backgroundColor: Colors.green,
    },
    label: {
        color: Colors.background,
        textAlign: 'center',
    }
})

type ActionBtnProps = PropsWithChildren<{
    onPress: () => void;
    label?: string;
}>

/**
 * Composant ActionBtn
 * @param {() => void} props.onPress - Fonction appelée lorsque le bouton est cliqué
 * @param {string} [props.label] - Le texte du bouton
 * @param {React.ReactNode} [props.children]
 * @returns {JSX.Element}
 */
const ActionBtn = (props: ActionBtnProps):JSX.Element => {
    return (<Pressable 
        style={({pressed}) => [styles.container, pressed && styles.pressed]}
        onPress={() => props.onPress()}
    >
        {props.label && (<Text style={styles.label} >{props.label}</Text>)}
        {!props.label && props.children && (props.children) }
        {!props.label && !props.children && (<Text>Click me</Text>)}
    </Pressable>)
}

export default ActionBtn;