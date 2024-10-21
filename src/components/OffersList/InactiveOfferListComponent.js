import { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import filter from 'lodash.filter';

import { appApi } from '../../config/api/appAPI';
import OfferCardComponent from './OfferCardComponent';
import SearchInput from './SearchInput';

const InactiveOfferListComponent = () => {

  const isFocused = useIsFocused();

  const [offers, setOffers] = useState([]);
  const [fullOffers, setFullOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredOffers = filter(fullOffers, (offer) => {
      return contains(offer, formattedQuery);
    })
    setOffers(filteredOffers)
  };

  const contains = ({title}, query) => {
    if(title.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {

    const fetchOffers = async () => {
      await appApi.get('/offers/inactive').then((data) => {
        setOffers(data.data);
        setFullOffers(data.data);
        setLoading(false);
      });
    };

    fetchOffers();
  }, [isFocused]);

  return (
    <>
    {
      loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size='large'
            color={'#3979FF'}
          />
        </View>
      ) : (
        <>
            {
              <View style={styles.container}>
                <SearchInput 
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                />
                <Text style={styles.categoryTitle}>Ofertas Inactivas</Text>
                <FlatList
                  style={styles.flatlistContainer}
                  data={offers}
                  keyExtractor={(offer) => offer._id}
                  renderItem={({ item: offer }) => (
                    <OfferCardComponent 
                      title={offer.title}
                      id={offer._id}
                      description={offer.description}
                      imageUrl={offer.imageUrl}
                    />
                  )}
                />
              </View>
            }
          </>
        )
      }
    </>
  );
}

export default InactiveOfferListComponent

const styles = StyleSheet.create({
  loadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  flatlistContainer: {
    flex: 1,
  },
  categoryTitle:{
    fontSize: 20,
    fontWeight:'600',
    marginBottom: 10
  },
})