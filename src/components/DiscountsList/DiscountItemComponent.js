import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

export default DiscountItemComponent = ({ title, id }) => {

  const router = useRouter()

  const onPress = () => {
    router.push({
      pathname: `/discounts/${id}`,
    })
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.imagecontainer}>
          <AntDesign name='tago' size={50} color='#1a1a1a' />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AntDesign name='rightcircleo' size={24} color='#2C2A2A' />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    borderBottomColor: '#b6b4b4',
    borderBottomWidth: 1
  },
  imagecontainer: {
    marginLeft: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 25,
  },
  title: {
    fontWeight: '500',
    fontSize: 23,
    color: '#1a1a1a'
  },
  buttonContainer: {
    width:70, 
    justifyContent:'center', 
    alignItems:'center'
  }
});
