import React from 'react';
import { View, Text, Image, Button, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { markVisited, unmarkVisited } from '../redux/actions';

// Import local images
const chinaWallImage = require('../images/wall.jpg');
const mohenjoImage = require('../images/mohenjo.jpeg');

const DetailsScreen = ({ route }) => {
  const { place } = route.params;
  const visitedPlaces = useSelector(state => state.visitedPlaces);
  const dispatch = useDispatch();

  const isVisited = visitedPlaces.includes(place.id);

  const getImage = (id) => {
    if (id === 1) return chinaWallImage;
    if (id === 2) return mohenjoImage;
    return null;
  };

  if (!place) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Place not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={getImage(place.id)} style={styles.image} />
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.description}>{place.description}</Text>
        <Button
          title={isVisited ? 'Unmark Visited' : 'Mark Visited'}
          onPress={() => isVisited ? dispatch(unmarkVisited(place.id)) : dispatch(markVisited(place.id))}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default DetailsScreen;
