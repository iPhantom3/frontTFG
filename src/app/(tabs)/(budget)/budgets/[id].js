import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, ScrollView } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { appApi } from '../../../../config/api/appAPI';
import { uploadFileToFirebase } from '../../../../config/firebase-config';

import { Formik } from 'formik';
import * as Yup from 'yup';

import MessageTextView from '../../../../components/ViewData/MessageTextView';
import ImageModal from '../../../../components/ViewData/ImageModal';
import VideoModal from '../../../../components/ViewData/VideoModal';
import CustomButton from '../../../../components/Form/CustomButton';
import DocumentPickerButton from '../../../../components/Form/DocumentPickerButton';
import CustomLargeTextInput from '../../../../components/Form/CustomLargeTextInput';
import DocumentFileCard from '../../../../components/ViewData/DocumentFileCard';
import DocumentView from '../../../../components/ViewData/DocumentView';
import DeleteBudgetModal from '../../../../components/BudgetsList/DeleteBudgetModal';

const initialValues = {
  professionalMessage: '',
  files: []
};
const responseSchema = Yup.object().shape({
  professionalMessage: Yup.string().required('Este campo no puede estar vacio'),
  files: Yup.array().of(Yup.object()),
});

export default budgetPage = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const local = useLocalSearchParams();

  const router = useRouter();

  const isFocused = useIsFocused();

  const [budget, setBudget] = useState({})
  const [clientFiles, setClientFiles] = useState([])
  const [formFiles, setFormFiles] = useState([]);
  const [isDownload, setIsDownload] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      await appApi.get(`/budgets/${local.id}`).then((data) => {
        setBudget(data.data);
        setClientFiles(data.data.clientFilesUrl)
        setLoading(false);
      });
    };

    fetchBudget();
  }, [isFocused]);

  const onFormikSubmit = async (values) => {
    setLoading(true);

    values.professionalFilesUrl = [];

    for(let file of values.files){
      let {uri} = file;
      let fileName = '';
      if(file.name){
        fileName = file.name
      } else {
        fileName = `Presupuesto para ${budget.title}`
      }
      let folder=`budgets/${budget.storageFolder}`

      const fileUrl = await uploadFileToFirebase(uri,fileName,folder);

      values.professionalFilesUrl.push({
        'fileName': file.name,
        'fileUrl': fileUrl
        });
    }

    delete values.files;

    const response = await appApi.put(`/budgets/${budget._id}`, values);

    setLoading(false);

    if(response) {
      router.replace({
        pathname: `/(budget)/budgets/${response.data._id}`
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
          title: `${budget.title}`,
          headerRight: () => 
            (budget && budget.isAnswered) 
            && <DeleteBudgetModal 
              budgetId={budget._id} 
              isProfessional={(userInfo && userInfo.isProfessional) ? true : false} 
            />
            
        }} 
      />
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size= 'large'
              color= {'#3979FF'}
            />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.messageContainer}>
              {
                (userInfo && userInfo.isProfessional) ? (
                  <Text style={styles.label}>Mensaje del cliente</Text>
                ) : (
                  <Text style={styles.label}>Tu mensaje</Text>
                )
              }
              <MessageTextView message={budget.clientMessage} />
            </View>
            {
              (clientFiles.length > 0) ? (
                <View style={styles.filesContainer}>
                  <Text style={styles.label}>Archivos adjuntos</Text>
                  <View style={styles.filesSubContainer}>
                    {
                      clientFiles.map((file,index)=> (
                        <View key={index}>
                          {
                          (file.type === 'image') ? (
                            <ImageModal file={file} />
                          ) : (
                            <VideoModal file={file} />
                          )
                          }
                        </View>
                      ))
                    }
                  </View>
                </View>
              ) : (
                <></>
              )
            }
            {
              (budget.isAnswered) ? (
                <View>
                  <View style={[styles.messageContainer, {marginTop: 40}]}>
                    {
                      (userInfo && userInfo.isProfessional) ? (
                        <Text style={styles.label}>Tu respuesta</Text>
                      ) : (
                        <Text style={styles.label}>Respuesta de EuroTaller</Text>
                      )
                    }
                    <MessageTextView message={budget.professionalMessage} />
                  </View>
                  {
                    (budget.professionalFilesUrl.length > 0) ? (
                      <View style={styles.documentsContainer}>
                        <Text style={styles.label}>Presupuesto</Text>
                        <DocumentView 
                          files= {budget.professionalFilesUrl}  
                          isDownload= {isDownload}
                          setIsDownload= {setIsDownload}
                          />
                      </View>
                    ) : (<></>)
                  }
                </View>
              ) : (
                (userInfo && userInfo.isProfessional) && (
                  <View style={styles.formContainer}>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={onFormikSubmit}
                      validationSchema={responseSchema}
                      validateOnChange={false}
                    >
                      {({ handleChange, errors, handleSubmit, values, setFieldValue }) => (
                        <View style={{flex: 2}}>
                          <View style={{flex: 2}}>  
                          <CustomLargeTextInput
                            label= 'Respuesta a la solicitud'
                            placeholder= ''
                            value= {values.professionalMessage}
                            onChangeText= {handleChange('professionalMessage')}
                            />
                          {errors.professionalMessage && <Text style={styles.error}>{errors.professionalMessage}</Text>}
                          <View style={styles.filesContainer}>
                            <Text style={styles.label}>{`Archivos (opcional)`}</Text>
                            <Text style={styles.infoText}>{`• Tamaño máximo del archivo: 40MB \n• Límite de archivos: 2`}</Text>
                            {
                              formFiles ? (
                                <View style={styles.filesList}>
                                {
                                  formFiles.map((file, index) => (
                                    <DocumentFileCard
                                    key= {index} 
                                    fileName= {file.name} 
                                    height= {{height: 50}}
                                    index= {index}
                                    files= {formFiles}
                                    setFiles= {setFormFiles}
                                    setValuesFiles= {(nextValue) => setFieldValue('files', nextValue)}
                                    />
                                  ))
                                }
                                </View>
                              ) : (
                                ''
                              ) 
                            }
                          </View>
                          <DocumentPickerButton
                          files= {formFiles}
                          setValuesFiles= {(nextValue) => setFieldValue('files', nextValue)}
                          setFiles= {setFormFiles}
                          />
                          </View>
                          <CustomButton label='Enviar respuesta' onPress={handleSubmit} /> 
                        </View>
                      )}
                    </Formik>
                  </View>
                )
              )
            }
          </ScrollView>
        )
      } 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageContainer: {
    paddingHorizontal: 15,
    marginBottom: 15
  },
  filesContainer: {
    paddingHorizontal: 15,
  },
  filesSubContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 5,
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
  },
  documentsContainer:{
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  label: {
    fontSize: 20,
    color: '#616161'
  },
  infoText: {
    color: '#616161',
    fontSize: 15,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginLeft: 20,
    bottom: 10,
  },
});
