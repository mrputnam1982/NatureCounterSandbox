import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {CalendarButton} from '../../components/Button';
import EntryHistory from '../../components/Journal/EntryHistory';
import AddJournalButton from '../../components/Button/AddJournalButton';
import {fetchJournalEntriesByDate} from '../../redux/actions/journalEntryActions';
import {useDispatch, useSelector} from 'react-redux';
//import {useIsFocused} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {filterJournalEntries} from '../../components/Utilities/JournalFunctions'
import userState from '../../helpers/userState';
import useAddBackButton from "../../components/Utilities/useAddBackButton";
import { update } from 'immutable';

const JournalScreen = ({navigation, route}) => {
  //const {params} = props.route.params;
  const title = route.params?.title || 'Journal History';
  const dateFilterInit = route.params?.dateFilter || {
    startDate: new Date(),
    endDate: new Date(),
  };
  const [useFilter, setUseFilter] = useState(false);
  const [isStateLoaded, setIsStateLoaded] = useState(route.params?.isStateLoaded || false);
  const [forceCalendarUpdate, setForceCalendarUpdate] = useState(false);
//  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState(null);
  const [dateFilter, setDateFilter] = useState(dateFilterInit);
  const [dateFilterUpdated, setDateFilterUpdated] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useAddBackButton(navigation, true);
  const journalFilteredEntries = useSelector(
    state => state.getIn(['JournalEntryData', 'journalFilteredEntries']),
    JSON.stringify(journalFilteredEntries),
  );

  const userdetails = useSelector(
    state => state.getIn(['UserDetails', 'userdetails']),
    userdetails,
  );

  useLayoutEffect(() => {
    navigation.setOptions({title});
  }, [navigation]);

  const getDefaultDateFilter = async() =>{
    let dateFilterTemp = null;
    await AsyncStorage.getItem("dateSpan").then(response => {
        dateFilterTemp = JSON.parse(response);
        //ensure that calendar button displays the correct range
        let startDateTemp = new Date(dateFilterTemp.startDate);
        let endDateTemp = new Date(dateFilterTemp.endDate);
        setDateFilter({startDate: startDateTemp, endDate: endDateTemp});
    })
    if(!dateFilterTemp)
      setDateFilter(dateFilterInit);
    setUseFilter(true);
  }
  const updateJournalEntries = async() => {
    setEntries(journalFilteredEntries);
    setForceCalendarUpdate(!forceCalendarUpdate);
  }
    //await AsyncStorage.setItem("dateSpan", JSON.stringify(dateFilterInit));
    

  const adjustDateFilter = async() => {
    if(isFocused) {
      await AsyncStorage.getItem("dateSpan").then(response => {

          if(response) {
              let dateFilterTemp = JSON.parse(response);
                      //ensure that calendar button displays the correct range
              let startDateTemp = new Date(dateFilterTemp.startDate);
              let endDateTemp = new Date(dateFilterTemp.endDate);
              //setDateFilter({startDate: startDateTemp, endDate: endDateTemp});
              let dateAdded = route.params?.dateAdded || null;
              if(dateAdded) {
                 dateAdded = new Date(dateAdded);
                  if(startDateTemp && endDateTemp) {
                      if(dateAdded <= startDateTemp)
                          setDateFilter({startDate: dateAdded, endDate: endDateTemp});
                      else if(dateAdded >= endDateTemp)
                          setDateFilter({startDate: startDateTemp, endDate: dateAdded});
                      else setDateFilter({startDate: startDateTemp, endDate: endDateTemp});
                      setUseFilter(true);
                  }
                  else {
                      const yesterday = new Date(new Date(dateAdded).setDate(dateAdded.getDate() - 1));
                      const tomorrow = new Date(new Date(dateAdded).setDate(dateAdded.getDate() + 1));
                      setDateFilter({startDate: yesterday, endDate: tomorrow});
                      setUseFilter(true);
                  }
              }
          } else {
              let dateAdded = route.params?.dateAdded || null;
              if(dateAdded) {
                  dateAdded = new Date(dateAdded);
                  if(dateAdded <= dateFilterInit.startDate)
                      setDateFilter({startDate: dateAdded, endDate: dateFilterInit.endDate});
                  else if(dateAdded >= dateFilterInit.endDate)
                      setDateFilter({startDate: dateFilterInit.startDate, endDate: dateAdded});

              }
              setUseFilter(true);

          }
      });
    }
  }
  const setJournalEntriesByDateFilter = async() => {
    if(useFilter) {

      if(dateFilter) {
          AsyncStorage.setItem("dateSpan", JSON.stringify(dateFilter));
          dispatch(fetchJournalEntriesByDate(dateFilter.startDate,
              dateFilter.endDate,
              "Journal"))
      }

      //const tempFilteredEntries = filterJournalEntries(journalFilteredEntries, dateFilter);
      //setEntries(tempFilteredEntries);
      setUseFilter(false);
    }
  }

  useEffect(() => {
    getDefaultDateFilter();
  }, []);

//  useEffect(async() =>  {
//    if(updateEntries) {
//        await AsyncStorage.getItem("dateSpan").then(response => {
//            dateFilterTemp = JSON.parse(response);
//            //ensure that calendar button displays the correct range
//            let startDateTemp = new Date(dateFilterTemp.startDate);
//            let endDateTemp = new Date(dateFilterTemp.endDate);
//            setDateFilter({startDate: startDateTemp, endDate: endDateTemp});
//        })
//        UseFilter(true);
//        setUpdateEntries(false);
//    }
//
//  }, [updateEntries])
  //useEffect with journalFilteredEntries as a dependency, triggers every
  //time dispatch updates the state of the entries array, at which point
  //the entries will be filtered according to the date filter and the
  //entry history will be rerendered via the setEntries useState hook
  useEffect(() => {

    updateJournalEntries();
//    await AsyncStorage.getItem("dateSpan").then((response) => {
//        let dateFilterTemp = JSON.parse(response);
//        //ensure that calendar button displays the correct range
//        let startDateTemp = new Date(dateFilterTemp.startDate);
//        let endDateTemp = new Date(dateFilterTemp.endDate);
//
//        const tempFilteredEntries = filterJournalEntries(journalFilteredEntries, dateFilterTemp);
//        setEntries(tempFilteredEntries);
//        setForceCalendarUpdate(!forceCalendarUpdate);
////        setDateFilter({startDate: startDateTemp, endDate: endDateTemp})
////        setForceCalendarUpdate(true);
//    });

  }, [journalFilteredEntries])
  //useEffect hook with isFocused dependency, triggers every time
  //Journal Screen regains focus. Auto adjusts the dateFilter state
  //based on the most recent entry addition
    useEffect(() => {
      adjustDateFilter();
//        if(updateEntriesJournal && !updateEntriesHome) {
//            setUseFilter(true);
//        }
    
    }, [isFocused]);

  useEffect(() => {
    setJournalEntriesByDateFilter();
  }, [useFilter]);

  useEffect(() => {
    if (isLoading) {
      if(!isStateLoaded){
        dispatch(fetchJournalEntriesByDate(dateFilter.startDate,
            dateFilter.endDate,
            "Journal"))
        setIsStateLoaded(false);
      }
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleCalendarButtonPress = selectedDate => {
    setDateFilter(selectedDate);
    console.log("Date Selected:", selectedDate);
    setIsStateLoaded(false);
    setIsLoading(true);
    AsyncStorage.setItem("dateSpan", JSON.stringify(selectedDate));
  };

  return (
    <View style={styles.journalContainer}>
      {dateFilter.startDate && dateFilter.endDate ? (
        <View style={styles.journalButton}>
          <CalendarButton
            onSubmit={handleCalendarButtonPress}
            mode="range"
            maxDateEnabled={false}
            _startDate={dateFilter.startDate}
            _endDate={dateFilter.endDate}
            _forceUpdate={forceCalendarUpdate}
          />
          <AddJournalButton
            _startDate={dateFilter.startDate}
            _endDate={dateFilter.endDate}
           />
        </View>
      ) : null}
      <EntryHistory
        goalTime= {(userState.getUserStateGoal() * 60) || (2 * 60 * 60)}
        entries={entries}
        dateFilter={dateFilter}
        origin={"JournalScreen"}
      />
    </View>
  );
};
JournalScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

JournalScreen.defaultProps = {};

export default JournalScreen;

const styles = StyleSheet.create({
  journalContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 150
  },
  journalButton: {
    marginRight: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
