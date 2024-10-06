import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, View, Text } from 'react-native';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile, LocalTile } from 'react-native-maps';
import TopBar from '../../../components/TopBar/TopBar';
import { Overlay } from 'react-native-elements';
import { Button } from '../../../components/Button';
import MapBottomSheet from '../../../components/BottomSheet/MapBottomSheet';
import mapStyle from './mapStyle';
import { THEME_GREEN } from '../../../components/Utilities/Constants';
import { useMap } from './useMap';
import ParkConfirmation from './manualLocation/ParkConfirmation'
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import styles from '../../../components/Utilities/styles';

const parkLimit = 5;
const defaultLL = '30.265853,-97.73507';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const Map = styled(MapView)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

const axiosInstance = rateLimit(axios.create( {timeout: 10000 } ), {maxRequests: 1, perMilliseconds: 60000});

const MapScreen = ({navigation}) => {
  const [placesData, setPlacesData] = useState([]);
  const [nearestPark, setNearestPark] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const { mapRef, selectedMarker, handleNavigateToPoint, handleResetInitialPosition, latLong, hasPermission } = useMap();

  useEffectAsync(async () => {
    handleResetInitialPosition();
    queryPlaces();
    Geolocation.watchPosition(handleResetInitialPosition);
  }, []);

  useEffectAsync(async () => {
    queryPlaces();
  }, [latLong]);

  function useEffectAsync(effect, inputs) {
    useEffect(() => {
      effect();
    }, inputs);
  }

  function queryPlaces() {
    const queryLL = ''+latLong[0]+','+latLong[1];
    if (queryLL === defaultLL) {
        console.log('Location not updated.');
        setModalVisible(false);
    } else {
    axiosInstance.get(
      'https://api.foursquare.com/v3/places/search',
      {
        params: {
          ll: queryLL,
          radius: '5000',
          categories: '16032,16019',
          exclude_all_chains: 'true',
          sort: 'DISTANCE',
          limit: parkLimit.toString()
        },
        headers: {
          Authorization: 'fsq3Op/pD/640rU9TmxrsbVnin4F+4E6FMqsGEG+M8LxeaU='
        }
      }
    )
      .then(res => {
        setPlacesData(res.data['results']);
        setNearestPark(res.data['results'][0]);
        console.log(Object.keys(res.data['results'][0]));
        setModalVisible(false);
      })
      .catch(err => {
        console.error(JSON.stringify(err))
        setModalVisible(true);
      });
    }
  }

  const renderPlacesData = (data) => {
      return placesData.map((m) => (
        <Marker
          key={m.fsq_id}
          coordinate={{
            latitude: m.geocodes.main.latitude,
            longitude: m.geocodes.main.longitude,
          }}
          color={THEME_GREEN}
        />
      ))
  }


  return (
    <Container>
      <Overlay
        isVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <Text style={styles.messModal}>
          An error occurred while{'\n'}finding nearby parks.
        </Text>
        <View style={{marginVertical: 10}}>
          <Button label="Retry" onPress={() => {
            setModalVisible(false);
            queryPlaces();
          }}/>
        </View>
        <View style={{marginVertical: 10}}>
          <Button label="Search by Name" onPress={() => {
            setModalVisible(false);
            navigation.navigate('SearchLocations');
          }}/>
        </View>
        <View style={{marginVertical: 10}}>
          <Button type='light' label="Exit to Menu" onPress={() => {
            setModalVisible(false);
            navigation.navigate('HomeScreen');
          }}/>
        </View>
      </Overlay>
      <TopBar onPressElement={handleResetInitialPosition} />
      <Map
        ref={mapRef}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        showsUserLocation={true}
      >
        {renderPlacesData(placesData)}
      </Map>
    </Container>
  );
};

export default MapScreen;
