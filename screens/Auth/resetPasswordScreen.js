import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, LoginSignupCTA } from '../../components/Button';
import TextInput from '../../components/Input/TextInput';
import ErrorPrompt from '../../components/Label/ErrorPrompt';
import { DARK_GREY } from '../../components/Utilities/Constants';
import WelcomeLogo from './WelcomeLogo';
import errors from './errors';

const resetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);
  // const [oobCode, setOOBCode] = useState();
  /*
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '741177480474-6um6esqgrgg2fje8lhacfsrqt35eet3a.apps.googleusercontent.com',
    });
  }, []);*/
  /*
  const facebookSignin = async () => {
    await LoginManager.logOut();*/
  /* Login with permissions */
  /*  const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    /* Once signed in, get the users AccesToken */
  /* const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }*/
  /* Create a Firebase credential with the AccessToken */
  /* const facebookCredential = FacebookAuthProvider.credential(
      data.accessToken,
    );*/
  /* Sign-in the user with the credential */
  /* return auth().signInWithCredential(facebookCredential);
  };*/

  /* const googleSignin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('this was the google sign in error', err);
    }
  };*/

  const actionCodeSettings = {
    handleCodeInApp: true,
    url: 'https://naturecounter.page.link/reset',
    iOS: {bundleId: 'org.naturecounter'},
    android: {packageName: 'com.naturecounter'},
  };

  const validateEmail = email => {
    return email.match(/\S+@\S+\.\S+/);
  };

  const handlePasswordReset = async () => {
    if (!validateEmail(email)) {
      return setError('Please enter a valid email address');
    }

    try {
      await auth().sendPasswordResetEmail(email, actionCodeSettings);
      alert('Please check your email for password reset link');
      navigation.navigate('Login');
    } catch (err) {
      return setError(errors[err.code]);
    }
  };

  /*useEffect(() => {
    const backlink = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      backlink;
    };
  }, []);
  const handleDynamicLink = async (link) => {
    navigation.navigate('newPassword');
  };*/

  return (
    <KeyboardAvoidingView style={styles.container}>
      <WelcomeLogo text="Password Reset" width={260} leaf={false} />
      <Text style={styles.resetText}>
        Enter your email address below to submit a
        <Text style={styles.bold}> password reset </Text>
        request.
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={em => setEmail(em)}
      />

      <ErrorPrompt errorMsg={error} />

      <View style={{flexGrow: 1, height: 40}} />

      <Button
        label="Submit"
        onPress={handlePasswordReset}
        style={{width: 231, height: 48}}
        disabled={!email}
      />

      <LoginSignupCTA
        promptLabel="Don’t have an account?"
        buttonLabel="Sign up now"
        onPress={() => navigation.navigate('Register')}
      />
    </KeyboardAvoidingView>
  );
};

export default resetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 132,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  cancel: {
    textAlign: 'right',
    color: DARK_GREY,
    fontSize: 16,
    marginBottom: 40,
  },
  bold: {
    fontWeight: 'bold',
  },
  key: {
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 16,
  },
  modalBold: {
    fontWeight: '700',
    fontSize: 21,
  },
  modalContainer: {
    paddingHorizontal: 12,
  },
  modalText: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 15,
  },
  resetText: {
    fontSize: 16,
    marginVertical: 10,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signUpNowPromptContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 12,
  },
  signUpNowButton: {
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  forgotPasswordContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  forgotPasswordButton: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 13,
    marginHorizontal: 8,
    textAlign: 'right',
  },
  dontHaveAccountLabel: {
    color: 'rgba(0,0,0,0.5)',
    marginRight: 10,
  },
  loginLogo: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  loginGreeting: {
    marginTop: 40,
    marginBottom: 70,
    fontSize: 34,
    fontWeight: 'bold',
    width: 275,
    lineHeight: 40,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'System',
  },
  bar: {
    marginTop: -85,
    backgroundColor: 'rgba(36,191,156,0.2)',
    height: 17,
    width: 269,
    alignSelf: 'center',
  },
  form: {
    marginHorizontal: 38,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    alignItems: 'center',
  },
});
