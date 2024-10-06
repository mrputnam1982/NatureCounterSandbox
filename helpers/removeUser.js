import auth from '@react-native-firebase/auth';
import { deleteAccountService } from '../components/Utilities/DataResetServices';
import userState from './userState';

// Function to remove the current user
async function removeUser() {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      // Delete the current user
      const response = await deleteAccountService();
      if (response?.status === 200) {
        await currentUser.delete();
        userState.setUserState(null, null, null, null, null, null, null);
      } else {
        throw new Error('Error deleting user:', response?.status);
      }
    } else {
      throw new Error('No current user found');
    }
  } catch (error) {
    throw error;
  }
}

export default removeUser;
