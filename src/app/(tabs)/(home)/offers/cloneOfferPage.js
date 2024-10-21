import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter, useLocalSearchParams } from 'expo-router';

import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';

import CustomTextInput from '../../../../components/Form/CustomTextInput';
import CustomButton from '../../../../components/Form/CustomButton';
import CustomLargeTextInput from '../../../../components/Form/CustomLargeTextInput';
import DatePickerInput from '../../../../components/Form/DatePickers';
import CustomCheckbox from '../../../../components/Form/Checkbox';
import ImagePickerButton from '../../../../components/Form/ImagePickerButton';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { uploadFileToFirebase } from '../../../../config/firebase-config';
import { appApi } from '../../../../config/api/appAPI';

const categoriesOptions = [
  { label: 'Moto', value: 'Moto' },
  { label: 'Coche', value: 'Coche' },
  { label: 'Camion', value: 'Camion' },
];

const offerSchema = Yup.object().shape({
  title: Yup.string().required('Este campo no puede estar vacio'),
  description: Yup.string().required('Este campo no puede estar vacio'),
  validityDt: Yup.date('No es una fecha').required('Este campo no puede estar vacio'),
  additionalInfo: Yup.string().required('Este campo no puede estar vacio'),
  category: Yup.array().of(Yup.string()).required('Este campo no puede estar vacio'),
});

export default cloneOfferPage = () => {

  const router = useRouter();

  const local = useLocalSearchParams();

  const [offer, setOffer] = useState({
    title: '',
    description: '',
    validityDt: '',
    additionalInfo: '', 
    image: '',
    category: [],
  });

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchInvoice = async () => {
      await appApi.get(`/offers/${local.offerId}`).then((data) => {
        setOffer(data.data);
        setImage(data.data.imageUrl);
        setLoading(false);
      });
    };

    fetchInvoice();
  }, []);

  const initialValues = {
    title: offer.title,
    description: offer.description,
    validityDt: '',
    additionalInfo: offer.additionalInfo, 
    image: offer.imageUrl,
    category: [...offer.category],
  };

  return (
    <SafeAreaView style={styles.container}>
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
              
              if( image !== ''){
                values.imageUrl = values.image;
              } else {
                let { uri } = values.image[0];
                let filename = uuid4();
                let folder = 'offers/'
            
                const imageUrl = await uploadFileToFirebase(uri,filename,folder);
            
                values.imageUrl = imageUrl;
              }
            
              delete values.image;
            
              const response = await appApi.post('/offers', values)
            
              if(response) {
                router.replace({
                  pathname: `/offers/${response.data._id}`
                })
              }
            }}
            validationSchema= {offerSchema}
            validateOnChange= {false}
          >
            {({ handleChange, errors, handleSubmit, values, setFieldValue }) => (
              <View style={styles.formContainer}>
                <ScrollView>
                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label= 'Título de la oferta'
                      placeholder= ''
                      value= {values.title}
                      onChangeText= {handleChange('title')}
                    />
                    {errors.title && <Text style={styles.error}>{errors.title}</Text>}
                    <CustomLargeTextInput
                      label= 'Descripción'
                      placeholder= ''
                      value= {values.description}
                      onChangeText= {handleChange('description')}
                    />
                    {errors.description && <Text style={styles.error}>{errors.description}</Text>}
                    <DatePickerInput 
                      label= 'Fecha de vencimiento'
                      value= {values.validityDt}
                      maximumDate= {new Date(2030,11,31)}
                      minimumDate= {new Date()}
                      onChangeValue= {(newDate) => setFieldValue('validityDt', newDate)}
                    />
                    {errors.validityDt && <Text style={styles.error}>{errors.validityDt}</Text>}
                    <CustomLargeTextInput
                      label= 'Instrucciones para solicitar la oferta'
                      placeholder= ''
                      value= {values.additionalInfo}
                      onChangeText= {handleChange('additionalInfo')}
                    />
                    {errors.additionalInfo && <Text style={styles.error}>{errors.additionalInfo}</Text>}
                    <View style={styles.imageContainer}>
                      <Text style={styles.imageLabel}>Imagen</Text>
                      <Image 
                        style= {styles.image} 
                        source= {image} 
                        contentFit= 'cover' 
                      />
                      <ImagePickerButton 
                        setImage= {setImage}
                        onChange= {(nextValue) => setFieldValue('image', nextValue)}
                        isAspect={[4,3]}
                      />
                    </View>
                    {errors.image && <Text style={styles.error}>{errors.image}</Text>}
                    <CustomCheckbox 
                      label= 'Categorías a aplicar la oferta'
                      options= {categoriesOptions}
                      checkedValues= {values.category}
                      onChange= {(nextValue) => setFieldValue('category', nextValue)}
                    />
                    {errors.category && <Text style={styles.error}>{errors.category}</Text>}
                  </View>
                </ScrollView>
                <CustomButton label='Clonar Oferta' onPress={handleSubmit} />
              </View>
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
    marginTop: 15
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1
  },
  error: {
    color: 'red',
    marginLeft: 20,
    bottom: 10,
  },
  imageContainer: {
    alignContent: 'center',
    marginBottom:10,
    marginHorizontal:15,
    height: 400,
  },
  image:{
    flex: 1,
    width: '100%',
  },
  imageLabel:{
    marginBottom: 5,
    fontSize:18,
    color: '#616161'
  }
});
