import { Text, StyleSheet, View } from 'react-native';

export default MessageTextView = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${message}`}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 8,
  },
  text:{
    fontSize: 18,
  },
});

