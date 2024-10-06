import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CalendarButton} from '../../components/Button';
import TextInput from '../../components/Input/TextInput';
import EntryHistory from '../../components/Journal/EntryHistory';
import AddJournalButton from '../../components/Button/AddJournalButton';

const GetLocation = () => {
  const [modalOpen, setModal] = useState(false);
  const navigation = useNavigation();
  const onPressButton = () => {
    setModal(!modalOpen);
  };
  return (
    <View style={[styles.journalContainer, {opacity: modalOpen ? 0.2 : 1}]}>
      <View style={styles.journalButton}>
        <TextInput placeholder= "Search for Locations..." />
        <AddJournalButton
          onPress={() => navigation.navigate('AddJournalScreen')}
        />
      </View>
      <EntryHistory goalTime="08:00:00" />
    </View>
  );
};

export default GetLocation;

const styles = StyleSheet.create({
  journalContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  journalButton: {
    marginRight: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
