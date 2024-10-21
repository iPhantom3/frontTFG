import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


const InvoiceItemComponent = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.imagecontainer}>
          <AntDesign name='filetext1' size={50} color='#1A1A1A' />
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
  imagecontainer:{
    marginLeft:15, 
    justifyContent:'center', 
    alignItems:'center'
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
    fontSize: 23,
    color: '#1a1a1a'
  },
  buttonContainer:{
    width:70, 
    justifyContent:'center', 
    alignItems:'center'
  }
});

export default InvoiceItemComponent;
