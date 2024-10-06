import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Badge = ({ children, mins }) => {
  return (
    //Rendering view component to show the badge and displaying data in the text component 
    <View style={styles.badgeContainer}>
      <View style={styles.circle}>
        <View style={styles.innerCircle}>
         <Image source={require('../../assets/icons/Clock.png')} />
          <Text style={styles.text}>{children}{mins}/120</Text>
          <Text style={styles.text1}>{children}MINS per week</Text>
          <Image source={require('../../assets/icons/Stars.png')} style={styles.icon}/>       
        </View>
      </View>
    </View>
  );
};

//Style for the badge

const styles = StyleSheet.create({
  badgeContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  circle: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: '#116530',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 110,
    height: 110,
    borderColor: '#FEDE00',
    borderWidth: 4,
    borderRadius: 72,
    backgroundColor: '#116530',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
  },

  text1: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center',
  },

  icon:{
    width:37
  }

});

export default Badge;

