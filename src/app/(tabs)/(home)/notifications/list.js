import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View,Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../../config/api/appAPI';

import NotificationItemComponent from '../../../../components/NotificationList/NotificationItemComponent'
import { useIsFocused } from '@react-navigation/native';

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchNotifications = async () => {
      await appApi.get('/notifications').then((data) => {
        setNotifications(data.data);
        setLoading(false);
      });
    };

    fetchNotifications();
  }, [isFocused]);
  
  const renderItem = ({ item: notification }) => {

    const {
      _id: notificationId,
      title, 
      context, 
      type, 
      category, 
      contentId, 
      isRead } = notification

    return (
      <View>
        <NotificationItemComponent 
          notificationId={notificationId}
          title={title}
          context={context}
          type={type}
          category={category}
          contentId={contentId}
          isRead={isRead}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size='large'
              color={'#3979FF'}
            />
          </View>
        ) : (
          <>
            {
              (notifications.length !== 0) ? (
                <View style={styles.notificationsContainer}>
                  <FlatList
                    style={styles.flatlistContainer}
                    data={notifications}
                    renderItem={renderItem}
                  ></FlatList>
                </View> 
              ) : (
                <View style={styles.noNotificationsContainer}>
                  <View style={styles.imageContainer}>
                    <Image 
                      style={styles.image}
                      source={require('../../../../../assets/no-budgets.png')}
                      contentFit='contain'
                    />
                    <Text style={styles.textInfo}>No tiene ninguna notificación</Text>
                  </View>
                </View>
              )
            }
          </>
        )
      } 
    </SafeAreaView>
  )
}

export default NotificationsPage

const styles = StyleSheet.create({
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationsContainer: {
    flex: 1,
  },
  noNotificationsContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  imageContainer:{
    alignItems: 'center',
    height: 310,
    width: 290
  },
  image:{
    flex: 1,
    width: '100%',
    marginBottom: 5
  },
  textInfo:{
    fontSize: 18,
    color: '#787878'
  },
  flatlistContainer: {
    flex: 1,
  },
})