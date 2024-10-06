const userState = {
  getUserStateId,
  getUserStateEmail,
  getUserStateName,
  getUserStateGoal,
  getUserStateProfilePic,
  getUserStateLocation,
  getDeleted,
  setUserState,

  currentUserState: {
    uid: null,
    email: null,
    name: null,
    weekly_goal: 120,
    profile_pic: null,
    location: null,
    deleted: null,
  },
};

function getUserStateId() {
  return userState.currentUserState.uid;
}

function getUserStateEmail() {
  return userState.currentUserState.email;
}

function getUserStateName() {
  return userState.currentUserState.name;
}

function getUserStateGoal() {
  return userState.currentUserState.weekly_goal;
}

function getUserStateProfilePic() {
  return userState.currentUserState.profile_pic;
}

function getUserStateLocation() {
  return userState.currentUserState.location;
}

function getDeleted() {
  return userState.currentUserState.deleted;
}

function setUserState(
  id,
  email,
  name,
  weekly_goal,
  profile_pic,
  location,
  deleted,
) {
  userState.currentUserState.uid = id;
  userState.currentUserState.email = email;
  userState.currentUserState.name = name;
  userState.currentUserState.weekly_goal = weekly_goal;
  userState.currentUserState.profile_pic = profile_pic;
  userState.currentUserState.location = location;
  userState.currentUserState.deleted = deleted;
}

export default userState;
