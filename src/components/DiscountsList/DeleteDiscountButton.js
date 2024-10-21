import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert } from 'react-native';

import { appApi } from '../../config/api/appAPI';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default DeleteDiscountButton = () => {

  const local = useLocalSearchParams();
  const router = useRouter()

  const deleteOnPress = () => {
    Alert.alert('Eliminar descuento', '¿Desea eliminar este descuento?', [
      {
        text: 'Cancelar',
        onPress: async () => {
        }
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const response = await appApi.delete(`/discounts/${local.id}`);
          if(response) {
            router.back()
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={deleteOnPress}>
        <Text style={styles.buttonText}>Eliminar descuento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 18,
    borderRadius: 10,
  },
  buttonText: {
    color: 'red',
    fontWeight: '600',
    fontSize: 18
  },
})