import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import ButtonStyles from './ButtonStyles';
import { Button } from 'react-native-elements';

/**
 *
 * @param onPress
 * @param label
 * @return {JSX.Element}
 * @constructor
 */
const ConditionalButton = ({ onPress, label, location }) => {
  return (
    <TouchableOpacity
      style={[
        location === "" ?
          ButtonStyles.blockedButton :
          ButtonStyles.button
      ]}
      onPress={onPress}
      disabled={
        location === "" ?
          true :
          false
      }
    >
      <Text
        style={[
          location === "" ?
            ButtonStyles.blockedLabel :
            ButtonStyles.label
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

ConditionalButton.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  location: PropTypes.string,
};

ConditionalButton.defaultProps = {
  onPress: () => {},
  label: '',
  location: '',
};

export default ConditionalButton;
