import { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import filter from 'lodash.filter';

import { appApi } from '../../config/api/appAPI';
import OfferCardComponent from './OfferCardComponent';
import SearchInput from './SearchInput';

const UserOffersListComponent = () => {

  const isFocused = useIsFocused();

  const [offers, setOffers] = useState([]);
  const [fullOffers, setFullOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    const formattedQuery = query.toLowerCase();

    const filteredOffers = []
    for(let category of fullOffers){
      const filteredCategory = {};

      filteredCategory.name = category.name;
      filteredCategory.offers = filter(category.offers, (offer) => {
        return contains(offer, formattedQuery);
      });
      
      filteredOffers.push(filteredCategory)
    }
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
      await appApi.get('/offers/useroffers').then((data) => {
        setOffers(data.data);
        setFullOffers(data.data);
        setLoading(false);
      });
    };

    fetchOffers();
  }, [isFocused]);

  const renderItem = ({ item: category }) => {
    return (
      <View>
        {
          (category.offers.length !== 0) && (
            <>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              <FlatList
                data={category.offers}
                style={{marginBottom: 20}}
                keyExtractor={(offer) => offer._id}
                renderItem={({ item: offer }) => (
                  <OfferCardComponent 
                    title={offer.title}
                    id={offer._id}
                    description={offer.description}
                    imageUrl={offer.imageUrl}
                  />
                )}
              ></FlatList>
            </>
          )
        }
      </View>
    );
  };

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
                <FlatList
                  style={styles.flatlistContainer}
                  data={offers}
                  renderItem={renderItem}
                ></FlatList>
              </View>
            }
          </>
        )
      }
    </>
  )
}

export default UserOffersListComponent

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