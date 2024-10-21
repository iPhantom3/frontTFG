import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../../config/api/appAPI';
import CustomTextView from '../../../../components/ViewData/CustomTextView';
import DeleteDiscountButton from '../../../../components/DiscountsList/DeleteDiscountButton';

export default discountPage = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const local = useLocalSearchParams();

  const [discount, setDiscount] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscount = async () => {
      await appApi.get(`/discounts/${local.id}`).then((data) => {
        setDiscount(data.data);
        setLoading(false);
      });
    };

    fetchDiscount();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <Stack.Screen options={{
              title: `Descuento`,
              headerTitleStyle: {fontSize:27}
            }} />
            <ActivityIndicator 
              size= 'large'
              color= {'#3979FF'}
            />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Stack.Screen options={{
                title: `${discount.title}`,
                headerTitleStyle: {fontSize:27}
              }} />
              <CustomTextView 
                label= {'Invitaciones para aplicar descuento'}
                value= {discount.accounts}
              />
              <CustomTextView 
                label= {'Porcentaje de descuento aplicado'}
                value= {discount.percent}
              />
            </View>
            {
              (userInfo && userInfo.isProfessional) &&
              <DeleteDiscountButton />
            }
          </View>
        )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})