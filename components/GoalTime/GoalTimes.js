import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components';
import TextInput from '../Input/TextInput';
import GoalButton from './GoalButton';

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;

const InputContainer = styled.View`
  margin-bottom: 19px;
`;

const GoalTimes = ({
  goalTimes,
  currentGoalTime,
  setGoalTime,
  goalError,
  setGoalError,
  setDisableSave,
}) => {
  const [goalTextValue, setGoalTextValue] = useState(
    `${currentGoalTime} Minutes`,
  );

  useEffect(() => {
    setGoalTextValue(`${currentGoalTime} Minutes`);
  }, [currentGoalTime]);

  const GoalButtons = goalTimes.map((goalTime, index) => (
    <GoalButton
      key={goalTime}
      label={`${goalTime} min`}
      active={goalTime === parseInt(goalTextValue, 10)}
      onPress={() => {
        setGoalTime(goalTime);
        setDisableSave(false);
        setGoalError(null);
        setGoalTextValue(`${goalTime} Minutes`);
      }}
      buttonStyle={index === goalTimes.length ? null : {marginRight: 10}}
    />
  ));

  return (
    <>
      <Title>Set Goal in Minutes</Title>
      {goalError ? <Text style={{color: 'red'}}>{goalError}</Text> : null}
      <InputContainer>
        <TextInput
          placeholder="Weekly Goal"
          onEndEditing={newGoalTime => {
            const goalTime = parseInt(newGoalTime.nativeEvent.text, 10);
            if (goalTime < 5 || goalTime > 10080 || isNaN(goalTime)) {
              setGoalError('Goal time must be between 5 and 10080 minutes');
              setGoalTime(currentGoalTime);
              setGoalTextValue(`${currentGoalTime} Minutes`);
            } else {
              setGoalError(null);
              setDisableSave(false);
              setGoalTime(goalTime);
              setGoalTextValue(`${goalTime} Minutes`);
            }
          }}
          onChangeText={text => setGoalTextValue(text.replace(/[^0-9]/g, ''))}
          value={goalTextValue}
          onFocus={() => setGoalTextValue(currentGoalTime)}
          keyboardType="numeric"
        />
      </InputContainer>
      <ScrollView horizontal style={{marginRight: -20}}>
        {GoalButtons}
      </ScrollView>
    </>
  );
};

export default GoalTimes;
