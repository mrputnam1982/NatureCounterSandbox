import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import styled from 'styled-components/native';
import { JournalTime1 } from '../../assets/icons/Journal';
import { isEmpty } from '../../helpers/utilities';
import Entry from './Entry';

const StyledIcon = styled.Image`
  height: 15px;
  width: 15px;
`;

const EntryHistory = props => {
  const {goalTime, entries, origin} = props;
  var runningDurationSum = 0;
  var prevWeek = null;
  var groupByDate = null;
  var entriesToWrite = null;

  const getEntries = async () => {
    if (entries) {
      entriesToWrite = entries.map(entry => {
        var newEntry = {
          startTime: entry.start_time,
          endTime: entry.end_time,
          location: entry.location,
          duration: 0,
          _id: entry._id,
        };
        newEntry.duration =
          new Date(newEntry.endTime).getTime() -
          new Date(newEntry.startTime).getTime();
        return newEntry;
      });
      groupByDate = entriesToWrite

        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .reduce((group, entry) => {
          const {startTime, endTime} = entry;
          entry.week = moment(startTime).week();

          if (prevWeek && entry.week !== prevWeek) {
            runningDurationSum = 0;
          }
          runningDurationSum += entry.duration;
          entry.durationSum = runningDurationSum;

          prevWeek = entry.week;

          const formattedDate = moment(startTime).format('MM/DD/YYYY');
          // eslint-disable-next-line no-param-reassign
          group[formattedDate] = group[formattedDate] ?? [];
          group[formattedDate].push(entry);
          return group;
        }, {});
    }
  };

  useEffect(() => {
    getEntries();
  }, [props.entries]);

  getEntries();

  return (
    <View>
      <Text style={{marginBottom: 10}}>
        <StyledIcon source={JournalTime1} />
        Entry History
      </Text>
      <ScrollView style={styles.scrollView}>
        {!isEmpty(groupByDate) ? (
          <View>
            {Object.keys(groupByDate).map(date => {
              return (
                <Entry
                  entries={groupByDate[date]}
                  goalTime={goalTime}
                  isEmpty={false}
                  key={date}
                  origin={origin}
                />
              );
            })}
          </View>
        ) : (
          <Entry isEmpty={true} />
        )}
      </ScrollView>
    </View>
  );
};

EntryHistory.propTypes = {
  goalTime: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  entries: PropTypes.array,
  // eslint-disable-next-line react/forbid-prop-types
  dateFilter: PropTypes.object.isRequired,
};

export default EntryHistory;

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    margin: 10,
  },

  scrollView: {
    height: 'auto',
    marginHorizontal: 20,
    marginBottom: 'auto',
    paddingBottom: 60,
    flexGrow: 0,
  },

  icon: {
    height: 15,
    width: 15,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
