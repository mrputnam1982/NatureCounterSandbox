import React, {useContext} from 'react';
import {FlatList, Text, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import BenefitListItem from '../../components/Benefits/BenefitListItem';
import UserContext from '../../contexts/UserContext';
import {Button, Icon} from "react-native-elements";
import useTimedBenefits from '../../hooks/useTimedBenefits';
import { useNavigation } from '@react-navigation/native';
import useAddBackButton from '../../components/Utilities/useAddBackButton';

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Container = styled.View`
  padding: 24px;
`;

const Seperator = styled.View`
  border: 1px solid #e7e7e7;
  margin-vertical: 12px;
`;

const BenefitList = ({benefits, onPressBenefit}) => (
  <FlatList
    data={benefits}
    renderItem={({item, index}) => (
      <BenefitListItem benefit={item} onPress={() => onPressBenefit(index)} />
    )}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={Seperator}
  />
);

const BenefitListView = () => {
//  const {
//    user: {weekly_goal: goal},
//  } = useContext(UserContext);
  let goal=120;
//
  const {benefits: categories, isLoading, error} = useTimedBenefits(goal);
  const navigation = useNavigation();

  useAddBackButton(navigation);
  if (isLoading && false) {
    return (
      <ActivityIndicator
        color="#459f5e"
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        size="large"
      />
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const benefitsList = categories
    ? categories.reduce((accum, currentCategory, index) => {
        const c = currentCategory.benefits.map(benefit => ({
          icon: currentCategory.icon,
          title: benefit.description,
          categoryName: currentCategory.categoryName,
          id: benefit._id,
        }));

        return accum.concat(c);
      }, [])
    : [];

  return (
    <Container>
      <Title>{goal} mins in nature</Title>
      <BenefitList benefits={benefitsList} />
    </Container>
  );
//  return (<Text>TEST101</Text>);
};

export default BenefitListView;
