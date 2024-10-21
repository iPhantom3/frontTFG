import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default Button = ({ label, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={(onPress)}>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3979FF',
    paddingVertical: 18,
    borderRadius: 10,
  },
  label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  },
});
