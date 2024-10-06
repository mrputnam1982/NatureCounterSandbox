import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR_BG, THEME_GREEN } from '../Utilities/Constants';

/**
 *
 * @param placeholder
 * @param value
 * @param onChangeText
 * @return {JSX.Element}
 * @constructor
 */
const TextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  passwordInput,
  eyeIcon,
  onPress,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(value !== null);

  const handleFocus = event => {
    setFocused(true);
    onFocus && onFocus(event);
  };

  const handleBlur = event => {
    setFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <View style={[styles.form, focused ? styles.inputActive : null]}>
      <RNTextInput
        autoCapitalize="none"
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={txt => {
          setFilled(txt !== '');
          onChangeText(txt);
        }}
        {...props}
      />
      {/* TODO: animate this transition */}
      <View
        style={[
          styles.placeholderTextContainer,
          focused || filled ? styles.inputOccupied : null,
        ]}
        pointerEvents="none">
        <Text
          style={[styles.placeholderText, focused ? styles.inputActive : null]}>
          {placeholder}
        </Text>
      </View>
      {passwordInput && (
        <Icon
          style={styles.eyeIcon}
          name={eyeIcon ? 'eye' : 'eye-off'}
          size={25}
          onPress={onPress}
        />
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    height: 50,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    width: '100%',
  },
  placeholderText: {
    fontSize: 14,
    color: '#A4A9AE',
    paddingHorizontal: 3,
  },
  placeholderTextContainer: {
    position: 'absolute',
    left: 10,
    top: 14,
  },
  inputActive: {
    color: THEME_GREEN,
    borderColor: THEME_GREEN,
  },
  inputOccupied: {
    left: 10,
    top: -10,
    backgroundColor: COLOR_BG,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  form: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#A4A9AE',
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    alignItems: 'center',
  },
});
