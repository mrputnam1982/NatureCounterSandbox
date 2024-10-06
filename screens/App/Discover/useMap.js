import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PermissionsAndroid } from 'react-native';
import { PERMISSIONS, check as iosCheck, request as iosRequest } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const GEOLOCATION_PERMISSION_TITLE = 'Location Services Permission Request';
const GEOLOCATION_PERMISSION_MESSAGE = 'NatureCounter needs Location Services in order to track your nature activity time.';
const GEOLOCATION_PERMISSION_BUTTON_POSITIVE = '';

export function useMap() {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [latLong, setLatLong] = useState([30.265853, -97.735070])
  const handleNavigateToPoint = useCallback(
    (item) => {
      if (mapRef) {
        const newPos = {
            latitude: item.geocodes.main.latitude,
            longitude: item.geocodes.main.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };
        mapRef.current.animateToRegion(
            newPos,
            500,
        );
      }
//     setSelectedMarker(item.key);
     setSelectedMarker(item);
    },
    [mapRef, setSelectedMarker]
  );

  const checkPermission = async () => {
    if (mapRef) {
        if (Platform.OS === 'ios') {
            const result = await iosCheck(PERMISSIONS.IOS.LOCATION);

            if (result === PERMISSIONS.RESULTS.GRANTED || result === PERMISSIONS.RESULTS.LIMITED) {
                setHasPermission(true)
            } else {
                const permission = await iosRequest(PERMISSIONS.IOS.LOCATION);
                    if (permission === PERMISSIONS.RESULTS.GRANTED || permission === PERMISSIONS.RESULTS.LIMITED) {
                        setHasPermission(true)
                    }
            }
        } else {
            const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true)
            } else {
                const permission = await PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]
                );
                if (permission["android.permission.ACCESS_COARSE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasPermission(true)
                }
            }
        }
    }
  }

  const handleConfirmation = (response) => {
      if (response) {
          navigation.navigate('HomeScreen');
      }
      else {
          navigation.navigate('SearchLocations');
      }
  }

  const handleResetInitialPosition = useCallback(async () => {
        checkPermission();
  }, [mapRef, setSelectedMarker]);

  useEffect(() => {
      if (hasPermission) {
          if (Platform.OS === 'ios') {
              // need to consult iOS dev
          }
          else {
            Geolocation.getCurrentPosition((position) => {
            console.log(position);
            setLatLong([position.coords.latitude, position.coords.longitude])
            const newPos =  {
              latitude: (position) ? position.coords.latitude : 30.265853,
              longitude: (position) ? position.coords.longitude : -97.735070,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            };
            mapRef.current.animateToRegion(
                newPos,
                500,
            );
              setSelectedMarker(null);
            }, (error) => {
              console.error(error);
            });
          }
      }
  }, [hasPermission]);

  return {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handleResetInitialPosition,
    latLong,
    hasPermission
  };
}
