import React, {useCallback, useState} from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { green } from 'react-native-redash';
const axios = require('axios')

const styles = StyleSheet.create({
    calender: {
      width: '100%',
      height: 45,
      flexDirection: 'row',
      borderRadius: 50,
      marginLeft: 0,
    },
    calenderButton:{
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 50,
        borderStyle:'solid',
        borderColor:'#459F5E',
        borderWidth:1,
    }
  });

//this component displays a calender that the user can use to select a date range.
export default function DatePicker({callback}) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState ('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState(convertMonthToString(date.getMonth()+1)+' '+date.getDate());

    function convertMonthToString(index){
        switch(index){
            default:
                return "month index out of range"
            case 1:
                return "Jan"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "May"
            case 6:
                return "Jun"
            case 7:
                return "Jul"
            case 8:
                return "Aug"
            case 9:
                return "Sep"
            case 10:
                return "Oct"
            case 11:
                return "Nov"
            case 12:
                return "Dec"
        };
    }

    //update date information when the selected date is changed
    function onChange  (event, selectedDate)  {
        const currentDate = selectedDate || date;
        setShow(Platform.OS==='android')
        setDate(currentDate);
        let tempDate = new Date(currentDate);

        let dateString ="";
        setShow(false)
        dateString = (convertMonthToString(tempDate.getMonth()+1))+' '+tempDate.getDate();
        setText(dateString);
        callback(selectedDate);
    }

    const showMode = (currentMode)=>{
        setShow(true);
        setMode(currentMode);
    }

    return (
        <View>
            <View style={styles.calender}>
                <TouchableOpacity style = {styles.calenderButton} onPress={() =>showMode('date') }>
                    <Text>{text}</Text>
                </TouchableOpacity>
            </View>
            {show &&(
                <DateTimePicker testID = 'dateTimePicker'
                    value = {date}
                    mode ={mode}
                    is24Hour={true}
                    display='default'
                    onChange = {onChange}
                />
            )}
        </View>
    );
}