// src/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import NotFoundScreen from './screens/NotFoundScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['yourapp://'],
        config: {
          screens: {
            Home: 'home',
            Details: 'details',
            NotFound: '*',
          },
        },
      }}
    >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;