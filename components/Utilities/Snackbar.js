import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { hideSnackbar } from '../../redux/actions/snackbarActions';

const Snackbar = ({ message, visible, hideSnackbar }) => {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
      }}
    >
      <Text style={{ color: 'white' }}>{message}</Text>
    </View>
  );
};

export default Snackbar;
