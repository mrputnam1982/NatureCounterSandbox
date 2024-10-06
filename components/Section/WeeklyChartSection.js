import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Surface } from 'react-native-paper';
import { THEME_GREEN } from '../Utilities/Constants';

import moment from 'moment';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { fetchJournalEntriesByDate } from '../Utilities/JournalFunctions';

// const DAY_LABELS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_LABELS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

const WeeklyChartSection = ({dateFilter}) => {
  const [totals, setTotals] = useState([]); // Total duration for each day
  const [journalEntries, setJournalEntries] = useState([]);
  const [withHorizontalLabels, setWithHorizontalLabels] = useState(false);

  const barOpacity = 0.6;

  const isFocused = useIsFocused();

  // Converts milliseconds (string) to minutes (int)
  const getMinutes = durationInMil => {
    const intvalue = parseInt(durationInMil);
    return intvalue === 0 ? 0 : intvalue / (60 * 1000);
  };

  const getEntries = () => {
    // Ensure complete days are included in the date range
    const adjustedStartDate = new Date(dateFilter.startDate);
    adjustedStartDate.setHours(0, 0, 0, 0);

    const adjustedEndDate = new Date(dateFilter.endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);

    fetchJournalEntriesByDate(adjustedStartDate, adjustedEndDate).then(data => {
      const withDuration = data.map(entry => {
        return {
          ...entry,
          duration:
            new Date(entry.end_time).getTime() -
            new Date(entry.start_time).getTime(),
        };
      });
      setJournalEntries(withDuration);
    });
  };

  // Get totals for each day of the week
  const getTotals = () => {
    const newTotals = new Array(7).fill(0);

    journalEntries.forEach(entry => {
      const day = new Date(entry.start_time).getDay();
      newTotals[day] += getMinutes(entry.duration);
    });
    setTotals(newTotals);
  };

  // Get new totals when journalEntries changes
  useEffect(() => {
    if (journalEntries?.length > 0) {
      getTotals();
      setWithHorizontalLabels(true);
    } else {
      setTotals(new Array(7).fill(0));
      setWithHorizontalLabels(false);
    }
  }, [journalEntries, dateFilter]);

  // Fetch journal entries when dateFilter changes
  useEffect(() => {
    getEntries();
  }, [dateFilter, isFocused]);

  return (
    <>
      <Text>
        Weekly Chart Section {moment(dateFilter.startDate).format('MM/DD/YYYY')}{' '}
        - {moment(dateFilter.endDate).format('MM/DD/YYYY')}
      </Text>
      <Surface style={styles.surface} elevation={4}>
        <BarChart
          data={{
            labels: DAY_LABELS_SHORT,
            datasets: [
              {
                data: totals,
              },
            ],
          }}
          withHorizontalLabels={withHorizontalLabels}
          width={Dimensions.get('window').width - 48} // from react-native
          height={170}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            barPercentage: 0.7,
            height: 5000,
            fillShadowGradient: THEME_GREEN,
            fillShadowGradientOpacity: barOpacity,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = barOpacity) => `rgba(69, 159, 94, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

            style: {
              borderRadius: 16,
              fontFamily: 'System',
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#e3e3e3',
              strokeDasharray: '0',
            },
            propsForLabels: {
              fontFamily: 'System',
            },
          }}
          bezier
          style={{
            paddingLeft: 28,
            paddingRight: 28,
            borderRadius: 16,
            marginVertical: 8,
          }}
        />
      </Surface>
    </>
  );
};

export default WeeklyChartSection;

const styles = StyleSheet.create({
  surface: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
  },
});
