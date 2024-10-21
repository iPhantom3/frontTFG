import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default DropdownComponent = ({
  label,
  users,
  setFieldValue,
}) => {
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={users}
        search
        placeholder= ' '
        maxHeight={300}
        labelField='user'
        valueField='userId'
        searchPlaceholder='Buscar cliente'
        value={value}
        onChange={item => {
          setFieldValue('userId', item.userId)
          setValue(item.userId);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 15
  },
  dropdown: {
    height: 53,
    borderColor: '#ADADAD',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label:{
    marginBottom: 5,
    fontSize:18,
    color: '#616161'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});