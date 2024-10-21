import { Text, TextInput, StyleSheet, View } from 'react-native';

export default CustomLargeTextInput = ({ value, placeholder, onChangeText, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style= {styles.input}
        value= {value}
        placeholder= {placeholder}
        onChangeText= {onChangeText}
        multiline
        textAlignVertical= 'top'
        numberOfLines= {4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    marginHorizontal:15
  },
  input: {
    backgroundColor: '#fff',
    height: 90,
    borderColor: '#ADADAD',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 7,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: '#616161'
  },
});
