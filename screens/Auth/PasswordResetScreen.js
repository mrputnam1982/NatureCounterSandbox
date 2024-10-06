// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import auth from '@react-native-firebase/auth';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from '../../components/Button';
import TextInput from '../../components/Input/TextInput';
import ErrorPrompt from '../../components/Label/ErrorPrompt';
import PasswordValidation from '../../components/Utilities/PasswordValidation';
import useSnackbar from '../../components/Utilities/useSnackbar';
import WelcomeLogo from './WelcomeLogo';
import errors from './errors';

const PasswordResetScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState(null);
  const [currentPasswordHidden, setCurrentPasswordHidden] = useState(true);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [verifyPasswordHidden, setVerifyPasswordHidden] = useState(true);
  const showMessage = useSnackbar();

  const handleShowSnackbar = () => showMessage('Password updated.');

  const comparePasswords = (pw, cpw) => pw === cpw;

  const validatePassword = pw => {
    return (
      pw.match(/[A-Z]/) &&
      pw.match(/[a-z]/) &&
      pw.match(/\d/) &&
      pw.match(/[^\w]|_/) &&
      pw.length >= 8
    );
  };

  const handleNewPassword = async () => {
    setError(null);

    const user = auth().currentUser;

    if (!comparePasswords(newPassword, verifyPassword)) {
      return setError('Your password does not match your confirm password');
    }

    if (comparePasswords(newPassword, currentPassword)) {
      return setError('Your new password cannot be the same as your old password');
    }

    if (!validatePassword(newPassword)) {
      return setError(
        'Your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol',
      );
    }

    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    try {
      await user.reauthenticateWithCredential(credential);

      await auth().signOut();

      await auth().signInWithEmailAndPassword(user.email, currentPassword);

      await auth().currentUser.updatePassword(newPassword);

      handleShowSnackbar();
      navigation.goBack();
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        return setError('Your current password is incorrect');
      }
      return setError(errors[err.code]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container}>
        <>
          <WelcomeLogo text="Password Reset" width={260} />
          <Text style={styles.spacing}>Please enter your current password</Text>
          <TextInput
            passwordInput
            placeholder="Current Password"
            value={currentPassword}
            secureTextEntry={currentPasswordHidden}
            onChangeText={pw => setCurrentPassword(pw)}
            eyeIcon={currentPasswordHidden}
            onPress={() => setCurrentPasswordHidden(!currentPasswordHidden)}
          />
          <Text style={styles.spacing}>Please enter your new password</Text>
          <TextInput
            passwordInput
            placeholder="New Password"
            value={newPassword}
            secureTextEntry={passwordHidden}
            onChangeText={pw => setNewPassword(pw)}
            eyeIcon={passwordHidden}
            onPress={() => setPasswordHidden(!passwordHidden)}
          />
          <TextInput
            passwordInput
            placeholder="Verify Password"
            value={verifyPassword}
            secureTextEntry={verifyPasswordHidden}
            onChangeText={pw => setVerifyPassword(pw)}
            eyeIcon={verifyPasswordHidden}
            onPress={() => setVerifyPasswordHidden(!verifyPasswordHidden)}
          />
          <View style={styles.requirementContainer}>
            <PasswordValidation password={newPassword} />
          </View>
          <View style={{flexGrow: 1}} />
          <View style={styles.submitButtonContainer}>
            <Button
              label="Reset"
              style={styles.submitButton}
              onPress={newPassword && verifyPassword ? handleNewPassword : null}
              type={newPassword && verifyPassword ? 'green' : 'transparent'}
            />
          </View>
        </>

        <ErrorPrompt errorMsg={error} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  requirementContainer: {
    margin: 5,
  },
  spacing: {
    marginBottom: 12,
  },
  textline: {
    marginBottom: 12,
  },
  submitButtonContainer: {
    marginTop: 25,
    marginBottom: 48,
  },
  submitButton: {
    width: '70%',
  },
  checkmark: {
    color: 'rgba(36,191,156,1)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    maxWidth: 80,
    maxHeight: 80,
  },
});
