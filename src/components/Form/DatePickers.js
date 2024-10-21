import { useState } from 'react';
import { 
  Text, 
  StyleSheet, 
  View, 
  Pressable, 
  TextInput, 
  Platform, 
  TouchableOpacity
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

const DatePickerInput = ({ 
  label,
  maximumDate,
  minimumDate, 
  onChangeValue 
}) => {
  const [dateInput, setDateInput] = useState('')
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({type}, selectedDate) => {
    if(type === 'set'){
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === 'android'){
        setDateInput(currentDate.toLocaleDateString('es-ES', dateOptions))
        onChangeValue(currentDate)
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateInput(date.toLocaleDateString('es-ES', dateOptions));
    toggleDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {
        (showPicker && (Platform.OS === 'android')) ? (
          <DateTimePicker 
            mode= 'date'
            display= 'spinner'
            value= {date}
            locale= 'es-ES'
            onChange= {onChange}
            maximumDate= {maximumDate}
            minimumDate= {minimumDate}
          />
        ) : (

          showPicker && (
           <>
              <DateTimePicker 
                mode= 'date'
                display= 'spinner'
                value= {date}
                locale= 'es-ES'
                onChange= {onChange}
                style = {styles.iosDatePicker}
                maximumDate= {maximumDate}
                minimumDate= {minimumDate}
              />

              <View style={styles.iosButtonsContainer}>
                <TouchableOpacity 
                  style={[
                    styles.iosButton,
                    styles.pickerButton,
                    { backgroundColor: 'rgba(16, 16, 17, 0.07)'}
                  ]}
                  onPress={toggleDatePicker}
                >
                  <Text style={[
                    styles.iosButtonText,
                    {color: '#000'}
                  ]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.iosButton,
                    styles.pickerButton,
                    { backgroundColor: 'rgba(16, 16, 17, 0.07)'}
                  ]}
                  onPress={confirmIOSDate}
                >
                  <Text style={[
                    styles.iosButtonText,
                  ]}>
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )
        )
      }
          <Pressable
            onPress= {toggleDatePicker}
            style= {styles.inputContainer}
          >
            <TextInput
              style= {styles.input}
              value= {dateInput}
              onChangeText= {setDateInput}
              editable= {false}
              onPressIn= {toggleDatePicker}
            />
            <AntDesign name='calendar' size={24} color='#ADADAD' />
          </Pressable>
    </View>
  );
};
export default DatePickerInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 53,
    borderColor: '#ADADAD',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: 'black'
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: '#616161'
  },
  iosDatePicker: {
    height: 120,
    marginTop: -10
  },
  iosButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iosButton:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#3979FF'
  },
  iosButtonText:{
    fontSizer: 14,
    fontWeight: '500',
    color: 'white'
  },
  pickerButton : {
    paddingHorizontal: 20
  }
}); 

