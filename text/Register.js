// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native'
// import { Input, Button } from 'react-native-elements';
// import { auth } from '../firebase/firebase';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

// const Register = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');    
//     const [avatar, setAvatar] = useState('');   

//     const register = () => {
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Registered
//             const user = userCredential.user;
//             updateProfile(user, {
//                 displayName: name,
//                  photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
//             })
//             .then(() => {
//               alert('Registered, please login.');
//             })
//             .catch((error) => {
//                 alert(error.message);
//             })
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             alert(errorMessage);
//         });
//     }

//     return (
//         <View style={styles.container}>
//             <Input
//                 placeholder='Enter your name'
//                 label='Name'
//                 value={name}
//                 onChangeText={text => setName(text)}
//             />
//             <Input
//                 placeholder='Enter your email'
//                 label='Email'
//                 value={email}
//                 onChangeText={text => setEmail(text)}
//             />
//             <Input
//                 placeholder='Enter your password'
//                 label='Password'
//                 value={password} onChangeText={text => setPassword(text)}
//                 secureTextEntry
//             />
//             <Input
//                 placeholder='Enter your image url'
//                 label='Profile Picture'
//                 value = {avatar}
//                 onChangeText={text => setAvatar(text)}
//             />
//             <Button title='register' onPress={register} style={styles.button} />
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 10,
//         marginTop: 100,
//     },
//     button: {
//         width: 370,
//         marginTop: 10
//     }
// });

// export default Register;
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import { auth } from '../firebase/firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ref, push, getDatabase} from 'firebase/database';
// import { createUserWithEmailAndPassword, updateProfile } from '../firebase/auth';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
// import 'firebase/compat/auth'; //v9
const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phone, setPhone] = useState('');
  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Registered
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: avatar ? avatar : '', // Add an empty string as the fallback value
        })
          .then(() => {
            alert('Registered, please login.');
            navigation.navigate('Login');
          })
          .then(() => {
            const db = getDatabase();
            const userInfo = {
              name: name,
              email: email,
              phone: phone,
            };
            const usersRef = ref(db, 'users');
            push(usersRef, userInfo)
              .then(newUserRef => {
                console.log('User added with ID: ', newUserRef.key);
              })
              .catch(error => {
                console.error('Error adding user:', error);
              });
          })
          .catch(error => {
            alert(error.message);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your Full Name"
        label="Full Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="Enter your Phone Number"
        label="PhoneNumber"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button onPress={register} title="register" style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default Register;