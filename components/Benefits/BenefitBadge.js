import React from 'react';
import styled from 'styled-components';

const BenefitIcon = styled.Image`
  height: 56px;
  width: 56px;
  margin-bottom: 8px;
`;

const BenefitText = styled.Text`
  text-align: center;
  max-width: 68px;
`;

const BenefitBadgeContainer = styled.Pressable`
  margin-bottom: 24px;
  width: 25%;
  align-items: center;
`;

const BenefitBadge = ({benefit, iconURI, onPress}) => (
  <BenefitBadgeContainer onPress={onPress}>
    <BenefitIcon source={iconURI} />
    <BenefitText>{benefit}</BenefitText>
  </BenefitBadgeContainer>
);

export default BenefitBadge;
