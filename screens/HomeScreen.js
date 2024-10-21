import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image, StyleSheet, Platform, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaces, suggestRandomPlace } from '../redux/actions';

// Import local images
const chinaWallImage = require('../images/wall.jpg');
const mohenjoImage = require('../images/mohenjo.jpeg');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places);
  const visitedPlaces = useSelector(state => state.visitedPlaces);
  const randomPlace = useSelector(state => state.randomPlace);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  // Use useMemo to memoize the isVisited check
  const isVisited = useMemo(() => {
    const visitedSet = new Set(visitedPlaces);
    return (id) => visitedSet.has(id);
  }, [visitedPlaces]);

  const getImage = (id) => {
    if (id === 1) return chinaWallImage; // Assuming ID 1 is for China Wall
    if (id === 2) return mohenjoImage; // Assuming ID 2 is for Mohenjo Daro
    return null; // Default in case there's no image for a particular ID
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeContainer}
              onPress={() => navigation.navigate('Details', { place: item })}
            >
              <Image source={getImage(item.id)} style={styles.thumbnail} />
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={[styles.visitedStatus, isVisited(item.id) ? styles.visited : styles.notVisited]}>
                {isVisited(item.id) ? 'Visited' : 'Not Visited'}
              </Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => dispatch(suggestRandomPlace())}>
          <Text style={styles.buttonText}>Suggest Random Place</Text>
        </TouchableOpacity>
        {randomPlace && <Text style={styles.randomPlace}>Random Place: {randomPlace.name}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  placeContainer: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: Platform.OS === 'ios' ? 12 : 8,
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  visitedStatus: {
    fontSize: 14,
    marginTop: 4,
  },
  visited: {
    color: 'green',
  },
  notVisited: {
    color: 'red',
  },
  randomPlace: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#007bff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
