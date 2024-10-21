import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Checkbox from 'expo-checkbox';
import { Link, useRouter } from 'expo-router';

import CustomTextInput from '../../components/Form/CustomTextInput';
import PasswordInput from '../../components/Form/PasswordInput';
import CustomButton from '../../components/Form/CustomButton';
import CustomCheckBox from '../../components/Form/Checkbox';
import ImagePickerButton from '../../components/Form/ImagePickerButton';
import PrivacyModal from '../../components/Form/PrivacyModal';
import TermsModal from '../../components/Form/TermsModal';

import * as Yup from 'yup';
import { Formik } from 'formik';
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';

import { useRegisterMutation } from '../../utils/redux/usersApiSlice';
import { setCredentials } from '../../utils/redux/authSlice';
import { useDispatch } from 'react-redux';
import { uploadFileToFirebase } from '../../config/firebase-config';

const initialValues = {
  name: '',
  email: '',
  dni: '',
  password: '',
  category: [],
  friendCode: '',
  image: '',
  termsAccepted: false,
  privacyAccepted: false,
};

const categoriesOptions = [
  { label: 'Moto', value: 'Moto' },
  { label: 'Coche', value: 'Coche' },
  { label: 'Camion', value: 'Camion' },
];


Yup.addMethod(Yup.string, 'validateDni', function (errorMessage) {
  return this.test('dni-validation', errorMessage, function (value) {
    const { path, createError } = this;
    
    let validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    let nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    let nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    let str = value.toString().toUpperCase();
    
    if (!nifRexp.test(str) && !nieRexp.test(str)){
      return createError({ path, message: errorMessage});
    }
    
    let nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');
    
    let letter = str.slice(-1);
    let charIndex = parseInt(nie.substring(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) {
      return true;
    }

    return createError({ path, message: errorMessage});
  });
});

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Este campo no puede estar vacio.'),
  dni: Yup.string()
    .validateDni('Documento de identidad no válido')
    .required('Este campo no puede estar vacio.'),
  email: Yup.string()
    .email('El email no tiene un formato correcto.')
    .required('Este campo no puede estar vacio.'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener como minimo 8 caracteres')
    .matches(/[0-9]/, 'La contraseña requiere al menos un numero.')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula.')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula.')
    .required('Este campo no puede estar vacio.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.')
    .required('Este campo no puede estar vacio.'),
  termsAccepted: Yup.bool().oneOf([true], 'Debe aceptar los Términos y Condiciones.'),
  privacyAccepted: Yup.bool().oneOf([true], 'Debe aceptar la Política de privacidad.'),
});

const passwordInfo = `La contraseña debe incluir:
·8 caracteres o más
·Una mayúscula
·Una minúscula
·Un número.`;

export default signUpPage = () => {
  const router = useRouter();

  const [register] = useRegisterMutation();
  const dispatch = useDispatch();

  const [image, setImage] = useState(require('../../../assets/no-user-image.png'));

  const onSignUp = async (values) => {

    values.profileImageUrl = ''

    if(values.image !== ''){
      let { uri } = values.image[0];
      let filename = uuid4();
      let folder = 'profile/'

      const imageUrl = await uploadFileToFirebase(uri,filename,folder);

      values.profileImageUrl = imageUrl;
    } 

    delete values.image;

    const { 
      name, 
      email, 
      dni, 
      password, 
      category, 
      friendCode, 
      termsAccepted, 
      privacyAccepted, 
      profileImageUrl 
    } = values;
    
    try {
      const res = await register({
        name,
        email,
        dni,
        password,
        category,
        friendCode,
        termsAccepted,
        privacyAccepted,
        profileImageUrl
      }).unwrap();

      dispatch(setCredentials({ ...res }));

      router.push('/(tabs)/(home)');

    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source= {require('../../../assets/background.png')}
        resizeMode= 'cover'
        style= {{flex: 1}}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>EuroTaller</Text>
          <Text style={styles.textSignUp}>Regístrate</Text>
          <Text style={styles.textInfo}>
            Introduce tus datos para crear tu cuenta
          </Text>
        </View>
        <Formik
          initialValues= {initialValues}
          onSubmit= {(values) => {
            onSignUp(values);
          }}
          validationSchema= {signUpSchema}
          validateOnChange= {false}
        >
          {({ setFieldValue, handleChange, errors, handleSubmit, values }) => (
            <View style={{flex: 2}}>
              <ScrollView style={{flex: 1}}>
                <View style={styles.imageFormContainer}>
                  <Text style={styles.imageLabel}>{`Foto de perfil (opcional)`}</Text>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={styles.imageContainer}>
                      <Image 
                        style= {styles.image} 
                        source= {image} 
                        contentFit= 'contain' 
                      />
                    </View>
                  </View>
                  <ImagePickerButton 
                    setImage= {setImage}
                    onChange= {(nextValue) => setFieldValue('image', nextValue)}
                    isAspect={[1,1]}
                  />
                </View>
                <CustomTextInput
                  label= 'Nombre Completo'
                  placeholder= ''
                  value= {values.name}
                  onChangeText= {handleChange('name')}
                />
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}
                <CustomTextInput
                  label= 'Email'
                  placeholder= ''
                  value= {values.email}
                  onChangeText= {handleChange('email')}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <CustomTextInput
                  label= 'Documento de identidad'
                  placeholder= ''
                  value= {values.dni}
                  onChangeText= {handleChange('dni')}
                />
                {errors.dni && <Text style={styles.error}>{errors.dni}</Text>}
                <PasswordInput
                  label= 'Contraseña'
                  placeholder= ''
                  value= {values.password}
                  onChangeText= {handleChange('password')}
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
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
                <CustomCheckBox
                  options= {categoriesOptions}
                  label= 'Categorías de interés (opcional)'
                  checkedValues= {values.category}
                  onChange= {(nextValue) => setFieldValue('category', nextValue)}
                />
                <CustomTextInput
                  label= 'Código amigo (opcional)'
                  placeholder= ''
                  value= {values.friendCode}
                  onChangeText= {handleChange('friendCode')}
                />
                <View style={styles.termsContainer}>
                  <Checkbox 
                    value={values.termsAccepted} 
                    onValueChange={(nextValue) => setFieldValue('termsAccepted', nextValue)} 
                  />
                  <TermsModal />
                </View>
                {errors.termsAccepted && (
                  <Text style={styles.error}>{errors.termsAccepted}</Text>
                )}
                <View style={styles.termsContainer}>
                  <Checkbox 
                    value={values.privacyAccepted} 
                    onValueChange={(nextValue) => setFieldValue('privacyAccepted', nextValue)} 
                  />
                  <PrivacyModal />
                </View>
                {errors.privacyAccepted && (
                  <Text style={styles.error}>{errors.privacyAccepted}</Text>
                )}
              </ScrollView>
              <CustomButton label='Registrarse' onPress={handleSubmit} />
              <Text style={styles.finalText}>
                ¿Ya tienes una cuenta?
                <Link href={'/auth/signInPage'} style={{color: '#3979FF'}}>
                  {' '}
                  Inicia Sesión
                </Link>
              </Text>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 25,
    marginTop: 15,
  },
  textSignUp: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageFormContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  imageContainer: {
    height: 160,
    width: 160,
  },
  image: {
    flex: 1,
    borderRadius: 200,
    borderColor: '#cacaca',
    borderWidth: 1,
  },
  imageLabel: {
    marginBottom: 5,
    fontSize: 18,
    color: '#616161'
  },
  textInfo: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 20,
  },
  passwordInfo: {
    marginLeft: 25,
    fontSize: 15,
    color: '#616161',
    marginBottom: 10,
  },
  termsContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  finalText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 18,
    color: '#616161',
  },
  error: {
    color: 'red',
    marginLeft: 20,
    bottom: 10,
  },
});
