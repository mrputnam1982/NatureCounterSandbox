import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const TextBar = ({ text, width }) => (
  <>
    <Text style={{
      marginTop: 30,
      marginBottom: 70,
      fontSize: 34,
      fontWeight: 'bold',
      lineHeight: 40,
      alignItems: 'center',
      fontFamily: 'System',
      marginHorizontal: 5,
    }}
    >
      {text}
    </Text>
    <View
      style={{
        marginTop: -89,
        marginBottom: 20,
        marginLeft: 3,
        backgroundColor: '#DCEFE0',
        zIndex: -1,
        height: 17,
        width,
      }}
    />
  </>
);

export default TextBar;
