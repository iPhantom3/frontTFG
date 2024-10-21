import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

import { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';

import { appApi } from '../../config/api/appAPI';
import DeleteNotificationButton from './DeleteNotificationButton';

const NotificationItemComponent = ({
  notificationId,
  title, 
  context, 
  type,
  contentId, 
  isRead, 
}) => {

  const [colorBackground, setColorBackground] = useState('')

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    setColorBackground(isRead ? 'white': '#CFD9E7')
    
  }, [isRead])

  const pathname = (type === 'Budget') ? `/(tabs)/(budget)/budgets/${contentId}` 
    : (type === 'Offer') ? `/(tabs)/(home)/offers/${contentId}` 
    : `/(tabs)/(preference)/invoices/${contentId}`;

  const onPress = async () => {
    if(!isRead){
      await appApi.put(`/notifications/${notificationId}`);
    }

    if(type === 'Offer') {
      router.replace({
        pathname: pathname
      });

    } else {
      navigation.popToTop();
      router.push({
        pathname: pathname,  
      });
    }
  }
  
  return (
    <View style={{...styles.container, backgroundColor: `${colorBackground}`}}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.imagecontainer}>
          {
            (type === 'Offer') ?
              <Image style={styles.imageSize} source={require('../../../assets/discount-notification.png')} />
            : (type === 'Budget') ?
            <Image style={styles.imageSize} source={require('../../../assets/message-notification.png')} />
            :
            <Image style={styles.imageSize} source={require('../../../assets/invoice-notification.png')} />
          }
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.context} numberOfLines={2}>{context}</Text>
        </View>
      </TouchableOpacity>
      <DeleteNotificationButton notificationId={notificationId}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    borderBottomColor: '#b6b4b4',
    borderBottomWidth: 1,
  },
  imagecontainer:{
    marginLeft:15, 
    justifyContent:'center', 
    alignItems:'center'
  },
  imageSize:{
    height:70,
    width: 70
  },
  cardContainer:{
    flex: 8,
    flexDirection: 'row',
  },
  textContainer:{
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#1a1a1a'
  },
  context:{
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
    color: '#1a1a1a'
  },
});

export default NotificationItemComponent;
