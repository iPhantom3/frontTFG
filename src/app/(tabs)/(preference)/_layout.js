import { Link } from 'expo-router';
import { Stack } from 'expo-router/stack';

export default function PreferencesLayout() {
  return (
    <Stack
      screenOptions= {{
        contentStyle:{
            backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name='index' options={{
        headerTitle: 'Preferencias', 
        headerTitleStyle: {fontSize:30}
        }}/>
      <Stack.Screen name='invitePage' options={{
        headerTitle: 'Invitaciones', 
        headerTitleStyle: {fontSize:30}
      }}/>
      <Stack.Screen name='users/profilePage' options={{
        headerTitle: 'Datos', 
        headerTitleStyle: {fontSize:30},
        headerRight: () => 
          <Link 
            href='/users/editUserPage'
            style={{
              color: '#246DDB',
              fontSize: 23
            }}
          >Editar</Link>
      }}/>
      <Stack.Screen name= 'users/editUserPage' options={{
        headerTitle: 'Datos', 
        headerTitleStyle: {fontSize:30}
      }}/>
      <Stack.Screen name='invoices/index' options={{
        headerTitle: 'Facturas', 
        headerTitleStyle: {fontSize:30}
      }}/>
      <Stack.Screen name='invoices/[id]' options={{
        headerTitleStyle: {fontSize:27}
      }}/>
      <Stack.Screen name='discounts/index' options={{
        headerTitle: 'Descuentos', 
        headerTitleStyle: {fontSize:30}, 
        headerRight: () => 
          <Link 
            href='/discounts/addDiscountPage'
            style= {{
              color: '#246DDB',
              fontSize: 23
            }}
          >
            Añadir
          </Link>
      }}/>
      <Stack.Screen name='discounts/[id]' options={{
        headerTitleStyle: {fontSize:27}
      }}/>
      <Stack.Screen name='discounts/addDiscountPage' options={{
        headerTitle: 'Nuevo Descuento', 
        headerTitleStyle: {fontSize:27}
      }}/>
    </Stack>
  );
}
