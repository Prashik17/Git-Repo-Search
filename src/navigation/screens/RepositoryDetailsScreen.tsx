import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for the repository details
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
  owner: {
    login: string;
    avatar_url: string;
  };
}

const RepositoryDetailScreen = ({ route }: { route: RepositoryDetailScreenRouteProp }) => {
  const { repository } = route.params; // Extract the repository from route params
  const navigation = useNavigation(); // Access navigation

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f5d']} // Gradient colors
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>{repository.name}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <Text>⭐ {repository.stargazers_count} Stars</Text>
          <Text>🍴 {repository.forks_count} Forks</Text>
          <Text>🧑‍💻 Language: {repository.language || 'Not specified'}</Text>

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
    flexGrow: 1, // Allow content to grow and fill the screen
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly transparent background
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
    shadowOpacity: 0.2, // Increased shadow opacity for more effect
    shadowRadius: 12, // Slightly larger shadow radius
    elevation: 8, // Increased elevation for more pronounced shadow
    padding: 30, // Increased padding for larger card
    marginTop: 120, // Adjusted margin for larger card
    width: '100%', // Card width now takes up 90% of the screen width
    height:'75%',
    maxWidth: 700, // Set a max width for the card
  },
  title: {
    fontSize: 30, // Increased font size for title
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15, // Increased margin for more spacing
  },
  description: {
    fontSize: 20, // Increased font size for description
    marginVertical: 12, // Increased margin for spacing
    color: '#666',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15, // Increased margin for more spacing
  },
  avatar: {
    width: 80, // Increased avatar size
    height: 80, // Increased avatar size
    borderRadius: 40, // Adjusted for new avatar size
    marginRight: 15,
  },
  ownerText: {
    fontSize: 20, // Increased font size for owner text
    color: '#555',
  },
});

export default RepositoryDetailScreen;
