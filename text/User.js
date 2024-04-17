import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Modal ,
  } from 'react-native';
  import React from 'react';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Header from './Header';
  import {useEffect, useState} from 'react';
  import axios from 'axios';
import LogoutModal from './ModelLogoutComfirm';


const User = () => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users/1'); // Thay đổi ID người dùng tùy thuộc vào yêu cầu của bạn
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const someDataToPass = "user";
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleLogout = () => {
    // Xử lý logic khi người dùng xác nhận đăng xuất
    // Ví dụ: đặt state, thực hiện API call, đưa người dùng đến màn hình đăng nhập, vv.
    toggleLogoutModal();
  };
    return (
        <View style={styles.container}>
             <Header someData={someDataToPass} />
    {/* <View style={styles.user}>
      {user && (
        <View style={styles.item}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
          <View style={styles.avatarChat}>
            <Text>{user.first_name} {user.last_name}</Text>
            <Text>Email: {user.email}</Text>
          </View>
        </View>
      )}
    </View> */}
    <View style={styles.header}>
    <Image
              source={require ('../image/cg3.jpg')}
              style={styles.coverImage}
          
            />
           <Image
        source={require('../image/mít.jpg')}
        style={styles.avatar}
      />
    </View>
    <View    style={styles.title}>
      <Text style={{fontSize:25, paddingBottom:15}}>Đình Khôi</Text>
    </View>
    <View style={styles.center}>
    <View style={styles.detail}>
      <Text  style={{fontWeight:'bold', flex:3, textAlign:'left',fontSize:17,paddingLeft:15}}>Giới tính</Text>
      <Text  style={{justifyContent:'center',flex:8,textAlign:'left'}}>Nam </Text>
    </View>
    <View style={styles.detail}>
      <Text  style={{fontWeight:'bold', flex:3, textAlign:'left',fontSize:17,paddingLeft:15}}>Ngày Sinh</Text>
      <Text  style={{justifyContent:'center',flex:8,textAlign:'left'}}>13/01/2002 </Text>
    </View>
    <View style={styles.detail}>
      <Text  style={{fontWeight:'bold', flex:3, textAlign:'left',fontSize:17,paddingLeft:15}}>Email</Text>
      <Text  style={{justifyContent:'center',flex:8,textAlign:'left'}}>trandinhkhoitvtp@gmail.com </Text>
    </View>
   </View>
   <View style={styles.footer}>

        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="edit" size={25} color="blue" /> Đổi thông tin
          </Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="lock" size={25} color="blue" /> Đổi mật khẩu
          </Text>
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="sign-out" size={25} color="blue" /> Đăng xuất khỏi các thiết bị khác
          </Text>
        </View>
        
        <View style={{justifyContent: 'center', flex: 1}} >
        <TouchableOpacity onPress={toggleLogoutModal}>
          <Text style={styles.textHeader}>
            {' '}
            <Icon name="sign-out" size={25} color="red" /> Đăng xuất
          </Text>
          </TouchableOpacity>
        </View>
        <LogoutModal
        isVisible={isLogoutModalVisible}
        onConfirm={handleLogout}
        onCancel={toggleLogoutModal}
      />
      </View>
        </View>
    );
};

export default User;
const styles = StyleSheet.create({
 
    container: {
      flex: 1.4,
      flexDirection: 'column',
    },
    coverImage: {
      flexDirection: 'column',
      justifyContent:'flex-end',
      resizeMode: 'cover',
      width: '100%',
      height: (Dimensions.get('window').height) * 0.205  ,
    bottom:45
  
    },
    avatar: {
      flexDirection: 'column',
      justifyContent:'flex-end',
      alignItems:'flex-end',
      position: 'absolute',
      //top:'10',
 
      resizeMode: 'cover',
      width: 100, // Độ rộng của avatar
      height: 100, // Độ cao của avatar
      borderRadius: 50, // Để làm cho hình ảnh trở thành hình tròn, có thể thay đổi tùy ý
    },
    header: {
    
      justifyContent:'flex-end',
      alignItems:'flex-end',
      flexDirection: 'column',
      alignItems:'center',
      flex: 0.3,
    },
    detail:{
flexDirection:'row',
flex:0.333,
backgroundColor:'white',
justifyContent:'center',
alignItems:'center'

    },
    textFriend:{
      flexDirection:'column',
      textAlign: 'left',
      color: 'black',
    },
    iconFriend:{
  flexDirection:'row'
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
      backgroundColor: 'blue',
      flex: 0.3,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
  
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
   
    
    title: {
       flexDirection:'column',
      justifyContent:'flex-end',
      alignItems:'center',
      flex:0.1,
    },
    footer: {
      flexDirection: 'column',
  
      backgroundColor: 'white',
      flex: 0.3,
      //height:'50',
    },
  });
  