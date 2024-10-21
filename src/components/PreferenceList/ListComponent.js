import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import ListItemComponent from './ListItemComponent';
import LogoutButton from './LogoutButton';

const ListComponent = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <ListItemComponent
          title='Datos'
          description='Gestiona los datos de tu cuenta'
          onPress={() => router.push('/(tabs)/(preference)/users/profilePage')}
        />
        {userInfo && !userInfo.isProfessional ? (
          <ListItemComponent
            title='Invitaciones'
            description='Gestiona tu programa de amigos'
            onPress={() => router.push('/(tabs)/(preference)/invitePage')}
          />
        ) : (
          ''
        )}
        {userInfo && !userInfo.isProfessional ? (
          <ListItemComponent
            title='Facturas'
            description='Visualiza tus compras en el establecimiento'
            onPress={() => router.push('/(tabs)/(preference)/invoices/')}
          />
        ) : (
          ''
        )}
        {userInfo && userInfo.isProfessional ? (
          <ListItemComponent
            title='Descuentos'
            description='Gestiona los descuentos activos'
            onPress={() => router.push('/(tabs)/(preference)/discounts/')}
          />
        ) : (
          ''
        )}
      </View>
      <View>
        <LogoutButton />
      </View>
    </View>
  );
};

export default ListComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
