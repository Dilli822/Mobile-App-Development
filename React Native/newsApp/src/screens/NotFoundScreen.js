import React from 'react';
import { View, Text, Button } from 'react-native';

function NotFoundScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>404 - Page Not Found</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default NotFoundScreen;
