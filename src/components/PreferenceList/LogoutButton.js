import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

import { useLogoutMutation } from '../../utils/redux/usersApiSlice';
import { logout } from '../../utils/redux/authSlice';

const LogoutButton = () => {
  const router = useRouter();
  const [logoutAPICall] = useLogoutMutation();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      
      const res = await logoutAPICall().unwrap();

      dispatch(logout());

      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.label}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingVertical: 18,
    borderRadius: 10,
  },
  label: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default LogoutButton;
