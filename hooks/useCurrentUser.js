import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import userState from '../helpers/userState';
import { createToken } from '../redux/actions/createToken';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {email, uid} = auth().currentUser;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = await auth().currentUser.getIdToken();
        const config = {
          headers: {Authorization: `Bearer ${token}`},
        };
        const response = await axios.get(
          `${baseUrl}userdetails/email/${email}`,
          config,
        );
        const user = response.data[0];
        setUser(user);

        userState.setUserState(
          user.uid,
          user.email,
          user.name,
          user.weekly_goal,
          user.profile_pic,
          user.location,
          user.deleted,
        );
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const updateUser = async updatedUserDetails => {
    try {
      const header = await createToken();

      const response = await axios.put(
        `${baseUrl}userdetails/${uid}`,
        updatedUserDetails,
        header,
      );
      setUser(response.data);
      if(response.data) {
        userState.setUserState(
            response.data.uid,
            response.data.email,
            response.data.name,
            response.data.weekly_goal,
            response.data.profile_pic,
            response.data.location,
            response.data.deleted
        )

      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    isLoading,
    error,
    updateUser,
  };
};

export default useCurrentUser;
