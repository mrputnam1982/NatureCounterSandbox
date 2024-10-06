import React from 'react';
import { View } from 'react-native';
import { Dimensions, Text } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import styled from 'styled-components/native';
import MapListItem from './MapListItem';

const windowHeight = Dimensions.get('window').height;

const Header = styled.View`
  align-items: center;
  background-color: white;
  padding: 0 20px;
`;

const PanelHandle = styled.View`
  width: 41px;
  height: 4px;
  background-color: #E1E1E1;
  border-radius: 17px;
`;

const StyledTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #2F3136;
`;

const MapBottomSheet = ({ markersData, onPressElement }) => {
//  console.log(markersData);

  const showEmptyListView = () => {
      return (
          <View>
            <StyledTitle>"No results."</StyledTitle>
          </View>
      )
  }

  return (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[100, '50%', windowHeight - 200]}
      initialSnapIndex={1}
      renderHandle={() => (
        <Header>
          <PanelHandle />
        </Header>
      )}
      data={markersData}
      keyExtractor={(i) => i.fsq_id}
      renderItem={({ item }) => (
        <MapListItem item={item} onPressElement={onPressElement(item)} />
      )}
      ListEmptyComponent={showEmptyListView}
      contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}
    />
  );
};

export default MapBottomSheet;
