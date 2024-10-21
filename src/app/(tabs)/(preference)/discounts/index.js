import { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../../config/api/appAPI';
import DiscountItemComponent from '../../../../components/DiscountsList/DiscountItemComponent';

export default Discounts = () => {
  
  const router = useRouter();
  const isFocused = useIsFocused();

  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      await appApi.get('/discounts').then((data) => {
        setDiscounts(data.data);
        setLoading(false);
      });
    };

    fetchDiscounts();
  }, [isFocused]);

  const renderItem = ({ item: discount }) => {
    return (
      <View>
        <DiscountItemComponent 
          title= {discount.title}
          id= {discount._id}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size= 'large'
              color= {'#3979FF'}
            />
          </View>
        ) : (
          <>
            {
              (discounts.length !== 0) ? (

                <View style={styles.discountsContainer}>
                  <FlatList
                    style= {styles.flatlistContainer}
                    data= {discounts}
                    renderItem= {renderItem}
                  />
                </View> 
              ) : (
                <View style={styles.noDiscountsContainer}>
                  <View style={styles.imageContainer}>
                    <Image 
                      style= {styles.image}
                      source= {require('../../../../../assets/no-budgets.png')}
                      contentFit= 'cover'
                    />
                    <Text style={styles.textInfo}>No se ha añadido ningún descuento</Text>
                  </View>
                </View>
              )
            }
          </>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  discountsContainer: {
    flex: 1,
  },
  noDiscountsContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  imageContainer: {
    alignItems: 'center',
    height: 310,
    width: 290
  },
  image: {
    flex: 1,
    width: '100%',
    marginBottom: 5
  },
  textInfo: {
    fontSize: 18,
    color: '#787878'
  },
  flatlistContainer: {
    flex: 1,
  },
});