/* eslint-disable react/jsx-one-expression-per-line */
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Switch, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Portal, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from 'react-native-wheel-pick';
import { updateUserNotificationSetting } from '../../redux/actions/userActions';
import { Button } from '../../components/Button';
import useAddBackButton from "../../components/Utilities/useAddBackButton";

// Unique identifier for custom time option
const CUSTOM_TIME = 'Custom Time';

const styles = StyleSheet.create({
  settingHeader: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 24,
    color: '#A4A9AE',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'System',
  },
  settingItem: {
    paddingHorizontal: 16,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopColor: '#E7E7E7',
    borderTopWidth: 1,
  },
  noTopBorder: {
    borderTopWidth: 0,
  },
  settingItemName: {
    color: '#1D2023',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'System',
    flexGrow: 1,
  },
  settingItemValue: {
    color: '#7F8489',
    fontWeight: '400',
    fontFamily: 'System',
    fontSize: 16,
  },
  inactiveText: {
    color: '#C4C4C4',
  },
  // Last setting item gets a bottom border
  settingItemLast: {
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
  },
  frequencySettingWrapper: {
    backgroundColor: 'white',
    flex: 1,
  },
});

const NCSwitch = props => (
  <Switch
    style={{
      margin: 0,
      padding: 0,
    }}
    trackColor={{ false: '#21212114', true: '#DCEFE0' }}
    // eslint-disable-next-line react/destructuring-assignment
    thumbColor={props.value ? '#459F5E' : '#FFFFFF'}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

const NotificationScreen = () => {
  const settings = useSelector(state => state.getIn(['UserDetails', 'userdetails', 'notificationSettings']));

  const dispatch = useDispatch();
  const toggle = name => dispatch(updateUserNotificationSetting(name, !settings.get(name)));

  // useState(() => {
  //   console.log('setting changed');
  //   // prevent requests from being sent too frequently
  //   const timeout = setTimeout(() => {
  //     // send post request here
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [
  //   pauseAlert,
  //   pauseNotif,
  //   healthReportFrequency,
  //   articleFrequency,
  //   achievementFrequency,
  //   progressReminderFrequency,
  //   counterReminderFrequency,
  // ]);

  // These numbers don't have any significant meaning
  const optionType1 = [
    { name: 'Never', value: 0 },
    { name: 'Daily', value: 60 * 24 },
    { name: 'Weekly', value: 60 * 24 * 7 },
    { name: 'Monthly', value: 60 * 24 * 31 },
  ];

  const optionType2 = [
    { name: 'Never', value: -1 },
    { name: 'Immediately', value: 0 },
    { name: 'Monthly', value: 60 * 24 * 31 }
  ];

  const optionType3 = [
    { name: 'Never', value: 0 },
    { name: 'First 15 mins', value: 15 },
    { name: 'First 30 mins', value: 30 },
    { name: 'First 60 mins', value: 60 },
    { name: 'First 120 mins', value: 120 },
    { name: 'Custom Time', value: CUSTOM_TIME },
  ];

  const optionType4 = [
    { name: 'Never', value: -1 },
    { name: 'Immediately', value: 0 },
    { name: 'Daily', value: 60 * 24 },
    { name: 'Weekly', value: 60 * 24 * 7 },
    { name: 'Monthly', value: 60 * 24 * 31 },
  ];

  return (
    <View>
      <Text style={styles.settingHeader}>
       Electronic Delivery
      </Text>

      {/* <TouchableOpacity style={styles.settingItem} onPress={() => toggle('pauseAlert')}>
        <Text style={styles.settingItemName}>Pause All</Text>
        <NCSwitch value={settings.get('pauseAlert')} onValueChange={() => toggle('pauseAlert')} />
      </TouchableOpacity> */}

      {/* <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        label="My Progress"
        name="progressReportFrequency"
        options={optionType1}
      />

      <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        last
        label="Articles"
        name="articleFrequency"
        options={optionType1}
      /> */}

      <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        label="Progress Report"
        name="progressReportFrequency"
        options={optionType1}
      /> 

      <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        label="Certification"
        name="certificationFrequency"
        options={optionType2}
      /> 

      <Text style={styles.settingHeader}>
        Notifications
      </Text>

      <TouchableOpacity style={styles.settingItem} onPress={() => toggle('goalPauseNotif')}>
        <Text style={styles.settingItemName}>Goal Reach</Text>
        <NCSwitch value={settings.get('goalPauseNotif')} onValueChange={() => toggle('goalPauseNotif')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => toggle('stampsPauseNotif')}>
        <Text style={styles.settingItemName}>Stamps Unlock</Text>
        <NCSwitch value={settings.get('stampsPauseNotif')} onValueChange={() => toggle('stampsPauseNotif')} />
      </TouchableOpacity>

      <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        label="Tracking Reminder"
        name="trackingReminderFrequency"
        options={optionType1}
      />

      <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        label="Stop Counter Reminder"
        name="stopCounterReminderFrequency"
        options={optionType3}
      />

      <TouchableOpacity style={styles.settingItem} onPress={() => toggle('setCounterpauseNotif')}>
        <Text style={styles.settingItemName}>Set Counter Reminder</Text>
        <NCSwitch value={settings.get('setCounterpauseNotif')} onValueChange={() => toggle('setCounterpauseNotif')} />
      </TouchableOpacity>

      <FrequencySettingItem
        active={!settings.get('pauseAlert')}
        label="New Articles"
        name="NewArticlesFrequency"
        options={optionType4}
      />
    </View>
  );
};

const getSecond = val => (val % 60).toString().padStart(2, '0');
const getMinute = val => (val % 60).toString().padStart(2, '0');
const getHour = val => Math.floor(val / 60).toString().padStart(2, '0');
const valueToTime = val => `${getHour(val)}:${getMinute(val)}:${getMinute(val)}`;

const FrequencySettingItem = ({
  active, last = false, options = [],
  label, name,
}) => {
  const navigation = useNavigation();
  const value = useSelector(state => state.getIn(['UserDetails', 'userdetails', 'notificationSettings', name]));
  const str = options.find(opt => opt.value === value)?.name || valueToTime(value);

  useAddBackButton(navigation, true);

  return (active ? (
    <TouchableOpacity
      style={[styles.settingItem, last ? styles.settingItemLast : null]}
      onPress={() => navigation.navigate('NotificationFrequencyScreen', {
        label, name, options,
      })}
    >
      <Text style={styles.settingItemName}>{label}</Text>
      <Text style={styles.settingItemValue}>{str}</Text>
      <Icon name="chevron-right" type="material-community" color="#459F5E" size={36} />
    </TouchableOpacity>
  ) : (
    <View style={[styles.settingItem, last ? styles.settingItemLast : null]}>
      <Text style={[styles.settingItemName, styles.inactiveText]}>{label}</Text>
      <Text style={[styles.settingItemValue, styles.inactiveText]}>{str}</Text>
      <Icon name="chevron-right" type="material-community" color="#C4C4C4" size={36} />
    </View>
  ));
};

const NotificationFrequencyScreen = ({
  route: {
    params: {
      label,
      name,
      options,
    },
  },
}) => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.getIn(['UserDetails', 'userdetails', 'notificationSettings', name]));
  const update = newVal => dispatch(updateUserNotificationSetting(name, newVal));

  const [showPicker, setShowPicker] = useState(false);
  const [leftVal, setLeftVal] = useState(option === CUSTOM_TIME ? getHour(value) : '00');
  const [midVal, setMidVal] = useState(option === 'CUSTOM_TIME' ? getMinute(value) : '00');
  const [rightVal, setRightVal] = useState(option === 'CUSTOM_TIME' ? getSecond(value) : '00'); 
  const [timeType, setTimeType] = useState('');

  const option = options.find(o => o.value === value)?.name || CUSTOM_TIME;

  const saveCustomTime = () => {
    setShowPicker(false);
    update(parseInt(leftVal, 10)  + // hours 
           parseInt(midVal, 10)  + // minutes
           parseInt(rightVal, 10)) // seconds
  };

  return (
    <View style={styles.frequencySettingWrapper}>
      {/* <Header title={label} navigation={navigation} /> */}
      <Text style={[styles.settingHeader, styles.settingItemLast]}>
        Frequency
      </Text>

      {options.map((opt) => (opt.name === CUSTOM_TIME ? (
        <TouchableOpacity
          style={[styles.settingItem, styles.noTopBorder]}
          onPress={() => setShowPicker(true)}
          key={opt.name}
        >
          <Text style={styles.settingItemName}>{opt.name}</Text>
          {option === CUSTOM_TIME ? (
            <Text style={styles.settingItemValue}>{leftVal}:{midVal}:{rightVal} {timeType}</Text>
          ) : (
            <Text style={styles.settingItemValue}>Hr : Min: Sec</Text>
          )}
          <RadioButton.Item
            status={opt.name === option ? 'checked' : 'unchecked'}
            onPress={() => setShowPicker(true)}
            color="#459F5E"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.settingItem, styles.noTopBorder]}
          onPress={() => update(opt.value)}
          key={opt.name}
        >
          {/* <Text style={styles.settingItemName}>{opt.name}</Text>
          <RadioButton
            status={opt.name === option ? 'checked' : 'unchecked'}
            onPress={() => update(opt.value)}
            color="#459F5E"
          /> */}

            <View key={opt.name} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, marginLeft: 10 }}>{opt.name}</Text>
              {/* <RadioButton
                value={opt.value}
                status={opt.name === option ? 'checked' : 'unchecked'}
                onPress={() => update(opt.value)}
              /> */}
              <View style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: opt.name === option ? '#459F5E' : '#000',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {
                  opt.name === option ?
                    <View style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: '#459F5E',
                    }} />
                    : null
                }
              </View>
            </View>
        </TouchableOpacity>
      )))}

      <Portal>
        <Modal
          visible={showPicker}
          onDismiss={saveCustomTime}
          style={{
            justifyContent: 'flex-end',
          }}
          contentContainerStyle={{
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              backgroundColor: '#DCEFE0',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 18,
              paddingHorizontal: 16,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'System',
              }}
            >
              Set Reminder Duration
            </Text>
            <Icon
              name="close"
              onPress= {() => setShowPicker(false)}
              type="material-community"
              color="#1D2023"
              size={24}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Picker
              selectedValue={leftVal}
              pickerData={Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0'))}
              onValueChange={setLeftVal}
              style={{
                backgroundColor: 'white',
                width: '33%',
                height: 190,
              }}
              selectBackgroundColor="#E8F5FF4A"
              isShowSelectLine={false}
            />
            <View
              style={{
                width: '1%',
                display: 'flex',
                justifyContent: 'center',
                height: 190,
              }}
            >
              <Text
                style={{
                  backgroundColor: '#E8F5FF4A',
                  width: '100%',
                  height: 26,
                  fontSize: 20,
                  fontFamily: 'System',
                  fontWeight: '500',
                  textAlignVertical: 'center',
                }}
              >
                :
              </Text>
            </View>
            <Picker
              selectedValue={midVal}
              pickerData={Array.from({ length: 61 }, (_, i) => i.toString().padStart(2, '0'))}
              onValueChange={setMidVal}
              style={{
                backgroundColor: 'white',
                width: '33%',
                height: 190,
              }}
              selectBackgroundColor="#E8F5FF4A"
              isShowSelectLine={false}
            />
            <View
              style={{
                width: '1%',
                display: 'flex',
                justifyContent: 'center',
                height: 190,
              }}
            >
              <Text
                style={{
                  backgroundColor: '#E8F5FF4A',
                  width: '100%',
                  height: 26,
                  fontSize: 20,
                  fontFamily: 'System',
                  fontWeight: '500',
                  textAlignVertical: 'center',
                }}
              >
                :
              </Text>
            </View>
            <Picker
              selectedValue={rightVal}
              pickerData={Array.from({ length: 61 }, (_, i) => i.toString().padStart(2, '0'))}
              onValueChange={setRightVal}
              style={{
                backgroundColor: 'white',
                width: '33%',
                height: 190,
              }}
              selectBackgroundColor="#E8F5FF4A"
              isShowSelectLine={false}
            />
            <Picker
              selectedValue="Hr"
              pickerData={['Hr']}
              onValueChange={setTimeType}
              style={{
                backgroundColor: 'white',
                width: '33%',
                height: 190,
              }}
              selectBackgroundColor="#E8F5FF4A"
              isShowSelectLine={false}
            />
          </View>

          <Button
            type="green"
            size="large"
            label="Save"
            onPress={saveCustomTime}
            style={{/* eslint-disable react/jsx-one-expression-per-line */
              marginBottom: 16,
              marginTop: 24,
            }}
          />
        </Modal>
      </Portal>
      <View style={styles.settingItemLast} />
    </View>
  );
};

export { NotificationScreen, NotificationFrequencyScreen };