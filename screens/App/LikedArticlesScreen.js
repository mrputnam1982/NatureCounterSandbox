import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import MainContainer from '../../components/Container/MainContainer';
import NotFound from '../../components/Utilities/NotFound';
import { ArticleCard } from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { Menu } from 'react-native-paper';
import { MEDIUM_GREY } from '../../components/Utilities/Constants';
import { Icon } from 'react-native-elements';
import TextInput from '../../components/Input/TextInput'
import Button from '../../components/Button/Button'
import IconButton from '../../components/Button/IconButton';
import { AsyncStorage } from 'react-native'
// import RNRestart from 'react-native-restart';

/**
 * Styled Touchable Opacity for the Selector component
 */
const StyledSelector = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${MEDIUM_GREY};
  width: 140px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: white;
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
  margin: 10px;
`;

/**
 * Screen showing a list of articles
 * @param articles
 * @return {JSX.Element}
 * @constructor
 */
export default function LikedArticlesScreen({ user, articles }) {

    const { data } = articles

    let likedArticles = []



    // console.log("ARTICLES IN LIKEDSCREEN: " + JSON.stringify(likedArticles))

    for (let i = 0; i < data.length; i++) {
        //Check if user._id exists in each article's usersLiking list at i
        if (data[i].usersLiking.includes(user._id)) {
            likedArticles.unshift(data[i])
        }
    }



    const subscriptionsList = user.subscriptions;
    const [selected, setSelected] = useState('All Benefits');
    const [visible, setVisible] = useState(false);
    let [searchString, setSearchString] = useState('');

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const navigation = useNavigation();

    /**
     * Get list of Health Categories in articles
     * @type {unknown[]}
     */
    const categoryList = [...new Set(
        likedArticles.map(x => JSON.stringify((({ category }) => ({ category }))(x))))
    ].map(JSON.parse);

    categoryList.unshift({ "category": "Subscriptions" });

    console.log(categoryList);

    /**
     * Filter articles based on the selected value of the picker
     * 
     */

    const filterArticles = data.filter((a) =>
    ((((a.category === selected || selected === "All Benefits" || (selected === "Subscriptions" && subscriptionsList.includes(a.category))) &&
        a.usersLiking.includes(user._id)) &&
        (!a.archived) &&
        (a.title.toLowerCase().includes(searchString.toLowerCase()) ||
            a.description.toLowerCase().includes(searchString.toLowerCase()) ||
            a.subTitle.toLowerCase().includes(searchString.toLowerCase())))));

    var renderArticleList = filterArticles;



    /**
     * Set selected to the category that was selected
     * then close the menu
     * @param category
     */
    const handleSelected = (category) => {
        console.log('CATEGORY IS: ' + category);
        setSelected(category);
        closeMenu();
    }

    const handleSearchString = (searchString) => {
        setSearchString(searchString);
    }

    /**
     * When an article is pressed,
     * take user to the view article screen with full article content
     * @param article
     */
    const handleArticlePress = (article) =>
        navigation.navigate('ArticleView', { selectedArticle: article });

    const handleLikePress = () => {
        setTimeout(() => { navigation.navigate('LikedArticlesList', { articles: data, user: user }); }, 50);
    }

    /**
     * Render the selector component
     * @param title
     * @param onPress
     * @return {JSX.Element}
     * @constructor
     */
    const Selector = ({ title, onPress }) => (
        <StyledSelector onPress={onPress}>
            <Text>{title}</Text>
            <Icon
                name="chevron-down"
                type="material-community"
                color="#000"
                size={18}
            />
        </StyledSelector>
    );



    /**
     * Render the Menu component
     * and the options to select
     * @return {JSX.Element}
     */
    const renderMenu = () => (
        <View>
            <View style={{ marginBottom: 10, marginTop: -20 }}>
                <TextInput
                    placeholder="Search by keyword"
                    onChangeText={(t) => handleSearchString(t)}
                />
                {/* <Button label="Subscribe" onPress={handleSubscriptionPress} /> */}
                <Text style={{ flex: 3, marginStart: 0, marginTop: "5%" }}>
                    Showing {renderArticleList?.length || 0} liked article{((renderArticleList.length > 1) || renderArticleList.length == 0) ? 's' : null}
                </Text>

            </View>
            <View style={{ flexDirection: 'row' }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Selector title={selected} onPress={openMenu} />}
                >

                    <Menu.Item onPress={() => handleSelected("All Benefits")} title="All Benefits" />
                    {/* <Menu.Item title="All Benefits" /> */}
                    {
                        categoryList.map((cat) => (
                            <Menu.Item onPress={() => handleSelected(cat.category)} title={cat.category} />
                        ))
                    }
                </Menu>
            </View>

        </View >

    );

    /**
     * Render the articles in a View with 5 padding so there's proper spacing
     * @return {*}
     */
    const renderArticles = () =>
    (
        renderArticleList?.map((b) => (
            <View style={{ padding: 5 }}>
                <ArticleCard
                    article={b}
                    onPress={handleArticlePress}
                    user={user}
                    toggleLike={b.usersLiking.includes(user._id)}
                    onLike={handleLikePress}
                />
            </View>
        ))
    );

    /**
     * Renders header used to display
     * text showing how many results and
     * a selector for filtering articles by category
     * @return {JSX.Element}
     */
    const renderHeader = () => (
        <StyledHeader>
            {/* <Text>
        Showing {renderArticleList?.length || 0} article{renderArticleList.length > 1 ? 's' : null}
      </Text> */}
            {renderMenu()}
        </StyledHeader>
    )

    /**
     *  return either the list of articles or
     *  a label telling user no articles have been found
    */
    return (
        <MainContainer>
            {renderArticleList && renderHeader()}
            {
                renderArticleList
                    ? renderArticles()
                    : <NotFound item="Articles" />
            }
        </MainContainer>
    );
}
