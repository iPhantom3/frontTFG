import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default MediaFilesPickerButton = ({
  files,
  onMediaPickerChange,
  setFiles,
  setModalVisible
}) => {

  const pickMediaFiles = async () => {

    const selectionLimit = 6 - files.length

    if(selectionLimit === 0) {
      Alert.alert('Límite de archivos alcanzado', 'Ya ha elegido 6 archivos, elimine alguno antes de volver a seleccionar.');
    } else {
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if(mediaLibraryPermission.granted){
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsMultipleSelection: true,
          selectionLimit: selectionLimit,
          quality: 1,
        });
      
        if(!result.canceled){
          for(let asset of result.assets){
            if(files.some(file => file.fileName === asset.fileName)){
              Alert.alert('Error al seleccionar archivo', 'Ha seleccionado un archivo ya seleccionado');
            } else {
              files.push(asset);
            }
          }
          onMediaPickerChange(files);
          setFiles(files);
          setModalVisible();
        }
      } else {
        Alert.alert('Error al abrir la galeria', 'Debe proporcionar permiso para acceder a la galeria')
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickMediaFiles}>
        <Text style={styles.label}>Seleccionar de la galeria</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
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
    fontSize: 18
  },
})