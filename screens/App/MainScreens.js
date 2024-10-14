import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavArticlesIcon,
  NavDiscoverIcon,
  NavHomeIcon,
  NavJournalIcon,
  NavProgressIcon,
} from '../../components/Button/inactiveIcons';
import DrawerView from '../../components/Drawer/Drawer';
import HelpCenterSection from '../../components/Section/HelpCenterSection';
import ReportSharingSection from '../../components/Section/ReportSharingSection';
import {
  LIGHT_GREY,
  THEME_GREEN,
  THEME_LIGHT_GREEN
} from '../../components/Utilities/Constants';
import styles from '../../components/Utilities/styles';
import UserContext from '../../contexts/UserContext';
import userState from '../../helpers/userState';
import useCurrentUser from '../../hooks/useCurrentUser';
import { fetchArticles } from '../../redux/actions/articleActions';
import { fetchBenefits } from '../../redux/actions/benefitActions';
import { fetchUser } from '../../redux/actions/userActions';
import AddJournalScreen from './AddJournalScreen';
import ArticleDetail from './ArticleDetailScreen';
import ArticleListScreen from './ArticleListScreen';
import ArticleSubscribeScreen from './ArticleSubscribeScreen';
import ArticleViewScreen from './ArticleViewScreen';
import BenefitListView from './BenefitListView';
import BenefitsListScreen from './BenefitsListScreen';
import MapScreen from './Discover/MapScreen';
import NatureDetailScreen from './Discover/NatureDetailScreen';
import SearchLocations from './Discover/manualLocation/SearchLocations';
import EditAccountScreen from './EditAccountScreen';
import GoalSetting from './GoalSettingScreen';
import HomeScreen from './HomeScreen';
import JournalScreen from './JournalScreen';
import LikedArticlesScreen from './LikedArticlesScreen';
import LogSymptoms from './LogSympyomScreen';
import LoginAndSecurityWrapper from './LoginAndSecurityScreen';
import {
  NotificationFrequencyScreen,
  NotificationScreen,
} from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import ReportScreen from './ReportScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// // const customFont = require('../../assets/fonts/Roboto-Regular.ttf');

const getUserDetails = () => {
  const userdetails = useSelector(
    state => state.getIn(['UserDetails', 'userdetails']),
    userdetails,
  );
  return userdetails;
};

const getArticles = () => {
  const articles = useSelector(
    state => state.getIn(['ArticleData', 'articles']),
    articles,
  );
  return articles; 
};

const getBenefits = () => {
  const benefits = useSelector(
    state => state.getIn(['BenefitData', 'benefits']),
    benefits,
  );
  return benefits;
};


function HomeNavigator({symptom, userisLoading, usererrmsg, logout, resetOnboarding}) {
  const userdetails = getUserDetails();
  const articles = getArticles();
  const benefits = getBenefits();

return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({navigation}) => ({
        // gestureEnabled: true,
        // headerStyle: [styles.header],
        // headerTitleStyle: [styles.headerText],
        headerShown: false,
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: THEME_LIGHT_GREEN, borderBottomWidth: 0},
      })}
      // headerMode="float"
      >
      <Stack.Screen
        name="HomeScreen"
        options={{
        }}
        >
        {props => (
          <HomeScreen
            {...props}
            userdetails={userdetails}
            usererrmsg={usererrmsg}
            userisLoading={userisLoading}
            benefits={benefits}
            articles={articles}
            logout={logout}
            resetOnboarding={resetOnboarding}
          />
        )}
      </Stack.Screen>
      {/* <Stack.Screen name="AddJournalScreen" options={{title: 'Add Journal'}}>
              {props => <AddJournalScreen {...props} />}
      </Stack.Screen> */}
      <Stack.Screen name="ArticleDetail" options={{title: 'Articles'}}>
        {props => (
          <ArticleDetail {...props} user={userdetails} articles={articles} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ArticleView" options={{title: 'View Article'}}>
        {props => (
          <ArticleViewScreen
            {...props}
            user={userdetails}
            articles={articles}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ArticleList" options={{headerShown: true, title: 'Articles'}}>
        {props => (

          <ArticleListScreen
            {...props}
            user={userdetails}
            articles={articles}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ArticleSubscribe"
        options={{title: 'Subscribe To Categories'}}>
        {props => (
          <ArticleSubscribeScreen
            {...props}
            user={userdetails}
            articles={articles}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LikedArticlesList"
        options={{title: 'Your Liked Articles'}}>
        {props => (
          <LikedArticlesScreen
            {...props}
            user={userdetails}
            articles={articles}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="LogSymptoms" options={{title: 'Log Symptoms'}}>
        {props => (
          <LogSymptoms {...props} user={userdetails} symptom={symptom} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="GoalSetting"
        options={{title: 'Set Your Goal of the Week'}}>
        {props => (
          <GoalSetting
            {...props}
            benefits={benefits}
            userdetails={userdetails}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="BenefitsList" options={{title: 'Benefits Gained'}}>
        {props => <BenefitsListScreen {...props} benefits={benefits} />}
      </Stack.Screen>
      <Stack.Screen
        name="NatureDetailScreen"
        options={{title: 'Selected Park'}}>
        {props => <NatureDetailScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="JournalScreen">
        {props => <JournalScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="AddJournalScreen">
        {props => <AddJournalScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SearchLocations">
        {props => <SearchLocations {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function MapNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MapScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}

function ArticlesNavigator() {
  const userdetails = getUserDetails();
  const articles = getArticles();
  return (
    <Stack.Navigator
      initialRouteName="ArticlesScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ArticleList" options={{headerShown: true, title: 'Articles', 
        headerStyle: {backgroundColor: THEME_LIGHT_GREEN, borderBottomWidth: 0}}}>
        {props => (
          <ArticleListScreen
            {...props}
            user={userdetails}
            articles={articles}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function ReportNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ReportScreen"
      screenOptions={{
        title: 'My Progress',
        headerStyle: {backgroundColor: THEME_LIGHT_GREEN, borderBottomWidth: 0},
      }}>
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen
        name="ReportDownloadScreen"
        component={ReportSharingSection}
      />
    </Stack.Navigator>
  );
}

function JournalNavigator(props) {
  console.log('Date Filter Prop', props);
  if (props.route.params.dateFilter) {
    return (
      <Stack.Navigator
        initialRouteName="JournalScreen"
        screenOptions={{
          title: 'Journal History',
          headerStyle: {backgroundColor: THEME_LIGHT_GREEN, borderBottomWidth: 0},
        }}>
        <Stack.Screen
          name="JournalScreen"
          headerShown={true}
          options={({route}) => ({
            dateFilter: props.route.params.dateFilter,
            title: props.route.params.title,
          })}
//          initialParams={{updateEntriesJournal: true, updateEntriesHome: false}}
          component={JournalScreen}
          />

        <Stack.Screen
          name="AddJournalScreen"
          headerShown={true}
          options={({route}) => ({title: route.params?.title})}>
          {props => <AddJournalScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="SearchLocations"
          component={SearchLocations}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="JournalScreen"
        screenOptions={{
          title: 'Journal History',
          headerStyle: {backgroundColor: THEME_LIGHT_GREEN, borderBottomWidth: 0},
        }}>
        <Stack.Screen
          name="JournalScreen"
          headerShown={true}
          options={({route}) => ({
            dateFilter: route.params.dateFilter,
            title: route.params.title,
          })}
          component={JournalScreen}
        />
        <Stack.Screen
          name="AddJournalScreen"
          headerShown={true}
          options={({route}) => ({title: route.params.title})}>
          {props => <AddJournalScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="SearchLocations"
          component={SearchLocations}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}

function ProfileNavigator({user}) {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        title: 'Profile',
        headerStyle: {backgroundColor: THEME_LIGHT_GREEN, borderBottomWidth: 0},
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="EditAccountScreen"
        component={EditAccountScreen}
        options={{title: 'Edit Account'}}
      />
      <Stack.Screen
        name="HelpCenterSection"
        component={HelpCenterSection}
        options={{title: 'Help Center'} }
      />
      <Stack.Screen
        name="BenefitListView"
        component={BenefitListView}
        options={{title: 'Benefit List View'}}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{title: 'Notification'}}
      />
      <Stack.Screen
        name="NotificationFrequencyScreen"
        options={({route}) => ({title: route.params.label})}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {props => <NotificationFrequencyScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const CustomDrawerContent = ({userName}) => (
  <DrawerContentScrollView {...props}>
    <SafeAreaView
      style={styles.maincontainer}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={styles.drawerHeader}>
        <View style={{flex: 1}} />
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>{userName}</Text>
          <Text style={styles.drawerHeaderLink}>Edit Profile</Text>
        </View>
      </View>
    </SafeAreaView>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const Tabs = ({logout, userName, resetOnboarding}) => {
  const dispatch = useDispatch();
  const articles = useSelector(
    state => state.getIn(['ArticleData', 'articles']),
    articles,
  );
  const benefits = useSelector(
    state => state.getIn(['BenefitData', 'benefits']),
    benefits,
  );
  const symptom = useSelector(
    state => state.getIn(['SymptomData', 'symptom']),
    symptom,
  );
  const userdetails = useSelector(
    state => state.getIn(['UserDetails', 'userdetails']),
    userdetails,
  );
  // const userProfile = useSelector(
  //   state => state.getIn(['UserProfiles', 'userProfile']),
  //   userProfile,
  // );
  // const UserActivity = useSelector(state => state.getIn(['UserActivity', 'dailyActivity']), UserActivity)
  const usererrmsg = useSelector(
    state => state.getIn(['UserDetails', 'errmsg']),
    usererrmsg,
  );
  const userisLoading = useSelector(
    state => state.getIn(['UserDetails', 'isLoading']),
    userisLoading,
  );

  const {
    user,
    isLoading: userLoading,
    error: userError,
    updateUser,
  } = useCurrentUser();

  useEffect(() => {
    userState.setUserState(
      user != null ? user.uid : null,
      user != null ? user.email : null,
      user != null ? user.name : null,
      user != null ? user.weekly_goal : null,
      user != null ? user.profile_pic : null,
      user != null ? user.location : null,
      user != null ? user.deleted : null,
    );
  }, [user]);

  const userInfo = useMemo(() => {
    return {
      user,
      userLoading,
      userError,
      updateUser,
    };
  }, [user, userLoading, userError, updateUser]);

  useEffect(() => {
    // dispatch(fetchSymptoms());
    dispatch(fetchBenefits());
    dispatch(fetchArticles());
    dispatch(fetchUser());
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          var color = focused ? THEME_GREEN : LIGHT_GREY;
          switch (route.name) {
            case 'Home':
              return <NavHomeIcon style={{color: color}} />;
            case 'Map':
              return <NavDiscoverIcon style={{color: color}} />;
            case 'Articles':
              return <NavArticlesIcon style={{color: color}} />;
            case 'Progress':
              return <NavProgressIcon style={{color: color}} />;
            case 'Journal':
              return <NavJournalIcon style={{color: color}} />;
            default:
              return <NavHomeIcon style={{color: color}} />;
          }
        },
      })}
      tabBarOptions={{
        showLabel: true,
        style: {
          paddingTop: 18,
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: 'System',
          marginBottom: 3,
          marginTop: 12,
        },
        activeTintColor: THEME_GREEN,
        inactiveTintColor: LIGHT_GREY,
      }}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false
        }}
        // symptom={symptom}
        articles={articles}
        userdetails={userdetails}
        logout={logout}
        resetOnboarding={resetOnboarding}
      >
        {() => (
          <HomeNavigator
            // symptom={symptom}
            articles={articles}
            userdetails={userdetails}
            logout={logout}
            resetOnboarding={resetOnboarding}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Map"
        component={MapNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Articles"
        component={ArticlesNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen	
        name="Progress"	
        component={ReportNavigator}	
        options={{headerShown: false}}	
      />	
      <Tab.Screen	
        name="Journal"
        component={JournalNavigator}
        options={{headerShown: false}}
        initialParams={{
          title: "Journal History",
          dateFilter: {startDate: new Date(), endDate: new Date()},
        }}
        // listeners={({ navigation }) => ({
        //     tabPress: (e) => {
        //       e.preventDefault();
        //       navigation.navigate('JournalScreen', {title: 'Journal History'});
        //     },
        // })}
      />
      <Tab.Screen	
        name="Profile"	
        options={{
          headerShown: false, 
          tabBarButton: () => null,
          tabBarVisible: false, // if you don't want to see the tab bar
        }}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default function MainScreens({logout, userName, notification, resetOnboarding}) {
  const {
    user,
    isLoading: userLoading,
    error: userError,
    updateUser,
  } = useCurrentUser();
  
   const userInfo = useMemo(() => {
    return {
      user,
      userLoading,
      userError,
      updateUser,
      userName,
      logout,
    };
  }, [user, userLoading, userError, updateUser, userName, logout]);

  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState('');

  return (
    <UserContext.Provider value={userInfo}>
      <View style={styles.maincontainer}>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false
            }}
            drawerStyle={{
              width: 312,
              padding: 16,
            }}
            useLegacyImplementation={false}
            initialRouteName="TabNavigator"
            drawerContent={props => (
              <DrawerView
                logout={logout}
                setPrivacyPolicyVisible={setPrivacyPolicyVisible}
                {...props}
              />
            )}>
            <Drawer.Screen name="TabNavigator">
              {() => <Tabs logout={logout} resetOnboarding={resetOnboarding} />}
            </Drawer.Screen>
            <Drawer.Screen
              name="LoginAndSecurityWrapper"
              component={LoginAndSecurityWrapper}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </UserContext.Provider>
  );
}
