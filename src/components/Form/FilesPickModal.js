import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';

import MediaFilesPickerButton from './MediaFilesPickerButton';
import CameraButton from './CameraButton';

export default FilesPickModal = ({files, onMediaPickerChange, setFiles}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {
        borderColor: 'black', borderWidth: 1
      }]} onPress={() => setModalVisible(true)}>
        <AntDesign name='upload' size={24} color='black' />
        <Text style={styles.label}>Seleccionar archivos</Text>
      </TouchableOpacity>
      <Modal
        animationType= 'slide'
        transparent= {true}
        visible= {modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.buttonsContainer}>
            <CameraButton 
              files= {files}
              setFiles= {setFiles}
              onMediaPickerChange= {onMediaPickerChange}
              setModalVisible= {() => setModalVisible(!modalVisible)}
            />
            <MediaFilesPickerButton 
              files= {files}
              onMediaPickerChange= {onMediaPickerChange}
              setFiles= {setFiles}
              setModalVisible={() => setModalVisible(!modalVisible)}
            />
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
  container:{
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.62)'
  },
  buttonsContainer: {
    justifyContent: 'space-between',
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