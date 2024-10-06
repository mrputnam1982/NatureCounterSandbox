import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import WarningSvg from '../../../../assets/icons/Journal/Dialog-icon-warning.svg';
import { styles } from './styles';
import Exit from '../../../../assets/exit_button.svg';

const BigButton = styled.Text`
  font-size: 16px;
  padding-vertical: 13px;
  padding-horizontal: 24px;
  margin-vertical: 12px;
  margin-horizontal: 16px;
  border-radius: 100px;
`;

const GotItBackGround = styled(Pressable)`
  background-color: transparent;
`;

const GotItButton = styled(BigButton)`
  background-color: #459f5e;
  color: #ffffff;
`;

const LocationErrorModal = ({
  visibility,
  toggleVisibility,
  onClose = toggleVisibility,
}) => {
  return (
    <Modal
      visible={visibility}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <WarningSvg width="100%" height="100%" />
          </View>
          <Exit style = {styles.exitBtn} onPress={onClose}/>
          <View>
            <Text style={styles.title}>Location Invalid</Text>
            <Text style={styles.content}>
              The manual location must be in the form:{'\n'}
              Park, Zipcode or{'\n'}
              Park, City, State or{'\n'}
              Park, City, State, Zipcode
            </Text>
            <Text />
            <Text>
              <Text style={styles.content}>Example: </Text>
              <Text style={styles.contentBold}>Central Park, 10024</Text>{' '}
              <Text style={styles.content}> or </Text>
              {'\n'}
              <Text style={styles.contentBold}>
                Central Park, New York City, NY
              </Text>
              <Text style={styles.content}> or </Text>
              {'\n'}
              <Text style={styles.contentBold}>
                Central Park, New York City, NY, 10024
              </Text>
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <GotItBackGround onPress={onClose}>
              <GotItButton>Got it</GotItButton>
            </GotItBackGround>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationErrorModal;
