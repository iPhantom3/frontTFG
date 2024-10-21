import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const TopButtonsComponent = ({
  leftButtonState,
  leftButtonSetState,
  rightButtonState,
  rightButtonSetState,
  leftButtonText,
  rightButtonText
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: `${leftButtonState.backgroundColor}`,
        }}
        onPress={() => {
          rightButtonSetState({ active: false, backgroundColor: 'white' });
          leftButtonSetState({ active: true, backgroundColor: '#E6EFFD' });
        }}
      >
        <Text style={styles.buttonText}>{leftButtonText}</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: `${rightButtonState.backgroundColor}`,
        }}
        onPress={() => {
          leftButtonSetState({ active: false, backgroundColor: 'white' });
          rightButtonSetState({ active: true, backgroundColor: '#E6EFFD' });
        }}
      >
        <Text style={styles.buttonText}>{rightButtonText}</Text>
      </Pressable>
    </View>
  )
}

export default TopButtonsComponent

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
})