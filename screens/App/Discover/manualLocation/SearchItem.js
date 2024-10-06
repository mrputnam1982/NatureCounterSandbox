import React from 'react';
import { Text, StyleSheet, View,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import SvgImg from '../../../../assets/icons/Journal/System_Location.svg';

const SearchItem = ({name, categories,location, onPressElement }) => {
  const handlePress = () => onPressElement();
  let postfix = '';
  for(let i = 0; i < categories.length; i++){
    postfix += categories[i].name;
    if(i != categories.length-1) postfix += ', ';
  }
  if(name.length + postfix.length > 43){
    postfix = postfix.substring(0,40-name.length) + '...';
  }
  return (
    <View>
      <TouchableOpacity
        style = {styles.itemContainer}
        onPress={handlePress}
      >
        <View style = {styles.iconContainer} >
        <SvgImg
          width = '100%'
          height = '100%'
        />
        </View>
        
        <View style = {styles.textContainer}>
          <Text style = {styles.textLocation}>{name + ' - ' + postfix}</Text>
          <Text style = {styles.textAddress}>{location.locality + ', ' + location.region}</Text>
        </View>
        
      </TouchableOpacity>
    </View>
  );
};

export default SearchItem;

SearchItem.propTypes = {
  onPressElement: PropTypes.func,
  name: PropTypes.string,
  categories: PropTypes.array,
  location: PropTypes.object
};

SearchItem.defaultProps = {
  onPressElement: () => {},
  name: '',
  categories: [],
  location: null
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginLeft: 24,
    marginRight: 24,
    // backgroundColor: 'red',
    borderBottomColor: '#C1C1C1',
    borderBottomWidth: 3,
  },
  iconContainer: {
    marginTop: 16, 
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black'
  },
  textContainer: {
    marginLeft: 19,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column'
  },
  textLocation: {
    fontFamily: 'System',
    fontSize: 16,
    color: '#1D2023',
    marginBottom: 5,
  },
  textAddress: {
    fontFamily: 'System',
    fontSize: 13,
    color: '#707070'
  }
});
