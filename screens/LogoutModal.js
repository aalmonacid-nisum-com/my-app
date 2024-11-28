// LogoutModal.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const LogoutModal = ({ isVisible, onCancel, onAccept }) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={onCancel}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>¿Estás seguro que deseas cerrar sesión?</Text>
        <View style={styles.modalButtons}>
          <Button title="Cancelar" onPress={onCancel} />
          <Button title="Aceptar" onPress={onAccept} />
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default LogoutModal;
