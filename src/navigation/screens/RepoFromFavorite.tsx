import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for the repository details
type RepositoryDetailFromFavoritesScreenRouteProp = RouteProp<
  { RepositoryDetailFromFavorites: { repository: Repository } },
  'RepositoryDetailFromFavorites'
>;

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const RepositoryDetailFromFavoritesScreen = ({ route }: { route: RepositoryDetailFromFavoritesScreenRouteProp }) => {
  const { repository } = route.params;
  const navigation = useNavigation();

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

          {/* Owner Details */}
          <View style={styles.ownerContainer}>
            <Image
              source={{ uri: repository.owner.avatar_url }}
              style={styles.avatar}
            />
            <Text style={styles.ownerText}>Owner: {repository.owner.login}</Text>
          </View>
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
});

export default RepositoryDetailFromFavoritesScreen;
