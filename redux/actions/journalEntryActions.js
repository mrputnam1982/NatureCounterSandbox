import axios from 'axios';
import {createToken} from './createToken';
import * as ActionTypes from './ActionTypes';
import baseUrl from '../../helpers/baseUrl';
import userState from '../../helpers/userState';

export function fetchJournalEntries() {
  return async (dispatch) => {
    const fetchHandler = async () => {
      // dispatch(journalEntriesLoading(true));
      const header = await createToken();
      const uid = userState.getUserStateId();
      const response = await axios.get(
        `${baseUrl}journal/allentries?uid=${uid}`,
        header,
      );
      
      return await response.json();
    }

    try{
      const allEntries = await fetchHandler();
      dispatch(getJournalEntries(allEntries));
    } catch (err) {
      dispatch(journalEntriesFailed(err.message));
    }
  };
}

export function fetchJournalEntriesByDate(startDate, endDate, origin) {
  return async (dispatch) => {
    const fetchHandler = async () => {
      // dispatch(journalEntriesLoading(true));
      const header = await createToken();
      const uid = userState.getUserStateId();
      const response = await axios.get(
        `${baseUrl}journal/entriesByDate?uid=${uid}&startDate=${startDate}&endDate=${endDate}`,
        header,
      );
      const { data } = await response;
      return data;
    }
    
    try{
      const filteredEntries = await fetchHandler();
      if(origin === "Journal")
        dispatch(getFilteredJournalEntries(filteredEntries));
      else
        dispatch(getFilteredHomeEntries(filteredEntries));

    } catch (err) {
      dispatch(journalEntriesFailed(err.message));
    }
  };
}

export function postJournalEntry(firebaseId, location, start_time, end_time) {
  return async function action(dispatch) {
    const header = await createToken();
    //const userId = uid + calenderFun.UTCToLocalDate(startDate);
    const uid = userState.getUserStateId();
    const journalEntryDetail = {
      location,
      uid,
      start_time,
      end_time,
    };
    const payload = journalEntryDetail;
    console.log('Payload for journal POST', journalEntryDetail);
    try {
      await axios
        .post(`${baseUrl}journal/singleentry`, payload, header)
        .then((response) => {
            dispatch(addJournalEntry(response.data))
        })
        .catch(error => {
          console.log('Post Journal Entry ', error.message);
            dispatch(journalEntriesFailed(error.message));
        });
    } catch (e) {
        console.error(e);
        dispatch(journalEntriesFailed(e.message));
    } finally {
      console.log('post journal entry finished');
    }
  };
}

export function putJournalEntry(
  journal_id,
  location,
  start_time,
  end_time,
) {
  return async function action(dispatch) {
    const header = await createToken();
    //const userId = uid + calenderFun.UTCToLocalDate(startDate);
    const uid = userState.getUserStateId();
    const journalEntryDetail = {
      location,
      uid,
      start_time,
      end_time,
    };
    const payload = journalEntryDetail;
    try {
      await axios
        .put(
          `${baseUrl}journal/singleentry?journal_id=${journal_id}`,
          payload,
          header,
        )
        .then(response => {
            dispatch(editJournalEntry(response.data))
        })
        .catch(error => {
          console.log('Put Journal Entry ', error.message);
          dispatch(journalEntriesFailed(error.message));
        });
    } catch (e) {
      console.error(e);
    } finally {
      console.log('put journal entry finished');
      dispatch(journalEntriesFailed(e.message));
    }
  };
}

export function removeJournalEntry(journal_id) {
  return async function action(dispatch) {
    const header = await createToken();

    try {
      await axios
        .delete(
          `${baseUrl}journal/singleentry?journal_id=${journal_id}`,
          header,
        )
        .then(dispatch(deleteJournalEntry(journal_id)))
        .catch(error => {
          console.log('Remove Journal Entry ', error.message);
          dispatch(journalEntriesFailed(error.message));
        });
    } catch (e) {
      console.error(e);
      dispatch(journalEntriesFailed(e.message));
    }
  };
}
export const journalEntriesLoading = () => ({
  type: ActionTypes.JOURNAL_ENTRIES_LOADING,
});

export const journalEntriesFailed = errmsg => ({
  type: ActionTypes.JOURNAL_ENTRIES_FAILED,
  payload: errmsg,
});

export const getJournalEntries = journalEntries => ({
  type: ActionTypes.GET_JOURNAL_ENTRIES,
  payload: journalEntries,
});

export const getFilteredJournalEntries = journalEntries => ({
  type: ActionTypes.GET_FILTERED_JOURNAL_ENTRIES,
  payload: journalEntries,
});

export const getFilteredHomeEntries = journalEntries => ({
  type: ActionTypes.GET_FILTERED_HOME_ENTRIES,
  payload: journalEntries,
});
export const addJournalEntry = journalEntry => ({
  type: ActionTypes.ADD_JOURNAL_ENTRY,
  payload: journalEntry,
});

export const editJournalEntry = journalEntry => ({
  type: ActionTypes.EDIT_JOURNAL_ENTRY,
  payload: journalEntry,
});

export const deleteJournalEntry = journal_id => ({
  type: ActionTypes.REMOVE_JOURNAL_ENTRY,
  payload: journal_id,
});
