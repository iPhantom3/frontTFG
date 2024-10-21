import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';

export default function TabsLayout() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3979FF',
          tabBarStyle: {
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 15,
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name='(home)'
          options={{
            title: 'Inicio',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name='home-outline' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='(budget)'
          options={{
            title: 'Presupuesto',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                size={28}
                name='chatbox-ellipses-outline'
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='(invoice)'
          options={{
            title: 'Facturas',
            href: userInfo && userInfo.isProfessional ? '(invoice)' : null,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name='document-text-outline' size={28} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name='(preference)'
          options={{
            title: 'Preferencias',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name='options-outline' color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
