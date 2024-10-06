import React from 'react';
import styled from 'styled-components';
import {ScrollView} from 'react-native-gesture-handler';
import CategoryIcons from '../../helpers/benefitCategoryIcons';

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.View`
  width: 32px;
  height: 32px;
  margin-right: 5px;
`;

const Title = styled.Text`
  margin-left: 5px;
  font-size: 16px;
`;

const BenefitListItem = ({benefit, onPress}) => (
  <Container>
    {CategoryIcons[benefit.categoryName]}
    <Title>{benefit.title}</Title>
  </Container>
);

export default BenefitListItem;
