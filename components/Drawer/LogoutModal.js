import React from 'react';
import {View, Text} from 'react-native';

import Symptoms_Elements_2 from '../../assets/drawerIcon/Symptoms_Elements_2.svg';
import Modal from '../Utilities/Modal';
import styles from '../Utilities/styles';
import drawerStyles from '../Utilities/drawerStyles';
import {Button} from '../Button';

const LogoutModal = ({logout, confirmLogout, setConfirmLogout}) => {
    return (
        <Modal active={confirmLogout} setActive={setConfirmLogout} autoHeight>
            <View style={styles.modalContainer}>
                <View style={{marginTop: -30}}>
                    <Symptoms_Elements_2 style={drawerStyles.logoutIcon} />
                </View>
                <View style={drawerStyles.modalLabelView}>
                    <Text style={drawerStyles.modalLabel}>Log Out</Text>
                </View>
                <View style={drawerStyles.modalTextView}>
                    <Text style={drawerStyles.modalText}>
                    Once you log out, your unsaved activity will be lost. Are you sure
                    you want to log out now?
                    </Text>
                </View>
                <View style={drawerStyles.modalButtons} >
                    <Button
                        label="Not Now"
                        onPress={() => setConfirmLogout(false)}
                        type="white"
                        size="small"
                        // style={{marginRight: 'auto', }}
                        // // style={{ justifyContent: "right" }}
                    />
                    <Button label="Yes" onPress={logout} type="green" size="small"/>
                </View>
            </View>
        </Modal>
    )
}

export default LogoutModal;
