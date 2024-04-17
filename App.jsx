

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from './text/Login';
import Register from './text/Register';
import Chat from './text/Chat';
import TabNavigator from './text/TabNavigator';
import User from './text/User';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='Tabnavigator' component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name='User' component={User} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;