import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform, Share } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default ShareComponent = ({affiliateCode}) => {

  const androidUrl = 'url de play Store'
  const iosUrl = 'url de app Store'
  const message = 'Unete a EuroTaller y usa mi codigo de amigo: ' + affiliateCode + '\n';
  let fullMessage = '';

  if(Platform.OS === 'android'){
    fullMessage = message + androidUrl;
  } else if(Platform.OS === 'ios') {
    fullMessage = message + iosUrl
  }
  const onShare = async () =>{
    try {
      const result = await Share.share({
        message: fullMessage
      })

    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onShare}>
        <AntDesign name='sharealt' size={45} color='black' />
        <Text style={styles.shareText}>Compartir</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  buttonContainer:{
    alignItems:'center'
  },
  shareText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: '600'
  }
})