import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

const PasswordInput = ({ value, placeholder, onChangeText, label, forgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {(forgotPassword) && <Link href={'/auth/forgotPasswordPage'} style={styles.link}>¿Olvidaste tu contraseña?</Link>}
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          onChangeText={onChangeText}
        />
        <Pressable style={styles.toggle} onPress={toggleShowPassword}>
          {showPassword ? (
            <FontAwesome5 name='eye-slash' size={26} color='#ADADAD' />
          ) : (
            <FontAwesome5 name='eye' size={26} color='#ADADAD' />
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  passwordContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 53,
    borderColor: '#ADADAD',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: '#616161'
  },
  link:{
    color: '#3979FF',
    fontSize: 16
  },
  toggle: {
    marginLeft: 10,
    color: '#666',
  },
});

export default PasswordInput;
