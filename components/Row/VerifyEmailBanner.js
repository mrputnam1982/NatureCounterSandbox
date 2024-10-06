import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { OutlineButton } from '../Button';
import { THEME_GREEN } from '../Utilities/Constants';

/**
 * component for showing a banner on home screen if user hasn't verified their email
 * @return {JSX.Element}
 */
export default () => {
  const actionCodeSettings = {
    handleCodeInApp: false,
    url: 'https://naturecounterangelo.page.link/email-verification',
    iOS: { bundleId: 'org.naturecounter' },
    android: { packageName: 'com.naturecounter' },
  };

  const handlePress = () => auth().currentUser
    .sendEmailVerification(actionCodeSettings)
    .catch(console.error);

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>Verify Your Email</Text>
      <OutlineButton label="Verify" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 60,
    backgroundColor: THEME_GREEN,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginLeft: 20,
  },
});
