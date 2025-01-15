import { Text, StyleSheet } from 'react-native';
import ActionBtn from "./ActionBtn"
import MessageModal from "./MessageModal"
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useDataContext } from '@/contexts/DataContext';
import color from '@/constants/Colors';

const styles = StyleSheet.create({
    text: {
        color: color.white,
    }
})


type ExportModalProps = {
    isVisible: boolean
    setIsVisible: (visible: boolean) => void
}

/*
* @description Modal pour importer des cueillettes
* @params {boolean} props.isVisible
* @params {function} props.setIsVisible
* @returns {JSX.Element}
* **/
const ExportModal = (props: ExportModalProps):JSX.Element => {
    const {pickedProducts} = useDataContext();

    const handleExportData = async () => {
        try {
            // 1. Convertir les données en JSON
            const jsonData = JSON.stringify(pickedProducts);
            const date = new Date();
            const dateStr = date.toISOString().split('T')[0];
      
            // 2. Définir un chemin de fichier dans documentDirectory
            const fileUri = FileSystem.documentDirectory + `thepickermap-${dateStr}.json`;
      
            // 3. Écrire la chaîne JSON dans ce fichier
            await FileSystem.writeAsStringAsync(fileUri, jsonData);
      
            // 4. Ouvrir la feuille de partage (si disponible)
            const isSharingAvailable = await Sharing.isAvailableAsync();
            if (isSharingAvailable) {
              await Sharing.shareAsync(fileUri, {
                mimeType: 'application/json',
                dialogTitle: 'Enregistrer ou partager votre fichier JSON',
              });
            } else {
              console.log("Le partage n'est pas disponible sur cet appareil.");
            }
          } catch (error) {
            console.error('Erreur lors de la création/partage du fichier : ', error);
          }
    }

    return (
        <MessageModal 
        visible={props.isVisible}
        onClose={() => props.setIsVisible(false)}
    >
        <Text style={styles.text}>Souhaitez-vous vraiment Exporter des Cueillettes à partir d'un fichier ?</Text>
        <ActionBtn label="exporter au format json" onPress={() => handleExportData()} />
        <ActionBtn label="Annuler" onPress={() => props.setIsVisible(false)} />
    </MessageModal>
    )
}

export default ExportModal;