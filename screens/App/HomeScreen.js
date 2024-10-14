import { DrawerActions, useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Full_Logo_Horizontal from '../../assets/icons/Full_Logo_Horizontal.svg';
import { Profile } from '../../assets/icons/Home';
import CalendarButton from '../../components/Button/CalendarButton';
import EntryHistory from '../../components/Journal/EntryHistory';
import CounterSection from '../../components/Section/CounterSection';
import QuickLinksSection from '../../components/Section/QuickLinksSection';
import WeeklyChartSection from '../../components/Section/WeeklyChartSection';
import { THEME_LIGHT_GREEN } from '../../components/Utilities/Constants';
import { resetDataService } from '../../components/Utilities/DataResetServices';
import { fetchJournalEntriesByDate as fetchWeeklyEntries } from 
  '../../components/Utilities/JournalFunctions';
import removeUser from '../../helpers/removeUser';
import userState from '../../helpers/userState';
import { fetchJournalEntriesByDate } from '../../redux/actions/journalEntryActions';
/**
 * This is the screen after sign up and login
 * it's the main screen for authorized users
 * @param props
 * @return {JSX.Element}
 * @constructor
 */

const HomeScreen = ({
  user,
  benefits,
  articles,
  userisLoading,
  usererrmsg,
  userdetails,
  // userProfile,
  navigation,
  route,
  logout,
  resetOnboarding,
}) => {
  //return(<View><Text>Home Screen Reached</Text></View>)
  const isStateLoaded = route.params?.isStateLoaded || false;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [passedLimit, setLimit] = useState(120);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [counterRunning, setCounterRunning] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [entry, setEntry] = useState({_id: uuidv4(), location: null});
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const [dateFilter, setDateFilter] = useState({
    startDate: moment(Date.now())
      .startOf('day')
      .subtract(3, 'days')
      .toISOString(), // today - 3
    endDate: moment(Date.now()).toISOString(), // today
  });
  const [chartDateFilter, setChartDateFilter] = useState({
    startDate: null, endDate: null
  });
  const isFocused = useIsFocused();
  const journalEntries = useSelector(
    state => state.getIn(['JournalEntryData', 'homeFilteredEntries']),
    JSON.stringify(journalEntries),
  );
  // const weeklyJournalEntries = useSelector(
  //   state => state.getIn(['JournalEntryData', 'weeklyFilteredEntries']),
  //   JSON.stringify(weeklyJournalEntries),
  // )
  const HeaderRow = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  `;

  const getEntries = () => {
    dispatch(
      fetchJournalEntriesByDate(moment(Date.now())
          .startOf('day')
          .subtract(3, 'days')
          .toISOString(),
          moment(Date.now()).toISOString(),
          "Home")
    );
  };

  useEffect(() => {
    if (route.params?.location) {
      setCurrentLocation(route.params?.location);
    }
  }, [route.params?.location]);

  useEffect(() => {
    getEntries();
  }, [JSON.stringify(userState)]);

  useEffect(() => {


    if (isFocused) {
      getEntries();
      setTimerForCurrentWeek();
      
    }
//    else if (updateEntriesHome && !updateEntriesJournal) {
//        let startDateTemp = moment(Date.now())
//          .startOf('day')
//          .subtract(3, 'days')
//          .toISOString(); // today - 3
//        let endDateTemp = moment(Date.now()).toISOString();
//        setDateFilter({startDate: startDateTemp, endDate: endDateTemp})
//        getEntries();
//    }
  }, [isFocused]);

  // useEffect(() => {
  //   console.log("Weekly Journal Entries: ", weeklyJournalEntries);
  // }, [weeklyJournalEntries]);

  useEffect(() => {
    const dayOffset = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    setChartDateFilter({
      startDate: new Date(
        selectedDate.getTime() - selectedDate.getDay() * dayOffset,
      ),
      endDate: new Date(
        selectedDate.getTime() + (6 - selectedDate.getDay()) * dayOffset,
      ),
    });
  }, [selectedDate]);

  const setTimerForCurrentWeek = () => {
    let d = new Date(Date.now());
    let day = d.getDay();
    let startDate = (moment(d.setDate(d.getDate() - day)).startOf('day').toISOString())

    fetchWeeklyEntries(startDate,
          moment(Date.now()).toISOString()).then(data => {
            const withDuration = data.map(entry => {
              return {
                ...entry,
                duration:
                  new Date(entry.end_time).getTime() -
                  new Date(entry.start_time).getTime(),
              };
            });
            let time = getTotalTimeElapsed(withDuration);
            console.log("Time Elapsed: ", time);
            setElapsedTime(time);
            setLimit(userState.getUserStateGoal() || 120);
          });
  }


  const getTotalTimeElapsed = (journalEntries) => {
    var total = 0;
    journalEntries.forEach(entry => {
      const day = new Date(entry.start_time).getDay();
      total += entry.duration;
    });
    return total;
  };

  const deleteAccount = async () => {
    const dataResetResponse = await resetDataService();
    if (dataResetResponse?.status === 200) {
      // Delete user from Firebase, database, and then logout
      try {
        await removeUser();
        Toast.show('Account deleted successfully.', Toast.LONG);
        logout();
        // show onboarding screen again
        resetOnboarding();
      } catch (error) {
        Toast.show('Account deletion failed.', Toast.LONG);
      }
    } else {
      Toast.show('Data reset failed.');
    }
  };
  const updateEntries = () => {
    getEntries();
  }
  useEffect(()=> {
    deleteAccountAsync();
  }, []);

  useEffect(() => {
    /**
     * If a goal time is already set, then set it to that value
     * otherwise, the default value is 120
     */
    if (userdetails?.goalDetail?.goalTime !== undefined) {
      setLimit(userdetails?.goalDetail?.goalTime);
    }
    //populate the user state for later usage
    // userState.setUserState(
    //   userProfile ? userProfile.uid : null,
    //   userProfile ? userProfile.email : null,
    //   userProfile ? userProfile.name : null,
    // );
  }, [userdetails, benefits, articles, userisLoading]);
  const deleteAccountAsync = async() => {
    const deleted = userState.getDeleted();
    // begin delete account if user has delete flag set
    if (deleted) {
      setIsDeleting(true);
      try {
        await deleteAccount()
        Toast.show('Account deleted successfully.');
      } catch (error) {
        Toast.show('Account deletion failed.');
      }
    }
  }
  /**
   * this is a toggle
   * if counterRunning is true, then set it to false to stop the timer
   * if counterRunning is false, then start the timer
   */
  const manageCounter = () => {
    counterRunning ? setCounterRunning(false) : setCounterRunning(true);
  };

  const findPark = () => {
    navigation.navigate({
      name: 'SearchLocations',
      params: {origin: 'HomeScreen', entryId: entry._id},
    });
  };

  const handleConfirmation = response => {
    if (response) {
      setCurrentLocation(route.params?.location);
      entry.location = route.params?.location;
    } else {
      navigation.navigate({
        name: 'SearchLocations',
        params: {origin: 'HomeScreen', entryId: entry._id},
      });
    }
  };

  const openProfile = () => {
    navigation.navigate('ProfileScreens', {
      screen: 'ProfileScreen',
      params: {user: user},
    });
  };

  const openSideMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const formatLocation = () => {
    let location = '';
    if (currentLocation?.name) {
      location += currentLocation.name;
    }
    if (currentLocation?.city) {
      location += `, ${currentLocation.city}`;
    }
    if (currentLocation?.state) {
      location += `, ${currentLocation.state}`;
    }
    if (currentLocation?.zipcode) {
      location += `, ${currentLocation.zipcode}`;
    }
    return location;
  };

  const createEntry = () => {
    let entry = {
      id: uuidv4(),
      date: moment(new Date()).format(),
      location: null,
      startTime: new Date().toISOString(),
      duration: '',
    };
    setEntry(entry);
  };

  const handleCalendarButtonPress = date => {
    setSelectedDate(new Date(date));
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Modal visible={isDeleting} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{color: '#ffffff', marginTop: 10}}>
            Deleting account...
          </Text>
        </View>
      </Modal>
      <HeaderRow style={{ backgroundColor: THEME_LIGHT_GREEN, marginTop: 0, paddingVertical: 12 }}>
      <Full_Logo_Horizontal
          style={{
            marginLeft: 100,
          }}
        />
        <TouchableOpacity style={{marginLeft: 'auto', marginRight: 20}} onPress={openSideMenu}>
          <Profile />
        </TouchableOpacity>
      </HeaderRow>

      {/* {!emailVerified && <VerifyEmailBanner />} */}
      <ScrollView>
        <QuickLinksSection />
        <TouchableOpacity style={styles.title} onPress={findPark}>
          <Text style={{fontWeight: 'bold', fontSize: 18 }}>{currentLocation ? formatLocation() : 'Add Location +'}</Text>
        </TouchableOpacity>
        <CounterSection
          elapsedTime={elapsedTime}
          passedLimit={userState.getUserStateGoal() || 120}
          counterRunning={counterRunning}
          manageCounter={manageCounter}
          navigation={navigation}
          currentLocation={currentLocation}
          userId={user}
          updateEntries={updateEntries}
        />
        <View style={{marginHorizontal: 12}}>
          <View style={{height: 16}} />
          <CalendarButton
            mode={'single'}
            maxDateEnabled={false}
            onSubmit={handleCalendarButtonPress}
            dateSelected={selectedDate || new Date()}
          />
          <WeeklyChartSection dateFilter={chartDateFilter} />
          <View style={{height: 16}} />
          <EntryHistory
            goalTime={userState.getUserStateGoal() * 60 || 2 * 60 * 60}
            entries={journalEntries}
            dateFilter={dateFilter}
            origin={'HomeScreen'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  /**
   * CURRENTLY UNSUPPORTED
   * handles if user doesn't have a goal set and other conditions
   */
  /*
  if (typeof user.goalDetail !== 'undefined') {
    const currentGoalDetail = user.goalDetail;

    if (moment.utc().format() >= currentGoalDetail.endDate) {
      return (
        <TouchableOpacity>
          <View>
            <Text style={styles.goalTxt}>
              Currently You don&apos;t have any active Goal. Please set your goal
            </Text>
            <Text style={styles.goalTxt}>
              Your Last Goal Expired on
              {calenderFun.dateConverter(currentGoalDetail.endDate) }
            </Text>
            <Text style={styles.goalBtn} onPress={GoalNavigator}>
              Set Your Goal
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (benefits !== undefined || articles !== undefined) {
      return (
        <ScrollView style={styles.maincontainer}>

          <Overview
            navigation={navigation}
            currentGoalDetail={currentGoalDetail}
            goalTime={currentGoalDetail.goalTime}
            totalTime={user.CurrentNatureTime}
          />
          <View style={styles.HomeContainer}>
            <Text style={styles.titlename}>
              Benefits Gained
            </Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('BenefitList')}
            >
              See All
            </Text>
          </View>
          <Benefit benefits={userBenefitList} navigation={navigation} />
          <View style={styles.HomeContainer}>
            <Text style={styles.titlename}>Articles</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('ArticleList')}
            >
              See All
            </Text>
          </View>
          <Article article={userArticle} navigation={navigation} />
          <View />

        </ScrollView>
      );
    }
  }
   */
};

const styles = StyleSheet.create({
  title: {
    ...Platform.select ({
      android: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 30,
        zIndex: 2,
  
      },
      ios: {
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
        alignItems: 'center',
        zIndex: 2,
      }
    }),
  }
});

export default HomeScreen;
