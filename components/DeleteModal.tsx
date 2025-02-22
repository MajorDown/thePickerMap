import dataManager from "@/data/dataManager";
import { useDataContext } from "@/contexts/DataContext";
import { router } from "expo-router";
import ActionBtn from "./ActionBtn";
import MessageModal from "./MessageModal";
import { Text, StyleSheet } from 'react-native';
import colors from '@/constants/Colors';

const styles = StyleSheet.create({
    text: {
        color: colors.white,
    },
})

type DeleteModalProps = {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

/*
* @description Modal pour effacer les cueillettes
* @params {boolean} props.isVisible
* @params {function} props.setIsVisible
* @returns {JSX.Element}
**/
const DeleteModal = (props: DeleteModalProps):JSX.Element => {
    const { updatePickedProducts } = useDataContext();

    const handleDeleteData = () => {
        dataManager.removePickedProducts();
        updatePickedProducts([]);
        props.setIsVisible(false);
        router.push("/(tabs)");
    }
    return (
        <MessageModal 
            visible={props.isVisible}
            onClose={() => props.setIsVisible(false)}
        >
            <Text style={styles.text}>Souhaitez-vous vraiment effacer toute vos cueillettes enregistrée?</Text>
            <ActionBtn label="Effacer" onPress={() => handleDeleteData()} />
            <ActionBtn label="Annuler" onPress={() => props.setIsVisible(false)} />
        </MessageModal>
    )
}

export default DeleteModal;