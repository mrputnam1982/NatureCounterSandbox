import React, { Fragment } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';

import drawerStyles from '../Utilities/drawerStyles';

import Icons_Benefits from '../../assets/drawerIcon/Icons_Benefits.svg';
import Icons_Control from '../../assets/drawerIcon/Icons_Control.svg';
import Icons_Control_2 from '../../assets/drawerIcon/Icons_Control_2.svg';
import Icons_System from '../../assets/drawerIcon/Icons_System.svg';
import Icons_System_2 from '../../assets/drawerIcon/Icons_System_2.svg';
import Icons_System_3 from '../../assets/drawerIcon/Icons_System_3.svg';
import Icons_System_4 from '../../assets/drawerIcon/Icons_System_4.svg';
import Icons_System_5 from '../../assets/drawerIcon/Icons_System_5.svg';
import Icons_System_6 from '../../assets/drawerIcon/Icons_System_6.svg';
import Icons_System_7 from '../../assets/drawerIcon/Icons_System_7.svg';
import Icons_System_8 from '../../assets/drawerIcon/Icons_System_8.svg';
import Icons_System_9 from '../../assets/drawerIcon/Icons_System_9.svg';
import LearningSection from '../Section/LearningSection';


const DrawerItems = ({
    navigation,
    handleShowLogout,
    handleShowTermsAndConditions,
    handleDataReset,
    handleDeleteAccount,
  }) => {
    const navigateToLoginAndSecurity = () => navigation.navigate('LoginAndSecurityWrapper')
    const navigateToEditAccount = () => navigation.navigate('ProfileScreens', {screen: 'EditAccountScreen'});
    const navigateToNotification = () => navigation.navigate('ProfileScreens', {screen: 'NotificationScreen'});
    const navigateToFAQ = () => navigation.navigate('ProfileScreens', {screen:'HelpCenterSection'});
    const navigateToContactUs = () => navigation.navigate('ProfileScreens', {screen:'HelpCenterSection'});

    const doNothing = () => {};

    const menuItems = [
        {
            name: '', 
            subItems: [
                {
                    title: 'My Account',
                    icon: Icons_System_9,
                    onPress: doNothing,
                    disabled: true
                }
            ]
        },
        {
            name: 'Account Settings',
            subItems: [
                {
                    title: 'Login and Security',
                    icon: Icons_System,
                    onPress: navigateToLoginAndSecurity,
                },
                {
                    title: 'Edit Account',
                    icon: Icons_System_2,
                    onPress: navigateToEditAccount,
                }
            ]
        },
        {
            name: 'Preference',
            subItems: [
                {
                    title: 'Favorite',
                    icon: Icons_Benefits,
                    onPress: doNothing,
                    disabled: true
                },
                {
                    title: 'Notification',
                    icon: Icons_System_3,
                    onPress: doNothing,
                    disabled: true
                },
            ]
        }, 
        {
            name: 'Data and Privacy',
            subItems :[
                {
                    title: 'Terms and Conditions',
                    icon: Icons_System_4,
                    onPress: handleShowTermsAndConditions,
                },
                {
                    title: 'Data Reset',
                    icon: Icons_Control,
                    onPress: handleDataReset,
                },
                {
                    title: 'Delete Account',
                    icon: Icons_Control_2,
                    onPress: handleDeleteAccount,
                }
            ]
        },
        {
            name: 'Help Center',
            subItems: [
                {
                    title: 'FAQ',
                    icon: Icons_System_5,
                    onPress: navigateToFAQ,
                },
                {
                    title: 'Contact Us',
                    icon: Icons_System_6,
                    onPress: navigateToContactUs,
                }
            ]
        },
        {
            name: '',
            subItems: [
                {
                    title: 'Learning',
                    icon: Icons_System_7,
                    onPress: LearningSection,
                },
                {
                    title: 'Log Out',
                    icon: Icons_System_8,
                    onPress: handleShowLogout,
                }
            ]
        }
    ]

    return (
        menuItems.map((menuItem, menu_idx) => {
            return <Fragment key={menu_idx}>
                {menuItem.name !== '' && <Text style={drawerStyles.label}>{menuItem.name}</Text>} 
                
                {menuItem.subItems.map((subItem, subItem_idx) => {
                    return <TouchableOpacity style={drawerStyles.item}
                        onPress={subItem.onPress}
                        key={menu_idx+'_'+subItem_idx}
                        disabled={subItem.disabled} >
                        <subItem.icon style={drawerStyles.icon}/>
                        <Text style={drawerStyles.itemText}>{subItem.title}</Text>
                    </TouchableOpacity>

                })}

                <Divider style={drawerStyles.divider} />
            </Fragment>   
        }) 
    );
}

export default DrawerItems;