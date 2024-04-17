
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Header from './Header';
import { ref, onValue, getDatabase } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ListChat =  ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const chatUserRef = ref(getDatabase(), 'users');

    const callback = snapshot => {
      const data = snapshot.val();
      if (data) {
        const userArray = Object.entries(data).map(([key, value]) => ({
          _id: key,
          name: value.name,
          email: value.email.toLowerCase(),
        }));

        // Filter out the current user
    
        const filteredUsers = userArray.filter(user => user.email !== currentUser.email);
        console.log(currentUser.email)
        setUsers(filteredUsers);
      }
    };

    const unsubscribeUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    const unsubscribeChat = onValue(chatUserRef, callback);

    // Clean up subscriptions when the component unmounts
    return () => {
      unsubscribeUser();
      unsubscribeChat();
    };
  }, [currentUser]);


  const createChatRoom = (selectedUser) => {
    // Sanitize the email addresses to create a valid roomId
    const sanitizeEmail = (email) => email.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedRoomId = [sanitizeEmail(currentUser.email), sanitizeEmail(selectedUser.email)].sort().join('_');
    
    navigation.navigate('Chat', { roomId: sanitizedRoomId, selectedUser });
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
     <TouchableOpacity onPress={() => createChatRoom(item)} style={{ flexDirection: 'row' }}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x' }}
        />
        <View style={styles.avatarChat}>
          <Text style={{ color: 'black' }}>{item.name}</Text>
          <Text style={{ color: 'black' }}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const someDataToPass = 'listChat';

  return (
    <View style={styles.container}>
      <Header someData={someDataToPass} />
      <View style={styles.center}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </View>
  );
};

export default ListChat;
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  
  },
  tab: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabButton: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabText: {
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenText: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
  },
  header:{
    flexDirection:'row',
    backgroundColor:'blue',
    flex:0.6,
  },
  textHeader:{
 textAlign:'left',
    color:'white',

    fontSize:20,
    lineHeight: 50,
    paddingLeft:7,
  },
  textFooter:{
 
    color:'white',
    height:60,
    fontSize:20,
    lineHeight: 50,
    paddingLeft:15,
  },
  center:{
    backgroundColor:'#e9e5e5',
    flex:8
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
  avatarChat:{
flexDirection:'column',

  },
  title: {
    fontSize: 32,
  },
  footer:{
    flexDirection:'row',

    backgroundColor:'white',
    flex:1
  }
})
        // const imageName = `${auth?.currentUser?.uid}_${new Date().getTime()}.jpg`;
        // const storageReference = storageRef(storages, `images/${imageName}`);
        // const metadata = { contentType: 'image/jpg' };

        // // Use fetch to read the file as a blob
        // const response = await fetch(imageUrl);
        // const blob = await response.blob();

        // // Upload the blob to Firebase Storage using 'put'
        // await uploadString(storageReference, imageUrl, 'data_url', metadata);

        // // Get the download URL for the uploaded file
        // const downloadURL = await getDownloadURL(storageReference);