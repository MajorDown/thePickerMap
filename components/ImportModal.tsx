import { Text } from 'react-native';
import ActionBtn from "./ActionBtn"
import MessageModal from "./MessageModal"

type ImportModalProps = {
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
}

/*
* @description Modal pour importer des cueillettes
* @params {boolean} props.isVisible
* @params {function} props.setIsVisible
* @returns {JSX.Element}
* **/
const ImportModal = (props: ImportModalProps):JSX.Element => {

    const handleImportData = () => {
        console.log("import data");
    }

    return (
        <MessageModal 
        visible={props.isVisible}
        onClose={() => props.setIsVisible(false)}
    >
        <Text>Souhaitez-vous vraiment importer des Cueillettes à partir d'un fichier ?</Text>
        <ActionBtn label="Choisir un fichier" onPress={() => handleImportData()} />
        <ActionBtn label="Annuler" onPress={() => props.setIsVisible(false)} />
    </MessageModal>
    )
}

export default ImportModal;