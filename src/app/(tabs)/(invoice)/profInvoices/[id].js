import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '../../../../config/api/appAPI';
import CustomTextView from '../../../../components/ViewData/CustomTextView';
import DeleteInvoiceModal from '../../../../components/InvoicesList/DeleteInvoiceModal';

export default profInvoicePage = () => {

  const local = useLocalSearchParams();

  const [invoice, setInvoice] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      await appApi.get(`/invoices/${local.id}`).then((data) => {
        setInvoice(data.data);
        setLoading(false);
      });
    };

    fetchInvoice();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{
        title: `Factura #${invoice.invoiceNumber}`,
        headerRight: () => <DeleteInvoiceModal invoiceId={invoice._id} isProfessional={true} />
      }} />
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
            <Text style={styles.invoiceDateText}>Fecha de factura: {invoice.invoiceDate}</Text>
            <CustomTextView 
              label= {'Nombre del cliente'}
              value= {invoice.userName}
            />
            <CustomTextView 
              label= {'Método de pago'}
              value= {invoice.paymentMethod}
            />
            <CustomTextView 
              label= {'Subtotal sin IVA'}
              value= {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
                  .format(invoice.cost)}
            />
            <CustomTextView 
              label= {'IGIC 7%'}
              value= {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
                  .format((invoice.cost * 0.07).toFixed(2))}
            />
            <CustomTextView 
              label= {'Total'}
              value= {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
                  .format((invoice.cost + (invoice.cost * 0.07)).toFixed(2))}
            />
          </>
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
  invoiceDateText: {
    marginTop: 10,
    marginLeft: 15,
    fontSize:20,
    color: '#616161'
  }
})