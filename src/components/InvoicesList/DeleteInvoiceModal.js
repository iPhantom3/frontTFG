import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'

import { Entypo } from '@expo/vector-icons';

import DeleteInvoiceButton from './DeleteInvoiceButton';

export default DeleteInvoiceModal = ({invoiceId, isProfessional}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.openButtonContainer} onPress={() => setModalVisible(true)}>
        <Entypo name='dots-three-vertical' size={24} color='black' />
      </TouchableOpacity>
      <Modal
        animationType= 'slide'
        transparent= {true}
        visible= {modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.buttonsContainer}>
            <DeleteInvoiceButton invoiceId={invoiceId} isProfessional={isProfessional} />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.62)'
  },
  openButtonContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  button: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  cancelText: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '500',
    fontSize: 18
  }
})