import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const ListItemComponent = ({ title, description, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
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
  cardContainer:{
    flex: 1,
    flexDirection: 'row',
  },
  textContainer:{
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  title: {
    fontWeight: '500',
    fontSize: 23
  },
  description:{
    fontWeight: '300',
    fontSize: 18
  },
  buttonContainer:{
    width:70, 
    justifyContent:'center', 
    alignItems:'center'
  }
});

export default ListItemComponent;
