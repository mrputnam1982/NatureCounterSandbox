import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search_ICON } from "../../assets/icons/Journal";

/**
 *
 * @param onPressHandler
 * @return {JSX.Element}
 * @constructor
 */

const SearchButton = ({onPressHandler}) => {
  return (
    <TouchableOpacity onPress={()=>{onPressHandler(true)}}>
      <View>
        <Image
          style={styles.searchIcon}
          source={Search_ICON}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
      marginBottom: -10,
      height: 30,
      width: 35,
      marginTop: 18
    },
});

export default SearchButton;