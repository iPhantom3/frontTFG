import React, { useRef, useState } from 'react'
import { StyleSheet, Modal, TouchableOpacity, View } from 'react-native'

import { Video, ResizeMode } from 'expo-av';

import CloseModalButton from './CloseModalButton';

export default VideoModal = ({file}) => {

  const video = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.videoContainer} onPress={() => setModalVisible(!modalVisible)}>
        <Video style={{flex:1}} source={{uri: file.fileUrl}} resizeMode={ResizeMode.COVER}/>
      </TouchableOpacity>
      <Modal
        animationType= 'slide'
        transparent= {true}
        visible= {modalVisible}
      >
        <View style={styles.modalContainer}>
          <CloseModalButton setModalVisible={setModalVisible} />
          <Video
            ref={video}
            style={{flex: 1}}
            source={{uri: file.fileUrl}}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    height: 115,
    width: 115,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.62)'
  },
})