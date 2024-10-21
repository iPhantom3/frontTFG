import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text, ScrollView } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../../config/api/appAPI';

import CustomButton from '../../../../components/OffersList/ActionOfferButton';

export default OfferPage = () => {

  const local = useLocalSearchParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [offer, setOffer] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      await appApi.get(`/offers/${local.id}`).then((data) => {
        setOffer(data.data);
        setLoading(false);
      });
    };

    fetchInvoice();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
        title: `${offer.title}`,
        headerTitleStyle:{fontSize:25}
        }} 
      />
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size='large'
              color={'#3979FF'}
            />
          </View>
        ) : (
          <View style={styles.offerContainer}>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.imageContainer}>
                <Image 
                  style= {styles.image} 
                  source= {offer.imageUrl} 
                  contentFit= 'cover'
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.validityDateText}>Válido hasta el {offer.validityDt}</Text>
                <Text style={styles.titleText}>{offer.title}</Text>
                <Text style={styles.descriptionText}>{offer.description}</Text>
              </View>
              <View style={styles.infotextContainer}>
                <Text style={styles.infoTitle}>Cómo solicitar la oferta</Text>
                <Text style={styles.infoText}>{offer.additionalInfo}</Text>
              </View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryText}>
                  Aplicable para: <Text style={styles.boldCategoryText}>{offer.category.toString().replaceAll(',', ', ')}</Text>
                </Text>
              </View>
            </ScrollView>
            {
              ((userInfo && userInfo.isProfessional) && offer.isActive) ? (
                <CustomButton label={'Desactivar oferta'} offerId={offer._id} />
              ) : ((userInfo && userInfo.isProfessional) && !offer.isActive) ? (
                <CustomButton label={'Clonar oferta'} offerId={offer._id} activate={true} />
              ) : (
                ""
              )
            }
          </View>
        )
      } 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  offerContainer: {
    flex: 1,
  },  
  scrollContainer: {
    flex: 1,

  },
  imageContainer: {
    height: 270,
    width: '100%'
  },
  image: {
    flex: 1,
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },
  validityDateText: {
    color:'#919191',
    fontSize: 16
  },
  titleText: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10
  },
  descriptionText: {
    fontSize: 18,
    fontWeight:'400',
    marginTop: 10
  },
  infotextContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },
  infoTitle: {
    color: '#919191',
    fontSize: 16
  },
  infoText: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 10
  },
  categoryTextContainer: {
    paddingVertical: 15,
    paddingHorizontal:15,
    marginBottom: 50,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '400'
  },
  boldCategoryText: {
    fontWeight: '500'
  }
})