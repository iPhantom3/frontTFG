import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';


import CustomTextInput from '../../../../components/Form/CustomTextInput';
import PasswordInput from '../../../../components/Form/PasswordInput';
import CustomButton from '../../../../components/Form/CustomButton';
import CustomCheckBox from '../../../../components/Form/Checkbox';
import ImagePickerButton from '../../../../components/Form/ImagePickerButton';

import { appApi } from '../../../../config/api/appAPI';
import { deleteFileOfFirebase, uploadFileToFirebase } from '../../../../config/firebase-config';

import { Formik } from 'formik';
import * as Yup from 'yup';
import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';

const categoriesOptions = [
  { label: 'Moto', value: 'Moto' },
  { label: 'Coche', value: 'Coche' },
  { label: 'Camion', value: 'Camion' },
];

const editSchema = Yup.object().shape({
  name: Yup.string(),
  password: Yup.string()
    .min(8, 'La contraseña debe tener como minimo 8 caracteres')
    .matches(/[0-9]/, 'La contraseña requiere al menos un numero.')
    .matches(/[a-z]/, 'La contraseña requiere al menos una letra minúscula.')
    .matches(/[A-Z]/, 'La contraseña requiere al menos una letra mayúscula.'),
  confirmPassword: Yup.string()
    .test('password-should-match', 'La contraseña no coincide', function(value){
      return this.parent.password === value
    })
});

const passwordInfo = `La contraseña debe incluir:
·8 caracteres o más
·Una mayúscula
·Una minúscula
·Un número.`;

export default editUserPage = () => {

  const {userInfo} = useSelector((state) => state.auth);

  const router = useRouter();

  const isFocused = useIsFocused();

  const [user, setUser] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    category: [], 
    image: ''
  });

  const [image, setImage] = useState(require('../../../../../assets/no-user-image.png'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await appApi.get('users/profile').then((data) => {
        setUser(data.data);
        if(data.data.profileImageUrl !== ''){
          setImage(data.data.profileImageUrl);
        }
        setLoading(false);
      });

    };  
    fetchUser();
  }, [isFocused]);

  const initialValues = {
    name: user.name,
    password: '',
    confirmPassword: '',
    category: [...user.category], 
    image: ''
  };
  

  return (
    <SafeAreaView style={{flex: 1}}>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size='large'
              color={'#3979FF'}
            />
          </View>
        ) : (
          <Formik
            initialValues= {initialValues}
            onSubmit= { async (values) => {
              delete values.confirmPassword;
            
              if(values.password === '') delete values.password;
            
              if( values.image !== ''){
                if(user.profileImageUrl != '') {
                  await deleteFileOfFirebase(user.profileImageUrl);
                }
                let { uri } = values.image[0];
                let filename = uuid4();
                let folder = 'profile/'
            
                const imageUrl = await uploadFileToFirebase(uri,filename,folder);
            
                values.profileImageUrl = imageUrl;
              }
            
              delete values.image;
            
              const response = await appApi.put('/users/profile', values)

              if(response) {
                router.back();
              }
            }}
            validationSchema= {editSchema}
            validateOnChange= {false}
          >
            {({ setFieldValue, handleChange, errors, handleSubmit, values }) => (
              <ScrollView style={styles.formContainer}>
                <View style={styles.imageFormContainer}>
                  <Text style={styles.imageLabel}>Foto de perfil</Text>
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
                <View style={styles.inputContainer}>
                  <CustomTextInput
                    label= 'Nombre Completo'
                    placeholder= ''
                    value= {values.name}
                    onChangeText= {handleChange('name')}
                  />
                  {errors.name && <Text style={styles.error}>{errors.name}</Text>}
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

                  {
                    (userInfo && !userInfo.isProfessional) ? (
                      <CustomCheckBox
                        options= {categoriesOptions}
                        label= 'Categorías de interés'
                        checkedValues= {values.category}
                        onChange= {(nextValue) => setFieldValue('category', nextValue)}
                      />
                    ) : <></>
                  }
                </View>
                <CustomButton label='Guardar cambios' onPress={handleSubmit} />
              </ScrollView>
            )}
          </Formik>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
    marginTop: 15
  },
  inputContainer: {
    flex: 1
  },
  error: {
    color: 'red',
    marginLeft: 20,
    bottom: 10,
  },
  imageFormContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  imageContainer: {
    height: 200,
    width: 200,
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
  passwordInfo: {
    marginLeft: 25,
    fontSize: 15,
    color: '#616161',
    marginBottom: 10,
  },
});
