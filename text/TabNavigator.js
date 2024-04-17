import React from 'react';
import {StyleSheet,Text} from 'react-native';
import ListChat from './ListChat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import login from './Login';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import listFriend from './ListFriend';
import User from './User';
const Tab = createBottomTabNavigator();
const TabNavigator = (props) => {
    return (
        
    <Tab.Navigator
    screenOptions={({route, navigation}) => ({
      tabBarLabelStyle: {fontSize: 12},
      tabBarItemStyle: {height: 50},
      tabBarActiveTintColor: '#0275d8',
      tabBarInactiveTintColor: 'grey',
      swipeEnabled: true,
      headerShown:false,
      

 
      tabBarLabel: ({focused, color}) => {
        return <Text style={{color}}>{route.name}</Text>;
      },

      tabBarShowLabel: navigation.isFocused(),
      tabBarIcon: ({color, size}) => {
        let iconName;
        if (route.name === 'Tin nhắn') {
          iconName = 'comment';
        } else if (route.name === 'Danh bạ') {
          iconName = 'address-book';
        } else {
          iconName = 'user';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'black',
    })}>
    <Tab.Screen name="Tin nhắn" component={ListChat} />
    <Tab.Screen name="Danh bạ" component={listFriend} />
    <Tab.Screen name="Cá nhân" component={User} />
  </Tab.Navigator>
    );
};


export default TabNavigator;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeElement: {color: 'white', fontSize: 10},
    iconBadge: {
      color: 'white',
      fontSize: 10,
      width: 15,
      height: 15,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF5B05',
      marginTop: -26,
      marginLeft: 14,
    },
  });
  