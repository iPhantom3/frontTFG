import React from 'react'
import { 
  Alert, 
  ImageBackground, 
  StyleSheet, 
  Text, 
  View,
  ScrollView
} from 'react-native'

import CustomTextInput from '../../components/Form/CustomTextInput';
import CustomButton from '../../components/Form/CustomButton';
import PasswordInput from '../../components/Form/PasswordInput';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { appApi } from '../../config/api/appAPI';

const initialValues = {
  verificationCode: '',
  newPassword: '',
};

const passwordInfo = `La contraseña debe incluir:
·8 caracteres o más
·Una mayúscula
·Una minúscula
·Un número.`;

const resetPasswordSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .required('Este campo no puede estar vacio'),
  newPassword: Yup.string()
    .min(8, 'La contraseña debe tener como minimo 8 caracteres')
    .matches(/[0-9]/, 'La contraseña requiere al menos un numero.')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula.')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula.')
    .required('Este campo no puede estar vacio.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden.')
    .required('Este campo no puede estar vacio.'),
});

export default forgotPasswordPage = () => {

  const router = useRouter()
  const local = useLocalSearchParams();

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
              delete values.confirmPassword;

              values.email = local.email

              const response = await appApi.post(`/users/resetpassword`, values);

              if(response) {
                Alert.alert('Contraseña restablecida', 
                  'Su contraseña ha sido restablecida con éxito',
                  [{
                    text: 'Confirmar',
                    onPress: () => {router.replace('/');}
                  }]
                );
              } else {
                Alert.alert('Error al restablecer su contraseña', 'Por favor, inténtelo de nuevo');
              }
            } catch (error){
              Alert.alert('Error al restablecer su contraseña', 'Por favor, inténtelo de nuevo')
            }
          }}
          validationSchema= {resetPasswordSchema}
          validateOnChange= {false}
        >
          {({ handleChange, errors, handleSubmit, values }) => (
            <View style={styles.formContainer}>
              <ScrollView style={styles.inputContainer}>
                <CustomTextInput
                  label= 'Código de verificación'
                  placeholder= ''
                  value= {values.verificationCode}
                  onChangeText= {handleChange('verificationCode')}
                />
                {errors.verificationCode && (
                  <Text style={styles.error}>{errors.verificationCode}</Text>
                )}
                <PasswordInput
                  label= 'Contraseña'
                  placeholder= ''
                  value= {values.newPassword}
                  onChangeText= {handleChange('newPassword')}
                />
                {errors.newPassword && (
                  <Text style={styles.error}>{errors.newPassword}</Text>
                )}
                <Text style={styles.passwordInfo}>{passwordInfo}</Text>
                <PasswordInput
                  label= 'Confirmar contraseña'
                  placeholder= ''
                  value= {values.confirmPassword}
                  onChangeText= {handleChange('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </ScrollView>
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
  passwordInfo: {
    marginLeft: 25,
    fontSize: 15,
    color: '#616161',
    marginBottom: 10,
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