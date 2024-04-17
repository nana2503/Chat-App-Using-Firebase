import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  SectionList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import {useEffect, useState} from 'react';
import axios from 'axios';


const ListFriendDetail = (props) => {
    
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

const renderItem = ({ item }) => (
  <View style={styles.item}>
     <Image
      style={styles.avatar}
      source={{ uri: item.avatar }}
    />
    <View
    style={styles.avatarChat}
    >
    <Text>{item.first_name} {item.last_name}</Text>
    <Text>Email: {item.email}</Text>
    </View>
  </View>
);
  return (
    <View style={styles.container}>
   
      <View style={styles.center}>
        {/* <View style={{justifyContent: 'center', flex: 1}}>
         <View style={styles.iconFriend}> 
            <View style={{flexDirection:'row',alignItems: 'center',paddingLeft:'15'}}>
                    <Icon  name="users" size={25} color="blue" />
                <View style={styles.textFriend} >
                    <Text style={styles.textHeader}>Lời mời kết bạn</Text>
                    <Text  >Email: </Text>
                </View>
            </View>
        </View> */}
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="users" size={25} color="blue" /> Lời mời kết bạn
          </Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="address-book" size={25} color="blue" /> Danh bạ máy
          </Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="birthday-cake" size={25} color="blue" /> Lịch sinh nhật
          </Text>
        </View>
      </View>
      {/* <View style={{height:'10',backgroundColor:'#e9e5e5'}}></View> */}
      <View style={styles.footer}>
        <View style={{flexDirection:'row',}}>
            <View style={{backgroundColor:'#e9e5e5', borderRadius:10, alignItems:'center',borderColor:'black',flex:2,}}>
                 <Text >Tất cả</Text>
            </View>
            <View style={{ borderRadius:10, alignItems:'center',borderColor:'black',flex:2}}>
            <Text>Mới truy cập</Text>
            </View>
        <View style={{ flex:2}}></View>
        </View>
        <View>


        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
   
    
       
        </View>
      </View>
    
    </View>
  );
};

export default ListFriendDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textFriend:{
    flexDirection:'column',
    textAlign: 'left',
    color: 'black',
  },
  iconFriend:{
flexDirection:'row'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    flex: 0.6,
  },
  textHeader: {
    textAlign: 'left',
    color: 'black',

    fontSize: 20,
    lineHeight: 50,
    paddingLeft: 7,
  },
  textFooter: {
    color: 'white',
    height: 60,
    fontSize: 20,
    lineHeight: 50,
    paddingLeft: 15,
  },
  center: {
    backgroundColor: 'white',
    flex: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  avatarChat: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
  },
  footer: {
    flexDirection: 'column',

    backgroundColor: 'white',
    flex: 7,
    //height:'50',
  },
});
