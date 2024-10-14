import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  // Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  DatePickerModal,
  en,
  registerTranslation,
} from 'react-native-paper-dates';
import styles from './styles';
import CALENDAR_ICON from '../../assets/icons/CALENDAR_ICON.svg';

registerTranslation('en', en);

/**
 *
 * @param onSubmit
 * @return {JSX.Element}
 * @constructor
 */
const CalendarButton = props => {
  const {
    disabled,
    onSubmit,
    mode,
    maxDateEnabled,
    dateSelected,
    _startDate,
    _endDate,
    addLineBreak,
    _forceUpdate,
  } = props;
  const [dateRange, setRange] = useState({
    startDate: _startDate,
    endDate: _endDate,
  });

  const [validRange, setValidRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const [dateSingle, setDateSingle] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDateSingle(dateSelected);
  }, [dateSelected]);
  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onRangeConfirm = useCallback(
    ({startDate, endDate}) => {
      if (!startDate) startDate = endDate;
      if (!endDate) endDate = startDate;
      setOpen(false);
      setRange({startDate, endDate});
      onSubmit({startDate, endDate});
    },
    [setOpen, setRange, onSubmit],
  );

  const onSingleConfirm = useCallback(
    dateSelected => {
      if (dateSelected) {
        setOpen(false);
        setDateSingle(dateSelected.date);
        onSubmit(moment(dateSelected.date).format());
      }
    },
    [setOpen, setDateSingle, onSubmit],
  );

  useEffect(() => {
    var endDate = null;
    if (maxDateEnabled) {
      var d = new Date();
      endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
    } else endDate = dateSelected;

    setValidRange({startDate: new Date(2000, 0), endDate: endDate});
    if (maxDateEnabled) {
      if (mode === 'single') {
        setDateSingle(endDate);
      }
      if (mode === 'range') {
        setRange({...range, endDate: endDate});
      }
    } else if (_startDate && _endDate)
      setRange({startDate: _startDate, endDate: _endDate});
  }, []);

  useEffect(() => {
    const newStartDate = new Date(_startDate);
    const newEndDate = new Date(_endDate);
    setRange({startDate: newStartDate, endDate: newEndDate});
  }, [_forceUpdate]);

  const showDatePicker = () => {
    setOpen(true);
  };
  const areDatesEqual = (startDate, endDate) => {
    if (
      startDate.getDate() === endDate.getDate() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getYear() === endDate.getYear()
    ) {
      return true;
    }
    return false;
  };

  const ChosenDatePicker = ({choice}) =>
    //if specified, set maxDate to beginning of yesterday
    //this setting is used on AddJournalScreen to prevent configuring
    //journal entries in the future
    choice === 'range' ? (
      <DatePickerModal
        locale="en"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onConfirm={onRangeConfirm}
      />
    ) : (
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismiss}
        date={dateSingle}
        validRange={{
          startDate: new Date(validRange.startDate),
          endDate: new Date(validRange.endDate),
        }}
        onConfirm={onSingleConfirm}
      />
    );
  ChosenDatePicker.propTypes = {
    choice: PropTypes.string.isRequired,
  };

  const DateString =
    mode === 'single' || areDatesEqual(dateRange.startDate, dateRange.endDate)
      ? mode === 'single'
        ? moment(dateSingle).format('MMM DD')
        : moment(dateRange.startDate).format('MMM DD')
      : addLineBreak
      ? `${moment(dateRange.startDate).format('MMM DD')} - \n ${moment(
          dateRange.endDate,
        ).format('MMM DD')}`
      : `${moment(dateRange.startDate).format('MMM DD')} - ${moment(
          dateRange.endDate,
        ).format('MMM DD')}`;
  return (
  //  <View><Text>CalendarButton</Text></View>
    <SafeAreaView>
      <TouchableOpacity
        disabled={disabled}
        style={styles.calendarButton}
        onPress={showDatePicker}>
        <View style={styles.calendarButtonLabel}>
          <CALENDAR_ICON style={styles.calendarIcon} />
          <Text style={styles.calendarDate}>{DateString}</Text>
        </View>
      </TouchableOpacity>
      <View style={{backgroundColor: 'white'}}>
        <ChosenDatePicker choice={mode} />
      </View>
    </SafeAreaView>
  );
};

CalendarButton.propTypes = {
  onSubmit: PropTypes.func,
  mode: PropTypes.string.isRequired,
};

CalendarButton.defaultProps = {
  onSubmit: () => {},
  maxDateEnabled: false,
};

export default CalendarButton;
