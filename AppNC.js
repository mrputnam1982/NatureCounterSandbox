import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
//import App from '../App';
import {View, Text} from 'react-native';
import { Provider as PaperProvider, DefaultTheme as PaperTheme } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { COLOR_BG, THEME_GREEN, THEME_LIGHT_GREEN } from './components/Utilities/Constants';
import Snackbar from './components/Utilities/Snackbar';
import * as userActions from './redux/actions/userActions';
import LoginScreen from './screens/Auth/LoginScreen';
import newPasswordScreen from './screens/Auth/newPasswordScreen';
import resetPasswordScreen from './screens/Auth/resetPasswordScreen';
import LoadingScreen from './screens/Auth/LoadingScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';

import OnboardingScreen from './screens/App/OnboardingScreen';
// import {
//   LoadingScreen,
  // LoginScreen,
//   OnboardingScreen,
//   RegisterScreen,
//   newPasswordScreen,
//   resetPasswordScreen
// } from './screens';
import MainScreens from './screens/App/MainScreens';
import {EventProvider} from 'react-native-outside-press';

const USER_ONBOARDED = '@onboarded';

const authStack = createStackNavigator();

const AppNC = (props) => {
  const { email, emailVerified, userActions, displayName, uid } = props;

  const navigationRef = useRef();
  const [onboarding, setOnboarding] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [oobCode, setOOBCode] = useState('');

  const message = useSelector(state => state.getIn(['snackbar', 'message']));
  const visible = useSelector(state => state.getIn(['snackbar', 'visible']));

  const navTheme = DefaultTheme;
  navTheme.colors.background = COLOR_BG;


  const paperTheme = {
    ...PaperTheme,
    colors: {
      ...PaperTheme.colors,
      primary: THEME_GREEN,
      accent: THEME_LIGHT_GREEN,
      background: COLOR_BG,
    },
  };

  //const handleDynamicLink = async link => {
  //   if (link.url.includes('reset')) {
    //   setOOBCode(new URL(link.url).searchParams.get('oobCode'));
  //   } else if (link.url.includes('email-verification')) {
  //     await auth().currentUser.reload();
  //   }
   //};

  // useEffect(() => {
  //   if (oobCode) {
  //     navigationRef.current?.navigate('newPassword', {oobCode});
  //     setOOBCode('');
  //   }
  // }, [oobCode]);

  useEffect(() => {
    // setOnboarding(true);
    AsyncStorage.getItem(USER_ONBOARDED).then(value => {
      if (value === null) {
        AsyncStorage.setItem(USER_ONBOARDED, '1');
        setOnboarding(true);
      } else {
        setOnboarding(false);
      }
      // just for testing
      // AsyncStorage.removeItem(USER_ONBOARDED);
    });
  }, []);

  const resetOnboarding = () => {
    try {
      AsyncStorage.removeItem(USER_ONBOARDED); // Reset onboarding flag
    } catch (error) {
      console.log('Error removing onboarding flag: ', error);
    }
    setOnboarding(true);
  };

  const handleDynamicLink = link => {
    console.log(link.url);
    const url = new URL(link.url).searchParams;
    const mode = url.get('mode');
    const oobCode1 = url.get('oobCode');
    setOOBCode(oobCode1);

    if (mode === 'resetPassword') {
      if (!oobCode1) return;

      navigationRef.current?.navigate('newPassword', {oobCode1});
    } else if (!mode) {
      auth().currentUser.reload();
    }
  };

  const onUserChanged = user => {
    if (!user) return null;
    userActions.initUserInfo(user);
  };

  // Handle user state changes
  const onAuthStateChanged = user => {
    if (initializing) {
      setInitializing(false);
    }
    if (!user) {
      return null;
    }
    userActions.initUserInfo(user);
  };

  useEffect(() => {
    const authStateUnsub = auth().onAuthStateChanged(onAuthStateChanged);
    const userChangeUnsub = auth().onUserChanged(onUserChanged);
    const linkUnsub = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      authStateUnsub();
      userChangeUnsub();
      linkUnsub();
    };
  }, []);

  const handleLogout = () => {
    auth().signOut();
    userActions.clearUserInfo();
  };

  if (initializing || onboarding === null) return <LoadingScreen />;

  if (onboarding) {
    return <OnboardingScreen onEnd={() => setOnboarding(false)} />;
  }

  if (!email) {
    // return ( <View><Text>no email</Text></View>)
    return ( 
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        <authStack.Navigator screenOptions={{headerShown: false}}>
          <authStack.Screen name="Login" component={LoginScreen} />
          <authStack.Screen name="Register" component={RegisterScreen} />
          <authStack.Screen name="resetPassword" component={resetPasswordScreen} />
          <authStack.Screen name="newPassword" component={newPasswordScreen} />


          {/* Screen for Testing Component */}
          {/* <authStack.Screen name="Test" component={Test} /> */}
        </authStack.Navigator>
      </NavigationContainer>

    );
  } else
  {

  /**
   * Added  Paper Provider to handle Select/Drop down component
   */
  // return ( <View><Text>regular app flow</Text></View>)
    return(
      <EventProvider>
      <PaperProvider theme={paperTheme}>
         {/* <View><Text>Main Screen entry point</Text></View> */}
        <MainScreens
          logout={handleLogout}
          // loginSecurity={LoginSecurity1}
          user={email}
          emailVerified={emailVerified}
          userName={displayName}
          resetOnboarding={resetOnboarding}
        />
        <Snackbar
          message={message}
          visible={visible}
        />
      </PaperProvider>
      </EventProvider>
    );
  } ;
}

export default connect(
  state => ({
    displayName: state.getIn(['user', 'displayName']),
    email: state.getIn(['user', 'email']),
    emailVerified: state.getIn(['user', 'emailVerified']),
    uid: state.getIn(['user', 'uid']),
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
  }),
)(AppNC);
// export default AppNC;
