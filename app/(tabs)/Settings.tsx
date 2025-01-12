import ActionBtn from '@/components/ActionBtn';
import MessageModal from '@/components/MessageModal';
import PageContainer from '@/components/PageContainer';
import dataManager from "@/data/dataManager";
import { useState } from 'react';
import { Text} from 'react-native';
import { router } from 'expo-router';

const Settings = ():JSX.Element => {
  const [isDeleteModaleVisible, setIsDeleteModaleVisible] = useState(false);

  const handleDeleteData = () => {
    dataManager.removePickedProducts();
    setIsDeleteModaleVisible(false);
    router.push("/(tabs)");
  }

  return (<PageContainer title="Options">
    <ActionBtn label="effacer les données de l'application" onPress={() => setIsDeleteModaleVisible(true)} />
    <MessageModal 
      visible={isDeleteModaleVisible}
      onClose={() => setIsDeleteModaleVisible(false)}
    >
      <Text>Souhaitez-vous vraiment effacer toute vos cueillettes enregistrée?</Text>
      <ActionBtn label="Confirmer" onPress={() => handleDeleteData()} />
      <ActionBtn label="Annuler" onPress={() => setIsDeleteModaleVisible(false)} />
    </MessageModal>
  </PageContainer>);
}

export default Settings;

