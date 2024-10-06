import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as activeIcons from '../Button/activeIcons.js';
import * as inactiveIcons from '../Button/inactiveIcons.js';
import styles from './styles';

const QuickLinkCard = ({active, label}) => {
   const Icons = active ? activeIcons : inactiveIcons;
   const navigation = useNavigation();
    const userdetails = useSelector(
      state => state.getIn(['UserDetails', 'userdetails']),
      userdetails,
    );
    const articles = useSelector(
      state => state.getIn(['ArticleData', 'articles']),
      articles,
    );

    const handleSeeAllArticlesPress = () => {
      navigation.navigate('ArticleList', {
        params: {user: userdetails, articles: articles},
      });
    };

    const handleEditGoalPress = () => {
      navigation.navigate('ProfileScreens', {screen: 'EditAccountScreen'});
    };

    const handleBenefitsPress = () => {
      navigation.navigate('ProfileScreens', {
        screen: 'BenefitListView',
      });
    };

    // Initialize 'Add Journal' props
    const [dateFilter, setDateFilter] = useState({
      startDate: new Date(),
      endDate: new Date(),
    });


    const handleExplorePress = () => {
      navigation.navigate('MapScreens');
    };

    const handleAddJournalPress = () => {
      navigation.navigate('JournalScreens',
          {screen: "AddJournalScreen",
          params: {title: 'Add Journal',
        passedEntries: null }});
    };

  const skip = ['Favorites'];

    const labelToLinkMap = {  
      Explore: handleExplorePress,
      'Add Journal': handleAddJournalPress,
      Articles: handleSeeAllArticlesPress,
      'See Benefits': handleBenefitsPress,
      'Edit Goal': handleEditGoalPress,
    };

    labelToIconMap = {
      'Add Journal': <Icons.AddJournalIcon />,
      Explore: <Icons.DiscoverIcon />,
      'Edit Goal': <Icons.EditGoalIcon />,
      Articles: <Icons.ArticlesIcon />,
      Favorites: <Icons.FavoritesIcon />,
      'See Benefits': <Icons.SeeBenefitsIcon />,
    };

  return (
    <>
    {skip.includes(label) ? (
            <View style={styles.quickLinkCard}>
            <TouchableOpacity disabled = {!active}>

              <View style={styles.quickLinkCard}>
                {labelToIconMap[label]}
                <Text style={{fontWeight:'bold', color: '#C4C4C4'}}>{label}</Text>
              </View>


            </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.quickLinkCard}>
            <TouchableOpacity disabled={!active} onPress={labelToLinkMap[label]}>
              <View style={styles.quickLinkCard}>
                {labelToIconMap[label]}
                <Text style={{fontWeight: 'bold'}}>{label}</Text>
              </View>

            </TouchableOpacity>
            </View>
      )}
   </>
  );
};

export default QuickLinkCard;
