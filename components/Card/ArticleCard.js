import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import NATURE from '../../assets/nature_photo.png';
import {DARK_GREY, THEME_GREEN} from '../Utilities/Constants';
import * as articleActions from '../../redux/actions/articleActions';
import {Icon} from 'react-native-elements';

const StyledCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: white;
  padding: 20px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.08);
`;

const StyledChip = styled.View`
  position: absolute;
  background-color: #459f5e;
  padding: 7px 4px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const StyledReadText = styled.Text`
  color: white;
  font-size: 12px;
`;

const StyledTextContainer = styled.View`
  justify-content: center;
  margin-left: 10px;
`;

const StyledCategory = styled.Text`
  color: ${THEME_GREEN};
  font-weight: bold;
`;

const StyledTitle = styled.Text`
  font-weight: bold;
  width: 220px;
`;

const StyledDesc = styled.Text`
  color: ${DARK_GREY};
  width: 200px;
`;

/**
 * Card to show an article
 * @param article
 * @return {JSX.Element}
 * @constructor
 */
const ArticleCard = ({article, onPress, user, toggleLike, onLike}) => {
  const {_id, readTime, category, title, subTitle} = article;
  let isLikedByUser = article.usersLiking
    ? article.usersLiking.includes(user._id)
    : false;
  let [likedState, setLikedState] = React.useState(toggleLike);
  const handleLikePress = () => {
    console.log('Handling like press!!');
    articleActions.updateUsersLiking(article, user);
    setLikedState(!likedState);
    onLike();
  };
  // console.log("TOGGLE LIKE " + toggleLike + " for " + article.title)

  const handleArticlePress = () => {
    console.log('article name ' + article.title + ' opened!');
    onPress(article);
  };

  return (
    <StyledCard onPress={handleArticlePress} key={_id}>
      <View>
        <Image source={NATURE} style={styles.thumbnail} />

        <StyledChip>
          <StyledReadText>{readTime} min read</StyledReadText>
        </StyledChip>
      </View>
      <StyledTextContainer>
        <StyledCategory>{category}</StyledCategory>
        <StyledTitle>{title}</StyledTitle>
        <StyledDesc>{subTitle}</StyledDesc>
      </StyledTextContainer>
      {/* This is the like button */}
      {/* <View style={{marginHorizontal: -20}}>
        <Icon
          name={isLikedByUser ? 'heart' : 'heart-o'}
          type="font-awesome"
          color={isLikedByUser ? 'red' : 'black'}
          size={15}
          onPress={handleLikePress}
        />
      </View> */}
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: 102,
    height: 88,
    borderRadius: 10,
  },
});

export default ArticleCard;

// ArticleCard.propTypes = {
//   article: PropTypes.object,
//   onPress: PropTypes.func,
// };

// ArticleCard.defaultProps = {
//   article: {
//     _id: '',
//     readTime: 0,
//     category: '',
//     title: '',
//     subTitle: '',
//   },
//   onPress: () => { },
// };
