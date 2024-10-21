import { Text, StyleSheet, View } from 'react-native';

const CategoriesView = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        {
          value.map((category) => {
            return (
              <View key={category} style={styles.categoryContainer}>
                <Text style={styles.text}>{category}</Text>
              </View>
            );
          })
        }
      </View>
    </View>
  );
};
export default CategoriesView;

const styles = StyleSheet.create({
  
  container:{
    marginTop:10,
    marginHorizontal:15,
  },
  input: {
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
  },
  categoryContainer: {
    backgroundColor: '#F2F2F2',
    width: 90,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text:{
    fontSize: 18,
    paddingHorizontal: 10
  },
  label: {
    marginBottom: 10,
    fontSize:20,
    color: '#616161'
  },
});

