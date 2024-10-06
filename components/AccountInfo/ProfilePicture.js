import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
} from 'react-native';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import Profile from '../../assets/icons/Profile.svg';
import saveProfilePicture from '../../helpers/saveProfilePicture';
import Toast from 'react-native-simple-toast';

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-vertical: 40px;
`;

const ButtonText = styled.Text`
  font-size: 14px;
  color: #459f5e;
`;

const Avatar = styled.Image`
  border-radius: 50px;
  justify-content-center;
  align-items: center;
`;

const isPermitted = async () => {
  console.log(Platform.Version, 'API version');
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const perms = [
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
      ];
      return perms.every((value, _) => {
        return granted[value] === PermissionsAndroid.RESULTS.GRANTED;
      });
    } catch (err) {
      alert('Write permission err', err);
      return false;
    }
  } else {
    return true;
  }
};

const ProfilePicture = ({imageUri, setImageUri, setInfoModified}) => {
  const onButtonClick = async () => {
    if (await isPermitted()) {
      ImagePicker.showImagePicker({title: null}, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.error('ImagePicker Error: ', response.error);
        } else {
          const timestamp = new Date().getTime();
          const fileName = `nc_pfp_${timestamp}`;
          const pfp = await saveProfilePicture(response.uri, fileName);
          setImageUri(pfp);
          setInfoModified(true);
        }
      });
    } else {
      Toast.show(
        'Please allow access to your camera and storage',
        Toast.SHORT,
      );
    }
  };

  return (
    <Container>
      {imageUri ? (
        <Avatar
          source={{uri: imageUri}}
          style={{
            width: 96,
            height: 96,
            marginBottom: 8,
          }}
        />
      ) : (
        <Profile style={{marginBottom: 8}} width={96} height={96} />
      )}
      <Pressable onPress={onButtonClick}>
        <ButtonText>Change profile photo</ButtonText>
      </Pressable>
    </Container>
  );
};

export default ProfilePicture;
