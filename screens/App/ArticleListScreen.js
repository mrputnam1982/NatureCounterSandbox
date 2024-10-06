import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Menu } from 'react-native-paper';
import styled from 'styled-components/native';
import SvgImg from '../../assets/icons/Category.svg';
import SvgDownVector from '../../assets/icons/DownVector.svg';
import { ArticleCard } from '../../components/Card';
import MainContainer from '../../components/Container/MainContainer';
import { MEDIUM_GREY } from '../../components/Utilities/Constants';
import NotFound from '../../components/Utilities/NotFound';
import useAddBackButton from '../../components/Utilities/useAddBackButton';
// import RNRestart from 'react-native-restart';

/**
 * Styled Touchable Opacity for the Selector component
 */
const StyledSelector = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${MEDIUM_GREY};
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: white;
`;

const Triangle = styled.View`
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-top-width: 8px;
  border-left-width: 5px;
  border-right-width: 5px;
  border-top-color: #459f5e;
  border-left-color: transparent;
  border-right-color: transparent;
  border-radius: 1px;
`;

/**
 * Styled View for the Header showing results and filter
 */
// const StyledHeader = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   margin: 10px;
// `;

const StyledHeader = styled.View`
  flex-direction: column;
  justify-content: space-between;
  /* // align-items: center; */
  margin: 10px;
`;

/**
 * Screen showing a list of articles
 * @param articles
 * @return {JSX.Element}
 * @constructor
 */
export default function ArticleListScreen({user, articles}) {
  const {data} = articles; /*
  let data=null; // */

  let isLoading=true;
  if (!data) {
    if(isLoading)
    {
      return <Text
        style={{
          marginLeft:'auto',
          marginRight:'auto',
        }}
      Text>
        Loading Articles
      </Text>
    }
    else
    {
      return <NotFound item="Articles" />;
    }

  }

  const subscriptionsList = user.subscriptions;
  const [selected, setSelected] = useState('All Benefits');
  const [visible, setVisible] = useState(false);
  let [searchString, setSearchString] = useState('');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();
  useAddBackButton(navigation, true);
  /**
   * Get list of Health Categories in articles
   * @type {unknown[]}
   */
  const categoryList = [
    ...new Set(
      data.map(x => JSON.stringify((({category}) => ({category}))(x))),
    ),
  ].map(JSON.parse);

  /**
   * Filter articles based on the selected value of the picker
   */
  const filterArticles = data.filter(a => a.category === selected);

  /**
   * If there are more than filtered articles
   * then show the filtered articles
   * else, show all articles
   */
  const renderArticleList = filterArticles.length !== 0 ? filterArticles : data;

  // useLayoutEffect(() => {
  //   navigation.setOptions({title});
  // }, [navigation]);
  /**
   * Set selected to the category that was selected
   * then close the menu
   * @param category
   */
  const handleSelected = category => {
    setSelected(category);
    closeMenu();
  };

  const handleSearchString = searchString => {
    setSearchString(searchString);
  };

  /**
   * When an article is pressed,
   * take user to the view article screen with full article content
   * @param article
   */
  const handleArticlePress = article =>
    navigation.navigate('ArticleView', {selectedArticle: article});

  const handleSubscriptionPress = () =>
    navigation.navigate('ArticleSubscribe', {data});

  const handleLikePress = () => {
    setTimeout(() => {
      navigation.navigate('ArticleList', {articles: data, user: user});
    }, 50);
    // navigation.navigate('ArticleList', { articles: data, user: user });
  };

  const handleViewLikesPress = () => {
    let likedArticles = data;
    navigation.navigate('LikedArticlesList', {user, likedArticles});
  };

  /**
   * Render the selector component
   * @param title
   * @param onPress
   * @return {JSX.Element}
   * @constructor
   */
  const Selector = ({title, onPress}) => (
    <StyledSelector onPress={onPress}>
      <Text style={{marginLeft: '5%'}}>{title}</Text>
      <View
        style={{
          margin: '5%',
          height: 12,
          width: 12,
        }}>
        <SvgDownVector width="100%" height="100%" />
      </View>
    </StyledSelector>
  );

  /**
   * Render the Menu component
   * and the options to select
   * @return {JSX.Element}
   */
  const renderMenu = () => (
    <View>
      {/* <View style={{marginBottom: 10, marginTop: -20}}>
        <TextInput
          placeholder="Search by keyword"
          onChangeText={t => handleSearchString(t)}
  /     > */}
      {/* <Button label="Subscribe" onPress={handleSubscriptionPress} /> */}
      {/*<Text style={{flex: 3, marginStart: 0, marginTop: '5%'}}>
          Showing {renderArticleList?.length || 0} article
          {renderArticleList.length > 1 ? 's' : null}
        </Text>
      </View>*/}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            marginStart: 0,
            height: 24,
            width: 24,
            marginBottom: '5%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgImg width="100%" height="100%" />
        </View>
        <Text
          style={{
            marginStart: 0,
            marginLeft: '2%',
            marginBottom: '5%',
            fontSize: 18,
            fontWeight: 'normal',
            color: '#1D2023',
          }}>
          Category
        </Text>
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Selector title={selected} onPress={openMenu} />}
        style={{width: '90%'}}>
        <Menu.Item
          onPress={() => handleSelected('All Benefits')}
          title="All Benefits"
        />
        {/* <Menu.Item title="All Benefits" /> */}
        {categoryList.map(cat => (
          <Menu.Item
            onPress={() => handleSelected(cat.category)}
            title={cat.category}
          />
        ))}
      </Menu>
      {/* <View style={{flex: 1, marginHorizontal: 90}}>
          <Button
            style={{padding: 0}}
            label="Subscribe"
            onPress={handleSubscriptionPress}
          />
        </View> */}

      {/* <TouchableOpacity
          style={{
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 10,
            shadowOpacity: 0.25,
            marginEnd: 20,
            marginTop: 0,
            padding: 1,
            backgroundColor: '#24BF9C',
            borderRadius: 15,
          }}
          onPress={handleViewLikesPress}>
          <Icon
            name="heart"
            type="font-awesome"
            color="red"
            style={{paddingHorizontal: 10, paddingTop: 5}}
          />
          <Text
            style={{paddingHorizontal: 10, paddingBottom: 5, color: 'white'}}>
            Likes
          </Text>
        </TouchableOpacity> */}
    </View>
  );

  /**
   * Render the articles in a View with 5 padding so there's proper spacing
   * @return {*}
   */
  const renderArticles = () =>
    renderArticleList?.map((b, i) => (
      <View rstyle={{padding: 5}}>
        <ArticleCard
          key={b._id}
          article={b}
          onPress={handleArticlePress}
          user={user}
          toggleLike={b.usersLiking ? b.usersLiking.includes(user._id) : false}
          onLike={handleLikePress}
        />
      </View>
    ));

  /**
   * Renders header used to display
   * text showing how many results and
   * a selector for filtering articles by category
   * @return {JSX.Element}
   */
  const renderHeader = () => (
    <StyledHeader>
      {/* <Text>
        Showing {renderArticleList?.length || 0} article
        {renderArticleList.length > 1 ? 's' : null}
      </Text> */}
      {renderMenu()}
    </StyledHeader>
  );

  /**
   *  return either the list of articles or
   *  a label telling user no articles have been found
   */
  return (
    <MainContainer>
      {renderArticleList && renderHeader()}
      {renderArticleList ? renderArticles() : <NotFound item="Articles" />}
    </MainContainer>
  );
}
