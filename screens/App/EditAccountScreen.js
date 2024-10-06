import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import styled from 'styled-components';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import Benefits from '../../components/Benefits/Benefits';
import BenefitsModal from '../../components/Benefits/BenefitsModal';
import useCurrentUser from '../../hooks/useCurrentUser';
import useTimedBenefits from '../../hooks/useTimedBenefits';
import useAddBackButton from "../../components/Utilities/useAddBackButton";

const Container = styled.ScrollView`
  padding-horizontal: 24px;
  flex: 1;
`;

const BigButton = styled.Text`
  font-size: 16px;
  padding-vertical: 16px;
  padding-horizontal: 64px;
  margin-vertical: 8px;
  margin-horizontal: 8px;
  border-radius: 25px;
`;

const SaveButton = styled(BigButton)`
  background-color: #459f5e;
  border-width: 1px;
  border-color: #459f5e; 
  overflow: hidden;
  color: #ffffff;
`;

const CancelButton = styled(BigButton)`
  color: #000000;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #000000;
  overflow: hidden;
`;

const EditAccountScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
    // const [emailError, setEmailError] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState(15);
  const [goalError, setGoalError] = useState('');
  const [location, setLocation] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [disableSave, setDisableSave] = useState(false);
  const [infoModified, setInfoModified] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const {user, userLoading, userError, updateUser} = useCurrentUser();

  useAddBackButton(navigation, true);

  const {
    benefits: categories,
    isLoading: benefitsLoading,
    error: benefitsError,
  } = useTimedBenefits(weeklyGoal);

  const setInfo = () => {
    setName(user.name);
    setEmail(user.email);
    setWeeklyGoal(user.weekly_goal);
    setLocation(user.location);
    setImageUri(user.profile_pic);
  };

  useEffect(() => {
    if (user) {
      setInfo();
    }
    
  }, [user]);

  if (userLoading || benefitsLoading) {
    return (
      <ActivityIndicator
        color="#459f5e"
        style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
      />
    );
  }
  if (userError || benefitsError) {
    return <Text>{`${userError}\n${benefitsError}`}</Text>;
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container>
        <BenefitsModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          categories={categories}
          categoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
        />
        <AccountInfo
          name={name}
          setName={setName}
          nameError={nameError}
          setNameError={setNameError}
          email={email}
          // setEmail={setEmail}
          location={location}
          setLocation={setLocation}
          goal={weeklyGoal}
          setGoal={setWeeklyGoal}
          goalError={goalError}
          setGoalError={setGoalError}
          setInfoModified={setInfoModified}
          imageUri={imageUri}
          setImageUri={setImageUri}
          setDisableSave={setDisableSave}
        />
        <Benefits
          categories={categories}
          onPressListView={() => navigation.navigate('BenefitListView')}
          onPressBenefit={categoryIndex => {
            setSelectedCategoryIndex(categoryIndex);
            setModalVisible(true);
          }}
        />
      </Container>

      {infoModified && (
        <LinearGradient
          angle={180}
          colors={['#ffffff00', '#FFFFFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            zIndex: 10000,
          }}>
          <Pressable
            onPress={() => {
              if (disableSave) {
                Toast.show('There are errors in your form', Toast.LONG);
                return;
              }
              updateUser({
                ...user,
                name,
                weekly_goal: weeklyGoal,
                location,
                profile_pic: imageUri,
              });
              setInfoModified(false);
              Keyboard.dismiss();
              Toast.show('Your information has been updated!', Toast.LONG);
            }}>
            <SaveButton>Save</SaveButton>
          </Pressable>
          <Pressable
            onPress={() => {
              setInfo();
              setNameError('');
              setGoalError('');
              setInfoModified(false);
              Keyboard.dismiss();
            }}>
            <CancelButton>Cancel</CancelButton>
          </Pressable>
        </LinearGradient>
      )}
    </KeyboardAvoidingView>
  );
};

export default EditAccountScreen;
