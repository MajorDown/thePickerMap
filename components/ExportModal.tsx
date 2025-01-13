import { Text } from 'react-native';
import ActionBtn from "./ActionBtn"
import MessageModal from "./MessageModal"

type ExportModalProps = {
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
}

const ExportModal = (props: ExportModalProps):JSX.Element => {

    const handleExportData = () => {
        console.log("Export data");
    }

    return (
        <MessageModal 
        visible={props.isVisible}
        onClose={() => props.setIsVisible(false)}
    >
        <Text>Souhaitez-vous vraiment Exporter des Cueillettes à partir d'un fichier ?</Text>
        <ActionBtn label="Choisir un fichier" onPress={() => handleExportData()} />
        <ActionBtn label="Annuler" onPress={() => props.setIsVisible(false)} />
    </MessageModal>
    )
}

export default ExportModal;