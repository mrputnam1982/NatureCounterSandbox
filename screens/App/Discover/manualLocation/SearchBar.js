import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput as RNTextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { THEME_DARK_GREEN, THEME_GREEN } from '../../../../components/Utilities/Constants';


/**
 *
 * @param placeholder
 * @param value
 * @param onChangeText
 * @return {JSX.Element}
 * @constructor
 */
const SearchBar = ({ navigation, placeholder, onChangeText }) => {
  
  const [value, setText] = useState("");

  return (
    <View style={styles.form}>
      <Icon 
        name={"left"} 
        size={20} 
        type="antdesign"
        onPress={() => navigation.pop()}
      />
      <RNTextInput
        autoCapitalize="none"
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={(value) => {
          setText(value);
          onChangeText(value);
        }}
      />
      <Icon 
        name={"closecircleo"} 
        size={20} 
        type="antdesign" 
        onPress={() => setText("")}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    height: 50,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
  },
  form: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: 340,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingLeft: 12,
    alignItems: 'center',
    borderColor: THEME_GREEN,
    borderWidth: 1,
    borderRadius: 30,
  },
});
