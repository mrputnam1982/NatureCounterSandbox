import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

/**
 *
 * @param location
 * @return {JSX.Element}
 * @constructor
 */

const LocationBox = ({location}) => {

    if(location === null) {
        return(
            <View style = {styles.container}>
                <View>
                    <Text style = {styles.noLocationText}>Location</Text>
                </View>
            </View>
        );
    }else{
        let name = location.name;
        for(let i = 0; i < location.category.length; i++){
            if( i == 0 ) {
                name += ' - ' + location.category[i];  
            }else{
                name += ', ' + location.category[i];
            }
        }
        const address = (location.city != null ? location.city : '') +
                        (location.state != null ? (location.city != null ? ', '+location.state : location.state) : '') +
                        (location.zipcode != null ?  ' ' + location.zipcode : '');
    
        return (
            <View style = {styles.container}>
                    <View>
                        <Text style = {styles.textBlack}>{name}</Text>
                    </View>
                    <View>
                        <Text style = {styles.textBlack}>{address}</Text>
                    </View>
            </View>
        );
    }
    
    
  };

export default LocationBox;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'column'
    },
    title: {
        paddingTop: 8,
        fontSize: 14,
        fontFamily: 'System',
        color: '#707070',
        // backgroundColor: 'black',
    },
    noLocationText: {
        fontSize:20,
        fontFamily: 'System',
        marginLeft: 3,
        marginTop: 18,
        marginBottom: 14,
        color: 'black',
        // backgroundColor: 'black',
      },
    textBlack: {
        fontSize:16,
        paddingLeft: 10,
        fontFamily: 'System',
        marginLeft: -10,
        color: '#1D2023',
        // backgroundColor: 'red',
    },
});
