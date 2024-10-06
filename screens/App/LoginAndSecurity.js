import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {View, Pressable, Text} from 'react-native';

const LoginAndSecurity = ({navigation}) => (
  <View>
    <Pressable
      onPress={() => {
        navigation.goBack();
        navigation.dispatch(DrawerActions.openDrawer());
      }}>
      <Text>Go back</Text>
    </Pressable>
  </View>
);

export default LoginAndSecurity;
