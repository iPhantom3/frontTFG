import { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Link, Stack, useFocusEffect } from 'expo-router';


import AllOffersListComponent from '../../../components/OffersList/AllOffersListComponent';
import InactiveOffersListComponent from '../../../components/OffersList/InactiveOfferListComponent';
import UserOffersListComponent from '../../../components/OffersList/UserOffersListComponent';
import TopButtonsComponent from '../../../components/OffersList/TopButtonsComponent';

import ClicklableBellIcon from '../../../components/ClicklableBellIcon';
import { appApi } from '../../../config/api/appAPI';

export default function Inicio() {
  const { userInfo } = useSelector((state) => state.auth);

  const [isProfessional, setIsProfessional] = useState(
    userInfo && userInfo.isProfessional
  );

  const [forYouOffers, setForYouOffers] = useState({
    active: true,
    backgroundColor: '#E6EFFD',
  });
  const [allOffers, setAllOffers] = useState({
    active: false,
    backgroundColor: 'white',
  });
  const [activeOffers, setActiveOffers] = useState({
    active: true,
    backgroundColor: '#E6EFFD',
  });
  const [inactiveOffers, setInactiveOffers] = useState({
    active: false,
    backgroundColor: 'white',
  });

  const [notifications, setNotifications] = useState(false);

  useFocusEffect(() => {
    const fetchNotifications = async () => {
      await appApi.get(`/notifications/arenotifications`).then((data) => {
        setNotifications(data.data.areNotifications);
      });
    };

    fetchNotifications();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
          options={{
            headerRight: () => <ClicklableBellIcon areNotifications={notifications}/>,
          }}
        />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Nuestras Ofertas</Text>
        {isProfessional && (
          <Link style={styles.addLink} href={'/offers/addOfferPage'}>
            Añadir
          </Link>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        {isProfessional ? (
          <TopButtonsComponent
            leftButtonState={activeOffers}
            leftButtonSetState={setActiveOffers}
            rightButtonState={inactiveOffers}
            rightButtonSetState={setInactiveOffers}
            leftButtonText='Activas'
            rightButtonText='Inactivas'
          />
        ) : (
          <TopButtonsComponent
            leftButtonState={forYouOffers}
            leftButtonSetState={setForYouOffers}
            rightButtonState={allOffers}
            rightButtonSetState={setAllOffers}
            leftButtonText='Para ti'
            rightButtonText='Todas'
          />
        )}
      </View>
      <View style={styles.offersContainer}>
        {isProfessional ? (
          <>
            {activeOffers.active ? (
              <AllOffersListComponent />
            ) : (
              <InactiveOffersListComponent />
            )}
          </>
        ) : (
          <>
            {forYouOffers.active ? (
              <UserOffersListComponent />
            ) : (
              <AllOffersListComponent />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
  addLink: {
    fontSize: 20,
    color: '#246DDB',
  },
  buttonsContainer: {
    height: 60,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  offersContainer: {
    flex: 1,
  },
});
