import React from 'react'
import { 
  Alert, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View,
} from 'react-native'

import CustomTextInput from '../../components/Form/CustomTextInput';
import CustomButton from '../../components/Form/CustomButton';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useRouter } from 'expo-router';
import { appApi } from '../../config/api/appAPI';

const initialValues = {
  email: '',
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('El email no tiene un formato correcto.')
    .required('Este campo no puede estar vacio'),
});

export default forgotPasswordPage = () => {

  const router = useRouter();

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source= {require('../../../assets/background.png')}
        resizeMode= 'cover'
        style= {styles.background}
      >
        <View style={styles.textContainer}>
          <Text style={styles.textResetPassword}>Restablece tu contraseña</Text>
          <Text style={styles.textInfo}>
            Introduce el email con el que te has registrado
          </Text>
        </View>
        <Formik
          initialValues= {initialValues}
          onSubmit= {async (values) => {
            try{
              const response = await appApi.post(`/users/forgotpassword`, values);

              if(response) {
                router.replace({
                  pathname: `/auth/resetPasswordPage`,
                  params: {email: values.email.toLowerCase()}
                });
              } else {
                Alert.alert('Error al restablecer su contraseña', 'Por favor, inténtelo de nuevo');
              }
            } catch (error){
              Alert.alert('Error al restablecer su contraseña', 'Por favor, inténtelo de nuevo');
            }
          }}
          validationSchema= {forgotPasswordSchema}
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
              </View>
              <CustomButton label='Restablecer contraseña' onPress={handleSubmit} />
            </View>
          )}
        </Formik>
        <Text style={styles.finalText}>
          ¿Volver a iniciar sesión?
          <Link href={'/auth/signInPage'} style={styles.link}>
            {' '}
            Inicia Sesión
          </Link>
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  textContainer: {
    marginBottom: 15,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 2,
  },
  textResetPassword: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInfo: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 5,
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
})