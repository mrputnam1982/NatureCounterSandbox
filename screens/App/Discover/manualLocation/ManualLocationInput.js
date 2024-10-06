import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SvgImg from '../../../../assets/icons/Journal/TextField-Error.svg';
import LocationErrorModal from './LocationErrorModal';

const ManualLocationInput = ({onPressElement}) => {
  const [isValid, setIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onModalClose = () => {
    setModalVisible(false);
  };

  const validationHandler = input => {
    const data = input.nativeEvent.text.split(',').map(item => item.trim());

    if (data.length < 2 || data.length > 4) {
      setModalVisible(true);
      return setIsValid(false);
    }

    const [park, ...rest] = data;

    if (rest.length === 1 && !isNaN(rest[0]) && rest[0].length >= 5) {
      // Park, Zipcode (min 5 digits)
      setIsValid(true);
      setModalVisible(false);
      setLocation(() => ({
        longitude: null,
        latitude: null,
        name: park,
        category: [],
        city: null,
        state: null,
        zipcode: rest[0],
      }));
    } else if (rest.length === 2 && isNaN(rest[0]) && isNaN(rest[1])) {
      // Park, City, State
      setIsValid(true);
      setModalVisible(false);
      setLocation(() => ({
        longitude: null,
        latitude: null,
        name: park,
        category: [],
        city: rest[0],
        state: rest[1],
        zipcode: null,
      }));
    } else if (rest.length === 3 && !isNaN(rest[2]) && rest[2].length >= 5) {
      // Park, City, State, Zipcode (min 5 digits)
      setIsValid(true);
      setModalVisible(false);
      setLocation(() => ({
        longitude: null,
        latitude: null,
        name: park,
        category: [],
        city: rest[0],
        state: rest[1],
        zipcode: rest[2],
      }));
    } else {
      setModalVisible(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (location != null) {
      onPressElement(location);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      {isTyping && (
        <View style={styles.titleContainer}>
          <Text style={isValid ? styles.titleValid : styles.titleInvalid}>
            Manual Location
          </Text>
        </View>
      )}
      <View style={styles.textInputContainer}>
        <TextInput
          style={isValid ? styles.textInputValid : styles.textInputInvalid}
          placeholder="Manual Location"
          onFocus={() => {
            setIsTyping(true);
          }}
          onEndEditing={text => {
            if (text.nativeEvent.text == '') {
              setIsTyping(false);
            }
          }}
          onSubmitEditing={response => {
            validationHandler(response);
          }}
        />
        {!isValid ? (
          <SvgImg style={styles.textFieldError} marginRight="10%" width="50%" height="50%" />
        ) : null}
      </View>

      {isValid ? (
        <Text style={styles.commentValid}>
          Name of a park, city, state, and zip code
        </Text>
      ) : (
        <Text style={styles.commentInvalid}>
          Please enter a valid location
        </Text>
      )}
      <LocationErrorModal
        visibility={modalVisible}
        toggleVisibility={onModalClose}
      />
    </View>
  );
};

export default ManualLocationInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 12,
  },
  titleContainer: {
   
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    width: 100,
    zIndex: 1,
    marginBottom: -8,
    marginTop: -8,
  },
  
  textInputContainer: {
    ...Platform.select({
      android: {
        flexDirection: 'row',
      },
      ios: {
        flexDirection: 'row',
        height: 40,
      },
    }),
  },
  titleValid: {
    fontSize: 12,
    fontFamily: 'System',
    color: '#707070',
  },
  titleInvalid: {
    fontSize: 12,
    fontFamily: 'System',
    color: '#B3261E',
  },
  commentValid: {
    fontSize: 12,
    fontFamily: 'System',
    color: '#707070',
    marginLeft: 16,
    marginTop: 8,
  },
  commentInvalid: {
    fontSize: 12,
    fontFamily: 'System',
    color: '#B3261E',
    marginLeft: 16,
    marginTop: 8,
  },
  textInputValid: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#459F5E',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'System',
    paddingLeft: 16,
  },
  textInputInvalid: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#B3261E',
    borderRadius: 5,
    fontSize: 16,
    fontFamily: 'System',
    paddingLeft: 16,
  },
  textFieldError: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 250,
  },
  // buttonContainer: {
  //     flexDirection: 'row',
  //     marginTop: 24,
  //     marginLeft: 20,
  //     marginRight: 20,
  //     marginBottom: 16,
  //     zIndex: 1
  //     // backgroundColor: '#e9f5ea',
  // },
  buttonConfirm: {
    backgroundColor: '#459F5E',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 50,
    marginLeft: 225,
    zIndex: 1,
  },
});
