import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Modal, View, PanResponder} from 'react-native';
import styled from 'styled-components';
import CloseActive from '../../assets/CloseActive.svg';
import benefits from '../../helpers/benefits';
import CategoryIcons from '../../helpers/benefitCategoryIcons';

const Container = styled.View`
  width: 80%;
  height: 80%;
  margin: auto;
  align-self: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  padding: 24px;
  elevation: 5;
`;

const Close = styled.Pressable`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Icon = styled.View`
  width: 56px;
  height: 56px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 18px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 21px;
  color: #1d2023;
`;

const Description = styled.Text`
  font-size: 15px;
  color: #1d2023;
  margin-vertical: 16px;
`;

const StyledLink = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #459f5e;
`;

const Carousel = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;

const CarouselItem = styled.View`
  height: 8px;
  width: 8px;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#459F5E' : '#c4c4c4')};
  margin-right: 8px;
`;

const BottomSection = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.Text`
  padding: 13px 24px;
  font-size: 14px;
  font-weight: bold;
`;

const Next = styled(Button)`
  border-radius: 100px;
  background-color: #459f5e;
  color: white;
`;

const Back = styled(Button)`
  color: #1d2023;
`;

const BenefitsModal = ({
  visible,
  onRequestClose,
  categoryIndex,
  setSelectedCategoryIndex,
  categories,
}) => {
  const [selectedBenefitIndex, setSelectedBenefitIndex] = useState(0);

  useEffect(() => setSelectedBenefitIndex(0), [categoryIndex, categories]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

    onPanResponderGrant: (evt, gestureState) => {
      // TODO: (David) Provide visual feedback to the user that the touch gesture is being responded to here.
    },

    onPanResponderTerminationRequest: (evt, gestureState) => true,

    onPanResponderRelease: (evt, {dx}) => {
      if (dx > 100 && categoryIndex > 0) {
        setSelectedCategoryIndex(categoryIndex - 1);
        setSelectedBenefitIndex(0);
      }
      if (dx < -100 && categoryIndex < categories.length - 1) {
        setSelectedCategoryIndex(categoryIndex + 1);
        setSelectedBenefitIndex(0);
      }
    },
  });

  if (categories.length == 0) return null;

  const category = categories[categoryIndex];

  const benefitsList = category.benefits;

  const selectedBenefit = benefitsList[selectedBenefitIndex];

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent
      animationType="fade">
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
        <Container {...panResponder.panHandlers}>
          <Close onPress={onRequestClose}>
            <CloseActive />
          </Close>
          <Icon>{CategoryIcons[category.categoryName]}</Icon>
          <Title>{selectedBenefit.description}</Title>
          <Description>{selectedBenefit.description}</Description>
          <Pressable>
            <StyledLink>Learn More</StyledLink>
          </Pressable>
          <BottomSection>
            <Carousel>
              {categories.map((category, index) => (
                <CarouselItem
                  key={category.categoryName}
                  active={index === categoryIndex}
                />
              ))}
            </Carousel>
            <ButtonContainer>
              <Pressable
                onPress={() =>
                  setSelectedBenefitIndex(selectedBenefitIndex - 1)
                }
                disabled={selectedBenefitIndex === 0}>
                <Back>Back</Back>
              </Pressable>
              <Pressable
                onPress={() =>
                  setSelectedBenefitIndex(selectedBenefitIndex + 1)
                }
                disabled={selectedBenefitIndex === benefitsList.length - 1}>
                <Next>Next</Next>
              </Pressable>
            </ButtonContainer>
          </BottomSection>
        </Container>
      </View>
    </Modal>
  );
};
export default BenefitsModal;
