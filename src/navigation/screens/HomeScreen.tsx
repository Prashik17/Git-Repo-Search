import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp for typing

// Define the type for the repository
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
  Repository: { repository: Repository }; // Define the parameter type for 'Repository' screen
};

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Repository'>>(); // Typing the navigation prop
  const [query, setQuery] = useState<string>(''); // Specify the type as string
  const [repositories, setRepositories] = useState<Repository[]>([]); // Specify an array of Repository objects
  const [loading, setLoading] = useState<boolean>(false); // Specify the type as boolean

  useEffect(() => {
    if (query.length > 0) {
      const fetchRepo = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.github.com/search/repositories?q=${query}`
          );
          setRepositories(response.data.items); // TypeScript will now know the structure
        } catch (error) {
          console.log('Error fetching data', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRepo();
    } else {
      setRepositories([]);
    }
  }, [query]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Applying Linear Gradient as background */}
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f5d']} // Gradient colors
        style={styles.container}
      >
        <View style={{ alignItems: 'center', paddingVertical: '5%' }}>
          <Text style={styles.text1}>Search for Repositories</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Search repositories"
          value={query}
          onChangeText={setQuery} // Update query as user types
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
                keyExtractor={(item) => item.id.toString()} // Ensure the item has an 'id' property
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => navigation.navigate('Repository', { repository: item })} // Pass 'repository' to navigate
                  >
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>⭐ {item.stargazers_count} Stars</Text>
                    <Text>🍴 {item.forks_count} Forks</Text>
                    <Text>🧑‍💻 Language: {item.language || 'Not specified'}</Text>
                    <View style={styles.ownerContainer}>
                      <Image
                        source={{ uri: item.owner.avatar_url }}
                        style={styles.avatar}
                      />
                      <Text style={styles.ownerText}>Owner: {item.owner.login}</Text>
                    </View>
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
    paddingTop: '20%',
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
});
