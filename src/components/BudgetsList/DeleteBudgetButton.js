import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { appApi } from '../../config/api/appAPI'

export default DeleteBudgetButton = ({budgetId, isProfessional}) => {

  const router = useRouter();

  const onPress = () => {
    Alert.alert('Eliminar presupuesto', '¿Desea eliminar este presupuesto?', [
      {
        text: 'Cancelar',
        onPress: async () => {
        }
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const response = await appApi.post(`/budgets/${budgetId}/deletebudget`,{isProfessional: isProfessional});

          if(response) {
            router.back()
          }       
        }
      }
    ])
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Eliminar presupuesto</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonText: {
    color: 'red',
    fontWeight: '500',
    fontSize: 18
  }
})