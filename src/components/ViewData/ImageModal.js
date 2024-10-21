import React, { useState } from 'react'
import { StyleSheet, Modal, TouchableOpacity, View } from 'react-native'

import { Image } from 'expo-image';

import CloseModalButton from './CloseModalButton';

export default ImageModal = ({file}) => {

  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(!modalVisible)}>
        <Image style={{flex:1}}source={file.fileUrl} contentFit='cover'/>
      </TouchableOpacity>
      <Modal
        animationType= 'slide'
        transparent= {true}
        visible= {modalVisible}
      >
        <View style={styles.modalContainer}>
          <CloseModalButton setModalVisible={setModalVisible} />
          <Image style={{flex:1}}source={file.fileUrl} contentFit='contain'/>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 117,
    width: 117,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.62)'
  },
})