import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import * as Clipboard from 'expo-clipboard';

const AffiliateCodeClipboard = ({affiliateCode}) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(affiliateCode);
    Alert.alert('¡Código amigo copiado!', '\nYa puedes compartirlo con quien quieras.')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.affiliateCodeText}>{affiliateCode}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={copyToClipboard}>
        <MaterialIcons
          name='content-copy'
          size={25}
          color='black'
        />
      </TouchableOpacity>

    </View>
  )
}

export default AffiliateCodeClipboard

const styles = StyleSheet.create({
  container:{
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10
  },
  affiliateCodeText:{
    color: 'black',
    fontSize: 20,
    paddingLeft: 10
  },
  iconContainer:{
    marginLeft: 20
  }
})