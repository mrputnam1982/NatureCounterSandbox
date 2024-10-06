import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import DataResetModal from '../../components/DataAndPrivacy/DataResetModal';
import PrivacyAndTerms from '../../components/DataAndPrivacy/PrivacyPage';
import RowButton from '../../components/Row/RowButton';

const ProfileScreen = ({user, logout, navigation, stack}) => {
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState('');

  return (
    <View>
      <RowButton
        label="Edit Profile"
        icon="account-edit-outline"
        onPress={() => {
          navigation.navigate('EditAccountScreen');
        }}
      />
      <RowButton
        label="Notifications"
        icon="bell-outline"
        onPress={() => navigation.navigate('NotificationScreen')}
      />
      <RowButton
        label="Privacy and Terms of Use"
        icon="shield-check-outline"
        onPress={() => {
          setPrivacyPolicyVisible('privacyAndTerms');
        }}
      />
      <RowButton
        label="Reset data"
        icon="refresh"
        onPress={() => {
          setPrivacyPolicyVisible('resetData');
        }}
      />
      <RowButton
        label="Help"
        icon="help-circle-outline"
        onPress={() => {
          navigation.navigate('HelpCenterSection');
        }}
      />
      <RowButton label="Log out" icon="logout" onPress={logout} />

      <PrivacyAndTerms
        visibility={privacyPolicyVisible === 'privacyAndTerms'}
        toggleVisibility={setPrivacyPolicyVisible}
      />

      {privacyPolicyVisible === 'resetData' && (
        <DataResetModal toggleVisibility={setPrivacyPolicyVisible} />
      )}
    </View>
  );
};

ProfileScreen.defaultProps = {
  user: {},
  logout: () => {},
};

ProfileScreen.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default ProfileScreen;
