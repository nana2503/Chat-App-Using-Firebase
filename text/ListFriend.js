import React , { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import login from './Login';
import ListFriendDetail from './ListFriendDetail';
import { View, StyleSheet, Dimensions, StatusBar ,Text} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import User from './User';
//const Tab = createBottomTabNavigator();
import Header from './Header';
const Tab = createMaterialTopTabNavigator();
const ListFriend = (props) => {
    const [index, setIndex] = useState(0);
  const [routes] = useState([
          { key: 'first', title: 'Bạn bè' },
          { key: 'second', title: 'Nhóm' },
          { key: 'thirt', title: 'OA' },
  ]);
   
  const someDataToPass = "listFriend";
    return (
      <>
    <Header someData={someDataToPass} />
        <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
            first: ListFriendDetail,
            second: User,
            thirt: User,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.tabScreen}
      />
       </>
    );
};


export default ListFriend;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabScreen: {
        //marginTop: StatusBar.currentHeight,
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
  