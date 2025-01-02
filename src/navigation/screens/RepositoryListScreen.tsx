import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeFavorite } from '../../redux/favoritesSlice';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  RepoFromFav: { repository: any };
  // other screens can be added here
};

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RepoFromFav'>;

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  const handleNavigateToDetail = (repository: any) => {
    navigation.navigate('RepoFromFav', { repository });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorite Repositories</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => handleNavigateToDetail(item)}>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text>{item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFavorite(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove from Favorites</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
