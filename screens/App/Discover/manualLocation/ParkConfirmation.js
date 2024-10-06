import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { Overlay } from 'react-native-elements';
import PropTypes from 'prop-types';
import SvgImg from '../../../../assets/icons/Journal/System_Location.svg';
import Exit from '../../../../assets/exit_button.svg';

const ParkConfirmation = ({ location, handleConfirmation, setClickedAddLocation }) => {

    const [modalVisible, setModalVisible] = useState(true);
    const park = location.name;
    const categories = location.category;
    let postfix = '';
    const cityStateZip = (location.city != null ? location.city : '') + 
                        (location.state != null ? (location.city != null ? ', '+location.state : location.state) : '') +
                        (location.zipcode != null ? (location.city != null || location.state != null ? ', '+location.zipcode : location.zipcode) : '');
    for(let i = 0; i < categories.length; i++){
        if(i == 0) postfix += ' - ';
        postfix += categories[i] + ', ';
    }
    return (
        <Overlay
          isVisible={modalVisible}
          overlayStyle={styles.modal}
          >
            <Exit style = {styles.exitButton} onPress={() => {
                setModalVisible(false);
                setClickedAddLocation(false);
                }}/>
            
            <View style = {styles.iconContainer}>
                <View style = {styles.icon}>
                    <SvgImg
                        width = '100%'
                        height = '100%'
                    />
                </View>
            </View>
                
            <View style = {styles.contentContainer}>
                <Text style = {styles.title}>Confirm Your Location</Text>
                <Text>
                    <Text style = {styles.content}>Please confirm </Text>
                    <Text style = {styles.contentBold}>{park}{categories.length == 0 ? ', ' : postfix}{cityStateZip}</Text>
                    <Text style = {styles.content}> is the right location.</Text>
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonEdit}
                    onPress = {() => {
                        setModalVisible(false);
                        handleConfirmation(false);
                        setClickedAddLocation(false);
                    }
                }>
                    <Text style = {{color:'black'}}>Edit Location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonConfirm}
                    onPress = {() => {
                        setModalVisible(false);
                        handleConfirmation(true);
                        setClickedAddLocation(false);
                    }
                }>
                    <Text style = {{color:'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    );
};

export default ParkConfirmation;

ParkConfirmation.propTypes = {
    location: PropTypes.object,
    onButtonPress: PropTypes.func
  };
  
ParkConfirmation.defaultProps = {
    location: null,
    onButtonPress: () => {},
};

const styles = StyleSheet.create({
    modal: {
        width: Dimensions.get('screen').width*0.85,
        height: 300,
        borderRadius: 10,
        paddingLeft: 0,
        paddingRight: 0,
    },
    iconContainer: {
        marginLeft: 140,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: '#F1FAF3',
        width: 60,
        height: 60,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        // backgroundColor: '#e9f5ea',
    },
    contentContainer: {
        flex: 1,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    icon: {
        margin: 15,
        width: 30,
        height: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingBottom: 10,
    },
    content: {
        fontSize: 15,
    },
    contentBold: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    buttonEdit: {
        alignItems: 'center',
        // backgroundColor: '#DDDDDD',
        padding: 10,
        marginLeft: 90,
    },
    buttonConfirm: {
        backgroundColor: '#459F5E',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius:50,
        marginLeft: 15,
    },
    exitButton: {
        position: "absolute",
        right: 16,
        top: 16,
    },
});
