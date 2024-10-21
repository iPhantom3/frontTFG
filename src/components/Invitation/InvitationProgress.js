import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const InvitationProgress = ({fill, limit, affiliates}) => {
  return (
    <View style={styles.progressContainer}>
      <AnimatedCircularProgress
        size= {220}
        width= {23}
        rotation= {180}
        fill= {fill}
        style= {{borderRadius: 20}}
        tintColor= '#3979FF'
        backgroundColor= '#D9D9D9'>
          {
            () => (
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressAffiliateText}>{affiliates}</Text>
                <Text style={styles.progressFriendsText}> amigos</Text>
              </View>
            )
          }
        </AnimatedCircularProgress>
        <Text style={styles.affiliatesInfo}>
          {
            ((limit - affiliates) < 0) ?
              'Ha alcanzado el descuento más alto' 
              : 
              `${limit - affiliates} amigos restantes para el siguiente descuento`
          }
        </Text>
    </View>
  )
}

export default InvitationProgress

const styles = StyleSheet.create({
  progressContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  progressTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressAffiliateText: {
    fontSize: 23,
    color: '#3979FF',
    fontWeight: 'bold'
  },
  progressFriendsText: {
    fontSize: 15,
    color: '#3979FF',
    fontWeight: 'bold'
  },
  affiliatesInfo:{
    paddingTop: 18,
    fontSize: 17,
    color: 'black',
    fontWeight: '500'
  },
})