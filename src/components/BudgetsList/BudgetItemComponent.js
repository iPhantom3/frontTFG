import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

export default BudgetItemComponent = ({ title, clientMessage, id }) => {

  const router = useRouter()

  const onPress = () => {
    router.push({
      pathname: `/budgets/${id}`,
    })
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.clientMessage} numberOfLines={2}>{clientMessage}</Text>
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
    height: 100,
    borderBottomColor: '#b6b4b4',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: '#1a1a1a',
  },
  clientMessage:{
    fontSize: 15,
    color: '#1a1a1a',
  },
  buttonContainer: {
    width:70, 
    justifyContent:'center', 
    alignItems:'center'
  }
});
