import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import {
  PauseActive,
  ResetActive,
  ResetInactive,
  SheetFavorite,
  SheetParkSmall,
  SheetTimer,
  StartActive,
  StopActive,
  StopInactive
} from '../../assets/icons/Home';
import { postJournalEntry } from '../../redux/actions/journalEntryActions';
import Button from '../Button/Button';
import Timer from '../Counter/Timer';
import styles from './styles.js';

const StyledButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

const ImageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  background-color: white;
  margin: 0 38px;
  border-radius: 30px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.08);
`;

/**
 *
 * @param elapsedTime
 * @param limit
 * @param counterRunning
 * @param manageCounter
 * @return {JSX.Element}
 */
const CounterSection = ({
  elapsedTime,
  passedLimit,
  counterRunning,
  manageCounter,
  navigation,
  currentLocation,
  updateEntries
}) => {
  const isFocused = useIsFocused();
  let pausedTime = 0;
  const currentStartTime = elapsedTime;
  const [initialDate, setInitialDate] = useState(0);
  const [prevElapsedTime, setPrevElapsedTime] = useState(0);
  const [entryTime, setEntryTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(elapsedTime);
  const [currentDate, setCurrentDate] = useState('');
  const [timerNum, setTimerNum] = useState(0);
  const [parsedTime, setParsedTime] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [limit, setLimit] = useState(passedLimit);
  const [pauseEnabled, setPauseEnabled] = useState(false);
  const [resetEnabled, setResetEnabled] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isFirstEntry, setIsFirstEntry] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (counterRunning) {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 1000);
      let percent =
        0.1 *
        Math.trunc(
          (1000 * (timeElapsed % (100 * 1000 * 60 * 60))) / (1000 * 60 * 120),
        );
      setPercentage(percent);
    }
    return () => clearInterval(interval);
  }, [counterRunning, startTime]);

  useEffect(() => {
    counterRunning = false;
  }, []);
  useEffect(() => {
    if(passedLimit) setLimit(passedLimit);
  }, [passedLimit])
  
  useEffect(() => {
    setTimeElapsed(elapsedTime);
    if (elapsedTime === 0) {
      setPrevElapsedTime(0);
      setIsFirstEntry(true);
    }
  }, [elapsedTime]);

  useEffect(() => {
    //setTimeElapsed(elapsedTime);
    if(entryTime) {
        setParsedTime(formatTime(entryTime));
        let date = new Date().toJSON().slice(0, 10);
        let cDate =
          date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(2, 4);
        setCurrentDate(cDate);
        refRBSheet.current.open();
      }
  }, [entryTime]);

  useEffect(() => {
    if(isFocused) {
      setResetEnabled(false);
      setPrevElapsedTime(elapsedTime);
    }
  }, [isFocused]);
  
  const refRBSheet = useRef();

  const handleStart = (startTime) => {
    if (!currentLocation) {
      alert('You must select location before you can start the timer');
    } else if (!counterRunning) {

      //      console.log('startTime', startTime);
      const now = Date.now();
      if(!initialDate) setInitialDate(now);
      if(!timeElapsed) {

        setStartTime(now);
        setTimeElapsed(0);

      }
      else{
        //unpaused counter while maintaining previous time elapsed
        //should make a note of starting time
        pausedTime = now - timeElapsed;
        setStartTime(pausedTime);
        setTimeElapsed(now - pausedTime);
        if(!prevElapsedTime && !isFirstEntry) setPrevElapsedTime(now - pausedTime);
      }
      manageCounter();
      setPauseEnabled(true);
      setResetEnabled(false);
    }
  };

  const handlePause = () => {
//    if (counterRunning) {
//      manageCounter();
//      setTimeElapsed(Date.now() - startTime);
//    } else if (!counterRunning && startTime !== null) {
      const now = Date.now();
      setTimeElapsed(now - startTime);
      manageCounter();

//    }
    setPauseEnabled(false);
    setResetEnabled(true);
    if(prevElapsedTime) setIsFirstEntry(false);
  };

  const handleStop = () => {
    if (!counterRunning) {
      return;
    }

    manageCounter();
    
    setEntryTime(Date.now() - startTime - prevElapsedTime);

    setTimeElapsed(Date.now() - startTime);
    setIsStopped(true);
  };

  const handleReset = () => {
    setStartTime(prevElapsedTime);
    setTimeElapsed(prevElapsedTime);
    setPauseEnabled(false);
    if (counterRunning) {
      manageCounter();

    }
  };

  const formatTime = time => {
    let pTime = '';
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) {
      pTime = pTime + '0';
    }
    pTime = pTime + hours + ':';
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    if (minutes < 10) {
      pTime = pTime + '0';
    }
    pTime = pTime + minutes + ':';
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    if (seconds < 10) {
      pTime = pTime + '0';
    }
    pTime = pTime + seconds;
    return pTime;
  };
  const onCloseRefSheet = (refRBSheet) => {
    // handleReset();
    setPauseEnabled(false);
    refRBSheet.current.close()
  }
  const saveJournal = () => {
    const userId = auth().currentUser.uid;
    let endTime = initialDate + entryTime;
    dispatch(
      postJournalEntry(
        userId,
        currentLocation,
        new Date(initialDate),
        new Date(endTime),
      ),
    ).then(response => {
        updateEntries();
        setPauseEnabled(false);
        setResetEnabled(false);
        //setTimeElapsed(elapsedTime);
        setPrevElapsedTime(timeElapsed);
        setInitialDate(0);
        setIsFirstEntry(false);
        //setStartTime(timeElapsed);
        // currentStartTime = elapsedTime;
        //currentStartTime = elapsedTime;
        //handleReset();
    });
    refRBSheet.current.close();
  };

  return (
    <>
      <Timer elapsedTime={timeElapsed} limit={limit} />
      <StyledButtonRow>
        {(resetEnabled) ? (  
          <ImageButton onPress={handleReset}>
          {timeElapsed == 0 ? <ResetInactive /> : <ResetActive />}
        </ImageButton>
        ) : (
          <ImageButton>
            <ResetInactive/>
          </ImageButton>
        )}
        <ImageButton onPress={handleStop}>
          {counterRunning ? <StopActive /> : <StopInactive />}
        </ImageButton>
        {(!pauseEnabled) ?
        (
            <ImageButton onPress= {() => handleStart(timeElapsed)}>
              <StartActive />
            </ImageButton>
        ) : (
            <ImageButton onPress={handlePause}>
                <PauseActive />
            </ImageButton>
        )}
      </StyledButtonRow>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={false}
        height={416}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.banner}>
          <Text style={styles.text}>Counter Tracker</Text>
          <View style={styles.closeIcon}>
            <Icon
              size={12}
              name={'close'}
              onPress={() => onCloseRefSheet(refRBSheet)}
            />
          </View>
        </View>
        <View style={[{display: 'flex',flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}, styles.dateView]}>
          <Text style={styles.wordFont}>{currentDate}</Text>
        </View>
        <View style={styles.locationView}>
          <View style={styles.parkSetView}>
            <View>
              <SheetParkSmall />
            </View>
            <View style={styles.parkView}>
              <Text style={styles.parkNameFont}>{currentLocation?.name}</Text>
              <Text style={styles.parkAddressFont}>
                {currentLocation?.city
                  ? currentLocation.city
                  : currentLocation?.geocodes?.location?.locality}
              </Text>
              <Text style={styles.parkDistanceFont}>
                {currentLocation?.state}
              </Text>
            </View>
          </View>
          <View style={styles.favoritView}>
            <SheetFavorite />
          </View>
        </View>
        <View style={styles.timeView}>
          <View style={styles.timerView}>
            <View style={styles.counterView}>
              <SheetTimer />
            </View>
            <Text style={styles.wordFont}>Counter Duration</Text>
          </View>
          <View style={styles.parseTimeView}>
            <Text style={styles.timeFont}>{parsedTime}</Text>
          </View>
          <View style={styles.percentView}>
            <Text style={styles.percentFont}>Total </Text>
            <Text style={styles.percentFont}>{percentage.toFixed(1)}</Text>
            <Text style={styles.percentFont}>%</Text>
            <Text style={styles.limitFont}> /</Text>
            <Text style={styles.limitFont}>{limit}</Text>
            <Text style={styles.limitFont}> min</Text>
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button label="Save" onPress={saveJournal} />
        </View>
      </RBSheet>
    </>
  );
};

export default CounterSection;
