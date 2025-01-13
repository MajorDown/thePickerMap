import dataManager from "@/data/dataManager";
import { router } from "expo-router";
import ActionBtn from "./ActionBtn";
import MessageModal from "./MessageModal";
import { Text } from 'react-native';

type DeleteModalProps = {
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

const DeleteModal = (props: DeleteModalProps):JSX.Element => {
    const handleDeleteData = () => {
        dataManager.removePickedProducts();
        props.setIsVisible(false);
        router.push("/(tabs)");
    }
    return (
        <MessageModal 
            visible={props.isVisible}
            onClose={() => props.setIsVisible(false)}
        >
            <Text>Souhaitez-vous vraiment effacer toute vos cueillettes enregistrée?</Text>
            <ActionBtn label="Confirmer" onPress={() => handleDeleteData()} />
            <ActionBtn label="Annuler" onPress={() => props.setIsVisible(false)} />
        </MessageModal>
    )
}

export default DeleteModal;