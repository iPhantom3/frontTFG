import { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { appApi } from '../../../config/api/appAPI';

import CustomButton from '../../../components/Form/CustomButton';
import BudgetItemComponent from '../../../components/BudgetsList/BudgetItemComponent';

export default Budgets = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const router = useRouter();

  const isFocused = useIsFocused();

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToAddForm = () => {
    router.push('/addBudgetPage');
  };

  useEffect(() => {
    const fetchUserBudgets = async () => {
      await appApi.get('/budgets/userbudgets').then((data) => {
        setBudgets(data.data);
        setLoading(false);
      });
    };
    const fetchProfBudgets = async () => {
      await appApi.get('/budgets').then((data) => {
        setBudgets(data.data);
        setLoading(false);
      });
    };

    if (userInfo.isProfessional) {
      fetchProfBudgets();
    } else {
      fetchUserBudgets();
    }
  }, [isFocused]);

  const renderItem = ({ item: budget }) => {
    return (
      <View>
        <BudgetItemComponent
          title={budget.title}
          clientMessage={budget.clientMessage}
          id={budget._id}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={'#3979FF'} />
        </View>
      ) : (
        <>
          {budgets.length !== 0 ? (
            <View style={styles.container}>
              <FlatList
                style={styles.flatlistContainer}
                data={budgets}
                renderItem={renderItem}
              />
              {userInfo && !userInfo.isProfessional && (
                <CustomButton
                  label='Solicitar presupuesto'
                  onPress={goToAddForm}
                />
              )}
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.noBudgetsContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../../../../assets/no-budgets.png')}
                    contentFit='cover'
                  />
                  {userInfo && userInfo.isProfessional ? (
                    <Text numberOfLines={2} style={styles.textInfo}>
                      No hay ninguna solicitud de presupuesto
                    </Text>
                  ) : (
                    <Text style={styles.textInfo}>
                      No ha solicitado ningún presupuesto
                    </Text>
                  )}
                </View>
              </View>
              {userInfo && !userInfo.isProfessional && (
                <CustomButton
                  label='Solicitar presupuesto'
                  onPress={goToAddForm}
                />
              )}
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  noBudgetsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    height: 310,
    width: 290,
  },
  image: {
    flex: 1,
    width: '100%',
    marginBottom: 5,
  },
  textInfo: {
    fontSize: 16,
    color: '#787878',
    textAlign: 'justify',
  },
  flatlistContainer: {
    flex: 1,
  },
});
