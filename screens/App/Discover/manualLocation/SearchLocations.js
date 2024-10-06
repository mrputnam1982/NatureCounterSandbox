  import React, { useEffect, useState } from 'react';
import { StyleSheet , Text, View, ScrollView, TouchableOpacity, Alert, TextInput as RNTextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import ParkConfirmation from './ParkConfirmation';
import styled from 'styled-components/native';
import styles from '../../../../components/Utilities/styles';
import SearchSheet from './SearchSheet';
import { THEME_GREEN } from '../../../../components/Utilities/Constants';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import ManualLocationInput from './ManualLocationInput';
import global from '../../../../components/Utilities/commonStyle.js';
import { TextInput } from 'react-native-paper';

const minLength = 3;
const parkLimit = 5;
const axiosInstance = rateLimit(axios.create( {timeout: 10000 } ), {maxRequests: 1, perMilliseconds: 1000});
const apiKey = 'fsq3s16BzpV2bJ4XSL7yMHnihTWWgF5+NUe/AltI5t0h95E=';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const SearchLocations = ({navigation, route}) => {
  
  const [text, setText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchResults, setResults] = useState([]);
  const [sessionToken, setSessionToken] = useState("");
  const [clickedAddLocation, setClickedAddLocation] = useState(false)
  const {origin, entryId, currentEntries} = route.params;
  useEffect(() => {
      generateToken();
  }, []);

  function generateToken() {
    let token = ''
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

    fetch('https://www.google.com/', {
        mode: 'no-cors',
    }).then(() => {
        for (let i = 0; i < 32; i++) {
          token += letters[Math.floor(Math.random() * letters.length)];
        }
        setSessionToken(token);
        }).catch(() => {
        setSessionToken("");
    })
  }


  const handleConfirmation = (response) => {
      console.log("Location Search Entries:", currentEntries);
      console.log("Location Search Location:", selectedLocation);
      if (response) {
        navigation.navigate(origin, {location: selectedLocation, entryId: entryId, passedEntries: currentEntries}, true);
      }else{
        setSelectedLocation(null);
      }
  }

  const backButtonAction = () => {
    //console.log("Entries:", currentEntries);
    navigation.navigate(origin, {location: null, entryId: entryId, passedEntries:currentEntries}, true);
  }

  const addressHandler = (response) => {
    const addressArray = response.nativeEvent.text.split(",");
    let query = addressArray[0];
    let near = "";
    for(let i = 1; i < addressArray.length; i++){
      near += addressArray[i] + " ";
    }
    axiosInstance.get(
      'https://api.foursquare.com/v3/places/search',
      {
        params: {
          query: query,
          near: near,
          categories: '16032,16019',
          exclude_all_chains: true,
          sort: 'relevance',
          session_token: sessionToken,
          limit: parkLimit.toString()
        },
        headers: {
          Authorization: apiKey
        }
      }
    )
    .then(res => {
      if (res.data['results'].length < 1) {
        console.log('No results found.');
      } else {
        setResults(res.data['results']);
      }
    })
    .catch(err => {
    console.error(JSON.stringify(err))
    });
  }

  return (
    <Container style={{flex: 1}}>
      <View style={clickedAddLocation ? searchStyles.overlayBackground : styles.maincontainer}>  

        {selectedLocation !== null && <ParkConfirmation
          location={selectedLocation}
          handleConfirmation={(response) => {handleConfirmation(response)}}
          setClickedAddLocation={setClickedAddLocation}
        />}
        <View style = {searchStyles.searchBarContainer}>
          <View style={searchStyles.form}>
            <Icon 
              name={"left"} 
              size={20} 
              type="antdesign"
              onPress={backButtonAction}
            />
            <RNTextInput
              autoCapitalize="none"
              placeholder="Search"
              value={text}
              style={searchStyles.input}
              onChangeText={(text) => setText(text)}
              onSubmitEditing = {(response)=>addressHandler(response)}
            />
            <Icon
              name={"closecircleo"}
              size={20}
              type="antdesign"
              onPress={() => {
                setText('');
              }}
            />
          </View>
        </View>
        <Text style={searchStyles.title}>Current Location</Text>
        <ManualLocationInput 
          onPressElement={(item)=>{

            setSelectedLocation(item)
            setClickedAddLocation(true)
          }
        }/>
        
        <Text style={searchStyles.title}>Search Results</Text>
        <SearchSheet
          searchResults={searchResults}
          onPressElement={(item) =>{
            console.log("Location Selected:", item)
            setSelectedLocation(item);
            setClickedAddLocation(false)

          }}
        />
      </View>
    </Container>
  );
};

export default SearchLocations;

const searchStyles = StyleSheet.create({
  searchBarContainer:{
    backgroundColor: '#DCEFE0'
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 24,
    marginTop: 30,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: THEME_GREEN,
    marginHorizontal: 38,
    borderRadius: 30,
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
    alignSelf: 'center',
  },
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
    marginLeft: 24,
    marginRight:24,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingLeft: 12,
    alignItems: 'center',
    borderColor: '#459F5E',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#FFFFFF'
  },
  overlayBackground: {
    ...global.header,
    ...global.body,
    flex: 1,
    opacity: 0.75,
  },
});
