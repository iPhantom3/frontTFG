import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default DocumentFileCard = ({fileName, index, files, setFiles, setValuesFiles}) => {
  const onPress = () => {
    const item = files.splice(index, 1);
    setFiles(files);
    setValuesFiles(files)
  };

  return (
    <View>
      <View style={[styles.cardContainer]}>
        <FontAwesome name='paperclip' size={16} color='black' />
        <Text style={styles.text}>{fileName}</Text>
        <TouchableOpacity onPress={onPress}>
         <Entypo name='cross' size={20} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal: 10,
  },
  text:{
    marginLeft: 10,
    flex: 1
  }
})