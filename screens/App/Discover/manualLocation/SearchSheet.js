import { useBackButton } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Text, ScrollView } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import styled from 'styled-components/native';
import SearchItem from './SearchItem';

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

const SearchSheet = ({ searchResults, onPressElement }) => {
  
  function renderItems() {
    // console.log(searchResults);
    return (
      searchResults.map((item) => (
        <SearchItem 
          name = {item.name}
          key={item.fsq_id}
          categories = {item.categories}
          location = {item.location}
          onPressElement={() => {
            let categoriesArray = [];
            for(let category of item.categories){
              categoriesArray.push(category.name);
            }
            onPressElement({
              longitude:item.geocodes.main.longitude,
              latitude: item.geocodes.main.latitude, 
              name: item.name,
              category: categoriesArray,
              city: item.location.locality,
              state: item.location.region,
              zipcode: item.location.postcode
            });
          }}
        />
        )
      )
    )
  }

  return (
    <ScrollView>
      {renderItems()}
    </ScrollView>
  );
};

export default SearchSheet;
