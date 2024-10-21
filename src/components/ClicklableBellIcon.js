import React from 'react'
import { Pressable, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default ClicklableBellIcon = ({areNotifications}) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/(tabs)/(home)/notifications/list')}>
      {
        (areNotifications) ? (
          <MaterialCommunityIcons name='bell-badge-outline' size={30} color='black' />
        ) : (
          <MaterialCommunityIcons name='bell-outline' size={30} color='black' />
        )
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
})