import React from 'react';
import { Text, StyleSheet } from 'react-native';
import ActionBtn from './ActionBtn';
import MessageModal from './MessageModal';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import color from '@/constants/Colors';

const styles = StyleSheet.create({
    text: {
        color: color.white,
    }
})

type ImportModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const ImportModal = (props: ImportModalProps): JSX.Element => {

  const handleImportData = async () => {
    try {
      // 1. Ouvrir le sélecteur de documents
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',    // on souhaite des .json
        multiple: false,             // un seul fichier
        copyToCacheDirectory: true,  
      });

      // 2. Vérifier si l’utilisateur a annulé
      if (result.canceled) {
        console.log('Sélection de fichier annulée');
        return;
      }

      // 3. Ici, on sait que result.canceled === false, donc on a result.assets
      const { assets } = result;
      if (!assets || assets.length === 0) {
        console.log("Aucun fichier n'a été sélectionné.");
        return;
      }

      // 4. Récupérer le premier fichier (dans la plupart des cas on ne prend qu'un fichier)
      const [file] = assets; 
      console.log('Nom du fichier :', file.name);
      console.log('Taille du fichier :', file.size);
      console.log('URI du fichier :', file.uri);

      // 5. Lire le contenu
      const fileContent = await FileSystem.readAsStringAsync(file.uri);

      // 6. Parser le JSON
      const importedData = JSON.parse(fileContent);
      console.log('Données importées :', importedData);

      // À partir d’ici, tu peux stocker `importedData` dans ton contexte / state.
      // ex: setPickedProducts(importedData);
    } catch (error) {
      console.error('Erreur lors de l’import de données :', error);
    }
  };

  return (
    <MessageModal
      visible={props.isVisible}
      onClose={() => props.setIsVisible(false)}
    >
      <Text style={styles.text}>Souhaitez-vous vraiment importer des Cueillettes à partir d'un fichier ?</Text>
      <ActionBtn 
        label="Choisir un fichier" 
        onPress={handleImportData} 
      />
      <ActionBtn 
        label="Annuler" 
        onPress={() => props.setIsVisible(false)} 
      />
    </MessageModal>
  );
};

export default ImportModal;
