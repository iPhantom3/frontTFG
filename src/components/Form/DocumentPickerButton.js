import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'

import * as DocumentPicker from 'expo-document-picker';

import { AntDesign } from '@expo/vector-icons';

export default DocumentPickerButton = ({
  files,
  setValuesFiles,
  setFiles
}) => {

  const pickFiles = async () => {

    const selectionLimit = 2 - files.length

    if(selectionLimit === 0) {
      Alert.alert('Límite de archivos alcanzado', 'Ya ha elegido 2 archivos, elimine alguno antes de volver a seleccionar.');
    } else {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if(!result.canceled){
        if(files.some(file => file.name === result.assets[0].name)){
          Alert.alert('Error al seleccionar archivo', 'Ha seleccionado un archivo ya seleccionado');
        } else if(result.assets[0].size >= 50000000){
          Alert.alert('Error al seleccionar archivo', 'Ha seleccionado un archivo con un tamaño superior al permitido');
        } else {
          files.push(result.assets[0]);
          setValuesFiles(files);
          setFiles(files);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {
        borderColor: '#ADADAD', borderWidth: 2
      }]} onPress={pickFiles}>
        <AntDesign name='upload' size={24} color='#616161' />
        <Text style={styles.label}>Seleccionar archivo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
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
    color: '#616161',
    fontWeight: '500',
    fontSize: 18
  },
})