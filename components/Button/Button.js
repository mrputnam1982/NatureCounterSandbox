import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

/**
 * @param onPress
 * @param label
 * @param {'white'|'green'|'transparent'|'red'} type
 * @param {'large'|'small'} size
 * @return {JSX.Element}
 * @constructor
 */
const Button = ({onPress, label, type, size, style = {}, disabled}) => (
  <TouchableOpacity
    style={[styles.button, styles[type], styles[size], style,
      disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}>
    <Text style={[styles.label, styles[`${type}Label`]]}>{label}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onPress: () => {},
  label: '',
  type: 'green',
  size: 'large',
  disabled: false,
};

export default Button;
