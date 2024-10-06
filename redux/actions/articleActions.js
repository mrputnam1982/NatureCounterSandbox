import axios from 'axios';
import {createToken} from './createToken';
import * as ActionTypes from './ActionTypes';
import baseUrl from '../../helpers/baseUrl';

export function fetchArticles() {
  return async function action(dispatch) {
    dispatch(articlesLoading(true));
    try {
      const header = await createToken();
      const request = await axios
        .get(baseUrl + 'articles', header)
        .then(
          response => dispatch(getArticles(response)),
          err => dispatch(articlesFailed(err)),
        );
      return request;
    } catch (err) {
      console.log(err);
    }
  };
}

export const updateUsersLiking = async (article, user) => {
  try {
    const header = await createToken();
    // if article is liked and isn't already in list, add it
    // likesList = user.likedArticles;
    listOfUsersLiking = article.usersLiking ? article.usersLiking : [];
    userLiking = user._id;
    if (!listOfUsersLiking.includes(userLiking)) {
      listOfUsersLiking.unshift(userLiking);
    }
    //else it is unliked or just hasn't been liked yet
    else {
      for (var i = 0; i < listOfUsersLiking.length; i++) {
        if (listOfUsersLiking[i] == userLiking) {
          listOfUsersLiking.splice(i, 1);
          console.log('Removing: ' + userLiking);
        }
      }
      // likesList = tempList;
      console.log(
        'New userLikingList with: ' +
          userLiking +
          ' removed: \n' +
          listOfUsersLiking,
      );
    }
    const payload = {
      usersLiking: listOfUsersLiking,
    };
    const url = (baseUrl + 'articles/' + article._id).replace(/['"]+/g, '');
    const res = await axios.put(url, payload, header);
    console.log(
      'updateUsersLiking has been called! Here is the data: ' +
        res.data.usersLiking,
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const articlesLoading = () => ({
  type: ActionTypes.ARTICLES_LOADING,
});

export const articlesFailed = errmsg => ({
  type: ActionTypes.ARTICLES_FAILED,
  payload: errmsg,
});

export const getArticles = articles => ({
  type: ActionTypes.GET_ARTICLES,
  payload: articles,
});
