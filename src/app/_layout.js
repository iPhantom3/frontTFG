import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { persistor, store } from '../utils/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
            <Stack.Screen
              name='auth/signInPage'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='auth/signUpPage'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='auth/forgotPasswordPage'
              options={{ 
                headerTitle: 'Restablecer contraseña',
                headerTitleStyle: {fontSize:27}
              }}
            />
            <Stack.Screen
              name='auth/resetPasswordPage'
              options={{ 
                headerTitle: 'Restablecer contraseña',
                headerTitleStyle: {fontSize:27} 
              }}
            />
          </Stack>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
