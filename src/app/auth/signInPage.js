import React from 'react';
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

import CustomTextInput from '../../components/Form/CustomTextInput';
import PasswordInput from '../../components/Form/PasswordInput';
import CustomButton from '../../components/Form/CustomButton';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useLoginMutation } from '../../utils/redux/usersApiSlice';
import { setCredentials } from '../../utils/redux/authSlice';
import { useDispatch } from 'react-redux';
import { appApi } from '../../config/api/appAPI';

const initialValues = {
  email: '',
  password: '',
};

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email no tiene un formato correcto.')
    .required('Este campo no puede estar vacio'),
  password: Yup.string().required('Este campo no puede estar vacio'),
});

export default signInPage = () => {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const onSignin = async (values) => {
    const { email, password } = values;

    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));

      router.push('/(tabs)/(home)');

    } catch (error) {
      Alert.alert('Error al iniciar sesión', 'Email o contraseña erróneo')
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <ImageBackground
        source= {require('../../../assets/background.png')}
        resizeMode= 'cover'
        style= {styles.background}
      >
        <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.title}>EuroTaller</Text>
          <Text style={styles.textLogin}>Inicio de sesión</Text>
          <Text style={styles.textInfo}>
            Introduce tus datos para entrar en la aplicación
          </Text>
        </View>
        <Formik
          initialValues= {initialValues}
          onSubmit= {(values) => {
            onSignin(values);
          }}
          validationSchema= {signInSchema}
          validateOnChange= {false}
        >
          {({ handleChange, errors, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  label= 'Email'
                  placeholder= ''
                  value= {values.email}
                  onChangeText= {handleChange('email')}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <PasswordInput
                  label= 'Contraseña'
                  placeholder= ''
                  value= {values.password}
                  onChangeText= {handleChange('password')}
                  forgotPassword= {true}
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <CustomButton label='Iniciar sesión' onPress={handleSubmit} />
            </View>
          )}
        </Formik>
        <Text style={styles.finalText}>
          ¿No tienes una cuenta?
          <Link href={'/auth/signUpPage'} style={styles.link}>
            {' '}
            Regístrate
          </Link>
        </Text>
        </ScrollView>
        
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 2,
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 25,
    marginTop: 15,
  },
  textLogin: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInfo: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 20,
  },
  finalText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
    color: '#616161',
  },
  link: {
    color: '#3979FF',
  },
  error: {
    color: 'red',
    marginLeft: 20,
    bottom: 10,
  },
});
