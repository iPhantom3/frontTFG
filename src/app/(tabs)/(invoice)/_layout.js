import { Link } from 'expo-router';
import { Stack } from 'expo-router/stack';

export default function InvoiceLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle:{
            backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name='index' options={{
        headerTitle: 'Facturas', 
        headerTitleStyle: {fontSize:30},
        headerRight: () => 
          <Link 
            href='/(invoice)/addInvoicePage'
            style={{
              color: '#246DDB',
              fontSize: 23
            }}
          >
            Añadir
          </Link>
      }}/>
      <Stack.Screen name='profInvoices/[id]' options={{
        headerTitleStyle: {fontSize:27}
      }}/>
      <Stack.Screen name='addInvoicePage' options={{
        headerTitle: 'Nueva factura', 
        headerTitleStyle: {fontSize:30},
      }}/>
    </Stack>
  );
}
