import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, Text, View,} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'; 
const Header = (props) => {
    return (
        <View style={styles.header}>
        <View style={{justifyContent:'center',flex:2,}}>
        
        <Text style={styles.textHeader}> <Icon name="search" size={25} color="white" />  Tìm kiếm</Text>
         </View>
        
         <View style={{justifyContent:'center',flex:1,}}>
         
      
          </View>
          <View style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end' ,paddingRight:10}}>
  {props.someData === 'listChat' && (
    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_USER_VISIBILITY' })}>
      <Icon name="plus" size={25} color="white" />
    </TouchableOpacity>
  )}

  {props.someData === 'listFriend' && (
    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_USER_VISIBILITY' })}>
      <Icon name="user-plus" size={25} color="white" />
    </TouchableOpacity>
  )}

  
{props.someData === 'user' && (
  <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_USER_VISIBILITY' })}>
    <Icon name="cog" size={25} color="white" />
  </TouchableOpacity>)}
  {(() => {
    switch (props.someData) {
      case 'listChat':
        break;
        case 'listFriend':
          break;
          case 'user':
            break;
      default:
        break;
    }
  })()}
</View>
  
      </View>
    );
};


export default Header;
const styles = StyleSheet.create({
    header:{
      flexDirection:'row',
      backgroundColor:'blue',
      paddingTop:5,
    },
    textHeader:{
   textAlign:'left',
      color:'white',
  
      fontSize:20,
      lineHeight: 50,
      paddingLeft:7,
    },

  })