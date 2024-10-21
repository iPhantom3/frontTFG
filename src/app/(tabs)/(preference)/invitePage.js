import { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Octicons from '@expo/vector-icons/Octicons';

import { appApi } from '../../../config/api/appAPI';

import InvitationProgress from '../../../components/Invitation/InvitationProgress';
import AffiliateCodeClipboard from '../../../components/Invitation/AffiliateCodeClipboard';
import ShareComponent from '../../../components/Invitation/ShareComponent';

export default invitePage = () => {

  const [invitationInfo, setInvitationInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitationInfo = async () => {
      await appApi.get('/users/invitation').then((data) => {
        setInvitationInfo(data.data);
        setLoading(false);
      });
    };
    fetchInvitationInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size= 'large'
              color= {'#3979FF'}
            />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            {
              (invitationInfo && invitationInfo.noDiscount) ? (
                <View style={styles.noDiscountContainer}>
                  <View style={styles.noDiscountInfoContainer}>
                    <Octicons 
                      name= 'no-entry' 
                      size= {170} 
                      color= '#adadad'
                      style= {{marginBottom: 10}} />
                    <Text style={styles.noDiscountText}>No hay ningún descuento activo</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.progressContainer}>
                  <InvitationProgress
                    fill= {((invitationInfo.affiliates/invitationInfo.limit)*100)}
                    limit= {invitationInfo.limit}
                    affiliates= {invitationInfo.affiliates}
                  />
                  </View>
                  <View style={styles.percentContainer}>
                    <Text style={styles.discountText}>Descuento disponible</Text>
                    <Text style={styles.percentText}>{invitationInfo.percent}*</Text>
                    <Text style={styles.infoText}>*Consulta validez con tu profesional</Text>
                  </View>
                </View> 
              )
            }
            
            <View style={styles.shareContainer}>
              <Text style={styles.friendCodeText}>Mi código amigo</Text>
              <AffiliateCodeClipboard 
                affiliateCode= {invitationInfo.affiliateCode}
              />
              <ShareComponent 
                affiliateCode= {invitationInfo.affiliateCode}
              />
            </View>
          </ScrollView>
        )
      }
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressContainer: {
    flex: 3,
    borderBottomColor: '#b6b4b4',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentContainer: {
    flex: 1,
    borderBottomColor: '#b6b4b4',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  shareContainer: {
    flex: 2,
    alignItems: 'center',
    marginBottom: 30,
  },
  discountText: {
    marginTop: 17,
    fontSize: 17,
    fontWeight: '400',
  },
  percentText: {
    fontSize: 50,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 15
  },
  friendCodeText: {
    marginTop: 20,
    fontSize: 23,
    fontWeight: '500',
  },
  noDiscountText: {
    fontSize: 16,
    color: '#787878',
    textAlign: 'justify',
  },
  noDiscountContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#b6b4b4',
    borderBottomWidth: 1,
  },
  noDiscountInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});