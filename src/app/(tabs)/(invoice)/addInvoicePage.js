import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../config/api/appAPI';

import CustomTextInput from '../../../components/Form/CustomTextInput';
import CustomButton from '../../../components/Form/CustomButton';
import DatePickerInput from '../../../components/Form/DatePickers';

import { Formik } from 'formik';
import * as Yup from 'yup';
import DropdownComponent from '../../../components/Form/Dropdown';

const initialValues = {
  cost: '',
  paymentMethod: '',
  invoiceNumber: '',
  invoiceDate: '',
  userId: ''
};

const invoiceSchema = Yup.object().shape({
  cost: Yup.string().required('Este campo no puede estar vacio'),
  paymentMethod: Yup.string().required('Este campo no puede estar vacio'),
  invoiceNumber: Yup.string().required('Este campo no puede estar vacio'),
  invoiceDate: Yup.date().required('Este campo no puede estar vacio'),
  userId: Yup.string().required('Este campo no puede estar vacio')
});

export default addInvoicePage = () => {

  const router = useRouter();

  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersList = async () => {
      await appApi.get('/users/').then((data) => {
        setUsersList(data.data);
        setLoading(false);
      });
    };

    fetchUsersList();
  }, []);
  

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
            initialValues={initialValues}
            onSubmit={ async (values) => {
              
              const response = await appApi.post('/invoices', values)
        
              if(response) {
                router.replace({
                  pathname: `/profInvoices/${response.data._id}`
                })
              }
            }}
            validationSchema={invoiceSchema}
            validateOnChange={false}
          >
            {({ handleChange, errors, handleSubmit, values, setFieldValue }) => (
              <View style={styles.formContainer}>
                <ScrollView style={styles.inputContainer}>
                  <CustomTextInput
                    label= 'Número de factura'
                    placeholder= ''
                    value= {values.invoiceNumber}
                    onChangeText= {handleChange('invoiceNumber')}
                  />
                  {errors.invoiceNumber && <Text style={styles.error}>{errors.invoiceNumber}</Text>}
                  <DropdownComponent 
                    label= 'Cliente'
                    users= {usersList}
                    setFieldValue= {setFieldValue}
                  />
                  {errors.userId && <Text style={styles.error}>{errors.userId}</Text>}
                  <CustomTextInput
                    label= 'Subtotal sin impuestos'
                    placeholder= ''
                    value= {values.cost}
                    onChangeText= {handleChange('cost')}
                  />
                  {errors.cost && <Text style={styles.error}>{errors.cost}</Text>}
                  <CustomTextInput
                    label= 'Método de pago'
                    placeholder= ''
                    value= {values.paymentMethod}
                    onChangeText= {handleChange('paymentMethod')}
                  />
                  {errors.paymentMethod && <Text style={styles.error}>{errors.paymentMethod}</Text>}
                  <DatePickerInput 
                    label= 'Fecha de la factura'
                    maximumDate= {new Date()}
                    minimumDate= {new Date(2015,0,1)}
                    onChangeValue= {(newDate) => setFieldValue('invoiceDate', newDate)}
                  />
                  {errors.invoiceDate && <Text style={styles.error}>{errors.invoiceDate}</Text>}
                </ScrollView>
                <CustomButton label='Añadir factura' onPress={handleSubmit} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    flex: 1,
  },
  error: {
    color: 'red',
    marginLeft: 20,
    bottom: 10,
  },
});
