import {
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  View,
  Text,
  Platform
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Button, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {
  postJournalEntry,
  removeJournalEntry,
  putJournalEntry,
} from '../../redux/actions/journalEntryActions';
import OutsidePressHandler from 'react-native-outside-press';
import {fetchJournalEntriesByDate} from '../../components/Utilities/JournalFunctions';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import {THEME_DARK_GREEN} from '../Utilities/Constants';
import {TimePicker} from 'react-native-simple-time-picker';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import auth from '@react-native-firebase/auth';
import SearchButton from '../Button/SearchButton';
import LocationBox from './LocationBox';
import {isIterable} from '../../helpers/utilities'
import Toast from 'react-native-simple-toast';

const AddJournal = ({
  passedEntry,
  dateSelected,
  changeHandler,
  listRemoveHandler,
  editMode,
  firstAddEntry
}) => {
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [durationVisible, setDurationVisible] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [startTime, setStartTime] = useState(dateSelected);
  const [duration, setDuration] = useState(0);
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch();
  const [locationPressed, setLocationPressed] = useState(false);
  const [prevDateSelected, setPrevDateSelected] = useState(null);


  const errmsg = useSelector(
    state => state.getIn(['JournalEntryData', 'errmsg']),
    errmsg
  );
  const handleDurationChange = (value) => {
    console.log("Duration Time Picker pressed");
    setHours(value.hours);
    setMinutes(value.minutes);
    if(Platform.OS === 'android') {
      setDurationVisible(false);
      isLoading(true);
    }
  };

  const startTimeHandler = (event, selectedTime) => {
    console.log("Start Time Picker pressed");
    console.log("Event status:", event.type);
    if(Platform.OS === 'android') setStartTimeVisible(false);
    if (event.type !== 'dismissed') {
      setStartTime(selectedTime.toISOString());
      passedEntry.startTime = selectedTime.toISOString();
      if(Platform.OS === 'android') isLoading(true);
    }
  };
  const dismissStartTimePicker = () => {
    if(startTimeVisible) {
      setStartTimeVisible(false);
      isLoading(true);
    }
  }
  const dismissDurationPicker = () => {
    if(durationVisible) {
      setDurationVisible(false);
      isLoading(true);
    }
  }
  const deleteJournalEntry = () => {
    if (editMode && !passedEntry?.notPosted){
      dispatch(removeJournalEntry(passedEntry._id));
    }
    if(errmsg) Toast.show("Error, entry could not be removed", errmsg);
    else{
        Toast.show("Entry removed successfully")
        listRemoveHandler(passedEntry._id);
    }
    return;
  };

  useEffect(() => {
    console.log("Passed Entry", passedEntry);
    if (passedEntry.duration) {
      var duration_hrs = Math.floor(passedEntry.duration / 3600 / 1000);
      var duration_mins =
        Math.floor(passedEntry.duration / 1000 / 60) - duration_hrs * 60;
      setHours(duration_hrs);
      setMinutes(duration_mins);
    }
  }, []);

  useEffect(() => {
    if (dateSelected) {
      if (
        !editMode &&
        (dateSelected !== prevDateSelected && prevDateSelected !== null)
      ) {
        //setStartDate(dateSelected);
        passedEntry.startTime = dateSelected;
        passedEntry.location = null;
        passedEntry.duration = 0;
        changeHandler(passedEntry, locationPressed);
        setHours(0);
        setMinutes(0);
      }

      setPrevDateSelected(dateSelected);
    }
  }, [dateSelected]);
  
  useEffect(() => {
    if (loading) {
      setHours(hours);
      setMinutes(minutes);

      var newDuration = (hours * 60 * 60 + minutes * 60) * 1000;
      setDuration(newDuration);

      //passedEntry.startTime = startTime;
      passedEntry.duration = newDuration;
      passedEntry.startTime = startTime;
      changeHandler(passedEntry, locationPressed);
      isLoading(false);
    }
  }, [loading]);
  
  useEffect(() => {
    if (locationPressed) {
      // changeHandler(refValueEntry.current, locationPre ssed);
      console.log("Entry: ", passedEntry);
      console.log("Start Time:", startTime);

      changeHandler(passedEntry, locationPressed);
      console.log("Location: ", passedEntry.location);
      setLocationPressed(false);
    }
  }, [locationPressed]);

  AddJournal.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    passedEntry: PropTypes.object.isRequired,
    dateSelected: PropTypes.any.isRequired,
  };
  const entryCard = 
    Platform.OS === 'android' ?
      (
          <Card style={styles.card}>

          {(editMode || !firstAddEntry) && (
            <Card.Actions style={styles.cardAction}>
              <Button
                style={styles.pressable}
                onPress={deleteJournalEntry}>
                Delete Entry
              </Button>
            </Card.Actions>
          )}
    
          <Card.Actions style={styles.cardAction}>
            <TextInput
              style={styles.text}
              placeholder="Date"
              value={moment(dateSelected).format('MM/DD/YY')}
              editable={false}
            />
          </Card.Actions>
    
          <Card.Actions style={styles.cardAction}>
            <Pressable
              style={styles.rowC}
              onPress={() => setLocationPressed(true)}>
                  <LocationBox location={passedEntry.location} />
                  <SearchButton style={styles.SearchButton} onPressHandler={setLocationPressed}/>
              </Pressable>
          </Card.Actions>
    
          <Card.Actions style={styles.cardAction}>
            {startTimeVisible && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(passedEntry.startTime)}
                mode="time"
                onChange={startTimeHandler}
                display="spinner"
              />
            )}
    
            <Pressable
              style={styles.pressable}
              onPress={() => {
                setStartTimeVisible(true);
              }}>
              <TextInput
                style={styles.text}
                placeholder="Start Time"
                value={moment(passedEntry.startTime).format('hh:mm a')}
                editable={false}
              />
            </Pressable>
          </Card.Actions>
    
          <Card.Actions style={styles.cardAction}>
            {durationVisible && (
              <TimePicker
                style={styles.text}
                value={{hours, minutes}}
                onChange={handleDurationChange}
              />
            )}
            <Pressable
              style={styles.pressable}
              onPress={() => {
                setDurationVisible(true);
              }}>
              <TextInput
                style={styles.text}
                placeholder="Duration"
                value={hours + ' hrs, ' + minutes + ' minutes'}
                editable={false}
              />
            </Pressable>
          </Card.Actions>
        </Card>     

      ) :
      (
        <Card style={styles.card}>

        {(editMode || !firstAddEntry) && (
          <Card.Actions style={styles.cardAction}>
            <Button
              style={styles.pressable}
              onPress={deleteJournalEntry}>
              Delete Entry
            </Button>
          </Card.Actions>
        )}
  
        <Card.Actions style={styles.cardAction}>
          <Text style={styles.text}>
            {moment(dateSelected).format('MM/DD/YY')}
          </Text>
        </Card.Actions>
  
        <Card.Actions style={styles.cardAction}>
          <Pressable
            style={styles.rowC}
            onPress={() => setLocationPressed(true)}>
                <LocationBox location={passedEntry.location} />
                <SearchButton style={styles.SearchButton} onPressHandler={setLocationPressed}/>
            </Pressable>
        </Card.Actions>
        <OutsidePressHandler
              onOutsidePress={dismissStartTimePicker}>      
          <Card.Actions style={styles.cardAction}>
  
  
          {startTimeVisible && (
  
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(passedEntry.startTime)}
              mode="time"
              display="spinner"
              onChange={startTimeHandler}
              style={{width: 320, backgroundColor: "white"}}
            />
            
            )}
  
            <Pressable
              style={styles.pressable}
              onPress={() => {setStartTimeVisible(true)}}>       
            {!startTimeVisible && (
              <Text style={styles.text}>
                {moment(passedEntry.startTime).format('hh:mm a')}
              </Text>
            )} 
          </Pressable>        
          </Card.Actions>
        </OutsidePressHandler>
        <OutsidePressHandler
            onOutsidePress={dismissDurationPicker}>
          <Card.Actions style={styles.cardAction}>
  
            {durationVisible === true ? (
  
              <TimePicker
                style={{width: 320, backgroundColor: "white"}}
                value={{hours, minutes}}
                onChange={handleDurationChange}
              />
            ): null}
            <Pressable
              style={styles.pressable}
              onPress={() => {
                setDurationVisible(true);
              }}>
              {!durationVisible && (
                <Text style={styles.text}>
                  {hours + ' hrs, ' + minutes + ' minutes'}
                </Text>
              )}
            </Pressable>
  
          </Card.Actions>
        </OutsidePressHandler>
      </Card>
    )

  return (
    <View>
      {entryCard}
    </View>
  );
};

const AddJournalList = ({editMode, entries, dateSelected, origin}) => {
  const navigation = useNavigation();
  const [loaded, isLoaded] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(dateSelected);
  const [newEntry, setNewEntry] = useState(null);
  const [passedEntries, setPassedEntries] = useState(entries);
  const [saveDisabled, setSaveDisabled] = useState(false);
  
  //need to convert date received from Calendar to
  //date at zero hour of selected date
  var dateSelected_reset = null;
  console.log("Entry Add Journal List", passedEntries);
  useEffect(() => {
    var dateSelectedRaw = moment(dateSelected).toDate();

    dateSelected_reset = new Date(
      dateSelectedRaw.getFullYear(),
      dateSelectedRaw.getMonth(),
      dateSelectedRaw.getDate(),
    ).toISOString();
    setDate(dateSelected_reset);
    // isLoaded(true); // TODO: Is a re-render needed here?
  }, [dateSelected]);
  useEffect(() => {
    setPassedEntries(entries);
  }, [entries]);
  const addAnotherEntry = () => {
    const newEntry = {
      _id: uuidv4(),
      location: null,
      startTime: passedEntries[0].startTime,
      duration: '',
      notPosted : true
    };
    
    setNewEntry(newEntry);
  };

  useEffect(() => {
    if (newEntry != null) {
      let newEntries = passedEntries
      newEntries.push(newEntry)
      setPassedEntries(newEntries);
      setNewEntry(null);
    }
  }, [newEntry]);

  const errmsg = useSelector(
    state => state.getIn(['JournalEntryData', 'errmsg']),
    errmsg
  );
  const journalFilteredEntries = useSelector(
    state => state.getIn(['JournalEntryData', 'journalFilteredEntries']),
    JSON.stringify(journalFilteredEntries),
  );
  //useEffect triggering on changes to date state (componentDidMount) to reset today's date to zero
  //hour, to be shared with all AddJournal components

  const changeHandler = (entryToUpdate, locationPressed) => {
    let newEntries = passedEntries;
    newEntries = newEntries.map(entry => {
      if (entry._id === entryToUpdate._id) {
        return entryToUpdate;
      } else {
        return entry;
      }
    });

    setPassedEntries(newEntries);
    if (locationPressed === true) {
      navigation.navigate('SearchLocations', {
        origin: 'AddJournalScreen',
        entryId: entryToUpdate._id,
        currentEntries: passedEntries,
      });
    }
  };

  const listRemoveHandler = id => {
    let newEntries = passedEntries;
    newEntries = newEntries.filter(entry => entry._id !== id);
    setPassedEntries(newEntries);
    if (!newEntries || newEntries.length === 0) {
      if(origin === "HomeScreen")
        navigation.navigate('HomeScreen', {isStateLoaded: true})
      else if(origin === "JournalScreen")
        navigation.navigate('JournalScreen', {isStateLoaded: true});
    }
  };

  const getEntries = async () =>
    new Promise(async (resolve, reject) => {
      const prev_day = new Date(date);
      const next_day = new Date(date);
      next_day.setDate(next_day.getDate() + 1);
      prev_day.setDate(next_day.getDate() - 1);

      const filteredEntries = await fetchJournalEntriesByDate(prev_day, next_day);
      resolve(filteredEntries);
      if(errmsg) Toast.show("Network error");
  });

  const checkOverlap = (a_start, a_end, b_start, b_end) => {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end   && b_end   <= a_end) return true; // b ends in a
    if (b_start <  a_start && a_end   <  b_end) return true; // a in b
    return false;
  }

  const AsyncJournalEntryAlert = async (alertMsg) =>
    new Promise((resolve, reject) => {
      Alert.alert(
        'Journal Entry Overlap',
        alertMsg,
        [
          {
            text: 'Ok',
            onPress: () => {
              resolve(true);
            },
          },
        ],
        {cancelable: false},
      );
    });

  const submitHandler = async () => {
    //before submit validation of no overlap between current to POST entries
    //and no overlap with any previously POSTed entries (GET all entries for comparison)
    setSaveDisabled(true);
    const userId = auth().currentUser.uid;
    
    let newEntries = passedEntries; // Actual edited entries
    let alertFieldMissing = false;

    newEntries = newEntries.map(entry => {
      if (alertFieldMissing) return;

      if (entry.duration === 0) {
        Alert.alert('Please specify a duration for all entries');
        alertFieldMissing = true;
        return;
      } else if (entry.location === null) {
        Alert.alert('Please specify a location for all entries');
        alertFieldMissing = true;
        return;
      }
      if(entry?.notPosted) delete entry.notPosted;

      let endTime = new Date(Date.parse(entry.startTime) + entry.duration);
      entry.endTime = endTime;
      return entry;
    });
    
    // setPassedEntries(newEntries);

    if (alertFieldMissing) {
      setSaveDisabled(false); 
      return;
    }

    let alertTriggered = false;

    //validation of current to POST entries against all other to POST entries (not already in db)
    // Validates for multiple add entries as well as edit entries
    newEntries.forEach(entry => {
      const entriesToCompare = newEntries.filter(
        entryToFilter => entryToFilter._id !== entry._id,
      );
      
      const entry_startTime = new Date(moment(entry.startTime));
      const entry_endTime = new Date(moment(entry.endTime));
      
      if (alertTriggered) {
        return;
      }
      entriesToCompare.forEach(entryToCompare => {
        const entryToCompare_startTime = new Date(moment(entryToCompare.startTime));
        const entryToCompare_endTime = new Date(moment(entryToCompare.endTime));

        if (checkOverlap(entry_startTime, entry_endTime, 
            entryToCompare_startTime, entryToCompare_endTime)) {
          //alert user
          Alert.alert(
            'Journal Entry Overlap',
            'Entries overlap, please specify non overlapping start time and duration',
          );
          alertTriggered = true;
          return;
        }
      });
    });

    const filteredEntries = await getEntries();

    // Filter out the current entries that are not changed
    if(editMode && !alertTriggered){
      newEntries = newEntries.filter(entry => {
        let isChanged = true;
        filteredEntries.forEach(entryWritten => {
          if (
            entryWritten.start_time === entry.startTime &&
            entryWritten.end_time === entry.endTime.toISOString() &&
            entryWritten.location.longitude === entry.location.longitude &&
            entryWritten.location.latitude === entry.location.latitude
          )
          isChanged = false;
          return;
        });
        return isChanged;
      });
    }

    // Validation for Add new journal entries/ Edit Journal entries
    // validation of current to entries already in db from the prev day to the next day
    if(!alertTriggered){
      newEntries.forEach(entryToCompare => {
        const entryToCompare_start = new Date(moment(entryToCompare.startTime));
        const entryToCompare_end = new Date(moment(entryToCompare.endTime));

        if (alertTriggered) {

          return;
        }
        filteredEntries.forEach(async filteredEntryToCompare => {
          if(entryToCompare._id != filteredEntryToCompare._id){
            const filteredEntryToCompare_start = new Date(moment(filteredEntryToCompare.start_time));
            const filteredEntryToCompare_end = new Date(moment(filteredEntryToCompare.end_time));

            if(checkOverlap(entryToCompare_start, entryToCompare_end, 
              filteredEntryToCompare_start, filteredEntryToCompare_end)){
              const options = {
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour:"2-digit", 
                minute:'2-digit', 
                hour12: true 
              };

              const curr_start = entryToCompare_start.toLocaleDateString("en-US", options)
              const curr_end = entryToCompare_end.toLocaleDateString("en-US", options)
              const actual_start = filteredEntryToCompare_start.toLocaleDateString("en-US", options)
              const actual_end = filteredEntryToCompare_end.toLocaleDateString("en-US", options)
              const alertMsg = 'Entry for ' + curr_start + ' to ' + curr_end 
                + ' overlaps with an entry from ' + actual_start
                  + ' to ' + actual_end 
                + ', please specify non overlapping start time and duration';

              // TODO: do not trigger multiple alerts for multiple conflicts.
              // await AsyncJournalEntryAlert(alertMsg);
              
              Alert.alert(
                'Journal Entry Overlap',
                alertMsg
              );
              alertTriggered = true
              
              return;
            }
          }
        });
      });
    }
    
    //if no overlaps in current entries to write to db
    if (!alertTriggered) {
      for (const entry of newEntries) {
        if (editMode) {
          let flagEntryExists = false;
          // If the edited entry matches with the existing ones, update it.
          filteredEntries.forEach(entryExists => {
            if (entry._id === entryExists._id) {
              console.log('Overwrite existing entry', entry);
              dispatch(
                putJournalEntry(
                  entry._id,
                  entry.location,
                  entry.startTime,
                  entry.endTime,
                ),
              );
              flagEntryExists = true;
              return;
            }
          });

          // If the edited entry does not match with the existing ones, create it.
          if (!flagEntryExists) {
            dispatch(
              postJournalEntry(
                userId,
                entry.location,
                entry.startTime,
                entry.endTime,
              ),
            );
          }
        } else {// Add Entry
          dispatch(
            postJournalEntry(
              userId,
              entry.location,
              entry.startTime,
              entry.endTime,
            ),
          );
        }
      }
      //setEntries(entriesWritten);
      // var startDate = new Date();
      // var endDate = new Date();
      // var dateFilter = {startDate: startDate, endDate: endDate};
      // navigation.navigate('JournalScreen', {dateFilter: dateFilter});
      //modify date filter route and pass it to navigation object
      setSaveDisabled(false);  
      if(!errmsg) {
            
            if(editMode) {
                if(newEntries.length > 1)
                    Toast.show("Entries edited successfully");
                else
                    Toast.show("Entry edited successfully");
            }
            else {
                if(newEntries.length > 1)
                    Toast.show("Entries added successfully");
                else
                    Toast.show("Entry added successfully");
            }

          if(origin === "HomeScreen") navigation.replace('HomeScreen',
            {isStateLoaded: true, dateAdded: date});
          else
            navigation.replace('JournalScreen',{isStateLoaded:true, dateAdded: date});
          return;
        } else {

            Toast.show("Error occurred: ", errmsg);
            return

        }

    }
    setSaveDisabled(false); 
  }

  return (
    <ScrollView
      style={{
        height: 'auto',
        marginHorizontal: 20,
        marginBottom: 180,
      }}>
      {isIterable(passedEntries)
        ? passedEntries.map((entry, idx) => {
            return (
              <AddJournal
                passedEntry={entry}
                dateSelected={date}
                changeHandler={changeHandler}
                listRemoveHandler={listRemoveHandler}
                editMode={editMode}
                key={entry._id}
                firstAddEntry={!editMode && idx === 0}
              />
            );
          })
        : null}

      {origin !== 'HomeScreen' ?
        <Button mode="text" onPress={addAnotherEntry}>
            Add Another Entry +
        </Button> : null}

      <Button disabled={saveDisabled}
        mode="outlined"
        style={styles.submitButton}
        onPress={submitHandler}>
        Save Journal
      </Button>
    </ScrollView>
  );
};

AddJournalList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
  dateSelected: PropTypes.any.isRequired,
};

export default AddJournalList;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10
  },
  cardAction: {
    ...Platform.select({
      android: {
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 3,
        zIndex: 2,
      },
      ios: {
        marginBottom: 5,
        marginTop: 5,
        borderBottomColor: '#C1C1C1',
        borderBottomWidth: 3,
        zIndex: 2,
      }
    })
    // marginTop: 10,
  },
  rowC: {
    display: 'flex',
    flexDirection: 'row',
  },
  SearchButton: {
    marginTop: 10,
  },
  pressable: {
     flex: 1
  },
   
  body: {
    marginTop: 10,
    padding: 10,
    flex: 1,
  },
  // text: {
  //   flex: 1,
  //   backgroundColor: 'rgba(255, 255, 255, 0.1)',
  // },
  text: {
    ...Platform.select({
      android: {
        flex: 1,
        fontSize: 20,
        // paddingLeft: 10,
        // paddingVertical: 10,
        marginLeft: -10,
        marginBottom: -10,
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      ios: {
        flex: 1,
        fontSize: 20,
        // paddingLeft: 10,
        // paddingVertical: 10,
        marginLeft: 5,
        marginBottom: 5,
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }
    }),  
  },
  submitButton:{
    borderColor: THEME_DARK_GREEN,
    borderWidth: 2,
    borderRadius: 100,
    marginBottom: 15
  },
  pressableView:{
    alignItems: 'center',
  },
});
