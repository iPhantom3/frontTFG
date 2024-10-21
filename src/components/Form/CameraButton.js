import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera';
import { usePermissions } from 'expo-media-library';

import CameraTools from '../Camera/CameraTools';
import MainRowActions from '../Camera/MainRowActions';
import BottomRowTools from '../Camera/BottomRowTools';
import CloseCameraButton from '../Camera/CloseCameraButton';

import { saveToLibraryAsync } from 'expo-media-library';

export default CameraButton = ({
  files,
  onMediaPickerChange,
  setFiles,
  setModalVisible,
}) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    usePermissions();

  const [cameraModalVisible, setCameraModalVisible] = useState(false);

  const cameraRef = useRef(null);

  const [cameraMode, setCameraMode] = useState('picture');
  const [cameraTorch, setCameraTorch] = useState(false);
  const [cameraFlash, setCameraFlash] = useState('off');
  const [cameraFacing, setCameraFacing] = useState('back');
  const [cameraZoom, setCameraZoom] = useState(0);

  const [picture, setPicture] = useState('');
  const [video, setVideo] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  const checkSelectionLimit = async () => {
    const selectionLimit = 6 - files.length;
    if (selectionLimit === 0) {
      Alert.alert(
        'Límite de archivos alcanzado',
        'Ya ha elegido 6 archivos, elimine alguno antes de volver a seleccionar.'
      );
    } else {
      const allPermissionsGranted = await requestAllPermissions();
      if (allPermissionsGranted) {
        setCameraModalVisible(true);
      } else {
        Alert.alert(
          'Error al abrir al abrir la camara',
          'Para continuar, por favor, conceda los permisos necesarios.'
        );
      }
    }
  };
  const requestAllPermissions = async () => {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert('Error', 'El acceso a la camara es necesario.');
      return false;
    }

    const microphoneStatus = await requestMicrophonePermission();
    if (!microphoneStatus.granted) {
      Alert.alert('Error', 'El acceso al micrófono es necesario');
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if (!mediaLibraryStatus.granted) {
      Alert.alert('Error', 'El acceso a los archivos es necesario.');
      return false;
    }

    return true;
  };

  const handleTakePicture = async () => {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response.uri);
  };

  const toggleRecord = async () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync({
        maxFileSize: 150000000,
      });
      setVideo(response.uri);
    }
  };

  const getFileInfo = (file, type) => {
    const uriSplit = file.split('/');

    return {
      uri: file,
      fileName: uriSplit[uriSplit.length - 1],
      type: type
    };
  };

  if (picture) {
    const fileInfo = getFileInfo(picture, type='image');

    files.push(fileInfo);

    onMediaPickerChange(files);
    setFiles(files);

    saveToLibraryAsync(picture);
    setModalVisible(false);
  }

  if (video) {
    const fileInfo = getFileInfo(video, type='video');

    files.push(fileInfo);

    onMediaPickerChange(files);
    setFiles(files);

    saveToLibraryAsync(video);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={checkSelectionLimit}>
        <Text style={styles.label}>Hacer foto o video</Text>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={cameraModalVisible}
      >
        <View style={styles.modalContainer}>
          <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing={cameraFacing}
                mode={cameraMode}
                zoom={cameraZoom}
                enableTorch={cameraTorch}
                flash={cameraFlash}
              >
                <SafeAreaView style={{ flex: 1 }}>
                  <View style={{ flex: 1, padding: 6 }}>
                    <CloseCameraButton setCameraVisible={setCameraModalVisible} />
                    <CameraTools
                      cameraZoom={cameraZoom}
                      cameraFlash={cameraFlash}
                      cameraTorch={cameraTorch}
                      setCameraZoom={setCameraZoom}
                      setCameraFacing={setCameraFacing}
                      setCameraTorch={setCameraTorch}
                      setCameraFlash={setCameraFlash}
                      cameraMode={cameraMode}
                    />
                    <MainRowActions
                      isRecording={isRecording}
                      handleTakePicture={
                        cameraMode === 'picture'
                          ? handleTakePicture
                          : toggleRecord
                      }
                      cameraMode={cameraMode}
                    />
                    <BottomRowTools
                      cameraMode={cameraMode}
                      setCameraMode={setCameraMode}
                    />
                  </View>
                </SafeAreaView>
              </CameraView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
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
  label: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
});
