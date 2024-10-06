import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';
import { styles } from './styles';

const BigButton = styled.Text`
  font-size: 16px;
  padding-vertical: 12px;
  padding-horizontal: 32px;
  margin-vertical: 8px;
  margin-horizontal: 8px;
  border-radius: 100px;
`;

const NotNowButton = styled(BigButton)`
  background-color: #ffffff;
  color: #373737;
  border-width: 0px;
  font-weight: bold;
`;

const YesButton = styled(BigButton)`
  background-color: #459f5e;
  color: #ffffff;
`;

const SetNewGoalModal = ({navigation, visibility, toggleVisibility}) => {
  const handleYes = async () => {
    toggleVisibility('');
    navigation.navigate('ProfileScreens', {screen: 'EditAccountScreen'});
  };

  return (
    <>
      <Modal
        visible={visibility}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          toggleVisibility('');
        }}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Icon
              name="clock-outline"
              type="material-community"
              color="green"
              size={45}
            />
            <TouchableOpacity onPress={toggleVisibility} style={styles.exitBtn}>
              <Text>X</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>120 Minutes Weekly Goal</Text>
              <Text style={styles.paragraph}>
                The default is set for 120 minutes. You can edit your weeky goal under
                 <Text style={{fontWeight: "bold"}}> Edit Account</Text>. Would you like
                  to set a new goal now?
              </Text>
            </View>
            <View style={styles.btnContainer}>
            <Pressable onPress={toggleVisibility}>
                <NotNowButton>Not Now</NotNowButton>
              </Pressable>
              <Pressable onPress={handleYes}>
                <YesButton>Yes</YesButton>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SetNewGoalModal;
