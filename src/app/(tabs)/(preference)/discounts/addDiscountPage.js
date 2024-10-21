import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomTextInput from '../../../../components/Form/CustomTextInput';
import CustomButton from '../../../../components/Form/CustomButton';

import { appApi } from '../../../../config/api/appAPI';

import { Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  title: '',
  percent: '',
  accounts: '',
};

const discountSchema = Yup.object().shape({
  title: Yup.string().required('Este campo no puede estar vacio'),
  percent: Yup.string().required('Este campo no puede estar vacio'),
  accounts: Yup.number('Debe indicar un número de invitaciones válido')
  .required('Este campo no puede estar vacio'),
});

export default addDiscountPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={ async (values) => {
          const response = await appApi.post('/discounts', values)

          if(response) {
            router.replace({
              pathname: `/discounts/${response.data._id}`,
            })
          }
        }}
        validationSchema= {discountSchema}
        validateOnChange= {false}
      >
        {({ handleChange, errors, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <CustomTextInput
                label= 'Título'
                placeholder= ''
                value= {values.title}
                onChangeText= {handleChange('title')}
              />
              {errors.title && <Text style={styles.error}>{errors.title}</Text>}
              <CustomTextInput
                label= 'Invitaciones para aplicar el descuento'
                placeholder= ''
                value= {values.accounts}
                onChangeText= {handleChange('accounts')}
              />
              {errors.accounts && <Text style={styles.error}>{errors.accounts}</Text>}
              <CustomTextInput
                label= 'Porcentaje de descuento aplicado'
                placeholder= ''
                value= {values.percent}
                onChangeText= {handleChange('percent')}
              />
              {errors.percent && <Text style={styles.error}>{errors.percent}</Text>}
            </View>
            <CustomButton label='Añadir Descuento' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
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
});
