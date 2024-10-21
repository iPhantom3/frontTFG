import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default SearchInput = ({searchQuery, handleSearch}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AntDesign 
          name='search1' 
          size={27} 
          color='#787878'
        />
      </View>
      <TextInput
          placeholder='Busca tu oferta'
          clearButtonMode='always'
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 50,
    borderColor: '#ADADAD',
    borderWidth: 2,
    borderRadius: 8,
  },
  iconContainer:{
    height:'100%',
    width: 40,
    justifyContent:'center',
    alignItems: 'center'
  },
  input:{
    flex: 1,
    marginLeft: 5,
    fontSize: 18
  }
})