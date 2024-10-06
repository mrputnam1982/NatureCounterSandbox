import React from 'react';
import styled from 'styled-components';
import CategoryIcons from '../../helpers/benefitCategoryIcons';

const BenefitText = styled.Text`
  text-align: center;
  max-width: 68px;
`;

const BenefitBadgeContainer = styled.Pressable`
  margin-bottom: 24px;
  width: 25%;
  align-items: center;
`;

const CategoryBadge = ({category, onPress}) => (
  <BenefitBadgeContainer onPress={onPress}>
    {CategoryIcons[category]}
    <BenefitText>{category}</BenefitText>
  </BenefitBadgeContainer>
);

export default CategoryBadge;
