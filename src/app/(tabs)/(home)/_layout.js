import { Stack } from 'expo-router/stack';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle:{
            backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name='index' 
        options={{
          headerTitle: 'EuroTaller', 
          headerTitleStyle: {fontSize:30},
        }}
      />
      <Stack.Screen name= 'notifications/list'
        options={{
          headerTitle: 'Notificaciones', 
          headerTitleStyle: {fontSize:30},
         }}
      />
      <Stack.Screen name= 'offers/addOfferPage'
        options={{
          headerTitle: 'Añadir oferta', 
          headerTitleStyle: {fontSize:30},
         }}
      />
      <Stack.Screen name= 'offers/cloneOfferPage'
        options={{
          headerTitle: 'Clonar oferta', 
          headerTitleStyle: {fontSize:30},
         }}
      />
      <Stack.Screen name= 'offers/[id]' 
        options={{
          headerTitleStyle: {fontSize:27}
        }}
      />
    </Stack>
  );
}
