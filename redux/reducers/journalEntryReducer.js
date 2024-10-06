import {fromJS} from 'immutable';
import * as ActionTypes from '../actions/ActionTypes';

const InitState = fromJS({isLoading: true, errmsg: null, journalEntries: [], journalFilteredEntries: []});

const JournalEntries = (state = InitState, action) => {
  Object.assign(state, state.data);
  switch (action.type) {
    case ActionTypes.JOURNAL_ENTRIES_LOADING:
      return {
        ...state, 
        isLoading: true, 
        errmsg: null, 
        journalEntries: [], 
        journalFilteredEntries: [],
        journalHomeEntries: []
      };

    case ActionTypes.JOURNAL_ENTRIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload,
        journalEntries: [],
        journalFilteredEntries: [],
        journalHomeEntries: []
      };

    case ActionTypes.GET_JOURNAL_ENTRIES:
      return {
        ...state, 
        isLoading: false,
        errmsg: null,
        journalEntries: action.payload
      };

    // do not update the whole list or see if we need it.
    case ActionTypes.GET_FILTERED_JOURNAL_ENTRIES:
      return {
        ...state,
        isLoading: false,
        errmsg: null,
        journalFilteredEntries: action.payload
      };
    case ActionTypes.GET_FILTERED_HOME_ENTRIES:
        return {
          ...state,
          isLoading: false,
          errmsg: null,
          homeFilteredEntries: action.payload
        };
    case ActionTypes.GET_FILTERED_HOME_ENTRIES:
        return {
          ...state,
          isLoading: false,
          errmsg: null,
          weeklyFilteredEntries: action.payload
        };
    case ActionTypes.ADD_JOURNAL_ENTRY:
        return {
          ...state,
          isLoading: false,
          errmsg: null,
          journalFilteredEntries: [...state.journalFilteredEntries, action.payload],
        };

    case ActionTypes.EDIT_JOURNAL_ENTRY:
      console.log("EDIT reducer state", state);
      return {
        ...state,
        isLoading: false,
        errmsg: null,
        journalFilteredEntries:
          state.journalFilteredEntries.map(entry => {
            if (entry._id === action.payload._id) return action.payload;
            return entry;
          }),
      };

    case ActionTypes.REMOVE_JOURNAL_ENTRY:
      if (state.journalFilteredEntries && state.journalFilteredEntries?.length > 0) {
        return {
          ...state,
          isLoading: false,
          errmsg: null,
          journalFilteredEntries:
            state.journalFilteredEntries.filter(entry => entry._id !== action.payload),
        };
      } else return state;
    default:
      return state;
  }
};

export default JournalEntries;
