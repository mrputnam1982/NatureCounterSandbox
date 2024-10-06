// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import {
  Button,
  LoginSignupCTA
} from '../../components/Button';
import TextInput from '../../components/Input/TextInput';
import ErrorPrompt from '../../components/Label/ErrorPrompt';
import * as userActions from '../../redux/actions/userActions';
import WelcomeLogo from './WelcomeLogo';
import errors from './errors';

//GoogleSignin.configure({
//webClientId: '741177480474-6um6esqgrgg2fje8lhacfsrqt35eet3a.apps.googleusercontent.com',
//});


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [eyeIcon, setEyeIcon] = useState(true);

  // DISABLING SOCIAL LOGIN, ONLY EMAIL LOGIN FOR MVP0
  // useEffect(() => {
  //   // GoogleSignin.configure({
  //   //   webClientId:
  //   //     '741177480474-6um6esqgrgg2fje8lhacfsrqt35eet3a.apps.googleusercontent.com',
  //   // });
  //   GoogleSignin.configure({
  //     webClientId:
  //       '152177419755-lvu5f9fj7gjsrnr0bf6e9iueommfdgb6.apps.googleusercontent.com',
  //   });
  // }, []);
  const emailSignin = async () => {
    setError(null);
    return auth().signInWithEmailAndPassword(email, password);
  };

  const googleSignin = async () => {
    const user = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const facebookSignin = async () => {
    LoginManager.logOut();

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) throw new Error('User cancelled the login process');

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) throw new Error('Something went wrong obtaining access token');

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
  };

  const addUser = uc =>
    userActions.addUser(uc.user.displayName, uc.user.email, uc.user.uid);

  const handleSignInError = err => {
    if (err.code in errors) setError(errors[err.code]);
    else console.error(err);
  };

  const handleLogin = () =>
    emailSignin()
      .then(addUser)
      .catch(handleSignInError);
  const handleGoogleLogin = () =>
    googleSignin()
      .then(addUser)
      .catch(handleSignInError);
  const handleFacebookLogin = () =>
    facebookSignin()
      .then(addUser)
      .catch(handleSignInError);
  const handleAppleLogin = () =>
    facebookSignin()
      .then(addUser)
      .catch(handleSignInError);

  return (
    // <View><Text>LoginScreen</Text></View>
    <KeyboardAvoidingView style={styles.container}>
      <WelcomeLogo text={'Welcome to \nNature Counter!'} width={260} large />

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        passwordInput
        secureTextEntry={eyeIcon}
        eyeIcon={eyeIcon}
        onPress={() => setEyeIcon(!eyeIcon)}
      />

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('resetPassword')}>
          <Text style={styles.forgotPasswordButton}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <ErrorPrompt errorMsg={error} />

      <View style={{ flexGrow: 1 }} />

      <Button
        label="Login"
        onPress={email && password ? handleLogin : null}
        type='login'
        // style={{width: 231, height: 48}}
        disabled={!(email && password)}
      />
      
      {/* DISABLING SOCIAL LOGIN, ONLY EMAIL LOGIN FOR MVP0 */}
      {/* <View style={styles.socialLoginContainer}>
        <SocialLoginButton login="google" onPress={handleGoogleLogin} />
        <SocialLoginButton login="facebook" onPress={handleFacebookLogin} />
        <SocialLoginButton login="apple" onPress={handleAppleLogin} />
      </View> */}

      <LoginSignupCTA
        promptLabel="Don’t have an account?"
        buttonLabel="Sign up"
        onPress={() => navigation.navigate('Register')}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
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
    marginVertical: 16,
  },
  forgotPasswordButton: {
    color: '#A4A9AE',
    fontSize: 13,
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
