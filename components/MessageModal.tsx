// MessageModal.tsx
import { PropsWithChildren } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '@/constants/Colors';

type MessageModalProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
}>

const MessageModal = (props: MessageModalProps) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose} // Utile surtout sous Android
    >
      {/* Un TouchableOpacity sur tout l'écran pour fermer au clic "à côté" de la modale */}
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={props.onClose}
      >
        <View style={styles.modalContainer}>
          {/* On arrête la propagation du clic pour ne pas fermer la modale quand on clique dedans */}
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(event) => event.stopPropagation()}
          >
            {props.children}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default MessageModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.67)', // fond semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: colors.background, // fond blanc opaque
    borderRadius: 10,
    padding: 20,
  },
});
