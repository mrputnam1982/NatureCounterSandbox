import {useDispatch} from 'react-redux';
import { fetchJournalEntries } from '../../redux/actions/journalEntryActions';
import axios from 'axios';
import {createToken} from '../../redux/actions/createToken';
import baseUrl from '../../helpers/baseUrl';
import userState from '../../helpers/userState';
import auth from '@react-native-firebase/auth';
export var dispatchJournalFunctions = null;


export function filterJournalEntries(journalFilteredEntries, dateFilter) {
    return journalFilteredEntries.filter(entry => {
        return (new Date(entry.start_time) >= new Date(dateFilter.startDate) &&
            new Date(entry.end_time) <= new Date(dateFilter.endDate))
    })
}
export function getNewJournalEntries() {
    var newEntries = null;
    if(!dispatchJournalFunctions) dispatchJournalFunctions = useDispatch();
    (async()=> {
        await dispatchJournalFunctions(fetchJournalEntries()).then(response => {
            console.log("Fetch Journal Entries", response.data);
            newEntries = journalEntries.data.map(entry => {
                entry = {
                    _id: entry._id,
                    startTime: entry.start_time,
                    endTime: entry.end_time,
                    location: entry.location,
                    duration: 0
                };
                entry.duration = new Date(endTime).getTime() -
                new Date(startTime).getTime();
                return entry;
            })
            return newEntries;
        }).catch(error => {
            console.log("Error:", error.message);
        })

    }) 

}   

export async function fetchJournalEntriesByDate(startDate, endDate) {
  const fetchHandler = async () => {
      // dispatch(journalEntriesLoading(true));
      const header = await createToken();
      const uid = auth().currentUser.uid;
      const response = await axios.get(
        `${baseUrl}journal/entriesByDate?uid=${uid}&startDate=${startDate}&endDate=${endDate}`,
        header,
      );
      const { data } = await response;
      return data;
    }
    
    try{
      const filteredEntries = await fetchHandler();
      return filteredEntries;
    } catch (err) {
      console.log(err);
    }
}