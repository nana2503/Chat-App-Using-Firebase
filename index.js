/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { getFirebaseApp } from '@react-native-firebase/app';
// if (!getFirebaseApp()) {
//     throw new Error('Firebase has not been initialized!');
//   }
AppRegistry.registerComponent(appName, () => App);
