import { Text, StyleSheet, View } from 'react-native';

export default CustomTextView = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Text style={styles.text}>{`${value}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginHorizontal:15,
  },
  input: {
    backgroundColor: '#F2F2F2',
    height: 55,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    paddingLeft: 10
  },
  label: {
    marginBottom: 10,
    fontSize:20,
    color: '#616161'
  },
});

