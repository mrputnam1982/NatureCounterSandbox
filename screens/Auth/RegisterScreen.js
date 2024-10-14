import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { Button, LoginSignupCTA } from '../../components/Button';
import PrivacyAndTerms from '../../components/DataAndPrivacy/PrivacyPage';
import TextInput from '../../components/Input/TextInput';
import ErrorPrompt from '../../components/Label/ErrorPrompt';
import { THEME_GREEN } from '../../components/Utilities/Constants';
import userState from '../../helpers/userState';
import privacyPolicy from '../../public/text/privacyPolicy';
import termsOfUse from '../../public/text/termsOfUse';
import * as userActions from '../../redux/actions/userActions';
import WelcomeLogo from './WelcomeLogo';
import errors from './errors';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(null);
  const [eyeIcon, setEyeIcon] = useState(true);
  const [confirmEyeIcon, setConfirmEyeIcon] = useState(true);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState('');

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  const handleRegister = async () => {
    setError(null);

    if (!validateEmail(email)) {
      return setError('Please enter a valid email address');
    }
    if (!checkConfirmPassword(password, confirmPassword)) {
      return setError('Your password does not match your confirm password');
    }
    if (!validatePassword(password)) {
      return setError(
        'Your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol',
      );
    }

    try {
      try {
        console.log("Attempting to create user: ",email, password);
        await auth().createUserWithEmailAndPassword(email, password);
        await auth().currentUser.updateProfile({displayName: name});
      } catch (err) {
        console.log('error', err);
        setError(errors[err.code]);
        return;
      }

      await userActions.addUser(
        auth().currentUser.displayName,
        auth().currentUser.email,
        auth().currentUser.uid,
      );

      userState.setUserState(
        auth().currentUser.uid,
        auth().currentUser.email,
        name,
        120,
        null,
        null,
        false,
      );

      resetForm();
    } catch (err) {
      console.log('error', err);
      setError(errors[err.code]);
    }
  };

  const checkConfirmPassword = (pw, cpw) => pw === cpw;

  const validateEmail = email => {
    return email.match(/\S+@\S+\.\S+/);
  };

  const validatePassword = pw => {
    return (
      pw.match(/[A-Z]/) &&
      pw.match(/[a-z]/) &&
      pw.match(/\d/) &&
      pw.match(/[^\w]|_/) &&
      pw.length >= 8
    );
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const terms = [
    ['Privacy Policy', privacyPolicy],
    ['Terms of Use ("Terms")', termsOfUse],
  ];

  const showTerms = () => {
    setPrivacyPolicyVisible('privacyAndTerms');
  };

  const ConditionalText = ({text, condition}) => (
    <Text style={condition ? styles.success : styles.failure}>
      {`• ${text}`}
    </Text>
  );

  const GreenText = styled.Text`
    color: ${THEME_GREEN};
  `;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <PrivacyAndTerms
        visibility={privacyPolicyVisible === 'privacyAndTerms'}
        toggleVisibility={setPrivacyPolicyVisible}
      />
      <KeyboardAvoidingView style={styles.container}>
       
        <WelcomeLogo text="Sign Up" width={126} leaf={false} />

        <TextInput placeholder="Name" value={name} onChangeText={setName} />

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          passwordInput
          placeholder="Password"
          secureTextEntry={eyeIcon}
          value={password}
          onChangeText={setPassword}
          eyeIcon={eyeIcon}
          onPress={() => setEyeIcon(!eyeIcon)}
        />

        <TextInput
          passwordInput
          placeholder="Verify Password"
          value={confirmPassword}
          secureTextEntry={confirmEyeIcon}
          onChangeText={setConfirmPassword}
          eyeIcon={eyeIcon}
          onPress={() => setConfirmEyeIcon(!confirmEyeIcon)}
        />

        <View style={styles.requirementContainer}>
          <ConditionalText
            text="A minimum of 8 characters"
            condition={password.length >= 8}
          />
          <ConditionalText
            text="At least 1 uppercase letter"
            condition={password.match(/[A-Z]/)}
          />
          <ConditionalText
            text="At least 1 lowercase letter"
            condition={password.match(/[a-z]/)}
          />
          <ConditionalText
            text="At least 1 number and 1 symbol"
            condition={password.match(/\d/) && password.match(/[^\w]|_/)}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={consent}
            onValueChange={setConsent}
            tintColors={{true: THEME_GREEN}}
          />
          <TouchableOpacity
            onPress={() => setConsent(!consent)}
            style={styles.consentText}>
            <Text>
              I agree to Nature Counter’s
              <GreenText onPress={showTerms}> Terms and Conditions</GreenText>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.submitButtonContainer}>
          <Button
            label="Sign Up"
            onPress={
              name && email && password && confirmPassword && consent
                ? handleRegister
                : null
            }
            type="signup"
            disabled={
              name && email && password && confirmPassword && consent
                ? false
                : true
            }
          />
        </View>

        <LoginSignupCTA
          promptLabel="Already have an account?"
          buttonLabel="Login"
          onPress={() => navigation.navigate('Login')}
        />

        <ErrorPrompt errorMsg={error} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  loginGreeting: {
    marginTop: 40,
    marginBottom: 70,
    fontSize: 34,
    fontWeight: 'bold',
    width: 275,
    lineHeight: 40,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'Roboto',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  requirementContainer: {
    margin: 5,
  },
  submitButtonContainer: {
    marginTop: 25,
  },
  success: {
    color: THEME_GREEN,
  },
  failure: {
    color: '#7F8489',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  modalBox: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
  },
  modalTitleBar: {
    flexDirection: 'row',
  },
  modalTitleText: {
    fontWeight: '700',
    flex: 1,
    fontSize: 24,
  },
  modalContentWrapper: {
    marginVertical: 16,
    paddingRight: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
