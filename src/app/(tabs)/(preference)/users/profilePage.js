import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../../config/api/appAPI';
import CustomTextView from '../../../../components/ViewData/CustomTextView';
import CategoriesView from '../../../../components/ViewData/CategoriesView';

const editProfilePage = () => {

  const isFocused = useIsFocused();

  const { userInfo } = useSelector((state) => state.auth);

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(require('../../../../../assets/no-user-image.png'));

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
          <ScrollView style={styles.container}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.imageLabel}>Foto de perfil</Text>
              <View style={{flex: 1, marginLeft: 20}}>
                <View style={styles.imageContainer}>
                  <Image 
                    style= {styles.image} 
                    source= {image} 
                    contentFit= 'contain' 
                  />
                </View>
              </View>
            </View>
            <CustomTextView 
              label={'Nombre Completo'}
              value={user.name}
            />
            <CustomTextView 
              label={'Correo electrónico'}
              value={user.email}
            />
            {
              (userInfo && !userInfo.isProfessional) ? (
                <CustomTextView 
                  label={'Documento de identidad'}
                  value={user.dni}
                />
              ) : <></>
            }
            {
              (userInfo && !userInfo.isProfessional) ? (
                <CategoriesView 
                  label ={'Categorías'}
                  value={user.category}
                />
              ) : <></>
            }
          </ScrollView>
        )
      }
    </SafeAreaView>
  )
}

export default editProfilePage

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingBottom: 50,
  },
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageContainer: {
    marginTop: 10,
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
})