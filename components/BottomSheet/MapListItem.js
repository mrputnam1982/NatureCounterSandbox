import React from 'react';
import { Pressable, View } from 'react-native';
import styled from 'styled-components/native';
import { MEDIUM_GREY } from '../Utilities/Constants';
import TREE_ICON from '../../assets/tree.png';

const Row = styled(Pressable)`
  background-color: ${(pressed) => pressed ? '#FAFAFA' : 'white'};
  flex-direction: row;
  padding: 20px;
  align-items: center;
`;

const StyledAvatar = styled.View`
  height: 32px;
  width: 32px;
  border-radius: 50px;
  margin-right: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({color}) => color};
`;

const StyledImage = styled.Image`
  height: 65%;
  width: 65%;
`;

const StyledTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #2F3136;
`;

const StyledDirection = styled.Text`
  font-size: 12px;
  color: #2F3136;
`;

const MapListItem = ({ item, onPressElement }) => {
  const handlePress = () => onPressElement(item);

  return (
    <Row onPress={handlePress}>
      <StyledAvatar color={MEDIUM_GREY}>
        <StyledImage source={TREE_ICON} resizeMode="contain" />
      </StyledAvatar>
      <View>
        {typeof item !== 'undefined' ? <StyledTitle>{item.name}</StyledTitle> : null}
        {typeof item !== 'undefined' ? <StyledDirection>{item.location.formatted_address}</StyledDirection> : null}
      </View>
    </Row>
  );
};

export default MapListItem;
