import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';
import {CalendarButton} from '../../components/Button';
import AddJournalList from '../../components/Journal/AddJournalList';
import {useIsFocused} from '@react-navigation/native';
import useAddBackButton from '../../components/Utilities/useAddBackButton';
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

const AddJournalScreen = ({navigation, route, origin }) => {
  var d = new Date();
  var hasLocation = route.params?.location != undefined;
  const isFocused = useIsFocused();
  const title = route.params?.title || "Add Journal";
  const originPage = origin ? origin : (route.params?.origin || "JournalScreen");
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loaded, setLoaded] = useState(false);
  let defaultDate = new Date();
  defaultDate.setDate(d.getDate() - 1);
  defaultDate.setHours(0,0,0,0);

  useAddBackButton(navigation, true, originPage);
  
  var entriesToEdit = route.params?.passedEntries && route.params?.passedEntries.length > 0 ?
    route.params.passedEntries : (
      [{
        _id: uuidv4(),
        location: null,
        startTime: defaultDate,
        duration: ''
      }]
    );

  if (hasLocation && entriesToEdit) {
    const newEntries = entriesToEdit.map((entry)=>{
      entry.location = (entry._id === route.params?.entryId) ? route.params?.location : entry.location;
      return entry;
    });
    entriesToEdit = newEntries;
  }
  // useLayoutEffect(() => {
  //   navigation.setOptions({title});
  // }, [navigation]);

  useEffect(() => {
    navigation.setOptions({title});
  }, [title]);
  useEffect(() => {
    if(isFocused) {
      if(route.params?.title === "Edit Journal") {
          setEditMode(true);
        } else setEditMode(false);

      //let dateToSave = entriesToEdit[0].startTime;\
      // let dateTemp = new Date();
      // dateToSave = new Date().setDate(dateTemp.getDate() - 1);
      //dateToSave.setHours(0,0,0,0);
      setSelectedDate(defaultDate);
      setLoaded(true);
    }
  }, [isFocused])

  // useEffect(() => {

  //   if(route.params?.title === "Edit Journal") {
  //     setEditMode(true);
  //   } else setEditMode(false);

  //   let dateToSave = entriesToEdit[0].startTime;
  //   dateToSave = new Date(dateToSave);
  //   dateToSave.setHours(0,0,0,0);
  //   setSelectedDate(dateToSave);
  //   setLoaded(true);
    
  // }, []);

  const dateHandler = (selectedDate) => {
    if(route.params?.title === "Edit Journal")
      setEditMode(true);
    let dateToSave = new Date(selectedDate);
    dateToSave.setHours(0,0,0,0);

    // if(entriesToEdit) {
    //   entriesToEdit.map(entry => {
    //     startTime: dateToSave;
    //     return;
    //   })
    // }
    setSelectedDate(dateToSave);
  };

  return (
    <View>
      <View style={styles.body}>
        {loaded ? (<View>
            { editMode ? (
                <CalendarButton disabled 
                  mode={"single"} 
                  maxDateEnabled={false} 
                  onSubmit={dateHandler}
                  dateSelected = {new Date(selectedDate)}/> 
                ): (<CalendarButton 
                    mode={"single"} 
                    maxDateEnabled={true} 
                    onSubmit={dateHandler}
                    dateSelected = {new Date(selectedDate)}/>
                )
              }

            { (entriesToEdit && entriesToEdit.length > 0) ?
                (<AddJournalList 
                  editMode={editMode}
                  entries={entriesToEdit}
                  dateSelected={new Date(selectedDate)}
                  origin = {originPage}
                  />
                ) : null 
            }
            </View> 
          )
        : null}
      </View>
    </View>
  );
};

AddJournalScreen.propTypes = {
  passedEntries: PropTypes.arrayOf(PropTypes.object),
};

AddJournalScreen.defaultProps = {
  passedEntries: [],
};

export default AddJournalScreen;

const styles = StyleSheet.create({
  body: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  text: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
  },
});
