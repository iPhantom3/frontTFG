import { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../config/api/appAPI';
import InvoiceItemComponent from '../../../components/InvoicesList/InvoiceItemComponent';

export default Invoices = () => {

  const router = useRouter();
  const isFocused = useIsFocused();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      await appApi.get('/invoices').then((data) => {
        setInvoices(data.data);
        setLoading(false);
      });
    };

    fetchInvoices();
  }, [isFocused]);

  const renderItem = ({ item: invoice }) => {
    return (
      <View>
        <InvoiceItemComponent 
          title= {`Factura #${invoice.invoiceNumber}`}
          onPress= {() => {
            router.push({
              pathname: `/profInvoices/${invoice._id}`,
            })
          }}
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
              (invoices.length !== 0) ? (
                <View style={styles.invoicesContainer}>
                  <FlatList
                    style= {styles.flatlistContainer}
                    data= {invoices}
                    renderItem= {renderItem}
                  />
                </View> 
              ) : (
                <View style= {styles.noInvoicesContainer}>
                  <View style= {styles.imageContainer}>
                    <Image 
                      style= {styles.image}
                      source= {require('../../../../assets/no-invoices.png')}
                      contentFit= 'contain'
                    />
                    <Text style={styles.textInfo}>No se ha añadido ninguna factura</Text>
                  </View>
                </View>
              )
            }
          </>
        )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  invoicesContainer: {
    flex: 1,
  },
  noInvoicesContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  imageContainer: {
    alignItems: 'center',
    height: 300,
    width: 280
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