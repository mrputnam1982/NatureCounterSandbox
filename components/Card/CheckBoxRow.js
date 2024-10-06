import React, { useState } from 'react';
import { View, Text, SafeAreaView, } from 'react-native';
import * as userActions from '../../redux/actions/userActions';
import BouncyCheckbox from "react-native-bouncy-checkbox";

/**
 * Card to show a checkbox
 * @param checkbox
 * @return {JSX.Element}
 * @constructor
 */
const CheckBoxRow = ({ user, category }) => {
    let bouncyCheckboxRef = null;
    subsList = user.subscriptions
    const isSubbed = (subsList.includes(category))
    const [checkboxState, setCheckboxState] = React.useState(isSubbed);
    console.log("The category for the checkbox is, " + category);
    const handleSubPress = () => {
        console.log("Handling sub checkbox press!");
        userActions.updateUserSubs(user, category)
        setCheckboxState(!checkboxState)
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "center",
            }}
        >
            <BouncyCheckbox
                style={{ marginTop: 16 }}
                ref={(ref) => (bouncyCheckboxRef = ref)}
                isChecked={checkboxState}
                text={category}
                disableBuiltInState
                onPress={handleSubPress}
                textStyle={{
                    textDecorationLine: "none",
                    fontWeight: "500",
                    color: "black"

                }}
                fillColor="#24BF9C"
            />

        </SafeAreaView>
    );
};
export { CheckBoxRow };