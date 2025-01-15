import ActionBtn from '@/components/ActionBtn';
import PageContainer from '@/components/PageContainer';
import { useState } from 'react';
import DeleteModal from '@/components/DeleteModal';
import ImportModal from '@/components/ImportModal';
import ExportModal from '@/components/ExportModal';

const Settings = ():JSX.Element => {
  const [isDeleteModaleVisible, setIsDeleteModaleVisible] = useState(false);
  const [isImportModaleVisible, setIsImportModaleVisible] = useState(false);
  const [isExportModaleVisible, setIsExportModaleVisible] = useState(false);

  return (<PageContainer title="Options">
    <ActionBtn label="Effacer les données de l'application" onPress={() => setIsDeleteModaleVisible(true)} />
    <DeleteModal isVisible={isDeleteModaleVisible} setIsVisible={setIsDeleteModaleVisible} />
    <ActionBtn label="Importer des données" onPress={() => setIsImportModaleVisible(true)} />
    <ImportModal isVisible={isImportModaleVisible} setIsVisible={setIsImportModaleVisible} />
    <ActionBtn label="Exporter des données" onPress={() => setIsExportModaleVisible(true)} />
    <ExportModal isVisible={isExportModaleVisible} setIsVisible={setIsExportModaleVisible} />
  </PageContainer>);
}

export default Settings;

