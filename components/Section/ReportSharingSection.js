import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Divider} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import NC_APP from '../../assets/icons/Share-Illustration.svg';
import Button from '../../components/Button/Button';
import CalendarButton from '../Button/CalendarButton';
import {THEME_DARK_GREEN} from '../Utilities/Constants';
import {
  deleteReportService,
  saveToPhoneService,
  sendToEmailService,
} from '../Utilities/ReportSharingServices';
import styles from './styles';

function ReportSharingSection({route}) {
  const [sendToEmail, setSendToEmail] = useState(false);
  const [saveToPhone, setSaveToPhone] = useState(false);
  const [buttonText, setButtonText] = useState('Confirm');
  const [sending, setSending] = useState(false);

  const dateFilterInit = dateFilter
    ? dateFilter
    : route.params?.dateFilter || {
        startDate: null,
        endDate: null,
      };

  const [dateFilter, setDateFilter] = useState(dateFilterInit);

  const userDetails = useSelector(
    state => ({
      displayName: state.getIn(['user', 'displayName']),
      email: state.getIn(['user', 'email']),
    }),
    userDetails,
  );

  const handleCalendarButtonPress = selectedDate => {
    setDateFilter(selectedDate);
  };

  const handleConfirmPress = async () => {
    if (!(saveToPhone || sendToEmail)) {
      Toast.show(`Please select an option to get your report`, Toast.LONG);
      return;
    }
    setButtonText('Sending...');
    setSending(true);

    if (saveToPhone) {
      try {
        const response = await saveToPhoneService(
          dateFilter.startDate,
          dateFilter.endDate,
        );
        if (response?.status === 200) {
          Toast.show(`Report saved at ${response.filePath}`, Toast.LONG);
          await deleteReportService();
        } else if (response?.status === 204) {
          Toast.show(`No data found for the selected dates`, Toast.LONG);
        } else {
          Toast.show(`Error saving report to your phone`, Toast.LONG);
        }
      } catch (err) {
        console.log('Error', err);
      }
    }

    if (sendToEmail) {
      try {
        const response = await sendToEmailService(
          dateFilter.startDate,
          dateFilter.endDate,
        );
        if (response?.status === 200) {
          Toast.show(`Report sent to ${userDetails.email}`, Toast.LONG);
        } else if (response?.status === 204) {
          Toast.show(`No data found for the selected dates`, Toast.LONG);
        } else {
          Toast.show(
            `Error sending report to ${userDetails.email}`,
            Toast.LONG,
          );
        }
      } catch (err) {
        console.log('Error', err);
      }
    }

    setButtonText('Confirm');
    setSending(false);
  };

  useEffect(() => {
    if (dateFilterInit.startDate && dateFilterInit.endDate) {
      setDateFilter(dateFilterInit);
    } else setDateFilter({startDate: new Date(), endDate: new Date()});
  }, []);

  return (
    <>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <NC_APP width="128" height="128" style={{marginTop: 20}} />

          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 16,
              justifyContent: 'center',
            }}>
            <Text style={{marginVertical: 16, fontSize: 16, width: '100%'}}>
              Set Dates
            </Text>
            <View>
              {dateFilter.startDate && dateFilter.endDate ? (
                <View>
                  <CalendarButton
                    onSubmit={handleCalendarButtonPress}
                    mode="range"
                    maxDateEnabled={false}
                    _startDate={dateFilter.startDate}
                    _endDate={dateFilter.endDate}
                  />
                </View>
              ) : (
                <Text>Error setting dates!</Text>
              )}
            </View>

            <Divider style={styles.divider} />

            <Text style={{marginVertical: 18, fontSize: 16}}>
              Please confirm how you want to share your health report:
            </Text>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize: 17}}>Send to email</Text>
              <CheckBox
                style={{
                  borderColor: sendToEmail ? THEME_DARK_GREEN : 'white',
                  marginLeft: 'auto',
                }}
                value={sendToEmail}
                onValueChange={() => {
                  setSendToEmail(!sendToEmail);
                }}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{fontSize: 17}}>Download to My Phone</Text>
              <CheckBox
                style={{
                  borderColor: saveToPhone ? THEME_DARK_GREEN : 'white',
                  marginLeft: 'auto',
                }}
                value={saveToPhone}
                onValueChange={() => {
                  setSaveToPhone(!saveToPhone);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        style={{
          position: 'absolute',
          bottom: 30,
          width: '60%',
        }}
        label={buttonText}
        onPress={handleConfirmPress}
        disabled={sending}
      />
    </>
  );
}

export default ReportSharingSection;
