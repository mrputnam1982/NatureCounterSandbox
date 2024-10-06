import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';
import { styles } from './styles';

const BigButton = styled.Text`
  font-size: 16px;
  padding-vertical: 12px;
  padding-horizontal: 28px;
  margin-vertical: 8px;
  margin-horizontal: 8px;
  border-radius: 100px;
`;

const YesButton = styled(BigButton)`
  background-color: #ffffff;
  color: #cf142b;
  border-width: 0px;
  font-weight: bold;
`;

const NoButton = styled(BigButton)`
  background-color: #459f5e;
  color: #ffffff;
`;

const CustomModal = ({
  visibility,
  toggleVisibility,
  title,
  text,
  onConfirm,
  onClose=toggleVisibility
}) => {
  return (
    <Modal
      visible={visibility}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Icon
            name="alert-outline"
            type="material-community"
            color="green"
            size={45}
          />
          <TouchableOpacity onPress={onClose} style={styles.exitBtn}>
            <Text>X</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.paragraph}>{text}</Text>
          </View>
          <View style={styles.btnContainer}>
            <Pressable onPress={onConfirm}>
              <YesButton>Yes</YesButton>
            </Pressable>
            <Pressable onPress={onClose}>
              <NoButton>No</NoButton>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
