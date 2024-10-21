import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform, Alert} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default DocumentIcon = ({file}) => {

  const saveFile = async (uri, fileName, mimeType, permissions) => {
    if(Platform.OS === 'android') {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  
      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, mimeType)
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
          .then(() => {
            Alert.alert(`Documento ${fileName}`,`Se ha guardado correctamente el archivo.`)
          })
          .catch(() => Alert.alert('Error al guardar', 
            `Ha habido un error al guardar el archivo ${fileName}. Intentelo de nuevo.`));
        })
        .catch(() =>  Alert.alert('Error al guardar', 
          `Ha habido un error al guardar el archivo ${fileName}. Intentelo de nuevo.`));
    } else {
      Sharing.shareAsync(uri);
    }
  }

  const downloadFile = async () =>{
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    
    if(permissions.granted){
      const result = await FileSystem.downloadAsync(
        file.fileUrl,
        FileSystem.documentDirectory + file.fileName
      );

      if(result) {
        try{
          await saveFile(result.uri, file.fileName, result.headers['content-type'], permissions);
        } catch (e){
          console.log(e)
          Alert.alert('Error al guardar', 
            `Ha habido un error al guardar el archivo ${file.fileName}. Intentelo de nuevo.`);
        }
      } else {
        Alert.alert('Error al guardar', 
          `Ha habido un error al guardar el archivo ${file.fileName}. Intentelo de nuevo.`);
      }
    } else {
      Alert.alert('Error al guardar', 
        `Ha habido un error al guardar el archivo ${file.fileName}. Intentelo de nuevo.`);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.documentContainer} onPress={downloadFile}>
        <View style={styles.iconContainer}>
          <AntDesign name='pdffile1' size={50} color='#616161' />
        </View>
        <Text style={styles.fileNameText}>{file.fileName}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  documentContainer: {
    height: 117,
    width: 117,
    justifyContent:'center',
    alignContent: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileNameText: {
    color: '#616161',
    textAlign: 'center'
  }
})