import { useRouter } from 'expo-router';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View, 
  Alert 
} from 'react-native';

import { appApi } from '../../config/api/appAPI';

export default Button = ({ label, activate, offerId }) => {

  const router = useRouter();

  const colorBackground = activate ? '#3979FF' : '#F4F4F4';
  const colorFont = activate ? 'white' : 'black';

  const onPressActivateOffer = () => {
    router.replace({
      pathname: `/offers/cloneOfferPage`,
      params: {offerId: offerId}
    });
  };

  const onPressDeactivateOffer = () => {
    Alert.alert('Desactivar oferta', '¿Desea desactivar esta oferta?', [
      {
        text: 'Cancelar',
        onPress: async () => {
        }
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const response = await appApi.put(`/offers/${offerId}/inactive`);
          if(response) {
            router.replace({
              pathname: `/offers/${offerId}`,
            });
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style= {{...styles.button, backgroundColor: `${colorBackground}`}} 
        onPress= {activate ? onPressActivateOffer : onPressDeactivateOffer}
      >
        <Text style={{...styles.label, color: `${colorFont}`}}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal:20
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: 18
  },
});
