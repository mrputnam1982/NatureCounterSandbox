import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import GoalTimes from '../GoalTime/GoalTimes';
import TextInput from '../Input/TextInput';
import ProfilePicture from './ProfilePicture';

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 24px;
`;

const InputContainer = styled.View`
  flex: 1;
  margin-bottom: 11px;
`;

const AccountInfoContainer = styled.View`
  flex: 1;
  margin-bottom: 8px;
`;

const goalTimes = [15, 30, 50, 120, 180];

const AccountInfo = ({
  name,
  setName,
  nameError,
  setNameError,
  email,
  // setEmail,
  location,
  setLocation,
  goal,
  setGoal,
  goalError,
  setGoalError,
  setInfoModified,
  imageUri,
  setImageUri,
  setDisableSave,
}) => {
  return (
    <>
      <AccountInfoContainer>
        <ProfilePicture
          imageUri={imageUri}
          setImageUri={setImageUri}
          setInfoModified={setInfoModified}
        />
        <Title>Account Information</Title>

        <InputContainer>
          <TextInput
            placeholder="Name"
            onEndEditing={newName => {
              const name = newName.nativeEvent.text;
              if (!name.trim()) {
                setNameError('Name is required');
                setDisableSave(true);
              } else {
                setNameError(null);
                setInfoModified(true);
                setDisableSave(false);
              }
            }}
            onChangeText={newName => setName(newName)}
            onFocus={() => setName(name)}
            value={name}
          />
          {nameError ? <Text style={{color: 'red'}}>{nameError}</Text> : null}
        </InputContainer>
        <InputContainer>
          <TextInput
            placeholder="Email"
            // onChangeText={newEmail => {
            //   if (!newEmail.trim()) {
            //     setEmailError('Email is required');
            //     setDisableSave(true);
            //     setEmail(newEmail);
            //   } else {
            //     setEmailError('');
            //     setInfoModified(true);
            //     setDisableSave(false);
            //     setEmail(newEmail);
            //   }
            // }}
            value={email}
            editable={false}
          />
          {/* {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : null} */}
        </InputContainer>
        <InputContainer>
          <TextInput
            placeholder="Location (City, State)"
            onEndEditing={() => {
              setInfoModified(true);
              setLocation(location);
            }}
            onChangeText={newLocation => setLocation(newLocation)}
            value={location}
          />
        </InputContainer>
      </AccountInfoContainer>
      <GoalTimes
        goalTimes={goalTimes}
        currentGoalTime={goal || 120}
        setGoalTime={newGoal => {
          setInfoModified(true);
          setGoal(newGoal);
        }}
        goalError={goalError}
        setGoalError={setGoalError}
        setDisableSave={setDisableSave}
      />
    </>
  );
};
export default AccountInfo;
