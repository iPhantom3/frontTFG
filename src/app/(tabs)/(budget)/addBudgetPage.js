import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import 'react-native-get-random-values';
import { v4 as uuid4 } from 'uuid';

import CustomTextInput from '../../../components/Form/CustomTextInput';
import CustomButton from '../../../components/Form/CustomButton';
import CustomLargeTextInput from '../../../components/Form/CustomLargeTextInput';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { uploadFileToFirebase } from '../../../config/firebase-config';
import { appApi } from '../../../config/api/appAPI';

import FilesPickModal from '../../../components/Form/FilesPickModal';
import FileCard from '../../../components/ViewData/FileCard';


const budgetSchema = Yup.object().shape({
  title: Yup.string().required('Este campo no puede estar vacio'),
  clientMessage: Yup.string().required('Este campo no puede estar vacio'),
  files: Yup.array().of(Yup.object()),
});

export default addBudgetPage = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    userId: userInfo._id,
    title: '',
    clientMessage: '',
    files: [],
  };

  const checkFilesSize = () => {
    for(let file of files){
      if(file.hasOwnProperty('fileSize')){
        if(file.fileSize > 170000000){
          return false;
        }
      }
    }
    return true;
  }

  const checkOnSubmit = (handleSubmit) => {
    if(checkFilesSize()){
      handleSubmit();
    } else {
      Alert.alert('Tamaño máximo superado', 
        'El tamaño de uno de los archivos seleccionados supera el tamaño máximo.');
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size= 'large'
              color= {'#3979FF'}
            />
          </View>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              setLoading(true);

              values.clientFilesUrl = [];

              const subFolder = uuid4();
              values.storageFolder = subFolder;

              

              for(let file of values.files){
                let {uri} = file;
                let fileName = uuid4()
                let folder=`budgets/${subFolder}`

                const fileUrl = await uploadFileToFirebase(uri,fileName,folder);

                values.clientFilesUrl.push({
                'type': file.type,
                'fileUrl': fileUrl
                });
              }

              delete values.files;

              const response = await appApi.post('/budgets', values);

              setLoading(false);

              if(response) {
                router.replace({
                  pathname: `/(budget)/budgets/${response.data._id}`
                })
              }
          }}
          validationSchema={budgetSchema}
          validateOnChange={false}
          >
            {({ handleChange, errors, handleSubmit, values, setFieldValue }) => (
              <View style={styles.formContainer}>
                <ScrollView style={styles.inputContainer}>
                  <CustomTextInput
                    label= 'Título'
                    placeholder= ''
                    value= {values.title}
                    onChangeText= {handleChange('title')}
                  />
                  {errors.title && <Text style={styles.error}>{errors.title}</Text>}
                  <CustomLargeTextInput
                    label= 'Descripción'
                    placeholder= ''
                    value= {values.clientMessage}
                    onChangeText= {handleChange('clientMessage')}
                  />
                  {errors.clientMessage && <Text style={styles.error}>{errors.clientMessage}</Text>}
                  <View style={styles.filesContainer}>
                    <Text style={styles.filesLabel}>{`Archivos (opcional)`}</Text>
                    <Text style={styles.infoText}>{`• Tamaño máximo del archivo: 150MB \n• Límite de archivos: 6`}</Text>
                      {
                        files ? (
                          <View style={styles.filesList}>
                            {
                              files.map((file, index) => (
                                <FileCard 
                                  key= {index} 
                                  fileName= {file.fileName} 
                                  index= {index}
                                  files= {files}
                                  setFiles= {setFiles}
                                  setValuesFiles= {(nextValue) => setFieldValue('files', nextValue)}
                                />
                              ))
                            }
                          </View>
                        ) : (
                          ''
                        )
                      }
                    <FilesPickModal 
                      files= {values.files}
                      onMediaPickerChange= {(nextValue) => setFieldValue('files', nextValue)}
                      setFiles= {setFiles}
                    />
                  </View>
                </ScrollView>
                {/* <CustomButton label='Enviar solicitud' onPress={handleSubmit} /> */}
                <CustomButton label='Enviar solicitud' onPress={() => checkOnSubmit(handleSubmit)} />
              </View>
            )}
          </Formik>
        )
      } 
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  filesContainer: {
    marginHorizontal: 15,
  },
  filesLabel: {
    fontSize:18,
    color: '#616161'
  },
  filesList: {
    marginBottom: 10,
  },
  infoText: {
    color: '#616161',
    fontSize: 15,
    marginBottom: 10,
  },
});
