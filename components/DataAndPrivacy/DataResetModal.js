import moment from 'moment';
import React, { useContext } from 'react';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';
import UserContext from '../../contexts/UserContext';
import { fetchJournalEntriesByDate } from '../../redux/actions/journalEntryActions';
import { resetDataService } from '../Utilities/DataResetServices';
import CustomModal from './CustomModal';
import useCurrentUser from '../../hooks/useCurrentUser';
const DataResetModal = ({
  visibility,
  toggleVisibility,
  toggleNewGoalVisibility,
}) => {
  const {user, updateUser} = useCurrentUser();

  const dispatch = useDispatch();

  const getEntries = () => {
    dispatch(
      fetchJournalEntriesByDate(
        moment(Date.now())
          .startOf('day')
          .subtract(3, 'days')
          .toISOString(),
        moment(Date.now()).toISOString(),
      ),
      'Home',
    );
  };

  const onConfirm = async () => {
    const response = await resetDataService();
    if (response?.status === 200) {
      Toast.show('Data reset complete.', Toast.LONG);
      getEntries();
      toggleNewGoalVisibility(true);
    } else {
      Toast.show('Data reset failed.');
    }

    await updateUser({
      ...user,
      weekly_goal: 120,
      profile_pic: null,
      location: null,
    });
    toggleVisibility('');
  };

  const title = 'Data Reset';
  const text = "Once you reset your data, all saved journals, locations, " +
  "settings, achievements, and report highlights will be reset to " +
  "default. Only your email and password will not be affected. Do " +
  "you want to continue?";

  return (
    <CustomModal
      visibility={visibility}
      toggleVisibility={toggleVisibility}
      title={title}
      text={text}
      onConfirm={onConfirm}
    />
  );
};

export default DataResetModal;
