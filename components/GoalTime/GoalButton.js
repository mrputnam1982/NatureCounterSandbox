import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const GoalButton = ({
  label,
  onPress,
  active,
  buttonStyle,
  labelStyle,
  activeButtonStyle,
  activeLabelStyle,
}) => (
  <Pressable
    onPress={onPress}
    style={[
      GoalButtonStyles.button,
      buttonStyle,
      active ? GoalButtonStyles.activeButton : null,
      active ? activeButtonStyle : null,
    ]}>
    <Text
      style={[
        GoalButtonStyles.label,
        labelStyle,
        active ? GoalButtonStyles.activeLabel : null,
        active ? activeLabelStyle : null,
      ]}>
      {label}
    </Text>
  </Pressable>
);

const GoalButtonStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderColor: '#58AC6F',
    borderWidth: 1.2,
    borderRadius: 24,
  },
  label: {
    fontSize: 14,
    color: '#1D2023',
    fontWeight: 'bold',
  },
  activeButton: {
    borderWidth: 0,
    backgroundColor: '#58AC6F',
  },
  activeLabel: {
    color: '#ffffff',
  },
});

export default GoalButton;
