import auth from '@react-native-firebase/auth';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Icons_Direction from '../../assets/Icons_Direction.svg';
import Icons_Direction_2 from '../../assets/Icons_Direction_2.svg';
import Icons_Direction_3 from '../../assets/Icons_Direction_3.svg';
import userState from '../../helpers/userState';
import PasswordScreen from '../Auth/PasswordResetScreen';

const Stack = createStackNavigator();


const screenStyle = StyleSheet.create({
    barText:{
        fontFamily: 'Roboto-Regular',
        width: 146,
        height: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 20,
        color: '#1D2023',
    },
    barIcon:{
        marginRight: 4,
        width: 24, 
        height: 24, 
    },
    listText: {
        fontFamily: 'Roboto-Regular',
        height: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 16,
        color: '#1D2023',
        marginVertical: 20,
        marginLeft: 16,
    },
    listID: {
        fontFamily: 'Roboto-Regular',
        width: 90,
        height: 22,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 22,
        color: '#C4C4C4',
        marginRight: 16,
    },
    rowView:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between' ,
    },
    viewContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
})

const LoginAndSecurity = ({navigation}) => (
    
    <View>
        <View
        style = {{
            backgroundColor: '#DCEFE0',
            height: 88,
        }}>
            <View
            style = {{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
                marginTop: 54,
            }}>
                <TouchableOpacity>
                    <Icons_Direction 
                        style = {screenStyle.barIcon}
                        onPress={ () => {navigation.goBack(),
                        navigation.dispatch(DrawerActions.openDrawer());
                    }} />
                </TouchableOpacity>
                <Text style = {screenStyle.barText}>Login & Security</Text>
            </View>
        </View>
        <View style={screenStyle.viewContainer}>
            <View style ={screenStyle.rowView}>
                <Text style ={screenStyle.listText}>Account ID</Text>
                <Text style ={screenStyle.listID}>{"XXXXX"+userState.getUserStateId().slice(24)}</Text>       
            </View>
            <Divider style ={{width: '100%', color: 'grey',}}/>

            {auth().currentUser.providerId !== auth.EmailAuthProvider && (
                <>
                    <View style ={screenStyle.rowView}>
                    <Text style ={screenStyle.listText}>Change Password</Text>
                    <TouchableOpacity>
                        <Icons_Direction_2 
                        style = {{marginRight: 16, width:24, height: 24,}}
                        onPress={() => navigation.navigate('PasswordScreen') }
                        />
                    </TouchableOpacity>
                    </View>
                    <Divider style ={{    width: '100%', color: 'grey',}}/>
                </>
            )}

            <View style ={screenStyle.rowView}>
                <Text style ={{
                    fontFamily: 'Roboto-Regular',
                    width: 79,
                    height: 16,
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: 16,
                    lineHeight: 16,
                    color: '#C4C4C4',
                    marginVertical: 20,
                    marginLeft: 16,
                }}>Upgrade</Text>
                <TouchableOpacity>
                    <Icons_Direction_3 style = {{marginRight: 16, width:24, height: 24,}}/>
                </TouchableOpacity>
            </View>
            <Divider style ={{    width: '100%', color: 'grey',}}/>
        </View>
        <View
            style ={{
                justifyContent: 'center',
            }}
        >
                <Text 
                style ={{
                    display: 'flex',
                    fontFamily: 'Roboto-Regular',
                    height: 58,
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 15,
                    lineHeight: 18,
                    color: '#707070',
                    marginTop: 96,
                    textAlignVertical: "center",
                    textAlign: "center",
                }}>Version 10.2.1</Text>
        </View>
    </View>
);

// export default LoginAndSecurity;

export default function LoginAndSecurityWrapper() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="LoginAndSecurity" component={LoginAndSecurity}/>        
            <Stack.Screen name="PasswordScreen" component={PasswordScreen}/>
        </Stack.Navigator>
    );
}
