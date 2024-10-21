import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const OfferCardComponent = ({
  title,
  description,
  id,
  imageUrl
}) => {

  const router = useRouter();

  const onPress = () => {
    router.push({
      pathname: `/offers/${id}`,
    })
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <View style={styles.imageContainer}>
          <Image 
            style= {styles.image} 
            source= {imageUrl} 
            contentFit= 'cover'
          />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={2} style={styles.title}>{title}</Text>
          <Text numberOfLines={3} style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default OfferCardComponent

const styles = StyleSheet.create({
  container: {
    height: 140,
    borderRadius: 15,
    borderColor: '#cccbcb',
    borderWidth: 1,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 2
  },
  image: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius:15 
  },
  textContainer: {
    flex: 5,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5
  },
  description: {
    fontSize: 16
  }
})