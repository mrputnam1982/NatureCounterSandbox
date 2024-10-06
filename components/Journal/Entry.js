import React from 'react';
import {Surface, Text, Divider} from 'react-native-paper';
import {StyleSheet, View, Alert} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import ProgressClock from './ProgressClock';
import {COLOR_FG} from '../Utilities/Constants';
import {useNavigation} from '@react-navigation/native';

const EntryTable = props => {
  const {entries, date} = props;
  // console.log('Entry props', props);
  //  if (entries.length < 2) return null;
  // console.log('Entry values', Object.values(entries));
  return (
    <View>
      <View style={styles.entryTable}>
        <Text>Start time</Text>
        <Text>Duration</Text>
      </View>
      <Divider
        style={{
          borderBottomColor: '#E7E7E7',
          borderBottomWidth: 1,
        }}
      />
      {Object.values(entries).map(entry => (
        <View style={styles.entryTable} key={date + '_' + entry._id}>
          <Text>{moment(entry.startTime).format('hh:mm A')}</Text>
          {moment.duration(entry.duration).asSeconds() < 60 ? (
            <Text>{'< 1 min'}</Text>
          ) : (
            <Text>{moment.duration(entry.duration).asMinutes().toFixed(0) + ' min'}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

EntryTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Entry = props => {
  const {goalTime, entries, isEmpty, date, origin} = props;
  const navigation = useNavigation();
  const getPercent = (actual, goal) => {
    const percent =
      (moment.duration(actual).asSeconds() /
        goal *
      100);

    return Math.min(Math.round(percent), 100);
  };

  const onPressEdit = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AddJournalScreen', 
        params: {title: 'Edit Journal',
        passedEntries: entries,
        origin: origin,
        location: true}}],
    });
    // navigation.replace('AddJournalScreen', {
    //   passedEntries: entries,
    //   title: 'Edit Journal',
    //   origin: origin}
    // );
  };

  if (!isEmpty) {
    entries.forEach(entry => {
      durationSum = moment.duration(entry.durationSum);
    });

    const entriesDate = entries[0].startTime;
    const durationTotal = moment
      .utc(durationSum.asMilliseconds())
      .format('HH:mm:ss');

    return (
      <Surface style={styles.surface} elevation={4}>
        <View style={styles.container}>
          <ProgressClock percent={getPercent(durationTotal, goalTime)} />
          <Text style={{paddingLeft: 10, flex: 2, fontWeight: 'bold'}}>
            {durationTotal}
          </Text>
          <Text style={{flex: 1, color: COLOR_FG}}>
            {getPercent(durationTotal, goalTime)}%
          </Text>
          <Text style={{flex: 2}}>
            {moment(entriesDate).format('MM/DD/YYYY')}
          </Text>
          {origin === 'HomeScreen' ?
            (<View/>) :
            (
              <Text
                style={{fontWeight: 'bold', color: COLOR_FG}}
                onPress={onPressEdit}>
                Edit
              </Text>
          )}
        </View>
        <EntryTable entries={entries} date={date}/>
      </Surface>
    );
  } else {
    return (
      <Surface style={styles.surface} elevation={4}>
        <View style={styles.container}>
          <ProgressClock />
          <Text style={{flex: 1, fontWeight: 'bold', paddingLeft: 20}}>
            No Data
          </Text>
          <Text style={{flex: 2, color: COLOR_FG}}>0%</Text>
        </View>
      </Surface>
    );
  }
};

Entry.propTypes = {
  goalTime: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  entries: PropTypes.arrayOf(PropTypes.object),
  isEmpty: PropTypes.bool,
};

Entry.defaultProps = {
  goalTime: null,
  entries: null,
  isEmpty: false,
};

export default Entry;

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    margin: 10,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  entryTable: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
