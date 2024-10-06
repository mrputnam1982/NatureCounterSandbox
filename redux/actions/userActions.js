import auth from '@react-native-firebase/auth';
import axios from 'axios';
import baseUrl from '../../helpers/baseUrl';
import * as ActionTypes from './ActionTypes';
import { createToken } from './createToken';
export const INIT_USER_INFO = 'userActions__INIT_USER_INFO';
export const CLEAR_USER_INFO = 'userActions__CLEAR_USER_INFO';
export const initUserInfo = user => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    let {email, displayName, emailVerified, uid} = user;

    if (user.providerData[0].providerId === 'facebook.com') {
      emailVerified = true;
    }

    dispatch({
      type: INIT_USER_INFO,
      payload: {
        email,
        displayName,
        emailVerified,
        uid,
      },
    });
    return resolve();
  });
};

export const clearUserInfo = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: CLEAR_USER_INFO,
    });
    return resolve();
  });
};

export const addUser = async (name, email, uid) => {
  const header = await createToken();
  const payload = {
    name,
    email,
    uid,
  };
  try {
    axios.post(`${baseUrl}userdetails`, payload, header).then(res => {
      if (res?.status === 200) {
        return res.data;
      } else {
        throw new Error('Error adding user to database');
      }
    }).catch(err => {
      console.log('Error adding user to database: ', err);
      throw err;
    });

  } catch (e) {
    console.error(e);
  }
};

export const updateUserSubs = async (user, category) => {
  try {
    console.log(category);
    const header = await createToken();
    subsList = user.subscriptions;
    console.log('Printing subsList ' + subsList);
    if (!subsList.includes(category)) {
      subsList.unshift(category);
    } else {
      for (var i = 0; i < subsList.length; i++) {
        if (subsList[i] == category) {
          subsList.splice(i, 1);
          console.log('Removing: ' + category);
        }
      }
    }
    const payload = {
      subscriptions: subsList,
    };
    // const res = await axios.put(baseUrl + 'userdetails/624735dfa6b763b0cb9072f4', payload, header);
    const url = (baseUrl + 'userdetails/' + user._id).replace(/['"]+/g, '');
    const res = await axios.put(url, payload, header);
    // console.log("ID RECIEVED " + _id);
    // console.log("Subscriptions recieved!!!!: " + JSON.stringify(payload));
    console.log(
      'updateUserSubs has been called! Here is the data: ' +
        res.data.subscriptions,
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateUserLikes = async (_id, articleID, user, likedBool) => {
  try {
    const header = await createToken();
    //if article is liked and isn't already in list, add it
    likesList = user.likedArticles;
    if (likedBool && !likesList.includes(articleID)) {
      likesList.unshift(articleID);
    }
    //else it is unliked or just hasn't been liked yet
    else {
      for (var i = 0; i < likesList.length; i++) {
        if (likesList[i] == articleID) {
          likesList.splice(i, 1);
          console.log('Removing: ' + articleID);
        }
      }
      // likesList = tempList;
      console.log(
        'New likesList with: ' + articleID + ' removed: \n' + likesList,
      );
    }
    const payload = {
      likedArticles: likesList,
    };
    const url = (baseUrl + 'userdetails/' + _id).replace(/['"]+/g, '');
    const res = await axios.put(url, payload, header);
    console.log(
      'updateUserLikes has been called! Here is the data: ' +
        res.data.likedArticles,
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export function fetchUser() {
  return async function action(dispatch) {
    dispatch(userProfileLoading(true));
    const uid = auth().currentUser.uid;
    const userEmail = JSON.stringify(auth()._user.email);
    console.log('Printing user email from firebase: ' + userEmail);
    const header = await createToken();
    const url = (baseUrl + 'userdetails/email/' + userEmail).replace(
      /['"]+/g,
      '',
    );

    try {
      const request = axios.get(url, header);
      return request.then(
        response => dispatch(getUserProfile(response)),
        err => dispatch(userProfileFailed(err)),
      );
      //  dispatch(getActivity(response));

      // return response;
    } catch (err) {
      // dispatch(userProfileFailed(err));
      console.error(err);
    }
  };
}

// export function postSubs() {
//   return async function action(dispatch) {
//     dispatch(userLoading(true));
//     const header = await createToken();
//     const request = axios.get(baseUrl + 'userdetails/', header);
//     return request.then(
//       response => (dispatch(getUser(response), dispatch(getActivity(response)))),
//       err => dispatch(userFailed(err))
//     );

//   }
// }

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
});

export const userFailed = errmsg => ({
  type: ActionTypes.USER_FAILED,
  payload: errmsg,
});

export const getUser = user => ({
  type: ActionTypes.GET_USER,
  payload: user,
});

export const userProfileLoading = () => ({
  type: ActionTypes.USER_PROFILE_LOADING,
});

export const userProfileFailed = errmsg => ({
  type: ActionTypes.USER_PROFILE_FAILED,
  payload: errmsg,
});

export const getUserProfile = userProfile => ({
  type: ActionTypes.GET_USER_PROFILE,
  payload: userProfile,
});

export const getActivity = user => ({
  type: ActionTypes.GET_ACTIVITY,
  payload: user,
});

export const updateUserNotificationSetting = (key, value) => ({
  type: ActionTypes.UPDATE_NOTIFICATION_SETTING,
  payload: {key, value},
});
