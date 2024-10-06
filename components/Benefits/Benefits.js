import React from 'react';
import {View, Pressable} from 'react-native';
import styled from 'styled-components';
import {object} from 'prop-types';
import CategoryBadge from './CategoryBadge';

const Banner = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 25px;
`;

const Title = styled.Text`
  font-size: 16px;
`;

const ButtonText = styled.Text`
  font-weight: bold;
  color: #459f5e;
  font-size: 15px;
`;

const BenefitsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Benefits = ({categories, onPressListView, onPressBenefit}) => {
  const categoryBadges = categories.map((category, index) => (
    <CategoryBadge
      key={category.categoryName}
      category={category.categoryName}
      onPress={() => onPressBenefit(index)}
    />
  ));

  return (
    <View>
      <Banner>
        <Title>Estimated Benefits</Title>
        <Pressable onPress={onPressListView}>
          <ButtonText>List View</ButtonText>
        </Pressable>
      </Banner>
      <BenefitsContainer>{categoryBadges}</BenefitsContainer>
    </View>
  );
};
export default Benefits;
