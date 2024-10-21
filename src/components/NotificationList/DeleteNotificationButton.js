import React from 'react'
import { Alert, StyleSheet, TouchableOpacity} from 'react-native'
import { useRouter } from 'expo-router';

import { AntDesign } from '@expo/vector-icons';

import { appApi } from '../../config/api/appAPI';

export default DeleteNotificationButton = ({
  notificationId,
}) => {

  const router = useRouter();

  const onPress = () => {
    Alert.alert('Eliminar notificación', '¿Desea eliminar esta notificación?', [
      {
        text: 'Cancelar',
        onPress: async () => {
        }
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const response = await appApi.delete(`/notifications/${notificationId}`);
          if(response) {
            router.replace('/(tabs)/(home)/notifications/list');
          }
        }
      }
    ])
  }

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <AntDesign name='delete' size={24} color='black' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
})