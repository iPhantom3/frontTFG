import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const CustomCheckbox = ({ label, options, checkedValues, onChange }) => {
  let updatedCheckedValues = [...checkedValues];

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      {options.map((option) => {
        let active = updatedCheckedValues.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            style={
              active
                ? [styles.checkBox, styles.activeCheckBox]
                : styles.checkBox
            }
            onPress={() => {

              if (active) {
                updatedCheckedValues = updatedCheckedValues.filter(
                  (checkedValue) => checkedValue !== option.value
                );

                return onChange(updatedCheckedValues);
              }
              updatedCheckedValues.push(option.value);
              onChange(updatedCheckedValues);
            }}
          >
            <MaterialIcons 
              name={ active ? 'check-box' : 'check-box-outline-blank'} 
              size={24} 
              color={'#64748b'} 
            />
            <Text style={styles.text}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    marginHorizontal: 15,
  },
  checkBox: {
    heigh: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    color: '#6b7280',
  },
  label: {
    marginBottom: 5,
    fontSize:18,
    color: '#616161'
  },
  activeText: {
    color: '#374251',
  },
});
