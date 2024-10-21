import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

export default ImagePickerButton = ({
  setImage,
  onChange,
  isAspect
}) => {

  const pickImage = async () => {

    const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(mediaLibraryPermission.granted){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: isAspect,
        quality: 1,
      });
  
      if(!result.canceled){
        onChange(result.assets);
        setImage(result.assets[0].uri);
      }
    } else {
      Alert.alert('Error al abrir la galeria', 'Debe proporcionarn permiso para acceder a la galeria')
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <AntDesign name='upload' size={24} color='rgba(0, 0, 0, 0.63)' />
        <Text style={styles.label}>Seleccionar imagen</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    height: 53,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ADADAD',
    borderWidth: 2,
  },
  label: {
    marginLeft: 10,
    color: 'rgba(0, 0, 0, 0.63)',
    fontWeight: '500',
    fontSize: 18
  },
})