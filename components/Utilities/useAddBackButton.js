import React, { useEffect } from 'react'
import {Button, Icon} from "react-native-elements";
import { Text, StyleSheet, View } from 'react-native';
import { COLOR_BG, THEME_GREEN, THEME_LIGHT_GREEN } from './Constants';

import {CALENDAR_ICON} from '../../assets/icons';

function useAddBackButton(
    navigation,
    landing = false,
    destination = 'HomeScreen'
) {

    useEffect(() => {
        const shouldRenderBackButton = navigation.getState().index === 0 || landing;
        if (shouldRenderBackButton) {
            navigation.setOptions({
                headerLeft: () =>  
                <View style={{width: 200, flexDirection: 'row', alignItems: 'center', textAlign: 'center'}}>
                    <Text>
                        <Icon name={'chevron-left'} color={THEME_GREEN} onPress={ () => { navigation.navigate(destination, {isStateLoaded: true}) } } size={40}/>
                    </Text>
                </View>
            })
        }
    }, [navigation])
}

export default useAddBackButton;