import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { useDispatch } from 'react-redux';
import { addFavorite } from '../../redux/favoritesSlice'; 
import { FontAwesome } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';  // Import NetInfo

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

type RootStackParamList = {
  Repository: { repository: Repository };
  RepositoryList: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Repository'>>();
  const dispatch = useDispatch();
  const [query, setQuery] = useState<string>('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);  // State for internet connectivity

  useEffect(() => {
    // Check the network connection status
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);  // Set the state if connected or not
    });

    // Clean up the listener when component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const fetchRepo = async () => {
        if (!isConnected) {
          Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
          return;
        }

        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.github.com/search/repositories?q=${query}`
          );
          setRepositories(response.data.items);
        } catch (error) {
          console.log('Error fetching data', error);
          Alert.alert('Error', 'Something went wrong while fetching repositories.');
        } finally {
          setLoading(false);
        }
      };

      fetchRepo();
    } else {
      setRepositories([]);
    }
  }, [query, isConnected]);

  const handleAddFavorite = (repository: Repository) => {
    dispatch(addFavorite(repository)); // Dispatch to add the repository to favorites
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f5d']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("RepositoryList")}>
          <FontAwesome name="star" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', paddingVertical: '5%' }}>
          <Text style={styles.text1}>Type to search</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search repositories"
          value={query}
          onChangeText={setQuery}  // Removed the empty validation here
        />
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            {query.length === 0 ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>Search for repositories</Text>
              </View>
            ) : repositories.length === 0 ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.text}>No repositories found</Text>
              </View>
            ) : (
              <FlatList
                data={repositories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('Repository', { repository: item })}
                  >
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>⭐ {item.stargazers_count} Stars</Text>
                    <Text>🍴 {item.forks_count} Forks</Text>
                    <Text>🧑‍💻 Language: {item.language || 'Not specified'}</Text>
                    <View style={styles.ownerContainer}>
                      <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                      <Text style={styles.ownerText}>Owner: {item.owner.login}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => handleAddFavorite(item)}
                    >
                      <Text style={styles.favoriteButtonText}>❤️ Add to Favorites</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            )}
          </>
        )}
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '25%',
  },
  input: {
    height: '6%',
    borderRadius: '4%',
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white', // Ensure the input field has a background for visibility
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  text1: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 26,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  ownerText: {
    fontSize: 14,
    color: '#555',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    right: 30,
    marginVertical:'5%',
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
  favoriteButton: {
    backgroundColor: 'green',
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
