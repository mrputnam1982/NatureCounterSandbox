import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Full_Logo_Horizontal from '../../assets/drawerIcon/Full_Logo_Horizontal.svg';
import PrivacyAndTerms from '../../components/DataAndPrivacy/PrivacyPage';
import DataResetModal from '../DataAndPrivacy/DataResetModal';
import DeleteAccountModal from '../DataAndPrivacy/DeleteAccountModal';
import SetNewGoalModal from '../DataAndPrivacy/SetNewGoalModal';
import DrawerItems from './DrawerItems';
import LogoutModal from './LogoutModal';

const DrawerView = ({logout, navigation}) => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState('');
  const [dataResetVisible, setDataResetVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);
  const [newGoalVisible, setNewGoalVisible] = useState(false);

  return (
    <>
      <ScrollView>
        <Full_Logo_Horizontal
          style={{
            marginTop: 52,
            width: 141.55,
            height: 24,
          }}
        />
        <DrawerItems
          navigation={navigation}
          handleShowLogout={() => setConfirmLogout(true)}
          handleShowTermsAndConditions={() =>
            setPrivacyPolicyVisible('privacyAndTerms')
          }
          handleDataReset={() => setDataResetVisible(true)}
          handleDeleteAccount={() => setDeleteAccountVisible(true)}
        />
        <LogoutModal
          logout={logout}
          confirmLogout={confirmLogout}
          setConfirmLogout={setConfirmLogout}
        />
        <PrivacyAndTerms
          visibility={privacyPolicyVisible === 'privacyAndTerms'}
          toggleVisibility={setPrivacyPolicyVisible}
        />
        <DataResetModal
          visibility={dataResetVisible}
          toggleVisibility={setDataResetVisible}
          toggleNewGoalVisibility={setNewGoalVisible}
        />
        <DeleteAccountModal
          visibility={deleteAccountVisible}
          toggleVisibility={setDeleteAccountVisible}
          logout={logout}
        />
        <SetNewGoalModal
          navigation={navigation}
          visibility={newGoalVisible}
          toggleVisibility={setNewGoalVisible}
        />
      </ScrollView>
    </>
  );
};

export default DrawerView;
