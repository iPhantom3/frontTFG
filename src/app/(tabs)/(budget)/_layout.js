import { Stack } from 'expo-router/stack';

export default function BudgetLayout() {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        contentStyle:{
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name='index' options={{
        headerTitle: 'Presupuestos', 
        headerTitleStyle: {fontSize:30}
      }}
      />
      <Stack.Screen name='addBudgetPage' options={{
        headerTitle: 'Nuevo Presupuesto', 
        headerTitleStyle: {fontSize:27}
      }}
      />
      <Stack.Screen name='budgets/[id]' options={{
        headerTitleStyle: {fontSize:27}
      }}
      />
    </Stack>
  );
}
