import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../../redux/favoritesSlice';
import dayjs from 'dayjs';


type RepositoryDetailScreenRouteProp = RouteProp<
  { RepositoryDetail: { repository: Repository } },
  'RepositoryDetail'
>;

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string; 
  updated_at: string; 
  owner: {
    login: string;
    avatar_url: string;
  };
}

const RepositoryDetailScreen = ({ route }: { route: RepositoryDetailScreenRouteProp }) => {
  const { repository } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite((prev) => !prev);
    dispatch(addFavorite(repository));
    Alert.alert(
      isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      `${repository.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites.`
    );
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f5d']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Repository Details Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{repository.name}</Text>
          <Text style={styles.description}>{repository.description || 'No description available'}</Text>
          <Text>⭐ {repository.stargazers_count} Stars</Text>
          <Text>🍴 {repository.forks_count} Forks</Text>
          <Text>🧑‍💻 Language: {repository.language || 'Not specified'}</Text>
           <Text>📅 Created: {dayjs(repository.created_at).format('YYYY-MM-DD')}</Text>
                              <Text>🔄 Last Updated: {dayjs(repository.updated_at).format('YYYY-MM-DD')}</Text>

          {/* Owner Details */}
          <View style={styles.ownerContainer}>
            <Image
              source={{ uri: repository.owner.avatar_url }}
              style={styles.avatar}
            />
            <Text style={styles.ownerText}>Owner: {repository.owner.login}</Text>
          </View>

          {/* Add to Favorites Button */}
          <TouchableOpacity style={styles.favoriteButton} onPress={handleAddToFavorites}>
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    padding: 20,
    marginTop: 100,
    width: '90%',
    maxWidth: 700,
    height: '75%',
    gap:8
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    color: '#666',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  ownerText: {
    fontSize: 18,
    color: '#555',
  },
  favoriteButton: {
    marginTop: 20,
    backgroundColor: '#3b5998',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default RepositoryDetailScreen;
