import { launchImageLibrary } from 'react-native-image-picker';
import React, { useCallback, useState, useLayoutEffect ,useEffect} from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ref, onValue, off, push } from 'firebase/database';
import { db, auth, storages } from '../firebase/firebase';
import { ref as storageRef, uploadString, getDownloadURL } from '@react-native-firebase/storage';
import  storage  from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import RNFS from 'react-native-fs';
const Chat = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [url, setUrl] = useState('');
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity >
            <Icon name="paperclip" size={25} color="#007AFF" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('Tabnavigator')}>
          <Icon name="arrow-right" size={30} color="black" style={{ alignItems: 'center', justifyContent: 'center' }} />
        </TouchableOpacity>
      ),
    }, [navigation, roomId]);

    const chatRef = ref(db, `chats/${roomId}`);
    const callback = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries(data)
          .map(([key, value]) => ({
            _id: key,
            createdAt: new Date(value.createdAt),
            text: value.text,
            user: value.user,
            image: value.image,
          }))
          .sort((a, b) => b._id.localeCompare(a._id));
        setMessages(messagesArray);
      }
    };

    onValue(chatRef, callback);

    return () => {
      off(chatRef, callback);
    };
  }, [navigation, roomId]);

  const pickImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 0.5,
      };
  
      const response = await launchImageLibrary(options);
  
      if (!response.didCancel) {
        const { uri } = response.assets[0];
        setImageUrl(uri);
        const imageString = await RNFS.readFile(uri, 'base64');
        setBase64Image(imageString); // Create a state variable to hold the base64 image data
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
//const reference = storage().ref('black-t-shirt-sm.png');
  const onSend = useCallback(async (newMessages = []) => {
    if (newMessages.length === 0) {
      return;
    }

    const message = newMessages[0];
    if (base64Image) {
      try {
        const imageName = `${auth?.currentUser?.uid}_${new Date().getTime()}.png`;
        const reference = storage().ref(`images/${imageName}`);

        await reference.putString(base64Image, 'base64', { contentType: 'image/png' });

        const downloadUrl  = await storage().ref(`images/${imageName}`).getDownloadURL();
        console.log("url", downloadUrl);
        setUrl(downloadUrl); // Update the 'url' state
        setImageUrl('');
        setBase64Image(''); 
      } catch (error) {
        console.error('Error preparing image for upload:', error);
      }
    }
    const formattedMessage = {
      _id: String(messages.length + 1),
      createdAt: new Date().toISOString(),
      text: message.text ? message.text : ' ',
      user: {
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      },
      image: selectedImage || '',
    };

    push(ref(db, `chats/${roomId}`), formattedMessage);

    setImageUrl('');
    setInputText('');
    setSelectedImage(null);
    }, [roomId, messages, imageUrl,base64Image]);
    useEffect(() => {
      // This will log the updated 'selectedImage' whenever 'url' changes
      console.log("selectedImage", url);
      setSelectedImage(url);
    }, [url]);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        alwaysShowSend
        renderSend={(props) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 ,border:1}}>
            {imageUrl !== '' ? (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  marginRight: 10,
                }}>
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    position: 'absolute',
                  }
                }
                />
                <TouchableOpacity onPress={() => setImageUrl('')}>
                  <Icon name="home" size={5} color="#007AFF" style={{ margin: 10 }} />
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                pickImage();
              }}>
              <Icon name="image" size={25} color="#007AFF" style={{ margin: 10 }} />
            </TouchableOpacity>
            <Send {...props} containerStyle={{ justifyContent: 'center' }}>
              <Icon name="send" size={25} color="#007AFF" style={{ margin: 10 }} />
            </Send>
          </View>
        )}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL,
        }}
        onInputTextChanged={(text) => setInputText(text)}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: 'orange',
              },
            }}
          />
        )}
      />
    </View>
  );
};

export default Chat;